import {
  Map,
  InfoWindow,
  Marker,
  Polygon
} from "google-maps-react";
import React from "react";
import { track, getFavorites } from "../../util/location_api_util";
import SearchIndex from "./search_index";
import '../../styling/header/header.css';
import '../../index.css';

class GMap extends React.Component {
  constructor(props) {
    super(props);
    this.getServiceAndMap = this.getServiceAndMap.bind(this);
    this.update = this.update.bind(this);
    this.trackInput = this.trackInput.bind(this);
    this.addFavoritesToMarkers = this.addFavoritesToMarkers.bind(this);
    this.setMarkersIntoMap = this.setMarkersIntoMap.bind(this);
  }
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    center: {},
    clicked: {},
    clickedMarker: [],
    trackedMarker: [],
    minutes: '5',
    favoriteMarkers: [],
    trackName: "",
    currentLocationMarker: [],
    queryPlaces: [],
    query: "",
    service: undefined,
    map: undefined,
    foundPlace: undefined,
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
      });
    }
    /*get latitude and longitude from clicked point on maps and set marker to show clicked point*/
    /* USED TO PICK ORIGIN POINTS BY SETTING IT TO CLICKED AND CLICKED MARKERS */
    this.setState({ clicked: { lat: e.latLng.lat(), lng: e.latLng.lng(), minutes: this.state.minutes } });
    this.setState({
      clickedMarker: (
        <Marker
          onClick={this.onMarkerClick}
          name={"Clicked point"}
          position={{ lat: e.latLng.lat(), lng: e.latLng.lng() }}
          icon={{
            url: 'https://s3-us-west-1.amazonaws.com/sports-with-strangers-dev/clicked_icon.png',
            scaledSize: new this.props.google.maps.Size(30,30)
          }}
        />
      )
    });
  };

  componentWillReceiveProps(){
    //only show markers for logged in users
    if(this.props.userId) this.addFavoritesToMarkers();
  }

  trackInput(e) {
    e.preventDefault();
    /*track the user's clicked point*/
    let trackLocation = {
      name: `${this.state.trackName}`,
      lat: `${this.state.clicked.lat}`,
      lng: `${this.state.clicked.lng}`,
      userId: this.props.userId
    };

    let trackedMarker = 
    <Marker
          onClick={this.onMarkerClick}
          name={this.state.trackName}
          position={{ lat: this.state.clicked.lat, lng: this.state.clicked.lng }}
          icon={{
            url: 'https://s3-us-west-1.amazonaws.com/sports-with-strangers-dev/track_icon.png',
            scaledSize: new this.props.google.maps.Size(30,30)
          }}
        />;
    this.setState({trackName: ''});
    let that = this;
    track(trackLocation).then(that.setState({trackedMarker: trackedMarker}));
  }
  /*get favorites locations of user & set to map */
  addFavoritesToMarkers() {
    let that = this;
    getFavorites(this.props.userId).then(favorites =>
      that.setMarkersIntoMap(favorites.data)
    );
  }

  /*set favorite markers into map */
  setMarkersIntoMap(favoriteDataArr) {
    let that = this;
    let favoritesMarkersArr = favoriteDataArr.map(favorite => {
      // create a new LatLng object with favorite's lat and lng
      let latLng = new that.props.google.maps.LatLng(
        favorite.lat,
        favorite.lng
      );
      //check to see if polygon contains that latlng and only create markers that are inside polygon
      // debugger;
      if (that.props.google.maps.geometry) {
        if (
          that.props.google.maps.geometry.poly.containsLocation(
            latLng,
            that.polygon
          )
        )
          return (
            <Marker
              onClick={this.onMarkerClick}
              name={favorite.name}
              position={{ lat: `${favorite.lat}`, lng: `${favorite.lng}` }}
              icon={{
                url: 'https://s3-us-west-1.amazonaws.com/sports-with-strangers-dev/favorite_icon.png',
                scaledSize: new this.props.google.maps.Size(30,30)
              }}
            />
          );
        }
    });
    this.setState({ favoriteMarkers: favoritesMarkersArr });
  }

  getCurrentLocation() {
    let that = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        that.setState({ center: pos });
        that.setState({ clicked: { lat: pos.lat, lng: pos.lng, minutes: that.state.minutes } });
        that.setState({
          currentLocationMarker: (
            <Marker
              onClick={that.onMarkerClick}
              name={"CURRENT LOCATION"}
              position={that.state.center}
              icon={{
                url: 'https://s3-us-west-1.amazonaws.com/sports-with-strangers-dev/current_location.png',
                scaledSize: new that.props.google.maps.Size(30,30)
              }}
            />
          )
        });
      });
    }
  }
  /* get service and map for place searching*/
  getServiceAndMap(mapProps, map) {
    const { google } = mapProps;
    const service = new google.maps.places.PlacesService(map);
    this.setState({ map: map, service: service });
  }

  queryPlaces() {
    if (this.state.map && this.state.query !== "") {
      let request = {
        location: this.state.map.getCenter(),
        radius: "500",
        query: this.state.query
      };
      let that = this;

      function returnPlaces(results, status) {
        //   const searched = that.state.query;
        if (status == that.props.google.maps.places.PlacesServiceStatus.OK)
          that.setState({ queryPlaces: results });
      }

      this.state.service.textSearch(request, returnPlaces);
    }
  }

  /*find place and mark it in map  */
  /*USED TO PICK ORIGIN POINTS BY SETTING IT TO CLICKED AND CLICKED MARKERS */
  findPlaceAndMark() {
    if (
      this.state.map &&
      this.state.query !== "" &&
      this.state.query.length > 5
    ) {
      let request = {
        query: this.state.query,
        fields: [
          "photos",
          "formatted_address",
          "name",
          "rating",
          "opening_hours",
          "geometry"
        ]
      };

      let that = this;
      /*find place when given location address or name or lat,lng */

      function findPlace(result, status) {
          /* result is resulting places, which comes in as an array of objects
          EX: [{formatted_address: "....",
                geometry: {location: {lat(), lng()}},
                name: "......."}]
                OR
                null if address/name cannot be found
                */

        /*TO ACESS LAT OR LNG, do place.geometry.location.lat() AND place.geomtry.location.lng() [shown in markFoundPlace]*/
        if (status == that.props.google.maps.places.PlacesServiceStatus.OK) {
          that.setState({query: ''});
          that.setState({ foundPlace: result[0] });
          that.markFoundPlace(result[0])
        }
      }
      this.state.service.findPlaceFromQuery(request, findPlace);
    }
  }

  markFoundPlace(place){
    let that = this;
    this.setState({ clicked: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng(), minutes: this.state.minutes } });
    this.setState({
        clickedMarker: (
          <Marker
            onClick={this.onMarkerClick}
            name={place.name}
            position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }}
            icon={{
              url: 'https://s3-us-west-1.amazonaws.com/sports-with-strangers-dev/clicked_icon.png',
              scaledSize: new that.props.google.maps.Size(30,30)
            }}
          />
        )
      })
  }

  updatePolygon = (endPoints) => {
    // if (!endPoints || endPoints.length === 0) {
    //   return
    // }

    this.polygon = new this.props.google.maps.Polygon({paths: endPoints});
    this.polygonComponent =
    <Polygon
        paths={endPoints}
        strokeColor="#0000FF"
        strokeOpacity={0.8}
        strokeWeight={2}
        fillColor="#0000FF"
        fillOpacity={0.35}
        clickable={false} />;
    }

  update(field) {
    return e => {
      this.setState({ [field]: e.target.value });
      if(field === 'minutes') this.setState( {clicked: { lat: this.state.clicked.lat, lng: this.state.clicked.lng, minutes: e.target.value } });
    };
  }

  discover = (e) => {
    e.preventDefault();
    let that = this;
    this.props.sendQuery(this.state.clicked).then(that.setState({trackedMarker: []}));
  }


  render() {

    this.updatePolygon(this.props.endPoints)
    let trackedMarker = [];
    if (this.props.userId) trackedMarker = this.state.trackedMarker;
    // let address;
    // if(this.state.foundPlace) address = this.state.foundPlace.formatted_address;
    this.mapComponent = (
      <Map
        google={this.props.google}
        onClick={this.onMapClicked}
        onReady={this.getServiceAndMap}
        center={this.state.center}
        zoom={13}
        className="mapWrapper2"
        // controls[{this.props.google.maps.ControlPosition.TOP_CENTER}]
      >
        {this.state.currentLocationMarker}
        {this.state.favoriteMarkers}
        {this.state.clickedMarker}
        {trackedMarker}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
        {this.polygonComponent}
      </Map>
    );
    this.queryPlaces();
    let places = this.state.queryPlaces;
    let userButtons =  [];
    if(this.props.userId) {
      userButtons =  [<form onSubmit={this.trackInput}>
                      <input
                          type="text"
                          onChange={this.update("trackName")}
                          value={this.state.trackName}
                          placeholder="Favorite place name"
                          required
                        />
                        <input type='submit' value="TRACK LOCATION"/>
                        </form>
                      ];
                      }
    return (
      <div>
        <div>
            <div className="bodyWrapper">
                <div className="mapWrapper1">
                  {this.mapComponent}
                </div>

                <div className="sideBar">
                  <div className="sticky-buttons">
                    {userButtons}
                    <button type='button' onClick={()=> this.getCurrentLocation()}>Get Current Location</button>
                    <input type='text'
                      onChange={this.update('query')}
                      value={this.state.query}
                      placeholder="Search Place"/>
                    <button type='button' onClick={()=>this.findPlaceAndMark()}>Find location</button>
                    <div className="discover-wrapper">
                      <select id="time" name="time" onChange={this.update("minutes")}>
                        <option value="5" selected="true">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                        <option value="35">35</option>
                        <option value="40">40</option>
                        <option value="45">45</option>
                        <option value="50">50</option>
                        <option value="55">55</option>
                        <option value="60">60</option>
                      </select>
                      <button className="discover-button" type='button' onClick={this.discover}>Discover</button>
                    </div>
                  </div>

                  <div className="searchResults fadeIn">
                    <SearchIndex places={places}/>
                  </div>

                </div>
            </div>
        </div>


        </div>
    );
  }
}

export default GMap;
