import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

function Map({ latitude, longitude, markers }) {

    const containerStyle = {
        width: '400px',
        height: '400px'
    };

    const center = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAxDshNcCkVFYZtZNq4TFeHXEfOVJbvDjM"
    });

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, []);

    return isLoaded ? (
        <GoogleMap
            id="map-main" 
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
        {markers && markers.map(function(m){
                const center = { lat: parseFloat(m.latitude), lng: parseFloat(m.longitude) };
                return <Marker position={center} label={m.title} key={m.id} />;
            })
        }
        <></>
        </GoogleMap>
    ) : <></>
}

export default React.memo(Map)
