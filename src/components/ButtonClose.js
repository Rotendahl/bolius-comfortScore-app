import React, {
  Component
} from 'react';

class ButtonClose extends Component {
  constructor(props) {
      super(props);

      this.startOver = this.startOver.bind(this);
  }

  startOver() {
      var goNext = this.props.history.push;
      goNext('/');
  }

  render() {
    return(
        <button className="btn btn-primary comfortscore-btn comfortscore-btn-close" onClick={this.startOver}>Luk</button>
    )
  }
}

export default ButtonClose;
