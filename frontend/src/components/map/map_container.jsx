import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon} from 'google-maps-react';
import React from 'react';
import Point from '../../util/point';
import {track, getFavorites} from '../../util/location_api_util';
import {connect} from 'react-redux';
const gAPI = require('../../config/keys').gAPI;
// import { MAP } from 'react-google-maps/lib/constants'


export class GMap extends React.Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        center: {},
        clicked: {},
        clickedMarker: [],
        favoriteMarkers: []
      };
    
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props, map, e) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
        /*get latitude and longitude from clicked point on maps */
        this.setState({clicked: {lat: e.latLng.lat(), lng: e.latLng.lng()}})
        this.setState({clickedMarker: <Marker onClick={this.onMarkerClick}
            name={'Clicked point'}
            position={{lat: e.latLng.lat(), lng: e.latLng.lng()}} 
        icon={{path: this.props.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW, scale: 5}}/>});
        console.log(this.state.clicked);
        console.log(props);
        console.log(map);
       
    };

    trackInput() {
        /*track the user's clicked point*/
        let trackLocation =  {name:'tracking', lat: `${this.state.clicked.lat}`, lng: `${this.state.clicked.lng}`, userId: this.props.userId};
        track(trackLocation).then(res => console.log('tracked', res));
    }

    addFavoritesToMarkers(){
        
    }
    

  render() {

    // let lat = 37.7749;
    // let lng = -122.4194;
    // let minutes = 15;
    let points = [];
  
    let goldStar = {
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: 'yellow',
        fillOpacity: 0.8,
        scale: 1,
        strokeColor: 'gold',
        strokeWeight: 14
      };

      const style = {
        width: '800px',
        height: '800px'
      }

      const markers = [
        <Marker onClick={this.onMarkerClick}
        name={'AA'}
        position={{lat: 37.7990, lng: -122.4014}} />,
        <Marker onClick={this.onMarkerClick}
        name={'YOUR LOCATION!'}
        position={this.state.center}
        icon= {{path: this.props.google.maps.SymbolPath.CIRCLE, scale:10}}/>
    ];


    let that = this;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            that.setState({center: pos});
        });

        // console.log('userId', this.props.userId);
        // console.log('trackFunction', this.props.track);

        /* attempt to make a control in google maps*/
        return (
            <div>
                <button type='button' onClick={()=>this.trackInput()}>TRACK FAVORITE LOCATION</button>
                <div>
                    <Map google={this.props.google}
                    onClick={this.onMapClicked}
                    center={this.state.center}
                    style={style}
                    // controls[{this.props.google.maps.ControlPosition.TOP_CENTER}]
                    >
                        {markers}
                        {this.state.clickedMarker}

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
            </div>
        );
            
    } else {
        return (<div>no location</div>);
    }
  }
}


/* Connecting Map to State Shape*/
const mapStateToProps = (state, ownProps) => ({
    userId: state.session.id
});

const mapDispatchToProps = (dispatch) => ({
    // track: (location) => dispatch(track(location))
});

const MapContainer = connect(mapStateToProps, mapDispatchToProps)(GMap);

/* Wrappe MapContainer with Google API*/
export default GoogleApiWrapper({
  apiKey: (gAPI)
})(MapContainer)