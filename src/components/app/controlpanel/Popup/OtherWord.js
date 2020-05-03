import React from 'react'

const OtherWord = ({otherWord, wordId, selectOtherWord}) => {

  return (
    <button onClick={() => {selectOtherWord(otherWord, wordId)}} >
      {otherWord}
    </button>
  )
}

export default OtherWord
