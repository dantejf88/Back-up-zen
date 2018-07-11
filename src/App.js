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
        texto: "",
        loading: true,
        limit: false,
        meditating: false,
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
          sentence.push(response)
          this.setState({
            texto: sentence[i],
            loading:false,
            meditating:false
          })
        } else {
          this.setState({
            meditating:true
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
      texto: sentence[i],
      limit: false
    })

  }
  next = () => {
    i++
    this.setState({
      texto: sentence[i],
      limit: false
    })
  }

    render() {
      return (
    <div  className="App">
        {this.state.loading  &&
          <div className="LoadingContainer">
            <div className="spinner">
            </div>
            <p className="Meditating">Meditating</p>
          </div>
        }
        {this.state.meditating  &&
          <div className="MeditatingContainer">
            <div className="spinnerMeditating">
            </div>
            <p className="Meditating">Meditating</p>
          </div>
        }
        {!this.state.loading &&
          <div className="bigContainer">
            {this.state.limit &&
              <div className="limit">
                <p>That is all the wisdom you need, remember:</p>
                <p>Anything added dilutes everything else</p>
              </div>
            }
            <div className="buttonsContainer">
              {i >= 1 &&
                <div  className="previous">
                  <button className="buttons" onClick={this.previous}>Previous</button>
                </div>
              }
              {!(i === sentence.length-1) &&
                <div  className="next">
                  <button className="buttons" onClick={this.next}>Next</button>
                </div>
              }
            </div>
            <div className="middleContainer">
              <div>
                  <Phrase
                    className="phraseContainer"
                    texto={this.state.texto}
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
