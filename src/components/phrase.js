import React from "react"
// import ""

const Phrase = (props) =>{
      return (
      <div className="Modals">
        <p>Frase N°{props.index + 1}</p><br/>
        <p>{props.texto}</p>

      </div>
      )
  }

export default Phrase;
