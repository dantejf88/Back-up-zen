import React, { Component } from 'react'
import getZen from "./api/fetch-zen"
import { RingLoader } from 'react-spinners'
import { Button, ButtonToolbar } from "react-bootstrap"
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
        limit: false
        }
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
            loading:false
          })
        } else {
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
  componentWillMount(){
    this.new()
  }

    render() {
      return (
    <div  className="App">
        {this.state.loading &&
        <div className='sweet-loading Spinner-css'>
          <RingLoader
            color={'#123abc'}
            loading={this.state.loading}
            />
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
                  <ButtonToolbar>
                    <Button
                      onClick={this.previous}
                      disabled={this.state.loading}
                      bsSize="large">
                      Previous</Button>
                  </ButtonToolbar>
                </div>
              }
              {!(i === sentence.length-1) &&
                <div  className="next">
                  <ButtonToolbar>
                    <Button
                      onClick={this.next}
                      disabled={this.state.loading}
                      bsSize="large">
                      Next</Button>
                  </ButtonToolbar>
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
                <ButtonToolbar>
                  <Button
                    onClick={this.new}
                    disabled={this.state.loading}
                    bsSize="large">
                    Press for more wisdom</Button>
                </ButtonToolbar>
              </div>

            </div>

          </div>
      }
      </div>
      )
    }

}
