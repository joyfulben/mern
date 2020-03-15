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
        <div className="everything">
          <div className="amiibo-index">
            <Wishlist mainList={this.props.mainList} wishList={this.props.wishList} />
            <ul className="ul-index d-flex flex-wrap">
            { this.props.mainList.map((amiibo, i) => {

            return (

              <li className={`index${i} li-index`} key={i} onDoubleClick={() => this.props.add(i)}>
                <img  src={`${amiibo.image}`} alt=''/>
                <p>{amiibo.character}</p>
              </li>

            )
            })}
            </ul>
          </div>
          <ul className="wishlist">
            { this.props.wishList.map((amiibo, i) => { return (
              <li className={`wish${i} `} key={i + ''} onClick={() => {
                this.props.delete(amiibo._id)
              }}>
              <img src={`${amiibo.image}`} alt='' />
              <p className="mx-auto">{amiibo.character}</p>
              <hr />
              </li>

          )
          })}
          </ul>
        </div>
      )
    }
  }
