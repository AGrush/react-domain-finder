import React, { Component } from 'react'

export default class ControlPanel extends Component {
  render() {
    return (
      <form id="form1" method="post" onsubmit="return processForm()">
        <div className="wrapper">
            <div id="container1">
                <p>first half</p>
                <input type="text" required="required" name="firstWord" id="firstWord" />
                <span onclick="removeFields()" class="deletebtn">-</span>
                <span id="addFields" class="add" data="container1" onclick="addFields()">&nbsp;&nbsp;&nbsp; &#65291; &nbsp;&nbsp;&nbsp;</span>
            </div>

            <label class="container">
                <input name="hyphen" type="checkbox" />
                <span class="checkmark"></span>
            </label>

            <div id="container2">
                <p>second half</p>
                <input type="text" name="secondWord" id="secondWord" />
                <span onclick="removeFields()" class="deletebtn">-</span>
                <span id="addFields2" class="add" data="container2" onclick="addFields()">&nbsp;&nbsp;&nbsp; &#65291; &nbsp;&nbsp;&nbsp;</span>
            </div>
            <div className="domCheckboxWrapper">
              <label class="container4">
                  <input id="cominput" name="com" type="checkbox" checked />
                  <span id="com" class="checkmarkcom"></span>
              </label>
              <label class="container5">
                  <input id="coukinput" name="couk" type="checkbox" />
                  <span id="couk" class="checkmarkcom"></span>
              </label>
              <label class="container6">
                  <input id="reverseinput" name="reverse" type="checkbox" />
                  <span id="reverse" class="checkmarkreverse"></span>
              </label>
            </div>
        </div>
        <input id="clickMe2" type="image" src="https://img.icons8.com/plasticine/100/000000/search.png"></input>
    </form>
      
    )
  }
}
