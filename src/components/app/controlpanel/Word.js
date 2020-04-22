import React from 'react'

const Word = ({onRemoveWord, id, onChangeWord}) => {
  return (
    <div>
       <input 
          type="text" 
          /*required="required"*/ 
          name="word" 
          id={id} 
          onChange={(e) => {onChangeWord(e)}} 
        /> 
        <span onClick={() => {onRemoveWord(id)}} className="deletebtn">-</span>
    </div>
  )
}

export default Word