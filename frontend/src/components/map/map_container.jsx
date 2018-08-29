import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon} from 'google-maps-react';
import React from 'react';
import Point from '../../util/point';

export class MapContainer extends React.Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
      };
    
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

  render() {

    let lat = 37.7749;
    let lng = -122.4194;
    let minutes = 15;
    let points = Point.initEndPoints(lat,lng,minutes);

    // const triangleCoords = [
    //     {lat: 25.774, lng: -80.190},
    //     {lat: 18.466, lng: -66.118},
    //     {lat: 32.321, lng: -64.757},
    //     // {lat: 25.774, lng: -80.190}
    //   ];

      const style = {
        width: '500px',
        height: '500px'
      }

      const markers = [<Marker onClick={this.onMarkerClick}
        name={'Current location'} />,
        <Marker
            onClick = { this.onMarkerClick }
            title = { 'Changing Colors Garage' }
            position = {{ lat: 39.648209, lng: -75.711185 }}
            name = { 'Changing Colors Garage' }
            />,
            <Marker onClick={this.onMarkerClick}
            name={'AA'}
            position={{lat: 37.7990, lng: -122.4014}} />];


            let pos = {};
            navigator.geolocation.getCurrentPosition(function(position) {
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            });

            console.log(pos);

    return (
        <div style={style}>
            <Map google={this.props.google}
            onClick={this.onMapClicked}
            center={pos}>
                
                {markers}

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>

                <Polygon
                    paths={points}
                    strokeColor="#0000FF"
                    strokeOpacity={0.8}
                    strokeWeight={2}
                    fillColor="#0000FF"
                    fillOpacity={0.35} />
            </Map>
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyA3tKBZcqJXXbGnAGoph4_a1WEZ_QZK7-E')
})(MapContainer)