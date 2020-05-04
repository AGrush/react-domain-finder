import React, { Component } from 'react'
import Word from './Word'

export default class WordsContainer extends Component {
  render() {
    const wordList = this.props.words.map(word => {
      const synonymnsSelected = word.synonymns.selected
      // console.log(synonymnsSelected)
      return (
        <Word 
          key={word.id} 
          wordId={word.id} 
          word={word.word}
          columnId={this.props.columnId} 
          onRemoveWord={this.props.onRemoveWord} 
          onChangeWord={this.props.onChangeWord}
          onClickSynonymnBtn={this.props.onClickSynonymnBtn}
          synonymnsSelected={synonymnsSelected || false}
          synonymnsLoading={word.synonymns.loading}
        />
      )
    })

    return (
      <div id={this.props.id} className={this.props.class}>
        <p>{this.props.heading}</p>
        {wordList}
        <span className="add" data={this.props.id} onClick={() => {this.props.onAddWord(parseInt(this.props.columnId, 10))}}>&#65291;</span>
      </div>
    )
  }
}