import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  Polygon
} from "google-maps-react";
import React from "react";
import Point from "../../util/point";
import { track, getFavorites } from "../../util/location_api_util";
import { connect } from "react-redux";
import SearchIndex from "./search_index";

const gAPI = require("../../config/keys").gAPI;
// import { MAP } from 'react-google-maps/lib/constants'

class GMap extends React.Component {
  constructor(props) {
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
    // console.log(this);
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
            path: this.props.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 5
          }}
        />
      )
    });
    // console.log(e);
  };

  trackInput() {
    /*track the user's clicked point*/
    let trackLocation = {
      name: `${this.state.trackName}`,
      lat: `${this.state.clicked.lat}`,
      lng: `${this.state.clicked.lng}`,
      userId: this.props.userId
    };
    track(trackLocation).then(res => console.log("tracked", res));
  }
  /*get favorites locations of user & set to map */
  addFavoritesToMarkers() {
    // console.log(this.props.google.maps.geometry.poly.containsLocation(,this.polygonComponent));
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
          />
        );
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
        that.setState({
          currentLocationMarker: (
            <Marker
              onClick={that.onMarkerClick}
              name={"YOUR LOCATION!"}
              position={that.state.center}
              icon={{
                path: that.props.google.maps.SymbolPath.CIRCLE,
                scale: 10
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
    console.log(google);
    //google.maps.ElevationService
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
          let filtered = [];
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
      console.log("trying to find place");
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
          that.setState({ foundPlace: result[0] });
          that.markFoundPlace(result[0])
          console.log(result);
        } else {
          console.log(result);
        }
        // console.log("foundPlace", result[0]);
        // that.setMarkersIntoMap([result]);
      }
    //   console.log(this.state.service);
      this.state.service.findPlaceFromQuery(request, findPlace);
    }
  }

  markFoundPlace(place){

    this.setState({ clicked: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng(), minutes: this.state.minutes } });
    this.setState({
        clickedMarker: (
          <Marker
            onClick={this.onMarkerClick}
            name={place.name}
            position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }}
            icon={{
              path: this.props.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
              scale: 5
            }}
          />
        )
      })
  }

  updatePolygon = (endPoints) => {
    console.log("updating polygon");
    if (!endPoints || endPoints.length === 0) {
      return
    }


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
      console.log(field, field==='minutes');
      if(field === 'minutes') this.setState( {clicked: { lat: this.state.clicked.lat, lng: this.state.clicked.lng, minutes: e.target.value } });
    };
  }

  discover = (e) => {
    e.preventDefault();
    console.log("info passed to discover:" ,this.state.clicked)
    this.props.sendQuery(this.state.clicked)
  }


  render() {

    this.updatePolygon(this.props.endPoints)

    // const style = {
    //   width: "800px",
    //   height: "800px"
    // };

    let address;
    if(this.state.foundPlace) address = this.state.foundPlace.formatted_address;
    // console.log(address);
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

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
            <p>{address}</p>
          </div>
        </InfoWindow>
        {this.polygonComponent}
      </Map>
    );

    this.queryPlaces();
    let places = this.state.queryPlaces;
    let userButtons =  [];
    if(this.props.userId) {
      userButtons =  [<input
                          type="text"
                          onChange={this.update("trackName")}
                          value={this.state.trackName}
                          placeholder="Favorite place name"
                        />,
                        <button type='button' onClick={()=>this.trackInput()}>TRACK LOCATION</button>,
                        <button type='button' onClick={()=> this.addFavoritesToMarkers()}>Get Favorite Spots</button>
                      ];
                      }
    // console.log(this.state.minutes);
    return (
      <div>
        <div>


            <div className="bodyWrapper">
                <div className="mapWrapper1">
                  {this.mapComponent}
                </div>
                <div className="sideBar">
                  <div className="stickyButtons">
                 {userButtons}
                  <button type='button' onClick={()=> this.getCurrentLocation()}>Get Current Location</button>
                  <input type='text'
                      onChange={this.update('query')}
                      value={this.state.query}
                      placeholder="Search Place"/>
                  <button type='button' onClick={()=>this.findPlaceAndMark()}>Go to location</button>
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
                  <button type='button' onClick={this.discover}>Discover</button>
                  </div>
                  <div className="searchResults">
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
