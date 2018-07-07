import React, { Component } from 'react'
import getZen from "./api/fetch-zen"
import "./App.css"

let sentence = []
let i = -1
class App extends Component {
  constructor() {
        super()
  this.state = {
        texto: []
        }
  }

  new =() => {
      getZen()
      .then((response) => {
        i = sentence.length
        console.log(i)
        sentence.push(response)
        this.setState({
          texto: sentence[i]
        })
      })
      console.log(sentence)
  }

  previous = () => {
    i--
    console.log(i)
    this.setState({
      texto: sentence[i]
    })

  }

  next = () => {
    i++
    console.log(i)
    this.setState({
      texto: sentence[i]
    })
  }

  componentWillMount(){
    this.new()
  }

    render() {
      return (
        <div className="App">

          {i >= 1 &&
          <button onClick={this.previous}>Anterior</button>
          }
            <div>
               <p>Frase N°{i+1}</p><br/>
              <p>{this.state.texto}</p>
              <button onClick={this.new}>Nueva</button>

            </div>
          {!(i === sentence.length-1) &&
          <button onClick={this.next}>Siguiente</button>
          }
        </div>
      );
    }
}

export default App
