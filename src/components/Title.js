import React, {
  Component
} from 'react';

import '../styles/overview.css'

class Title extends Component {
  render() {
    return(
      <div className="row">
          <h3>{this.props.title}</h3>
        </div>
    )
  }
}

export default Title;