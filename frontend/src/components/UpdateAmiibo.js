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
let id = this.props.id
      return (


      <div className="mario">
        <form  onSubmit={this.handleSubmit}>
          <div class="form-group">
            <label htmlFor="character"></label>
            <input class="input form-control form-control-sm" placeholder="Character Name" type="text" id="character" name="character" onChange={this.props.change} />
            <label htmlFor="type"></label>
            <input class="input form-control form-control-sm"
            placeholder="Amiibo Type" type="text" id="type" name="type"
            onChange={this.props.change}/>
            <input type="submit" value="Update Amiibo" />
          </div>
        </form>
      </div>
      )
    }
  }
