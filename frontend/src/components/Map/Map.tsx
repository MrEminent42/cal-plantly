import React, { memo, useEffect, useMemo, useState } from 'react';
import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapFeature,
  AzureMapHtmlMarker,
  AzureMapLayerProvider,
  AzureMapsProvider,
  IAzureDataSourceChildren,
  IAzureMapFeature,
  IAzureMapHtmlMarkerEvent,
  IAzureMapLayerType,
  IAzureMapOptions,
} from 'react-azure-maps';
import { AuthenticationType, data, HtmlMarkerOptions, SymbolLayerOptions } from 'azure-maps-control';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { getGardens } from '../../api/gardens';
import { useNavigate } from 'react-router-dom';

const apiURL = process.env.REACT_APP_PLANTLY_API_URL;


const onClick = (e: any) => {
  console.log('You click on: ', e);
};

function azureHtmlMapMarkerOptions(coordinates: data.Position): HtmlMarkerOptions {
  return {
    position: coordinates,
    text: 'My text',
    title: 'Title',
  };
}

const memoizedOptions: SymbolLayerOptions = {
  textOptions: {
    textField: ['get', 'title'], //Specify the property name that contains the text you want to appear with the symbol.
    offset: [0, 1.2],
  },
};

const eventToMarker: Array<IAzureMapHtmlMarkerEvent> = [{ eventName: 'click', callback: onClick }];

const renderPoint = (coordinates: data.Position): IAzureMapFeature => {
  const rendId = Math.random();

  return (
    <AzureMapFeature
      key={rendId}
      id={rendId.toString()}
      type="Point"
      coordinate={coordinates}
      properties={{
        title: 'You',
        icon: 'pin-round-blue',
      }}
    />
  );
};

function renderHTMLPoint(coordinates: data.Position): any {
  const rendId = Math.random();
  return (
    <AzureMapHtmlMarker
      key={rendId}
      markerContent={<div className="pulseIcon"></div>}
      options={{ ...azureHtmlMapMarkerOptions(coordinates) } as any}
      events={eventToMarker}
    />
  );
}

const colorValue = () =>
  '#000000'.replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });
const markersStandardImages = [
  `marker-black`,
  `marker-blue`,
  `marker-darkblue`,
  `marker-red`,
  `marker-yellow`,
  `pin-blue`,
  `pin-darkblue`,
  `pin-red`,
  `pin-round-blue`,
  `pin-round-darkblue`,
  `pin-round-red`,
];

const rand = () => markersStandardImages[Math.floor(Math.random() * markersStandardImages.length)];

const MarkersExample = () => {
  const [location, setLocation] = useState({
    latitude: 35.3001,
    longitude: -122.9603,
  });

  const [loading, setLoading] = useState(true);
  const [userDeniedLocation, setUserDeniedLocation] = useState(false);
  const [showError, setShowError] = useState(false);

  const [point1, setPoint1] = useState(new data.Position(location.longitude, location.latitude));
  const navigate = useNavigate();


  const handleClickMarker = (e: any) => {
    console.log('click');
    console.log(e);

    // search through all the gardens and find the one that matches the coordinates of the marker that was clicked
    // then navigate to that garden's page

    getGardens().then((gardens) => {
      console.log(gardens)
      gardens.forEach((garden) => {
        console.log(e.shapes[0].data.geometry.coordinates)
        if (garden.Lat === e.shapes[0].data.geometry.coordinates[1] && garden.Long === e.shapes[0].data.geometry.coordinates[0]) {
          navigate("/game/garden/" + garden.Id);
        }
      })
    }).catch(error => console.log(error));
  }

  const updateLocation = () => {

    navigator.geolocation.getCurrentPosition(
      position => {
        const { longitude, latitude } = position.coords;
        setLocation({ latitude, longitude });
        setPoint1(new data.Position(longitude, latitude));
        setMarkers([new data.Position(longitude, latitude)]); // add point1 to markers array
        setLoading(false);
      },
      error => {
        console.error(error);
        setLoading(false);
        setUserDeniedLocation(true);
        setShowError(true);
      }
    );
  }


  useEffect(() => {
    updateLocation();
    const interval = setInterval(updateLocation, 30000); // call the function every 30 seconds
    return () => clearInterval(interval);
  }, []);



  const [markers, setMarkers] = useState([point1]);
  const [markersLayer] = useState<IAzureMapLayerType>('SymbolLayer');
  const [layerOptions, setLayerOptions] = useState<SymbolLayerOptions>(memoizedOptions);

  const option: IAzureMapOptions = useMemo(() => {
    return {
      authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: process.env.REACT_APP_MAP_API_KEY,
      },
      center: [-120.6603, 35.3001], // Cal Poly SLO coordinates
      zoom: 14, // Zoom level for Cal Poly SLO
    };
  }, []);


  const memoizedMarkerRender: IAzureDataSourceChildren = useMemo(
    (): any => markers.map((marker) => renderPoint(marker)),
    [markers],
  );



  // bubble: 


  function clusterClicked(e: any) {

    if (e && e.shapes && e.shapes.length > 0 && e.shapes[0].properties.cluster) {
      //Get the clustered point from the event.
      const cluster = e.shapes[0];

      //Get the cluster expansion zoom level. This is the zoom level at which the cluster starts to break apart.
      e.map.sources
        .getById('BubbleLayer DataSourceProvider')
        .getClusterExpansionZoom(cluster.properties.cluster_id)
        .then(function (zoom: any) {
          //Update the map camera to be centered over the cluster.
          e.map.setCamera({
            center: cluster.geometry.coordinates,
            zoom: zoom,
            type: 'ease',
            duration: 200,
          });
        });
    }
  }


  const bubbleLayerOptions = {
    //Scale the size of the clustered bubble based on the number of points inthe cluster.
    radius: [
      'step',
      ['get', 'point_count'],
      20, //Default of 20 pixel radius.
      100,
      30, //If point_count >= 100, radius is 30 pixels.
      750,
      40, //If point_count >= 750, radius is 40 pixels.
    ],

    //Change the color of the cluster based on the value on the point_cluster property of the cluster.
    color: [
      'step',
      ['get', 'point_count'],
      'rgba(0,255,0,0.8)', //Default to green.
      100,
      'rgba(255,255,0,0.8)', //If the point_count >= 100, color is yellow.
      750,
      'rgba(255,0,0,0.8)', //If the point_count >= 100, color is red.
    ],
    strokeWidth: 0,
    filter: ['has', 'point_count'], //Only rendered data points which have a point_count property, which clusters do.
  };

  return (
    <>
      <AzureMapsProvider>
        <div style={styles.map}>
          <AzureMap options={option}>

            {/* YOU MARKER */}
            <AzureMapDataSourceProvider
              id={'markersExample AzureMapDataSourceProvider'}
            >
              <AzureMapLayerProvider
                id={'markersExample AzureMapLayerProvider'}
                options={layerOptions}
                lifecycleEvents={{
                  layeradded: () => {
                    console.log('LAYER ADDED TO MAP');
                  },
                }}
                type={markersLayer}
              />
              {memoizedMarkerRender}
            </AzureMapDataSourceProvider>




            {/* CLUSTERING OF GARDEN MARKERS */}
            <AzureMapDataSourceProvider
              id={'BubbleLayer DataSourceProvider'}
              dataFromUrl={apiURL + "/garden_collection/"}
              options={{
                //Tell the data source to cluster point data.
                cluster: true,

                //The radius in pixels to cluster points together.
                clusterRadius: 100,

                //The maximium zoom level in which clustering occurs.
                //If you zoom in more than this, all points are rendered as symbols.
                clusterMaxZoom: 15,
              }}
            >
              <AzureMapLayerProvider
                id={'BubbleLayer LayerProvider'}
                options={bubbleLayerOptions}
                type="BubbleLayer"
                events={{
                  click: clusterClicked,
                }}
              ></AzureMapLayerProvider>
              <AzureMapLayerProvider
                id={'BubbleLayer2 LayerProvider'}
                options={{
                  iconOptions: {
                    image: 'none', //Hide the icon image.
                  },
                  textOptions: {
                    textField: ['get', 'point_count_abbreviated'],
                    offset: [0, 0.4],
                  },
                }}
                type="SymbolLayer"
              ></AzureMapLayerProvider>
              <AzureMapLayerProvider
                id={'BubbleLayer3 LayerProvider'}
                options={{
                  filter: ['!', ['has', 'point_count']], //Filter out clustered points from this layer.
                }}
                type="SymbolLayer"
                events={{
                  click: (e: any) => handleClickMarker(e),
                }}
              ></AzureMapLayerProvider>

            </AzureMapDataSourceProvider>
          </AzureMap>


        </div>
      </AzureMapsProvider>

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
      >
        <Alert onClose={() => setShowError(false)} severity="error" variant="filled" sx={{ width: '100%', fontFamily: 'Arial' }}>
          We couldn't get your location ☹️
        </Alert>
      </Snackbar>
    </>
  );
};

const styles = {
  map: {
    flex: 1,
  },
  buttonContainer: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: '10px',
    gridAutoColumns: 'max-content',
    padding: '10px 0',
    alignItems: 'center',
  },
  button: {
    height: 35,
    width: 80,
    backgroundColor: '#68aba3',
    'text-align': 'center',
  },
};

export default memo(MarkersExample);
