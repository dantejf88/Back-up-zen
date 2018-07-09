import React from "react"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import "../App.css"

class Phrase extends React.Component {

  render() {
    return (
      <div className="phrases">
        <p className="title">Zen precept N°{this.props.index + 1}</p>
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={600}
          transitionLeaveTimeout={600}
        >
          <p className="sentence" key={this.props.texto}>{this.props.texto}</p>
        </ReactCSSTransitionGroup>
      </div>
      )
  }
}
export default Phrase;
