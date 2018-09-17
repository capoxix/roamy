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
    render(){
        const {getCurrentLocation, findPlaceAndMark, update, discover, trackInput, userId} = this.props
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

export default MapForm;

<MapForm getCurrentLocation={this.getCurrentLocation} 
            findPlaceAndMark = {this.findPlaceAndMark}
            update= {this.update} 
            discover= {this.discover} 
            trackInput= {this.trackInput}
            userId= {this.props.userId}
            />