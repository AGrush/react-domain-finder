import React, { Component } from 'react'
import WordsContainer from './App/WordsContainer'
import Option from './App/Option'
import { max_number, delay } from './helpers'
import Results from './App/Results'
import Popup from './App/Popup'
import axios from 'axios'
import ErrorPopup from './App/ErrorPopup'
import SearchButton from './App/SearchButton'
import Prefix from './App/Prefix'
import NumberOfWords from './App/NumberOfWords'
import Header from './App/Header'

export default class App extends Component {
  state = {
    prefix: "",
    words: 
    [
      { 
        word: "",
        id: 1,
        column: 1,
        selected: false,
        synonymns: {
          all:[],
          selected:[],
          loading: false
        }
      },
      { 
        word: "",
        id: 2,
        column: 2,
        selected: false,
        synonymns: {
          all:[],
          selected: [],
          loading: false
        }
      }
    ],
    options: {
      com: false,
      couk: false,
      hyphen: false,
      reverse: false
    },
    popup: {
      wordId: undefined,
      otherWords: [],
      selectedOtherWords: [],
      showPopup: false
    },
    errorPopup: {
      active: false,
      message: ''
    },
    loading: false
  }

  onRemoveWord = id => {
    //console.log('remove')
    const { words } = this.state;

    if(words.length < 2){
      this.setState({errorPopup: {active: true, message: 'you must have at least one word'}})
      return
    }

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
    const { words, popup } = this.state

    let showPopup = popup.showPopup;

    const newWords = words.map(word => {
      // eslint-disable-next-line
      if(word.id == e.target.id){
        if (word.word == ""){
          showPopup = false;
          return {...word, word: e.target.value, column: columnId, synonymns: { ...word.synonymns, selected: []} } 
        } else 
        return {...word, word: e.target.value, column: columnId } 
      } else {
        return word
      } 
    })

    this.setState ({words: newWords, popup: {...popup, showPopup}})
  } 

  onChangePrefix = (e) => {
    let newPrefix = e.target.value

    this.setState ({prefix: newPrefix})
  } 

  onOptionClick = (name, optionChecked) => {
    const { options } = this.state;

    //this.countTotalWords();

    const newOptions = { ...options, [name]: !optionChecked}
    
    this.setState ({options: newOptions})
  }

  combineWords() {
    const { words, options, prefix } = this.state
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

    if (Array.isArray(arrOne) && arrOne.length === 0){
      arrOne = arrOne.concat('')
    }
    if (Array.isArray(arrTwo) && arrTwo.length === 0){
      arrTwo = arrTwo.concat('')
    }

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

    //add the prefix
    combinedArr = combinedArr.map(i => prefix + i)

    // console.log('combinedArr =' + combinedArr)

   return combinedArr;
  }

  printResults = (results) => {
    //clear div
    document.querySelector('#availableDomains').innerHTML = '';

    results.forEach(result=>{
      const string = result.toString()
      
      //.COM FOUND
      if (string.includes('Domain Name')) {
        const newDiv = document.createElement('div')
        newDiv.classList.add('res')
        newDiv.classList.add('taken')
        document.querySelector('#availableDomains').appendChild(newDiv)
        //console.log('stringggggggg =========== ' + string + ' ============')
        const domainName = string.split('Domain Name: ')[1].split('Registry Domain ID:')[0]; 
        //console.log(domainName);
        newDiv.innerHTML = `<span>${domainName}</span>`
      } 
      
      if (string.includes('No match for')) {
        const newDiv = document.createElement('div')
        newDiv.classList.add('res')
        newDiv.classList.add('nottaken')
        document.querySelector('#availableDomains').appendChild(newDiv)
        //console.log('stringggggggg =========== ' + string + ' ============')
        const domainName = string.split('No match for "')[1].split('"')[0];
        //console.log(domainName);
        newDiv.innerHTML = `<span>${domainName}</span>`
      } 

      //.CO.UK FOUND
      if (string.includes('was able to match')) {
        
        const newDiv = document.createElement('div')
        newDiv.classList.add('res')
        newDiv.classList.add('taken')
        document.querySelector('#availableDomains').appendChild(newDiv)
        //console.log('stringggggggg =========== ' + string + ' ============')
        //const splitResponse = string.split('Domain name:').toString();
        console.log(string)

        const split1 = string.split('.co.uk');
        const split2 = split1[0].split('Domain name:')
        const domainName = split2[1] + '.co.uk'
        console.log(domainName);
        newDiv.innerHTML = `<span>${domainName}</span>`
      } 

      //.CO.UK ERROR
      if (string.includes('cannot be registered')) {
        
        const newDiv = document.createElement('div')
        newDiv.classList.add('res')
        newDiv.classList.add('cantexist')
        document.querySelector('#availableDomains').appendChild(newDiv)
        //console.log('stringggggggg =========== ' + string + ' ============')
        const split1 = string.split('.co.uk');
        const split2 = split1[0].split('Error for "')
        const domainName = split2[1] + '.co.uk'
        //console.log(domainName);
        newDiv.innerHTML = `<span>${domainName}</span>`
      } 

      //.CO.UK ERROR QUOTA
      if (string.includes('has been exceeded')) {
        
        const newDiv = document.createElement('div')
        newDiv.classList.add('res')
        newDiv.classList.add('noquota')
        document.querySelector('#availableDomains').appendChild(newDiv)
        //console.log('stringggggggg =========== ' + string + ' ============')
        const split1 = string.split('.co.uk');
        const split2 = split1[0].split('Error for "')
        const domainName = split2[1] + '.co.uk'
        //console.log(domainName);
        newDiv.innerHTML = `<span>${domainName}</span>`
      } 
    })
  }

  removeErrorMsg = async() => {
    await delay(1000);
    this.setState({errorPopup: {active: false, message: ''}});
  }

  onClickSynonymnBtn = (wordId, synonymnsSelected) => {
    const { words, popup } = this.state

    //console.log(synonymnsSelected)

    let theWord = ''
    
    words.map(word => {
      if(word.id === wordId){
        theWord = word.word
        this.errorLogic(word, wordId, theWord, synonymnsSelected, popup)
      } return null
    })
  }

  errorLogic = (word, wordId, theWord, synonymnsSelected, popup) => {
    if(theWord === ''){
        // console.log(word.synonymns.selected.length)
        if(word.synonymns.selected.length > 0){
          this.setState({popup: {...popup, showPopup: true, selectedOtherWords: synonymnsSelected}})
          return
        } 
        this.setState({errorPopup: {active: true, message: 'please enter a word'}})
        return
    } else {
      this.fetchSynonymns(theWord, wordId)
      .then(data => this.updateSynonymnState(wordId, data, synonymnsSelected))
      .catch(e => {console.log (e)});
    }
  }

  updateSynonymnState = (wordId, wordSynonymns, synonymnsSelected) => {
    let { words, popup: { showPopup }} = this.state

    if(wordSynonymns.length > 1){
      showPopup=true
    } else {
      this.setState({errorPopup: {active: true, message: 'no synonymns found'}})
      showPopup=false
    }
    // console.log(showPopup)

    const newWords = words.map(word => {
      // eslint-disable-next-line
      if(word.id == wordId){
        //TODO: potentially use Immer, immutability-helper, immutable-js
        return {...word, synonymns: { ...word.synonymns, all: wordSynonymns }} 
      } else {
        return word
      } 
    })

    this.setState ({words: newWords, popup: {otherWords: wordSynonymns, wordId: wordId, selectedOtherWords: synonymnsSelected, showPopup: showPopup}})
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

  onSelectAllOtherWords = (wordId) => {
    const { words, popup} = this.state
    let allSynonymns = ''

    const newWords = words.map(word => {
    
    // eslint-disable-next-line
    if(word.id == wordId){
        allSynonymns = word.synonymns.all
        return {...word, synonymns: { ...word.synonymns, selected: allSynonymns }} 
      } else {
        return word
      } 
    })

    this.setState ({words: newWords, popup: {...popup, selectedOtherWords: allSynonymns}})
  }

  onRemoveAllOtherWords = (wordId) => {
    const { words, popup} = this.state

    const newWords = words.map(word => {
    // eslint-disable-next-line
      if(word.id == wordId){
          return {...word, synonymns: { ...word.synonymns, selected: [] }} 
        } else {
          return word
      } 
    })

    this.setState ({words: newWords, popup: {...popup, selectedOtherWords: ''}})
  }

  fetchSynonymns = async(word, wordId) => {
    const { words } = this.state

    //set synonymn loading state
    const newWords = words.map(word => {
      // eslint-disable-next-line
      if(word.id == wordId){
        return {...word, synonymns: { ...word.synonymns, loading: true}} 
      } else {
        return word
      } 
    })
    this.setState ({words: newWords})

    const url = 'https://ag-domain-finder.herokuapp.com/domainfinder/synonyms/' + word;
    let synonymns = [];

    let res = await axios.get(url)
    //console.log(res.data.toString())
    let roughResults = res.data.toString().split(',')
    //console.log(roughResults)
    roughResults.forEach(result => {
      //we don't want multi word synonymns
      if(result.split(' ')[1] === undefined){
        synonymns.push(result)
      }
    })

    //set synonymn finished loading state
    const newWords2 = words.map(word => {
      // eslint-disable-next-line
      if(word.id == wordId){
        return {...word, synonymns: { ...word.synonymns, loading: false}} 
      } else {
        return word
      } 
    })
    this.setState ({words: newWords2})

    return synonymns;
  }

  fetchResponseAsync(final_urls) {
    const allDomains = [];
    this.setState({loading: true})

    Promise
      .all(final_urls.map(url => axios.get(url)))
      .then(results => {
        results.forEach(result => {
          allDomains.push(result.data)
        })
        this.setState({loading: false})
        return allDomains;
      })
      .then(allDomains => this.printResults(allDomains))
      .catch(e => console.log(e.message))
  };

  countTotalWords = () => {
    const { words, options } = this.state

    let leftColN = 0
    let rightColN = 0

    words.forEach(word => {
      if(word.column == 1){
        if(word.word.length > 0){
          leftColN ++
        } 
        leftColN = leftColN + word.synonymns.selected.length
      } else {
        if(word.word.length > 0){
          rightColN ++
        } 
        rightColN = rightColN + word.synonymns.selected.length
      }
    })

    let total = leftColN * rightColN

    if (rightColN >= 0 && leftColN == 0){
      total = rightColN
    }

    if (rightColN == 0 && leftColN >= 0){
      total = leftColN
    }

    if(options.com && options.couk){
      total = total*2
    }

    if(options.hyphen){
      total = total*2
    }

    if(options.reverse){
      total = total*2
    }
      
    return total
  }

  hidePopup = () => {
    const { popup } = this.state

    this.setState({popup: {...popup, showPopup: false}})
  }

  onSubmitForm = (e) => {
    let { popup, words, options } = this.state
    e.preventDefault();

    let anyWords = ""
    words.forEach(word => {
        anyWords = anyWords.concat(word.word)
    })

    if(anyWords === ''){
      this.setState({errorPopup: {active: true, message: 'please enter a word'}})
      return
    }

    if(options.com === false && options.couk === false){
      this.setState({errorPopup: {active: true, message: 'please choose .com or .co.uk'}})
      return
    }

    const urls = this.combineWords();

    //console.log(urls)
    //attach to my server call
    const final_urls = urls.map(url => {return 'https://ag-domain-finder.herokuapp.com/domainfinder/domain/' + url})

    //run all at once with promise.all
    this.fetchResponseAsync(final_urls);
    this.setState({popup: {...popup, showPopup: false}})
  }

  render() {
    this.countTotalWords();

    const { words } = this.state
    // eslint-disable-next-line
    const firstColWords = words.filter(word => word.column == 1)
    // eslint-disable-next-line
    const secondColWords = words.filter(word => word.column == 2)

    let totalWords = this.countTotalWords()
 
    // console.log(showPopup)
    return (
      <React.Fragment>
        <Header />
        <form id="form1" method="post" onSubmit={this.onSubmitForm}>
          <div className="wrapper">
              
              <Prefix 
                columnId="1" 
                heading="prefix"
                onChangePrefix={this.onChangePrefix}
              />

              <WordsContainer 
                columnId="1" 
                class="col1"
                heading="first half"
                onSubmitForm={this.onSubmitForm}
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
                onSubmitForm={this.onSubmitForm}
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
                <NumberOfWords numberOfWords={totalWords}/>
                
              </div>
          </div>

          <SearchButton loading={this.state.loading} />
        </form>
      
        <Popup 
          showPopup={this.state.popup.showPopup}
          wordId={this.state.popup.wordId}
          otherWords={this.state.popup.otherWords}
          selectedOtherWords={this.state.popup.selectedOtherWords}
          onSelectOtherWord={this.onSelectOtherWord}
          onSelectAllOtherWords={this.onSelectAllOtherWords}
          onRemoveAllOtherWords={this.onRemoveAllOtherWords}
          hidePopup={this.hidePopup}
        />

        <ErrorPopup 
          message={this.state.errorPopup.message}
          active={this.state.errorPopup.active}
          removeErrorMsg={this.removeErrorMsg}
        />

        <Results />
      </React.Fragment>
    )
  }
}



// window.onload = function(){
//   document.getElementById("1").value = "never";
//   //document.getElementById("2").value = "good";
//   //document.querySelector('.synonymnbtn').click();
// }