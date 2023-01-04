import React, { useState, useRef } from 'react';
import { FETCH_POKEMON_INFO } from '../../constants';
import './style.css';
import Loader from '../../assets/loader.gif';
import TrendingSuggestions from '../trendingSuggestions'
import Card from './card';

const PokemonSearch =() =>{
    const searchRef = useRef(null);
    const [pokemonData, setPokemonData] = useState({})
    const [error, setError] = useState(null)
    const [showLoader, setShowLoader] = useState(false)
    /**
     * 
     * @param {*} searchString 
     * triggers search and sets the loading, data and error states
     */
    const triggerSearch = async ( searchString ) => {
        setShowLoader(true)
        setError(false)
        setPokemonData({})
        const response = await fetch(`${FETCH_POKEMON_INFO}${searchString}`)
        if (response.ok){
            const data = await response.json();
            setPokemonData(data);
            setError(null);
            setShowLoader(false)
        } else{
            setError("Ooops, no pokemon found with this name, try again!");
            setPokemonData({});
            setShowLoader(false)
        }
    }
    
    /**
     * 
     * @param {*} e 
     * checks if the user has pressed Enter key
     */
    const checkKeyPressedHandler = (e) =>{
        const character = e.key
        const searchString = searchRef.current.value
        if(character === 'Enter' && searchString){
            triggerSearch(searchString)
        }
    }
    let abilitiesList =[], statsList=[], heldItemsList=[];
    
    const { 
        sprites:{ other: { dream_world:{ front_default:cardImage = null} ={} } = {}} = {},
        abilities=[],
        stats=[],
        held_items=[],
        name=""
    } = pokemonData
    abilitiesList = [...abilities.map(i=>i.ability)]
    statsList = [...stats.map(i=>i.stat)]
    heldItemsList = [...held_items.map(i=>i.item)]
    const cardData = {
        listData: [
            { name: "Abilities", list: abilitiesList},
            { name: "Stats", list: statsList},
            { name: "Held Items", list: heldItemsList},
        ],
        name,
        cardImage,
    }
    
    const searchViaSuggestionHandler = (searchKey) =>{
        triggerSearch(searchKey);
        searchRef.current.value = searchKey
    }

    return (
        <div className='pokeApiWrapper'>
            <div className='searchContainer'>
                <input 
                ref={searchRef} 
                className='searchInput' 
                onKeyUp={checkKeyPressedHandler} 
                placeholder="Search By Name"
                aria-placeholder="Search By Name"
                aria-required="true"
                role="searchbox"
                tabIndex={1}
                />
            </div>
            {(!Object.keys(pokemonData).length > 0 && !error && !showLoader)?
                <TrendingSuggestions searchViaSuggestionHandler={searchViaSuggestionHandler} />
            :null}
            
            {showLoader && (
                <div className='loader' role="alert" aria-busy="true">
                    <img src={Loader} alt="loader" />
                </div>
            )}
            
            {Object.keys(pokemonData).length>0 ? (
                <Card cardData={cardData} tabIndex={2}/>
            ):null}
                
            {error && (<div className='errorState' role="alert" aria-busy="false">  {error} </div>)}
        </div>)
}

export default PokemonSearch;