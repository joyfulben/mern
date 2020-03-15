import React from 'react'
import Update from './UpdateAmiibo.js'
  export default class Wishlist extends React.Component {
    constructor(props){
      super(props)

    }



  render(){
    return(
      <ul className="wishlist">
        {this.props.wishList.map((amiibo, i) => {

           return (

          <div className="d-flex" key={i + ''}>

            <li className={`wish${i} `}  onClick={() => {
              this.props.delete(amiibo._id)
            }}>
            <img className="wish" src={`${amiibo.image}`} alt='' />
            <p className="mx-auto">{amiibo.character}</p>
            <button className="btn btn-outline-info btn-sm">edit</button>

            <hr />
            </li>
            <Update
            change={this.props.change}
            id={amiibo._id}
            baseURL={this.props.baseURL}
            handleAddAmiibo={this.props.handleAddAmiibo}
            character={this.props.character}
            type={this.props.type}
            key={amiibo._id}
             />
          </div>
      )
      })}
      </ul>
    )
  }
}
