import React from 'react';
import '../../styling/header/header.css';
import '../../index.css';

class SearchIndexItem extends React.Component{
    render(){
        const {place, markFoundPlace} = this.props;
        return (
            <div className="index-item" onClick={() => markFoundPlace(place)}>
                <div className="place-icon">
                    <img src={place.icon}></img>
                    <div className="place-name">
                        {place.name}
                    </div>
                </div>

                <div className="place-address">
                    {place.formatted_address}
                </div>
            </div>
        );
    }
}

export default SearchIndexItem;
