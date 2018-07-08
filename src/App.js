import React, { Component } from 'react'
import getZen from "./api/fetch-zen"
import { RingLoader } from 'react-spinners'
import "./App.css"

let sentence = []
let i = -1
class App extends Component {
  constructor() {
        super()
  this.state = {
        texto: "",
        loading: true,
        limit: false
        }
  }

  new =() => {
    if(sentence.length <= 15){
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
               <p>Frase N°{i+1}</p><br/>
               <p>{this.state.texto}</p>
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
