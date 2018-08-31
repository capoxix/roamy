import React from 'react';
import SearchIndexItem from './search_index_item';

class SearchIndex extends React.Component{
    render(){
       const {places} = this.props;
        // console.log('places in Search Index', places);

        let placesArr = places.map(place => 
        <SearchIndexItem place={place} key={place.id}/>)

        return <div className="search-index">{placesArr}</div>
        
    }
}

export default SearchIndex;