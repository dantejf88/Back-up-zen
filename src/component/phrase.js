import React from "react"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import PropTypes from 'prop-types';
import "../App.css"

class Phrase extends React.Component {

  render() {
    return (
      <div className="phrases">
        <p className="title">Zen precept N°{this.props.index + 1}</p>
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
        >
          <p className="sentence" key={this.props.text}>{this.props.text}</p>
        </ReactCSSTransitionGroup>
      </div>
      )
  }
}

Phrase.propTypes = {
  text: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
}
export default Phrase;
