import React from 'react'

const Word = ({onRemoveWord, wordId, onChangeWord, columnId}) => {
  return (
    <div>
       <input 
          type="text" 
          // eslint-disable-next-line
          required={wordId===1 && columnId==1}
          name="word" 
          id={wordId} 
          onChange={(e) => onChangeWord(columnId, e)} 
        /> 
        <span onClick={() => {onRemoveWord(wordId)}} className="deletebtn">-</span>
    </div>
  )
}

export default Word