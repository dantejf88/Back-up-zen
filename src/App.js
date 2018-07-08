import React, { Component } from 'react'
import getZen from "./api/fetch-zen"
import { RingLoader } from 'react-spinners'
import Phrase from "./components/phrase"
import "./App.css"

let sentence = []
let i = -1
class App extends Component {
  constructor() {
        super()
  this.state = {
        texto: "Alto texto",
        loading: false,
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
    // this.new()
  }

    render() {
      return (
        <div className="App">
          <div className='sweet-loading'>
             <RingLoader
               color={'#123abc'}
               loading={this.state.loading}
             />
        </div>
          {this.state.limit &&
            <div>
              <p>Esa es toda la sabiduría que necesitas</p>
            </div>
          }
          {i >= 1 &&
          <button onClick={this.previous}>Anterior</button>
          }
          {!this.state.loading &&
            <div>
               <Phrase
                    texto={this.state.texto}
                    index={i}
               />
               <button onClick={this.new}>Nueva</button>
            </div>
            }
          {!(i === sentence.length-1) &&
          <button onClick={this.next}>Siguiente</button>
          }
        </div>
      )
    }
}

export default App
