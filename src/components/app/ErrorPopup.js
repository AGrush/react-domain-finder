import React, { useEffect } from 'react'

const ErrorPopup = ({ message, active, removeErrorMsg}) => {
  useEffect(() => {
    if(active) {
       removeErrorMsg()
    }
  }, [active, removeErrorMsg])

  if(active){
    return (
      <div className="error-popup">
        <p>{message}</p>
      </div>
    )
  } else return <div></div>
}

export default ErrorPopup
