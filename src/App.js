import React, { Component } from 'react';
import getZen from "./api/fetch-zen"
import "./App.css"

let sentence = []
let i = -1
class App extends Component {
  constructor() {
        super();
  this.state = {
        texto: []
        }
  }

  new =() => {
      getZen()
      .then((response) => {
        i++
        console.log(i);
        sentence.push(response)
        this.setState({
          texto: sentence[sentence.length - 1]
        })
      })
      console.log(sentence);
  }

  previous = () => {
    i--;
    console.log(i);
    this.setState({
      texto: sentence[i]
    })

  }
  next = () => {
    i++
    console.log(i);
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

          {sentence.length > 1 &&
          <button onClick={this.previous}>Anterior</button>
          }
            <div>
              <p>{this.state.texto}</p>
              <button onClick={this.new}>Nueva</button>

            </div>
          <button onClick={this.next}>Siguiente</button>

        </div>
      );
    }
}

export default App;
