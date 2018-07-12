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
        text: "",
        limit: false,
        meditating: false,
        loading: true,
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
            text: sentence[i],
            meditating:false,
            loading: false
          })
        } else {
          this.setState({
            meditating: true
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

  }
  next = () => {
    i++
    this.setState({
      text: sentence[i],
      limit: false
    })
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

        <div className="firstBox">
        {this.state.meditating &&
          <div className="MeditatingContainer">
            <div className="spinnerMeditating">
            </div>
            <p className="Meditating">Meditating</p>
          </div>
        }
        {this.state.limit &&
          <div className="flexCenter">
              <p>That is all the wisdom you need, remember:</p>
              <p>Anything added dilutes everything else</p>
          </div>
        }
        </div>
        <div className="secondBox">
          <div className="secondBoxButtons">
            {!i >= 1 &&
                <button className="buttons" onClick={this.previous}>Previous</button>
            }
          </div>
          <div className="secondBoxText">
            <Phrase
                 className="phraseContainer"
                 text={this.state.text}
                 index={i}
            />
          </div>
          <div className="secondBoxButtons">
            {(i === sentence.length-1) &&
                <button className="buttons" onClick={this.next}>Next</button>
            }
          </div>
        </div>
        <div className="thirdBox">
          <div><button className="buttons" onClick={this.new}>Get more wisdom</button></div>
        </div>
      
      </div>

      )
    }

}



//   {this.state.loading &&
//   <div className="LoadingContainer">
//     <div className="spinner">
//     </div>
//     <p className="Meditating">Meditating</p>
//   </div>
//   }
//   {!this.state.loading &&
//   <div className="mainContainer">
//
//       <div className="MeditatingContainer" style={{opacity: this.state.meditating}}>
//         <div className="spinnerMeditating">
//         </div>
//         <p className="Meditating">Meditating</p>
//       </div>
//
//
//       <div className="limit" style={{opacity: this.state.limit}}>
//         <p>That is all the wisdom you need, remember:</p>
//         <p>Anything added dilutes everything else</p>
//       </div>
//
//     <div className="buttonsContainer">
//       {i >= 1 &&
//         <div  className="previous">
//           <button className="buttons" onClick={this.previous}>Previous</button>
//         </div>
//       }
//       {!(i === sentence.length-1) &&
//         <div  className="next">
//           <button className="buttons" onClick={this.next}>Next</button>
//         </div>
//       }
//     </div>
//     <div className="middleContainer">
//       <div>
//           <Phrase
//             className="phraseContainer"
//             text={this.state.text}
//             index={i}
//             />
//       </div>
//       <div  className="more">
//         <button className="buttons" onClick={this.new}>Get more wisdom</button>
//       </div>
//
//     </div>
//
//   </div>
// }
