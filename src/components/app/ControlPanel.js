import React, { Component } from 'react'
import WordsContainer from './ControlPanel/WordsContainer'
import Option from './ControlPanel/Option'
import { max_number } from '../helpers'
import Results from './Results'
import axios from 'axios'


export default class ControlPanel extends Component {
  state = {
    words: [
      { 
        word: "",
        id: 1,
        column: 1
      },
      { 
        word: "",
        id: 2,
        column: 2
      }
    ],
    options: [
      {
        name: "com",
        status: false
      },
      {
        name: "couk",
        status: false
      },
      {
        name: "hyphen",
        status: false
      },
      {
        name: "reverse",
        status: false
      }
    ]
  }

  onRemoveWord = id => {
    //console.log('remove')
    const { words } = this.state;

    const updatedWords = words.filter(word => word.id !== id)
    
    this.setState ({ words: updatedWords})
  }

  onAddWord = id => {
    //console.log('add')
    //console.log(id)
    
    const { words} = this.state;

    //get an array of existing word ids
    const ids = this.state.words.map(word => word.id)

    //if no ids exist, set max_id to 0, otherwise set it to the max of the ids array.
    const max_id = max_number(ids)

    //add word to the local words array
    words.push({ word: "", id: max_id+1, column:id})

    //set global words state object = to the local word object
    this.setState ({ words: words})
  }

  onChangeWord = (columnId, e) => {
    //console.log(columnId, e.target.id, e.target.value, [e.target.name]);

    const { words} = this.state

    const newWords = []

    words.map(word => {
      // eslint-disable-next-line
      if(word.id == e.target.id){
        //console.log(e.target.id, word.id);
        newWords.push( {"word" : e.target.value, "id" : word.id, column:columnId} ) 
      } else {
        newWords.push( {"word" : word.word, "id" : word.id, column: word.column} ) 
      } return null;
    })

    //console.log(newWords)

    //TODO spread prev state, this.setState({...this.state, isFetching: true});
    this.setState ({ words: newWords})
  } 

  onOptionClick = (name, e) => {
    const { options } = this.state;

    const newOptions = []

    options.map(option => {
      if(option.name === name){
        newOptions.push( { "name": option.name, "status": !option.status } )
      } else {
        newOptions.push( { "name": option.name, "status": option.status } )
      } return null;
    })

    this.setState ({ options: newOptions})
  }

  fetchResponseAsync(FINAL_URLS) {
    Promise
      .all(FINAL_URLS.map(domain => axios.get(domain)))
      .then(results => console.log(results))
      .catch(e => console.log(e.message))
  };

  //combine all the inputted words in every way that user selected
  combineWords() {
    const { words, options } = this.state
    let arrOne = []
    let arrTwo = []
    let domain = []
    let hyphen = false;
    let reverse = false;
    let combinedArr = [];
  

    words.forEach(word => {
      if (word.column == 1){
        arrOne.push(word.word)
      } else 
      if (word.column == 2) {
        arrTwo.push(word.word)
      }
    })

    options.forEach(option => {
      switch(option.name) {
        case "com":
          if(option.status === true){
            domain.push('.com');
          }
        break;
        case "couk":
          if(option.status === true){
            domain.push('.co.uk');
          }
        break;
        case "hyphen":
          if(option.status === true){
            hyphen = true;
          }
        break;
        case "reverse":
          if(option.status === true){
            reverse = true;
          }
        break;
      }
    })
    
    // console.log('domain =' + domain)
    // console.log('hyphen =' + hyphen)
    // console.log('reverse =' + reverse)

    //combine first word array with second word array in every possible way FORWARDS
    for (var i = 0; i < arrOne.length; i++) {
        for (var j = 0; j < arrTwo.length; j++) {
            //for each type of domain, so .co.uk and .com FORWARDS
            domain.forEach(dom => {
                combinedArr.push(arrOne[i].concat(arrTwo[j]) + dom);
                if (hyphen) {
                    combinedArr.push((arrOne[i] + '-').concat(arrTwo[j]) + dom);
                }
            })
        }
    }

    if(reverse) {
        //combine first word array with second word array in every possible way BACKWARDS
        for (var ii = 0; ii < arrOne.length; ii++) {
            for (var jj = 0; jj < arrTwo.length; jj++) {
                //for each type of domain, so .co.uk and .com BACKWARDS
                domain.forEach(dom => {
                    combinedArr.push(arrTwo[jj].concat(arrOne[ii]) + dom);
                    if (hyphen) {
                        combinedArr.push((arrTwo[jj] + '-').concat(arrOne[ii]) + dom);
                    }
                })
            }
        }
    }

    //console.log('dcombinedArr =' + combinedArr)

   return combinedArr;
  }

  processForm = (e) => {
    e.preventDefault();

    const urls = this.combineWords();

    console.log(urls)
    //attach to my server call
    const FINAL_URLS = urls.map(url => {return 'https://ag-domain-finder.herokuapp.com/domainfinder/domain/' + url})

    //run all at once with promise.all
    this.fetchResponseAsync(FINAL_URLS);
  }

  render() {
    // eslint-disable-next-line
    const firstColWords = this.state.words.filter(word => word.column == 1)
    // eslint-disable-next-line
    const secondColWords = this.state.words.filter(word => word.column == 2)

    //console.log(secondColWords)

    return (
      <React.Fragment>
      <form id="form1" method="post" onSubmit={this.processForm}>
        <div className="wrapper">
            <WordsContainer 
              columnId="1" 
              class="col1"
              heading="first half"
              processForm={this.processForm}
              words={firstColWords}
              onRemoveWord={this.onRemoveWord} 
              onChangeWord={this.onChangeWord}
              onAddWord={this.onAddWord}
            />

            <Option 
              onOptionClick={this.onOptionClick}
              className="container"
              optionType="checkmark-hyphen"
              name="hyphen"
            />

            <WordsContainer 
              columnId="2" 
              class="col2"
              heading="second half"
              processForm={this.processForm}
              words={secondColWords}
              onRemoveWord={this.onRemoveWord} 
              onChangeWord={this.onChangeWord}
              onAddWord={this.onAddWord}
            />

            <div className="wrapper-options">
              <Option 
                onOptionClick={this.onOptionClick}
                optionRequired={true}
                className="container4"
                optionType="checkmark-com"
                name="com"
              />
              <Option 
                onOptionClick={this.onOptionClick}
                className="container5"
                optionType="checkmark-com"
                name="couk"
              />
              <Option 
                onOptionClick={this.onOptionClick}
                className="container6"
                optionType="checkmark-reverse"
                name="reverse"
              />
            </div>
        </div>
        <input id="clickMe2" type="image" alt="search button" src="https://img.icons8.com/plasticine/100/000000/search.png"></input>
      </form>

      <Results />
      </React.Fragment>
    )
  }
}
