import React from 'react'

const Option = ({className, name, optionType, onOptionClick, optionChecked}) => {
  return (
    <label className={className}>
        <input name={name} type="checkbox" checked={optionChecked} onChange={()=>{onOptionClick(name, optionChecked)}}/>
        <span className={optionType}></span>
    </label>
  )
}

export default Option