import React, { Component } from 'react'
import WordsContainer from './ControlPanel/WordsContainer'
import Option from './ControlPanel/Option'
import { max_number } from '../helpers'
import Results from './Results'
import axios from 'axios'

// window.onload = function(){
//   document.getElementById("1").value = "googl";
//   document.getElementById("2").value = "er";
//   document.getElementById("3").value = "ist";
//   document.getElementById("clickMe2").click();
// }

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
        status: true
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
    //words.push({ word: "", id: max_id+1, column:id})

    //set global words state object = to the local word object OR spread it in:
    this.setState ({ words: [...this.state.words, { word: "", id: max_id+1, column:id }]})
  }

  onChangeWord = (columnId, e) => {
    //console.log(columnId, e.target.id, e.target.value, [e.target.name]);

    const { words} = this.state

    const newWords = []

    words.map(word => {
      // eslint-disable-next-line
      if(word.id == e.target.id){
        //console.log(e.target.id, word.id);
        //TODO SPREAD OPERATOR STATE
        newWords.push( {"word" : e.target.value, "id" : word.id, column:columnId} ) 
      } else {
        newWords.push( {"word" : word.word, "id" : word.id, column: word.column} ) 
      } return null;
    })

    //console.log(newWords)

    //TODO spread prev state, this.setState({...this.state, isFetching: true});
    this.setState ({words: newWords})
  } 

  onOptionClick = (name, e) => {
    const { options } = this.state;

    const newOptions = []

    //TODO SPREAD OPERATOR STATE

    options.forEach(option => {
      if(option.name === name){
        newOptions.push( { "name": option.name, "status": !option.status } )
      } else {
        newOptions.push( { "name": option.name, "status": option.status } )
      } return null;
    })

    this.setState ({ options: newOptions})
  }

  combineWords() {
    const { words, options } = this.state
    let arrOne = []
    let arrTwo = []
    let domain = []
    let hyphen = false;
    let reverse = false;
    let combinedArr = [];
  

    words.forEach(word => {
      // eslint-disable-next-line
      if (word.column == 1){
        arrOne.push(word.word)
      } else 
      // eslint-disable-next-line
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
        default: break;
      }
    })
    
    // console.log('domain =' + domain)
    // console.log('hyphen =' + hyphen)
    // console.log('reverse =' + reverse)

    //combine first word array with second word array in every possible way FORWARDS
    for (let i = 0; i < arrOne.length; i++) {
        for (let j = 0; j < arrTwo.length; j++) {
            //for each type of domain, so .co.uk and .com FORWARDS
            // eslint-disable-next-line
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
        for (let ii = 0; ii < arrOne.length; ii++) {
            for (let jj = 0; jj < arrTwo.length; jj++) {
                //for each type of domain, so .co.uk and .com BACKWARDS
                // eslint-disable-next-line
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

  fetchSynonymns = (word) => {
    const url = 'https://ag-domain-finder.herokuapp.com/domainfinder/synonyms/' + word;
    let synonymns = [];

    axios.get(url)
      .then(results => {
        let roughResults = results.data.toString().split(',')
        roughResults.forEach(result => {
          //we don't want multi word synonymns
          if(result.split(' ')[1] === undefined){
            synonymns.push(result)
          }
        })
        console.log(synonymns)
      })
      .catch(e => console.log(e.message));
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
    this.fetchSynonymns('true')
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
                className="container4"
                optionType="checkmark-com"
                name="com"
              />
              <Option 
                onOptionClick={this.onOptionClick}
                optionChecked={true}
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
