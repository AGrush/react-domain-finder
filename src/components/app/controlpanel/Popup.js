import React from 'react'
import OtherWord from './Popup/OtherWord'

const Popup = ({showPopup, wordId, otherWords, selectOtherWord, selectAllOtherWords, updateStateOfSelectedOtherWords}) => {
  const words = otherWords.map(word => {
    return (
      <OtherWord key={word} wordId={wordId} otherWord={word} selectOtherWord={selectOtherWord}/>
    )
  })

  if (!showPopup) {
    return <span></span>;
  } else {
    return (
      
      <div>
        <p>Select Synonymns:</p>
        {words}
        <br />
        <br />
        <button onClick={() => {selectAllOtherWords(wordId)}}>ALL</button>
        <br />
        <br />
        <button onClick={() => {updateStateOfSelectedOtherWords(wordId)}}>DONE</button>
      </div>
      
    )
  }
  
}

export default Popup