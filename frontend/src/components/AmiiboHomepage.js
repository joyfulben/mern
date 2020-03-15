import React, {Component} from 'react'
import Update from './UpdateAmiibo.js'

  export default class AmiiboHomepage extends Component {
    constructor(props){
      super(props)
      this.state = {
        showEdit: false
      }
    }

    render(){
// console.log(this.props.wishList.indexOf(this.props.wishList[0]._id));
console.log(this.props.wishList[1]);
      return(
        <div className="everything">
          <div className="amiibo-index">
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
            {this.props.wishList.map((amiibo, i) => {

               return (

              <div className="d-flex">

                <li className={`wish${i} `} key={i + ''} onClick={() => {
                  this.props.delete(amiibo._id)
                }}>
                <img src={`${amiibo.image}`} alt='' />
                <p className="mx-auto">{amiibo.character}</p>
                <button>edit</button>

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
        </div>
      )
    }
  }
