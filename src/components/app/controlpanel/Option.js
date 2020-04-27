import React from 'react'

const Option = ({className, name, optionType, onOptionClick, optionRequired}) => {
  return (
    <label className={className}>
        <input name={name} type="checkbox" required={optionRequired} onChange={(e)=>{onOptionClick(name, e)}}/>
        <span className={optionType}></span>
    </label>
  )
}

export default Option