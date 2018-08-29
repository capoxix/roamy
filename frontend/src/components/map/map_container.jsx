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

    return (
        <div style={style}>
            <Map google={this.props.google}
            onClick={this.onMapClicked}>
                <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />

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
// export class MapContainer extends React.Component {}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyA3tKBZcqJXXbGnAGoph4_a1WEZ_QZK7-E')
})(MapContainer)