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
import { Button, Chip } from '@mui/material';

function clusterClicked(e: any) {
  console.log('clusterClicked', e);
}

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
const MarkersExample: React.FC = () => {
  const [location, setLocation] = useState({
    latitude: 35.3001,
    longitude: -122.9603,
  });
  
  const [loading, setLoading] = useState(true);

  const [point1, setPoint1] = useState(new data.Position(location.longitude, location.latitude));
  
  useEffect(() => {
    const interval = setInterval(() => {
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
        }
      );
    }, 30000); // call the function every 30 seconds
  
    return () => clearInterval(interval);
  }, [location]);
    


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
          zoom: 16, // Zoom level for Cal Poly SLO
    };
  }, []);


  const memoizedMarkerRender: IAzureDataSourceChildren = useMemo(
    (): any => markers.map((marker) => renderPoint(marker)),
    [markers],
  );

  console.log('MarkerExample RENDER');

  if (loading) {
    return <div>Please wait 30 seconds while we receive your location</div>;
  }




  // bubble: 


  function mouseOn(e: any) {
    e.map.getCanvas().style.cursor = 'pointer';
  }
  
  function mouseLeave(e: any) {
    e.map.getCanvas().style.cursor = '';
  }
  
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
            <AzureMapDataSourceProvider
              events={{
                dataadded: (e: any) => {
                  console.log('Data on source added', e);
                },
              }}
              id={'markersExample AzureMapDataSourceProvider'}
              options={{ cluster: true, clusterRadius: 2 }}
            >
              <AzureMapLayerProvider
                id={'markersExample AzureMapLayerProvider'}
                options={layerOptions}
                events={{
                  click: clusterClicked,
                  dbclick: clusterClicked,
                }}
                lifecycleEvents={{
                  layeradded: () => {
                    console.log('LAYER ADDED TO MAP');
                  },
                }}
                type={markersLayer}
              />
              {memoizedMarkerRender}
              {/* {memoizedHtmlMarkerRender} */}
            </AzureMapDataSourceProvider>
              
              
              
              
              
              
              <AzureMapDataSourceProvider
            id={'BubbleLayer DataSourceProvider'}
            dataFromUrl="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
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
                mouseenter: mouseOn,
                mouseleave: mouseLeave,
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
            ></AzureMapLayerProvider>
            
            </AzureMapDataSourceProvider>
          </AzureMap>


        </div>
      </AzureMapsProvider>
    </>
  );
};

const styles = {
  map: {
    flex:1,
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
