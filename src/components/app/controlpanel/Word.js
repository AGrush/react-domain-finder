import React from 'react'

export default function Word() {
  return (
    <div>
      <input type="text" required="required" name="firstWord" id="firstWord" />
      <span onclick="removeFields()" class="deletebtn">-</span>
    </div>
  )
}
