import React, { Component } from 'react'
import WordsContainer from './ControlPanel/WordsContainer'
import Option from './ControlPanel/Option'
import { max_number } from '../helpers'
import Results from './Results'
import Popup from './ControlPanel/Popup'
import axios from 'axios'


window.onload = function(){
  document.getElementById("1").value = "dog";
  document.getElementById("2").value = "good";
  //document.querySelector('.synonymnbtn').click();
}

export default class ControlPanel extends Component {
  state = {
    words: 
    [
      { 
        word: "dog",
        id: 1,
        column: 1,
        synonymns: {
          all:[],
          selected:[],
          noneFound: false
        }
      },
      { 
        word: "good",
        id: 2,
        column: 2,
        synonymns: {
          all:[],
          selected: [],
          noneFound: false
        }
      }
    ],
    options: {
      com: true,
      couk: false,
      hyphen: false,
      reverse: false
    },
    popup: {
      wordId: undefined,
      otherWords: [],
      selectedOtherWords: []
    }
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
    //words.push({ word: "", id: max_id+1, column:id})

    //set global words state object = to the local word object OR spread it in:
    this.setState ({ words: [...words, { word: "", id: max_id+1, column:id, synonymns: {all:[], selected:[]} }]})
  }

  onChangeWord = (columnId, e) => {
    //console.log(columnId, e.target.id, e.target.value, [e.target.name]);
    const { words } = this.state

    const newWords = words.map(word => {
      if(word.id == e.target.id){
        return {...word, word: e.target.value, column: columnId } 
      } else {
        return word
      } 
    })

    this.setState ({words: newWords})
  } 

  onOptionClick = (name, optionChecked) => {
    const { options } = this.state;

    const newOptions = { ...options, [name]: !optionChecked}
    
    this.setState ({options: newOptions})
  }

  combineWords() {
    const { words, options } = this.state
    let arrOne = []
    let arrTwo = []
    let domain = []
    let combinedArr = [];

    words.forEach(word => {
      // eslint-disable-next-line
      if (word.column == 1){
        arrOne.push(word.word)
        arrOne = arrOne.concat(word.synonymns.selected)
      } else
      // eslint-disable-next-line
      if (word.column == 2) {
        arrTwo.push(word.word)
        // console.log(arrTwo)
        // console.log(word.synonymns.selected)
        arrTwo = arrTwo.concat(word.synonymns.selected)
        // console.log(arrTwo)
      }
    })

    //console.log(arrTwo)

    if(options.com === true) {
      domain.push('.com');
    }
    if(options.couk === true){
      domain.push('.co.uk');
    }

    //combine first word array with second word array in every possible way FORWARDS
    for (let i = 0; i < arrOne.length; i++) {
        for (let j = 0; j < arrTwo.length; j++) {
            //for each type of domain, so .co.uk and .com FORWARDS
            // eslint-disable-next-line
            domain.forEach(dom => {
                combinedArr.push(arrOne[i].concat(arrTwo[j]) + dom);
                if (options.hyphen) {
                    combinedArr.push((arrOne[i] + '-').concat(arrTwo[j]) + dom);
                }
            })
        }
    }

    if(options.reverse) {
        //combine first word array with second word array in every possible way BACKWARDS
        for (let ii = 0; ii < arrOne.length; ii++) {
            for (let jj = 0; jj < arrTwo.length; jj++) {
                //for each type of domain, so .co.uk and .com BACKWARDS
                // eslint-disable-next-line
                domain.forEach(dom => {
                    combinedArr.push(arrTwo[jj].concat(arrOne[ii]) + dom);
                    if (options.hyphen) {
                        combinedArr.push((arrTwo[jj] + '-').concat(arrOne[ii]) + dom);
                    }
                })
            }
        }
    }

    //console.log('combinedArr =' + combinedArr)

   return combinedArr;
  }

  printResults = (results) => {
    //clear div
    document.querySelector('#availableDomains').innerHTML = '';

    results.forEach(result=>{
      const string = result.toString()
      //console.log(string)
      
      //.COM
      if (string.includes('Domain Name')) {
        const newDiv = document.createElement('div')
        newDiv.classList.add('res')
        newDiv.classList.add('dontexist')
        document.querySelector('#availableDomains').appendChild(newDiv)
        //console.log('stringggggggg =========== ' + string + ' ============')
        const domain = string.split('Domain Name: ')[1].split('Registry Domain ID:')[0]; 
        newDiv.innerHTML = `<span>${domain}</span>`
      } 
      
      if (string.includes('No match for')) {
        const newDiv = document.createElement('div')
        newDiv.classList.add('res')
        newDiv.classList.add('exist')
        document.querySelector('#availableDomains').appendChild(newDiv)
        //console.log('stringggggggg =========== ' + string + ' ============')
        const domainName = string.split('No match for "')[1].split('"')[0];
        newDiv.innerHTML = `<span>${domainName}</span>`
      } 

      //.CO.UK
      if (string.includes('was able to match')) {
        
        const newDiv = document.createElement('div')
        newDiv.classList.add('res')
        newDiv.classList.add('dontexist')
        document.querySelector('#availableDomains').appendChild(newDiv)
        //console.log('stringggggggg =========== ' + string + ' ============')
        const domainName = string.split('Domain name:')[1].split('Data validation:')[0];
        newDiv.innerHTML = `<span>${domainName}</span>`
        //this.setState=({...state, domain = domainName, taken = 0})
      } 
    })
  }

  onClickSynonymnBtn = (wordId, synonymnsSelected) => {
    const { words } = this.state

    //console.log(synonymnsSelected)

    let theWord = ''
    
    words.map(word => {
      if(word.id === wordId){
        theWord = word.word
      }
    })

    //console.log(theWord)

    this.fetchSynonymns(theWord)
      .then(data => this.updateSynonymnState(wordId, data, synonymnsSelected))
  }

  updateSynonymnState = (wordId, wordSynonymns, synonymnsSelected) => {
    const { words, popup } = this.state

    const newWords = words.map(word => {
      // eslint-disable-next-line
      if(word.id == wordId){
        //TODO: potentially use Immer, immutability-helper, immutable-js
        return {...word, synonymns: { ...word.synonymns, all: wordSynonymns }} 
      } else {
        return word
      } 
    })

    this.setState ({words: newWords, popup: {otherWords: wordSynonymns, wordId: wordId, selectedOtherWords: synonymnsSelected}})
  }

  onSelectOtherWord = (otherWord, wordId) => {
    const { words, popup} = this.state

    //find old synonymns
    let oldSelectedSynonymns = []
    words.forEach(word=>{if(word.id===wordId){oldSelectedSynonymns = word.synonymns.selected}})


    //get combined synonymns if the new word doesnt exist
    let newSelectedSynonymns = '';
    if(!oldSelectedSynonymns.includes(otherWord)){
      newSelectedSynonymns = oldSelectedSynonymns.concat(otherWord)
    } else {
      newSelectedSynonymns = oldSelectedSynonymns.filter(word => word !== otherWord)
    }

    // console.log(oldSelectedSynonymns)
    // console.log(newSelectedSynonymns)

    const newWords = words.map(word => {
      // eslint-disable-next-line
      if(word.id == wordId){
        //TODO: potentially use Immer, immutability-helper, immutable-js
        return {...word, synonymns: { ...word.synonymns, selected: newSelectedSynonymns }} 
      } else {
        return word
      } 
    })

    this.setState ({words: newWords, popup: {...popup, selectedOtherWords: newSelectedSynonymns}})
  }

  onSelectAllOtherWords = (otherWord, wordId) => {
    /*
      select all popup.otherWords and add them to word with wordId's synonymns selected array
    */

  }

  updateStateOfSelectedOtherWords = (otherWord, wordId) => {
    /*
      add selected words to the 
    */

  }

  fetchSynonymns = async(word) => {
    const url = 'https://ag-domain-finder.herokuapp.com/domainfinder/synonyms/' + word;
    let synonymns = [];

    let res = await axios.get(url)
    let roughResults = res.data.toString().split(',')
    roughResults.forEach(result => {
      //we don't want multi word synonymns
      if(result.split(' ')[1] === undefined){
        synonymns.push(result)
      }
    })

    return synonymns;
  }

  fetchResponseAsync(final_urls) {
    const allDomains = [];

    Promise
      .all(final_urls.map(url => axios.get(url)))
      .then(results => {
        results.forEach(result => {
          allDomains.push(result.data)
        })

        return allDomains;
      })
      .then(allDomains => this.printResults(allDomains))
      .catch(e => console.log(e.message))
  };

  processForm = (e) => {
    e.preventDefault();

    const urls = this.combineWords();

    //console.log(urls)
    //attach to my server call
    const final_urls = urls.map(url => {return 'https://ag-domain-finder.herokuapp.com/domainfinder/domain/' + url})

    //run all at once with promise.all
    this.fetchResponseAsync(final_urls);
    
  }

  render() {
    const { words } = this.state
    // eslint-disable-next-line
    const firstColWords = words.filter(word => word.column == 1)
    // eslint-disable-next-line
    const secondColWords = words.filter(word => word.column == 2)

    const synonymnExist = words.filter(word => word.synonymns.all.some(x => x.length > 0))
    let showPopup = false
    if(typeof synonymnExist[0] !== 'undefined'){showPopup=true}
 
    // console.log(showPopup)
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
              onClickSynonymnBtn={this.onClickSynonymnBtn}
              onAddWord={this.onAddWord}
            />

            <Option 
              onOptionClick={this.onOptionClick}
              optionChecked={this.state.options.hyphen}
              className="label-hyphen"
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
              onClickSynonymnBtn={this.onClickSynonymnBtn}
              onAddWord={this.onAddWord}
            />

            <div className="wrapper-options">
              <Option 
                onOptionClick={this.onOptionClick}
                optionChecked={this.state.options.com}
                className="label-com"
                optionType="checkmark-com"
                name="com"
              />
              <Option 
                onOptionClick={this.onOptionClick}
                optionChecked={this.state.options.couk}
                className="label-couk"
                optionType="checkmark-com"
                name="couk"
              />
              <Option 
                onOptionClick={this.onOptionClick}
                optionChecked={this.state.options.reverse}
                className="label-reverse"
                optionType="checkmark-reverse"
                name="reverse"
              />
            </div>
        </div>
        <input id="clickMe2" type="image" alt="search button" src="https://img.icons8.com/plasticine/100/000000/search.png"></input>
      </form>
    
      <Popup 
        showPopup={showPopup}
        wordId={this.state.popup.wordId}
        otherWords={this.state.popup.otherWords}
        selectedOtherWords={this.state.popup.selectedOtherWords}
        onSelectOtherWord={this.onSelectOtherWord}
        onSelectAllOtherWords={this.onSelectAllOtherWords}
        updateStateOfSelectedOtherWords={this.updateStateOfSelectedOtherWords}
        
      />

      <Results />
      </React.Fragment>
    )
  }
}
