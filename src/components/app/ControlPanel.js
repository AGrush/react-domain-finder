import React, { Component } from 'react'
import WordsContainer from './controlpanel/WordsContainer'
import Option from './controlpanel/Option'

export default class ControlPanel extends Component {
  render() {
    return (
      <form id="form1" method="post" onsubmit="return processForm()">
        <div className="wrapper">
            <WordsContainer />
            <Option />
            <WordsContainer />

            <div className="wrapper-options">
              <Option />
              <Option />
              <Option />
            </div>
        </div>
        <input id="clickMe2" type="image" src="https://img.icons8.com/plasticine/100/000000/search.png"></input>
    </form>
      
    )
  }
}
