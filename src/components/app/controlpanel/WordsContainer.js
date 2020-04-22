import React, { Component } from 'react'
import Word from './Word'
import { max_number } from '../../helpers'

export default class WordsContainer extends Component {
  state = {
    words: [
      { 
        word: "",
        id: 1
      }
    ]
  }

  onRemoveWord = id => {
    console.log('remove')
    const { words } = this.state;
    const updatedWords = words.filter(word => word.id !== id)
    this.setState ({ words: updatedWords})
  }

  onAddWord = () => {
    console.log('add')
    
    const { words} = this.state;

    //get an array of existing word ids
    const ids = this.state.words.map(word => word.id)

    //if no ids exist, set max_id to 0, otherwise set it to the max of the ids array.
    const max_id = max_number(ids)

    //add to the local words array
    words.push({ word: "", id: max_id+1})

    //set global words state object to the local word object
    this.setState ({ words: words})
  }

  onChangeWord = (e) => {
    //console.log(e.target.id, e.target.value, [e.target.name]);
    const { words} = this.state;

    const newWords = []
    words.map(word => {
      if(word.id == e.target.id){
        newWords.push( {"word" : e.target.value, "id" : word.id} ) 
      } else {
        newWords.push( {"word" : word.word, "id" : word.id} ) 
      }
    })

    // console.log(newWords)
    this.setState ({ words: newWords})
  } 

  render() {
    const wordList = this.state.words.map(word => {
      return (
        <Word 
          key={word.id} 
          id={word.id} 
          word={word.word}
          data-word-container={this.props.id} 
          onRemoveWord={this.onRemoveWord} 
          onChangeWord={this.onChangeWord}
        />
      )
    })

    return (
      <div id={this.props.id}>
        <p>first half</p>
        {wordList}
        <span className="add" data={this.props.id} onClick={this.onAddWord}>&nbsp;&nbsp;&nbsp; &#65291; &nbsp;&nbsp;&nbsp;</span>
      </div>
    )
  }
}