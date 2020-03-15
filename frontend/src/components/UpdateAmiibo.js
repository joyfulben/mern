import React, {Component} from 'react'

  export default class Update extends Component {
    constructor () {
      super ()

      this.handleSubmit = this.handleSubmit.bind(this)

    }

    async handleSubmit (event) {
      event.preventDefault();

    try{
      let response = await fetch(this.props.baseURL + '/amiibos/' + this.props.id,
      {
          method: 'PUT', // Put, Delete. Only for a non-Get request
          body: JSON.stringify({character:this.props.character,type:this.props.type}),
          headers: {
              'Content-Type': 'application/json'
            }
          })
          let updatedamiibo = await response.json()
          this.props.handleAddAmiibo(updatedamiibo)
        }catch(e){
          console.error({'Error': e})
        }
      }


    render(){

      return (


      <div>
        <form className="float-right" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="character">Character Name</label>
            <input type="text" id="character" name="character" onChange={this.props.change} />
            <label htmlFor="type">Amiibo Type</label>
            <input type="text" id="type" name="type"
            onChange={this.props.change}/>
            <input type="submit" value="Update Amiibo" />
          </div>
        </form>
      </div>
      )
    }
  }
