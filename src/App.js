import React, { Component } from 'react'
import getZen from "./api/fetch-zen"
import Phrase from "./component/phrase"
import "./App.css"

let sentence = []
let i = -1
export default class App extends Component {
  constructor(props) {
        super(props)
  this.state = {
        loading: true,
        text: "",
        limit: false,
        meditating: 0,
        previousState: 0,
        nextState: 0
        }
  }
  componentWillMount(){
    this.new()
  }

  new =() => {
    if(sentence.length <= 13){
      getZen()
      .then((response) => {
        if(!sentence.includes(response)){
          i = sentence.length
          this.previousButton()
          this.nextButton()
          sentence.push(response)
          this.setState({
            text: sentence[i],
            meditating:0,
            opacity: 1,
            loading: false
          })
        } else {
          this.setState({
            meditating:1
          })
          this.new()
        }
      })
    } else {
      this.setState({
        limit: true
      })
    }
  }

  previous = () => {
    i--
    this.setState({
      text: sentence[i],
      limit: false
    })
  this.previousButton()
  this.nextButton()
  }
  next = () => {
    i++
    this.setState({
      text: sentence[i],
      limit: false
    })
    this.previousButton()
    this.nextButton()
  }
  previousButton = () => {
   if(i >= 1){
    this.setState({
      previousState: 1
    })
  } else {
    this.setState({
      previousState: 0
    })
  }
}
  nextButton = () => {
   if(!(i <= sentence.length)){
    this.setState({
      nextState: -1
    })
  } else {
    this.setState({
      nextState: 0
    })
  }
}

    render() {
      return (
    <div  className="App">
          {this.state.loading &&
          <div className="LoadingContainer">
            <div className="spinner">
            </div>
            <p className="Meditating">Meditating</p>
          </div>
          }
          {!this.state.loading &&
          <div className="bigContainer">

              <div className="MeditatingContainer" style={{opacity: this.state.meditating}}>
                <div className="spinnerMeditating">
                </div>
                <p className="Meditating">Meditating</p>
              </div>

            {this.state.limit &&
              <div className="limit">
                <p>That is all the wisdom you need, remember:</p>
                <p>Anything added dilutes everything else</p>
              </div>
            }
            <div className="buttonsContainer">

                <div  className="previous" style={{opacity: this.state.previousState}}>
                  <button className="buttons" onClick={this.previous}>Previous</button>
                </div>


                <div  className="next" style={{opacity: this.state.nextState}}>
                  <button className="buttons" onClick={this.next}>Next</button>
                </div>

            </div>
            <div className="middleContainer">
              <div>
                  <Phrase
                    className="phraseContainer"
                    text={this.state.text}
                    index={i}
                    />
              </div>
              <div  className="more">
                <button className="buttons" onClick={this.new}>Get more wisdom</button>
              </div>

            </div>

          </div>
        }
      </div>
      )
    }

}
