import React from 'react';
import SearchIndex from "./search_index";
import '../../styling/header/header.css';
import '../../index.css';

class MapForm extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            query: '',
            trackName: ''
        }
    }

    queryPlaces(query) {
        if (this.state.map && query !== "") {
          let request = {
            location: this.state.map.getCenter(),
            radius: "500",
            query: query
          };
          let that = this;
    
          function returnPlaces(results, status) {
            if (status == that.props.google.maps.places.PlacesServiceStatus.OK)
              that.setState({ queryPlaces: results }) 
          }
    
          this.state.service.textSearch(request, returnPlaces);
        }
      }

    findPlaceAndMark(query) {
        if (
          this.state.map &&
          query !== "" &&
          query.length > 5
        ) {
          let request = {
            query: query,
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
            //   that.setState({query: ''});
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
    render(){
        const {getCurrentLocation, findPlaceAndMark, update, discover, trackInput, userId} = this.props;
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
                                <button type='submit'>TRACK LOCATION</button>
                                </form>
                            ];
                            }

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

    }
}

export default SearchForm;

<SearchForm getCurrentLocation={this.getCurrentLocation} 
            findPlaceAndMark = {this.findPlaceAndMark}
            update= {this.update} 
            discover= {this.discover} 
            trackInput= {this.trackInput}
            userId= {this.props.userId}
            />