import React from 'react'

const Word = ({onRemoveWord, wordId, onChangeWord, columnId, onClickSynonymnBtn}) => {
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

        {/* <label className={className}>
          <input name={name} type="checkbox" checked={optionChecked} onChange={()=>{onOptionClick(name, optionChecked)}}/>
          <span className={optionType}></span>
        </label> */}

        <button onClick={() => {onClickSynonymnBtn(wordId)}} className="synonymnbtn">s</button>
    </div>
  )
}

export default Word