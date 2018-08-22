import React, {
  Component
} from 'react';

import '../styles/overview.css'

class TextRow extends Component {
  render() {
    return(
      <p>{this.props.text}</p>
    )
  }
}

export default TextRow;
