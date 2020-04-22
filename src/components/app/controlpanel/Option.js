import React, { Component } from 'react'

export default class Option extends Component {
  render() {
    return (
      <label className="container">
          <input name="hyphen" type="checkbox" />
          <span className="checkmark"></span>
      </label>
    )
  }
}
