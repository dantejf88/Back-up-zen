import React from "react"
import "../App.css"

const Phrase = (props) =>{
      return (
      <div className="frases">
        <p>Zen precept N°{props.index + 1}</p>
        <p className="sentence">{props.texto}</p>

      </div>
      )
  }

export default Phrase;
