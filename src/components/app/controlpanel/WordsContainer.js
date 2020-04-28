import React, { Component } from 'react'
import Word from './Word'

export default class WordsContainer extends Component {
  render() {
    const wordList = this.props.words.map(word => {
      return (
        <Word 
          key={word.id} 
          wordId={word.id} 
          word={word.word}
          columnId={this.props.columnId} 
          onRemoveWord={this.props.onRemoveWord} 
          onChangeWord={this.props.onChangeWord}
        />
      )
    })

    return (
      <div id={this.props.id} className={this.props.class}>
        <p>{this.props.heading}</p>
        {wordList}
        <span className="add" data={this.props.id} onClick={() => {this.props.onAddWord(this.props.columnId)}}>&#65291;</span>
      </div>
    )
  }
}