import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon} from 'google-maps-react';
import React from 'react';
import Point from '../../util/point';
import {track, getFavorites} from '../../util/location_api_util';
import {connect} from 'react-redux';
import SearchIndex from './search_index';

const gAPI = require('../../config/keys').gAPI;
// import { MAP } from 'react-google-maps/lib/constants'


class GMap extends React.Component {
    constructor(props){
        super(props);
        this.getServiceAndMap = this.getServiceAndMap.bind(this);
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
        service: undefined,
        map: undefined,

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
        // console.log(this);
        /*get latitude and longitude from clicked point on maps and set marker to show clicked point*/
        this.setState({clicked: {lat: e.latLng.lat(), lng: e.latLng.lng()}})
        this.setState({clickedMarker: <Marker onClick={this.onMarkerClick}
            name={'Clicked point'}
            position={{lat: e.latLng.lat(), lng: e.latLng.lng()}} 
        icon={{path: this.props.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW, scale: 5}}/>});
        console.log(e);
       
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
    /* get service and map for place searching*/
    getServiceAndMap(mapProps, map){
        const {google} = mapProps;
        const service = new google.maps.places.PlacesService(map);
        this.setState({map: map, service: service});
    }

    queryPlaces(){
        if(this.state.map && this.state.query !== '') {
            let request = {
                location: this.state.map.getCenter(),
                radius: '500',
                query: this.state.query
            }
            let that = this;
            
            function returnPlaces(results, status){
                if (status == that.props.google.maps.places.PlacesServiceStatus.OK) 
                    that.setState({queryPlaces : results});
            }
            
            this.state.service.textSearch(request,returnPlaces);
        }
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
    let origin = new Point({lat: lat, lng: lng, minutes: minutes});

    let points =  origin.initEndPoints(); //[];

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
        fillOpacity={0.35}
        clickable={false} />;

    this.mapComponent =   
                <Map google={this.props.google}
                onClick={this.onMapClicked}
                onReady={this.getServiceAndMap}
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

        this.queryPlaces();
        let places = this.state.queryPlaces;
        // console.log(places);
        // let result = this.state.queryPlaces.map(place => {
        //     return (
        //         <ul>
        //     <li>Name: {place.name}</li>
        //     <li>Address: {place.formatted_address}</li>
        //     <li>Lat: {place.geometry.location.lat()} Lng: {place.geometry.location.lng()}</li>
        //     <li><img src={place.icon}></img></li>
        //     {/* <li>{place.formatted_address}</li> */}
        //     {/* <li>{place.geometry}</li> */}
        //     </ul>);
        //     });
        
            // console.log(this.state.queryPlaces);
                // console.log(mapComponent);
                // console.log(polygonComponent)
    /* attempt to make a control in google maps*/
    return (
        <div>
            <button type='button' onClick={()=>this.trackInput()}>TRACK LOCATION</button>
            <button type='button' onClick={()=> this.addFavoritesToMarkers()}>Get Favorite Spots</button>
            <button type='button' onClick={()=> this.getCurrentLocation()}>Get Current Location</button>
            <input type='text'
                onChange={this.update('query')}
                value={this.state.query}
                placeholder="Search Place"/>
            <div>
                <SearchIndex places={places}/>
            </div>
            <div>
                {this.mapComponent}
            </div>

                <div className="footer">
                    <div className="links">
                      <div className="ft-headers">© 2018 ROVER</div>
                      <div className="ft-headers">FOLLOW</div>
                      <div className="ft2-1">
                        <p>
                          ROVER is a map based web application that allows users to see areas they can access given free time.
                        </p>
                      </div>
                      <div className="ft2-2">
                        <a className="socials" href="mailto:tonywzhang@gmail.com">
                          <i className="fab fa-google"></i>
                        </a>
                        <br/>
                        <a className="socials" href="tel:+16508883357">
                          <i className="fas fa-mobile"></i>
                        </a>
                        <br/>
                        <a className="socials" href='https://www.facebook.com/tonywzhang'>
                          <i className="fab fa-facebook"></i>
                        </a>
                        <br/>
                        <a className="socials" href="https://www.linkedin.com/in/kevin-ou-b56a768b/">
                          <i className="fab fa-linkedin"></i>
                        </a>
                        <br/>
                        <a className="socials" href="https://github.com/capoxix/intro-mongo">
                          <i className="fab fa-github"></i>
                        </a>
                      </div>
                  </div>
                </div>
        </div>
    );
  }
}

export default GMap;
