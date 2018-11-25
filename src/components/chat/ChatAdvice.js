import React from 'react'
import { connect } from 'react-redux'

const tips = [
  `enter "//T" for translation prompt`,
  `enter "//C #" to close a certain chat window`,
  `enter "//L" for transcribe prompt`,
  `press "Esc" to remove prompts and/or clear text field`,
  `click main background and press "tab" to type`,
  `enter "//C all" to close all chat windows`
];

class ChatAdvice extends React.PureComponent {

  state = {
    tip: "",
  };

  componentDidMount() {
    
    this.setState({ tip: tips[Math.floor(Math.random() * tips.length)] }, () =>
      console.log(this.state)
    );
    
    this.interval = setInterval(this.renderTips, 60000);
  }

  componentDidUpdate(prevProps, prevState) {

    if ((this.props.translation || this.props.transcription) && prevState.tip !== tips[3]) {
      this.setState({ tip: tips[3] });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderTips = () => {
    this.setState({ tip: tips[Math.floor(Math.random() * tips.length)] }, () =>
      console.log(this.state)
    );
  };

  render() {
    return (
      <div className="tip-container">
        <h1 className="tip">{this.state.tip}</h1>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    translation: state.appState.translation,
    transcription: state.appState.transcription,
  }
}


export default connect(mapStateToProps)(ChatAdvice)