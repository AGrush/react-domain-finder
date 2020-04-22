import React, { Component } from 'react'
import Word from './Word'

export default class WordsContainer extends Component {
  render() {
    return (
      <div id="container1">
        <p>first half</p>
        <Word />
        <span id="addFields" class="add" data="container1" onclick="addFields()">&nbsp;&nbsp;&nbsp; &#65291; &nbsp;&nbsp;&nbsp;</span>
      </div>
    )
  }
}