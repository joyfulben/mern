import React, {Component} from 'react'
import Wishlist from './Wishlist.js'
  export default class AmiiboHomepage extends Component {
    constructor(props){
      super(props)

    }
    render(){
      return(
        <>

        <Wishlist mainList={this.props.mainList} wishList={this.props.wishList} />

        <ul>

        { this.props.mainList.map(amiibo => {

          return (

          <li key={this.props.mainList.indexOf(amiibo)}>
            <img src={amiibo.image} />
            <p>{amiibo.name}</p>
            {this.props.mainList.indexOf(amiibo)}
          </li>
          )
        })}

        </ul>

        </>
      )
    }
  }
