import React from 'react'

const Option = ({className, name, optionType, onOptionClick}) => {
  return (
    <label className={className}>
        <input name={name} type="checkbox" onChange={(e)=>{onOptionClick(name, e)}}/>
        <span className={optionType}></span>
    </label>
  )
}

export default Option