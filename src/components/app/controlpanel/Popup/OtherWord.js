import React from 'react'

const OtherWord = ({otherWord, wordId, onSelectOtherWord, otherWordSelected}) => {

  return (
    <label className="label-otherword">
      <input type="checkbox" checked={otherWordSelected} onChange={()=>{onSelectOtherWord(otherWord, wordId)}}/>
      <span className="checkmark-otherword">{otherWord}</span>
    </label>
  )
}

export default OtherWord
