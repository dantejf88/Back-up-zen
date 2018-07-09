import React, { Component } from 'react'
import getZen from "./api/fetch-zen"
import { RingLoader } from 'react-spinners'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Button, ButtonToolbar } from "react-bootstrap"
import Phrase from "./component/phrase"
import "./App.css"

let sentence = []
let i = -1
class App extends Component {
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
          console.log(i)
          sentence.push(response)
          this.setState({
            texto: sentence[i],
            loading:false
          })
          console.log(sentence)
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
    console.log(i)
    this.setState({
      texto: sentence[i],
      limit: false
    })

  }

  next = () => {
    i++
    console.log(i)
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
              <div>
                <p>That is all the wisdom you need, remember:</p>
                <p>Anything added dilutes everything else</p>
              </div>
            }
            <div className="midleContainer">

              {i >= 1 &&
                <div  className="previous">
                  <ButtonToolbar>
                    <Button
                      onClick={this.previous}
                      disabled={this.state.loading}
                      bsSize="large">
                      Previous Idea</Button>
                  </ButtonToolbar>
                </div>
              }

              <div className="litleContainer">
                <ReactCSSTransitionGroup
                  transitionName="fade"
                  transitionAppear={true}
                  transitionAppearTimeout={500}
                  transitionEnterTimeout={3000}
                  transitionLeaveTimeout={3000}
                  >
                  <Phrase
                    texto={this.state.texto}
                    index={i}
                    key={this.state.texto}
                    />
                </ReactCSSTransitionGroup>
              </div>
              {!(i === sentence.length-1) &&
                <div>
                  <ButtonToolbar className="next">
                    <Button
                      onClick={this.next}
                      disabled={this.state.loading}
                      bsSize="large">
                      Next Idea</Button>
                  </ButtonToolbar>
                </div>
              }
            </div>

              <div  className="more">
                <ButtonToolbar>
                  <Button
                    block
                    onClick={this.new}
                    disabled={this.state.loading}
                    bsSize="large">
                  More wisdom</Button>
                </ButtonToolbar>
              </div>

          </div>
      }
      </div>
      )
    }

}

export default App
