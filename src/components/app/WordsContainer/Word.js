import React from 'react'

const Word = ({onRemoveWord, wordId, onChangeWord, columnId, onClickSynonymnBtn, synonymnsSelected, synonymnsLoading}) => {
  // console.log('f' + synonymnsSelected)
  return (
    <div>
       <input 
          type="text" 
          // eslint-disable-next-line
          //required={wordId===1 && columnId==1}
          name="word" 
          placeholder="type a word"
          id={wordId} 
          onChange={(e) => onChangeWord(columnId, e)} 
        /> 
        <span onClick={() => {onRemoveWord(wordId)}} className="deletebtn">-</span>

        <label className="label-synonymns">
          <input type="checkbox" checked={synonymnsSelected.toString()} onChange={()=>{onClickSynonymnBtn(wordId, synonymnsSelected)}}/>
          <span className={`checkmark-synonymns loaded-${synonymnsLoading}`}></span>
        </label>
    </div>
  )
}

export default Word