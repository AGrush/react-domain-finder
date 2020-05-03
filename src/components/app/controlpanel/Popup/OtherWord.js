import React from 'react'

const OtherWord = ({otherWord, wordId, selectOtherWord}) => {

  return (
    <label className="label-otherword">
      <input type="checkbox" onChange={()=>{selectOtherWord(otherWord, wordId)}}/>
      <span className="checkmark-otherword">{otherWord}</span>
    </label>
  )
}

export default OtherWord
