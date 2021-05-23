import React, { Component } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import './mapbox.css';
mapboxgl.accessToken = 'pk.eyJ1IjoiYW5lbGl0byIsImEiOiJja2NqcXl5djkxbXVpMnRvOG52NHNwYml4In0.jCcDM96ArjXIaDHGqRUvSA';

export default class MapBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lng: this.props.lng,
            lat: this.props.lat,
            zoom: 9
        };
        this.mapContainer = React.createRef();
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        map.on('load', function () {
            // Insert the layer beneath any symbol layer.
            var layers = map.getStyle().layers;
            var labelLayerId;
            for (var i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
            }
            }
             
            // The 'building' layer in the Mapbox Streets
            // vector tileset contains building height data
            // from OpenStreetMap.
            map.addLayer(
            {
            'id': 'add-3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
            'fill-extrusion-color': '#aaa',
             
            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height']
            ],
            'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
            }
            },
             
            labelLayerId
            );
        });
    }

    render() {
        const { lng, lat, zoom } = this.state;
        
        return (
            <>
                <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
                <div ref={this.mapContainer} className="map-container" />
            </>
        );
    }
}
