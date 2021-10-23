import React, { Component } from 'react'
import QrReader from 'react-qr-reader'

import styles from './style.module.scss';
 
class Scan extends Component {
  constructor(props){
    super(props);
    this.state = {
      result: 'No result'
    }
  }
 
  handleScan = data => {
    if (data) {
      // this.setState({
      //   result: data
      // })
      alert(data)
    }
  }
  handleError = err => {
    console.error(err)
  }

  render() {
    return (
      <div className={[styles.scan, this.props.newClass ? styles[this.props.newClass] : null ].join(' ')} >
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
      </div>
    )
  }
}

export default Scan;