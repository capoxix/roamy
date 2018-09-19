import React from 'react';
import SearchIndexItem from './search_index_item';
import '../../styling/header/header.css';
import '../../index.css';

class SearchIndex extends React.Component{
    render(){
       const {places} = this.props;

        let placesArr = places.map(place =>
        <SearchIndexItem place={place} key={place.id}/>)

        return <div className="search-index">{placesArr}</div>

    }
}

export default SearchIndex;
