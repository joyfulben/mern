import React, {Component} from 'react'

  export default class Update extends Component {
    constructor () {
      super ()
      this.state = {
        id: ''
      }

    }

    render(){

      return (


      <div>
        <form className="float-right" onSubmit={this.props.submit(this.state.id)}>
          <div>
            <label htmlFor="character">Character Name</label>
            <input type="text" id="character" name="character" onChange={this.props.change} />
            <label htmlFor="type">Amiibo Type</label>
            <input type="text" id="type" name="type"
            onChange={this.props.change}/>
            <label htmlFor="id"></label>
            <input type="text" id="id" value={`${this.props.id}`} />
            <input type="submit" value="Update Amiibo" />
          </div>
        </form>
      </div>
      )
    }
  }
