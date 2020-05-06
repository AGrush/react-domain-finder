import React from 'react'

const NumberOfWords = ({numberOfWords}) => {
  let dangerLevel = ''

  //this is 40* faster than a switch statement 
  if(numberOfWords < 1){
    dangerLevel = 'danger-0';
  } else
  if(numberOfWords < 500){
    dangerLevel = 'danger-none';
  } else
  if(numberOfWords < 1000){
    dangerLevel = 'danger-orange';
  } else
  if(numberOfWords > 1001){
    dangerLevel = 'danger-red';
  }


  return (
    <div className={`display-combinations ${dangerLevel}`}>Combinations: {numberOfWords}</div>
  )
}

export default NumberOfWords
