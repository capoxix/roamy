import {
  Map,
  InfoWindow,
  Marker,
  Polygon
} from "google-maps-react";
import React from "react";
import SearchIndex from "./search_index";
import '../../styling/header/header.css';
import '../../index.css';

class GMap extends React.Component {
  constructor(props) {
    super(props);
    this.getServiceAndMap = this.getServiceAndMap.bind(this);
    this.update = this.update.bind(this);
    this.trackInput = this.trackInput.bind(this);
    this.setMarkersIntoMap = this.setMarkersIntoMap.bind(this);

    this.queryPlaces = this.queryPlaces.bind(this);
    this.findPlaceAndMark = this.findPlaceAndMark.bind(this);
    this.markFoundPlace = this.markFoundPlace.bind(this);

  }
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    center: {},
    clicked: {},
    clickedMarker: [],
    trackedMarker: undefined,
    minutes: '5',
    trackName: "",
    currentLocationMarker: [],
    queryPlaces: [],
    query: "Twin Peaks",
    service: undefined,
    map: undefined,
    foundPlace: undefined,
    favoriteMarkers: undefined,
    areaInfo: undefined
  };

  onMarkerClick = (mapProps, marker, e) =>
    this.setState({
      selectedPlace: mapProps,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onMapClicked = (mapProps, map, e) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,

      });
    }
    /*when map clicked changed foundplace to undefined */
    this.setState({foundPlace: undefined});

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

  componentDidMount(){
    if(this.props.userId) {
      this.props.getFavoritePoints(this.props.userId);
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.userId != prevProps.userId){
      this.props.getFavoritePoints(this.props.userId);
    }
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
    this.props.trackInput(trackLocation).then(that.setState({trackedMarker: trackedMarker}));
  }
 
  /*set favorite markers into map */
  setMarkersIntoMap() {
    let that = this;
    let favoritesMarkersArr = this.props.locations.map(favorite => {
      // create a new LatLng object with favorite's lat and lng
      let latLng = new that.props.google.maps.LatLng(
        favorite.lat,
        favorite.lng
      );
      //check to see if polygon contains that latlng and only create markers that are inside polygon
     
      if (that.props.google.maps.geometry) {
        if (
          that.props.google.maps.geometry.poly.containsLocation(
            latLng,
            that.polygon
          ) && (that.state.trackedMarker ? (that.state.trackedMarker.props.position.lat != favorite.lat && that.state.trackedMarker.props.position.lng != favorite.lng) : true)
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
    if (favoritesMarkersArr) this.setState({favoriteMarkers: favoritesMarkersArr});
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
    /* add controller to map */
    let centerControlDiv = document.createElement('div');
    let centerControl = this.centerControl(centerControlDiv, map);
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);
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
        if (status == that.props.google.maps.places.PlacesServiceStatus.OK)
          that.setState({ queryPlaces: results }) 
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
          that.setState({center: { lat: result[0].geometry.location.lat(), lng: result[0].geometry.location.lng()}});
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
      });
    this.setState({foundPlace: place});
    this.setState({center: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}});
  }

  updatePolygon = (endPoints) => {
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
    this.props.sendQuery(this.state.clicked).then(() => {
      that.setState({trackedMarker: undefined});
      that.setMarkersIntoMap();
      // let areaInfo;
      // console.log('clicked',that.state.clicked);
      // console.log('foundPlace', that.state.foundPlace);
      // if(this.state.foundPlace) {

      //                           areaInfo = [<li>Travel Radius: {this.state.minutes} minutes</li>,
      //                                       <li>Name: {this.state.foundPlace.name}</li>,
      //                                       <li>Address: {this.state.foundPlace.formatted_address}</li>];
      // } else {
      //   areaInfo = [<li>Travel Radius: {this.state.minutes} minutes</li>,
      //               <li>Name: Clicked point</li>,
      //               <li>Location: ({this.state.clicked.lat},{this.state.clicked.lng})</li>];
      // }
      let areaInfoP = document.createElement("p");
      let text = document.createTextNode(`The highlighted area shows where you can travel in ${this.state.minutes} minutes`);
      areaInfoP.appendChild(text);
      // areaInfoP.style.padding = "10px";
      
      // // console.log(areaInfoP);
      let areaInfo = document.getElementById("area-info");
      areaInfo.innerHTML = '';
      areaInfo.appendChild(areaInfoP);
      // that.setState({areaInfo: areaInfo});
    });
  }

  centerControl(controlDiv, map) {
    
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.title = 'Click to recenter the map';
    controlUI.style.marginRight = '9px';
    controlUI.style.padding = '1px';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    let controlImg = document.createElement('img');
    controlImg.style.height = '21px';
    controlImg.style.width = '22px';
    controlImg.src = "https://s3-us-west-1.amazonaws.com/sports-with-strangers-dev/location_button.png";

    controlUI.appendChild(controlImg);
    let that = this;
    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function() {
      that.getCurrentLocation();
    });

  }



  render() {
    this.updatePolygon(this.props.endPoints);
    // let favoritesMarkersArr = this.setMarkersIntoMap();
    let trackedMarker = null;
    if (this.props.userId) trackedMarker = this.state.trackedMarker;

    this.mapComponent = (
      <Map
        google={this.props.google}
        onClick={this.onMapClicked}
        onReady={this.getServiceAndMap}
        center={this.state.center}
        zoom={13}
        className="mapWrapper2"
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

    if (this.state.query === "") places =[];

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
                        <button type='submit'>Save Location</button>
                        </form>
                      ];
                      }
    // let areaInfo;
    // if(this.state.foundPlace) areaInfo = `Travel Radius ${this.state.minutes} minutes from ${this.state.foundPlace.name} in ${this.state.foundPlace.formatted_address}`;
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
                    <input type='text'
                      onChange={this.update('query')}
                      value={this.state.query}
                      placeholder="Search Place"/>
                    <button type='button' onClick={()=>this.findPlaceAndMark()}>Find Location</button>
                    <div className="discover-wrapper">
                      <select id="time" name="time" onChange={this.update("minutes")}>
                        <option value="5" selected="true">5 min</option>
                        <option value="10">10 min</option>
                        <option value="15">15 min</option>
                        <option value="20">20 min</option>
                        <option value="25">25 min</option>
                        <option value="30">30 min</option>
                        <option value="35">35 min</option>
                        <option value="40">40 min</option>
                        <option value="45">45 min</option>
                        <option value="50">50 min</option>
                        <option value="55">55 min</option>
                        <option value="60">60 min</option>
                      </select>
                      <button className="discover-button" type='button' onClick={this.discover}>Discover</button>
                    </div>
                </div>

                <div className="searchResults fadeIn">
                  <SearchIndex places={places} markFoundPlace={this.markFoundPlace}/>
                </div>

  
              </div>
            </div>

            <div id="area-info" className="area-info"></div>
        </div>
      </div>
    );
  }
}

export default GMap;
