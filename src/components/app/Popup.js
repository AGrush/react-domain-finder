import React from 'react'
import OtherWord from './Popup/OtherWord'

const Popup = ({showPopup, wordId, otherWords, onSelectOtherWord, selectedOtherWords, onSelectAllOtherWords, onRemoveAllOtherWords, hidePopup}) => {
  let words
  if(otherWords !== undefined){

      words = otherWords.map(word => {
      let otherWordSelected = false;
  
      if(selectedOtherWords){
        if (selectedOtherWords.includes(word)){
          otherWordSelected = true;
        }
      }
      
      return (
        <OtherWord key={word} wordId={wordId} otherWord={word} onSelectOtherWord={onSelectOtherWord} otherWordSelected={otherWordSelected}/>
      )
    })
  }

  if (!showPopup) {
    return <span></span>;
  } else {
    return (
      <React.Fragment>
        <p className="popup-title">select synonymns:</p>
        <div className="popup-controls">
          <button onClick={() => {onSelectAllOtherWords(wordId)}}>ALL</button>
          <button onClick={() => {onRemoveAllOtherWords(wordId)}}>NONE</button>
          <button onClick={() => {hidePopup()}}>HIDE</button>
        </div>
        
        <div className="popup">
          {words}
        </div>
      </React.Fragment>
    )
  }
  
}

export default Popup