import React from 'react'
import loadingGif from '../../assets/loading-gif.gif'

const SearchButton = ({loading}) => {
  if(loading){
    return (
      <img className="loading-icon" src={loadingGif} alt="loading"/>
    )
  } else return <input id="main-search-btn" type="image" alt="search button" src="https://img.icons8.com/plasticine/100/000000/search.png"></input>
  
}

export default SearchButton