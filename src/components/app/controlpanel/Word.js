import React from 'react'

const Word = ({onRemoveWord, wordId, onChangeWord, columnId, onClickSynonymnBtn, synonymnsSelected}) => {


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

        <label className="label-synonymns">
          <input type="checkbox" checked={synonymnsSelected} onChange={()=>{onClickSynonymnBtn(wordId, synonymnsSelected)}}/>
          <span className="checkmark-synonymns"></span>
        </label>

        {/* <button onClick={() => {onClickSynonymnBtn(wordId)}} className="synonymnbtn">s</button> */}
    </div>
  )
}

export default Word