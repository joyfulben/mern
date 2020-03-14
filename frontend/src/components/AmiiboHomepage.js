import React, {Component} from 'react'
import Wishlist from './Wishlist.js'

  export default class AmiiboHomepage extends Component {
    constructor(props){
      super(props)
      this.state = {
        showSlide: false
      }
    }
    render(){
      return(
        <div className="d-flex">
        <div className="amiibo-index">
        <Wishlist mainList={this.props.mainList} wishList={this.props.wishList} />
        <ul className="d-flex flex-wrap">
        { this.props.mainList.map((amiibo, i) => {

          return (
            <li key={i} onDoubleClick={() => this.props.add(i)}>
              <img  src={`${amiibo.image}`} alt=''/>
              <p>{amiibo.character}</p>
            </li>
        )
        })}
        </ul>
        </div>
        <ul className="wishlist">
        { this.props.wishList.map((amiibo, i) => { return (
            <li className={`wish${i} list-group-item`} key={i + ''} onClick={() => {
              this.props.delete(amiibo._id)
            }}>
            <img src={`${amiibo.image}`} alt='' />
            <p>{amiibo.character}</p>
            </li>
          )
        })}
        </ul>
        </div>
      )
    }
  }
