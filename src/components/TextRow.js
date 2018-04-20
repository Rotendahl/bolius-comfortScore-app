import React, {
  Component
} from 'react';

import '../styles/overview.css'

class TextRow extends Component {
  render() {
    return(
      <div className="row">
      <div className="col-12" style={{padding: "5% 0%"}}>
        {this.props.text}
      </div>
    </div>
    )
  }
}

export default TextRow;
