import React from 'react';
import SearchIndexItem from './search_index_item';

class SearchIndex extends React.Component{
    render(){
       const {places} = this.props;
        console.log('places in Search Index', places);

        return places.map(place => 
        <SearchIndexItem place={place}/>)
    }
}

export default SearchIndex;