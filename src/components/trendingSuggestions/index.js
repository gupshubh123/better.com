import React from "react";
import './style.css'

const TrendingSuggestions = ({ searchViaSuggestionHandler }) =>{
    const suggestionHandler =(value)=>{
        searchViaSuggestionHandler(value)
    }
    /**
     * ideally this list should be fetched via API but for simplicity purpose, 
     * have hardcoded this just for presentational purpose.
     */
    const suggestionList = [
        "pikachu",
        "ditto",
        "charizard",
        "bulbasaur"
    ]
    return(
        <div className="suggestionHandlerWrapper">
            <div className="title"> Popular Searches </div>
            <div className="list">
                {suggestionList.map((item, index)=>(
                <div className="listItem" key={index} onClick={()=>{suggestionHandler(item)}}>
                    {item}
                </div>
                ))}
            </div>
        </div>
    )
}

export default TrendingSuggestions;