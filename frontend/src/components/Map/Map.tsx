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
