import React, {Component} from 'react'

  export default class Hidden extends Component {
    constructor () {
      super ()
      this.state = {
        key: false
      }

    }
     componentDidMount() {
       console.log(this.props.index);
       let dab = this.props.index
       this.setState({[`${dab}`]: false})
       this.props.stateGrabber([`${dab}`])

     }



    render(){

      return (


      <div >
      
        </div>

      )
    }
  }
