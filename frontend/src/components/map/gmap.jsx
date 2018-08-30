import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon} from 'google-maps-react';
import React from 'react';
import Point from '../../util/point';
import {track, getFavorites} from '../../util/location_api_util';
import {connect} from 'react-redux';
const gAPI = require('../../config/keys').gAPI;
// import { MAP } from 'react-google-maps/lib/constants'


class GMap extends React.Component {
    constructor(props){
        super(props);
        this.fetchPlaces = this.fetchPlaces.bind(this);
        this.update = this.update.bind(this);
    }
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        center: {},
        clicked: {},
        clickedMarker: [],
        favoriteMarkers: [],
        trackName: '',
        currentLocationMarker:[],
        queryPlaces: [],
        query: '',
        service: {},
        map: {},

      };
    
    onMarkerClick = (mapProps, marker, e) =>
        this.setState({
            selectedPlace: mapProps,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (mapProps, map, e) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
        console.log(this);
        /*get latitude and longitude from clicked point on maps */
        this.setState({clicked: {lat: e.latLng.lat(), lng: e.latLng.lng()}})
        this.setState({clickedMarker: <Marker onClick={this.onMarkerClick}
            name={'Clicked point'}
            position={{lat: e.latLng.lat(), lng: e.latLng.lng()}} 
        icon={{path: this.props.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW, scale: 5}}/>});
        // console.log(this.state.clicked);
        // console.log(props);
        // console.log(map);
        // console.log(e.latLng);
       
    };

    trackInput() {
        /*track the user's clicked point*/
        let trackLocation =  {name:'tracking', lat: `${this.state.clicked.lat}`, lng: `${this.state.clicked.lng}`, userId: this.props.userId};
        track(trackLocation).then(res => console.log('tracked', res));
    }
    /*get favorites locations of user & set to map */
    addFavoritesToMarkers(){
        // console.log(this.props.google.maps.geometry.poly.containsLocation(,this.polygonComponent));
        let that = this;
        getFavorites(this.props.userId).then(favorites =>  that.setMarkersIntoMap(favorites.data));
    }

    /*set markers into map */
    setMarkersIntoMap(favoriteDataArr){
        let that = this;
        let favoritesMarkersArr = favoriteDataArr.map(favorite => {
            // create a new LatLng object with favorite's lat and lng
            let latLng = new that.props.google.maps.LatLng(favorite.lat, favorite.lng);
            //check to see if polygon contains that latlng and only create markers that are inside polygon
            if(that.props.google.maps.geometry.poly.containsLocation(latLng,that.polygon))
                return <Marker onClick={this.onMarkerClick}
                    name={favorite.name}
                    position={{lat: `${favorite.lat}`, lng: `${favorite.lng}`}}/>;
                });
        this.setState({favoriteMarkers: favoritesMarkersArr});
    }

    getCurrentLocation(){
        let that = this;
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position) {
                let pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                that.setState({center: pos});
                that.setState({currentLocationMarker: <Marker onClick={that.onMarkerClick}
                    name={'YOUR LOCATION!'}
                    position={that.state.center}
                    icon= {{path: that.props.google.maps.SymbolPath.CIRCLE, scale:10}}/>});
            });
        }
    }

    fetchPlaces(mapProps, map){
        // console.log(this);
        // let that = this;
        const {google} = mapProps;
        const service = new google.maps.places.PlacesService(map);
        this.state.service = service;
        this.state.map = map;
        // console.log(this.state.service);    
        // console.log(service.);
        // let sf = new google.maps.LatLng(37.7749,-122.4194);
        // let request = {
        //     location: map.getCenter(),
        //     radius: '500',
        //     query: this.state.query
        // }
        // // console.log(sf);
        // // debugger;
        // function printPlaces(results, status){
        //     if (status == google.maps.places.PlacesServiceStatus.OK) {
        //         for (let i = 0; i < results.length; i++) {
        //         let place = results[i];
        //         console.log(place);
        //                     // createMarker(results[i]);
        //         }
        //     }
        //     console.log(results.length);
        // }
        // service.textSearch(request,printPlaces);
    }

    queryPlaces(){
        let request = {
            location: this.state.map.getCenter(),
            radius: '500',
            query: this.state.query
        }

        function printPlaces(results, status){
            if (status == this.props.google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                let place = results[i];
                console.log(place);
                            // createMarker(results[i]);
                }
            }
            console.log(results.length);
        }
        this.state.service.textSearch(request,printPlaces);
    }
    
    update(field){
        return(e) => {
            this.setState({[field]: e.target.value});
        }
    }




    

  render() {

    let lat = 37.7749;
    let lng = -122.4194;
    let minutes = 15;
    let points =  Point.initEndPoints(lat, lng, minutes); //[];

    const style = {
    width: '800px',
    height: '800px'
    }
    this.polygon = new this.props.google.maps.Polygon({paths: points});
    this.polygonComponent = 
    <Polygon
        paths={points}
        strokeColor="#0000FF"
        strokeOpacity={0.8}
        strokeWeight={2}
        fillColor="#0000FF"
        fillOpacity={0.35} />;
    this.mapComponent =   
                <Map google={this.props.google}
                onClick={this.onMapClicked}
                onReady={this.fetchPlaces}
                center={this.state.center}
                style={style}
                // controls[{this.props.google.maps.ControlPosition.TOP_CENTER}]
                >
                    {this.state.currentLocationMarker}
                    {this.state.favoriteMarkers}
                    {this.state.clickedMarker}

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                        {this.polygonComponent}
                </Map>;

        // console.log(this.mapComponent);
        console.log(this.state.query);
                // console.log(mapComponent);
                // console.log(polygonComponent);
    /* attempt to make a control in google maps*/
    return (
        <div>
            <button type='button' onClick={()=>this.trackInput()}>TRACK LOCATION</button>
            <button type='button' onClick={()=> this.addFavoritesToMarkers()}>Get Favorite Spots</button>
            <button type='button' onClick={()=> this.getCurrentLocation()}>Get Current Location</button>
            <input type='text'
                onChange={this.update('query')}
                value={this.state.query}
                placeholder="Search"/>
            <div>
                {this.mapComponent}
            </div>
        </div>
    );
  }
}

export default GMap;
