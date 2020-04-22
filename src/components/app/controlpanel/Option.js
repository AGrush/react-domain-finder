import React, { Component } from 'react'

export default class Hyphen extends Component {
  render() {
    return (
      <label class="container">
          <input name="hyphen" type="checkbox" />
          <span class="checkmark"></span>
      </label>

    )
  }
}
