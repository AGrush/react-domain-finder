import React from 'react'

const Prefix = ({onChangePrefix, heading}) => {

      //   columnId={this.props.columnId} 
      //   onRemoveWord={this.props.onRemoveWord} 
      //   onChangeWord={this.props.onChangeWord}
      //   onClickSynonymnBtn={this.props.onClickSynonymnBtn}
    return (
      <div className="col0">
        <p>{heading}</p>
          <div>
            <input 
              type="text" 
              // eslint-disable-next-line
              //required={wordId===1 && columnId==1}
              name="prefix" 
              placeholder="optional prefix"
              id="prefix" 
              onChange={(e) => onChangePrefix(e)} 
            /> 
            {/* <span className="deletebtn">-</span> */}
          </div>
      </div>
    )
}

export default Prefix