import React from 'react'

const Option = ({className, name, optionType, onOptionClick, optionChecked}) => {
  return (
    <label className={className}>
        <input name={name} type="checkbox" checked={optionChecked} onChange={(e)=>{onOptionClick(name, e)}}/>
        <span className={optionType}></span>
    </label>
  )
}

export default Option