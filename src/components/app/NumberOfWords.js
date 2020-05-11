import React from 'react'

const NumberOfWords = ({numberOfWords}) => {
  let dangerLevel = ''

  //40* faster than a switch statement 
  if(numberOfWords < 1){
    dangerLevel = 'danger-0';
  } else
  if(numberOfWords < 900){
    dangerLevel = 'danger-none';
  } else
  if(numberOfWords < 1300){
    dangerLevel = 'danger-orange';
  } else
  if(numberOfWords > 1299){
    dangerLevel = 'danger-red';
  }


  return (
    <div className={`display-combinations ${dangerLevel}`}>Combinations: {numberOfWords}</div>
  )
}

export default NumberOfWords
