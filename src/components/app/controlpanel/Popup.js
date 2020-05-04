import React from 'react'
import OtherWord from './Popup/OtherWord'

const Popup = ({showPopup, wordId, otherWords, onSelectOtherWord, selectedOtherWords, onSelectAllOtherWords, updateStateOfSelectedOtherWords}) => {
  
  console.log(showPopup)

  const words = otherWords.map(word => {
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

  if (!showPopup) {
    return <span></span>;
  } else {
    return (
      <React.Fragment>
        <p className="popup-title">select synonymns:</p>
        <div className="popup">
          {words}
        </div>
        <br />
        <br />
        <button onClick={() => {onSelectAllOtherWords(wordId)}}>ALL</button>
        <br />
        <br />
        <button onClick={() => {updateStateOfSelectedOtherWords(wordId)}}>DONE</button>
      </React.Fragment>
    )
  }
  
}

export default Popup