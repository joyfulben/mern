import React from 'react'
import Update from './UpdateAmiibo.js'
  export default class Wishlist extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        edit: false
      }
      this.toggleEdit = this.toggleEdit.bind(this)
    }


  toggleEdit() {
    this.setState({
      edit: !this.state.edit
    })
  }
  render(){
    return(
      <ul className="wishlist">
        {this.props.wishList.map((amiibo, i) => {

           return (

          <div className="d-flex" key={i + ''}>

            <li className={`wish${i} `}>
            <img className="wish" src={`${amiibo.image}`} alt='' />
            <p className="mx-auto">{amiibo.character}</p>
            <button onClick={this.toggleEdit} className="btn btn-outline-info btn-sm">edit</button>
            <button onClick={() => {
              this.props.delete(amiibo._id)}}>DELETE</button>

            <hr />
            </li>
            {this.state.edit ?
            <Update
            change={this.props.change}
            id={amiibo._id}
            baseURL={this.props.baseURL}
            handleAddAmiibo={this.props.handleAddAmiibo}
            character={this.props.character}
            type={this.props.type}
            key={amiibo._id}
             />
             : null
           }
          </div>
      )
      })}
      </ul>
    )
  }
}
