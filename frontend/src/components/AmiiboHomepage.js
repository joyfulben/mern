import React, {Component} from 'react'
import Wishlist from './WishlistDisplay.js'
import ShowAmiibo from './ShowAmiibo.js'
  export default class AmiiboHomepage extends Component {
    constructor(props){
      super(props)
      this.state = {
        showEdit: false
      }
    }

    render(){
      return(
        <div className="everything">
          <div className="amiibo-index">
            <ul className="ul-index d-flex flex-wrap">
            { this.props.mainList.map((amiibo, i) => {

            return (

              <li className={`index${i} li-index`}
                key={i}
                onMouseOver={() => this.props.amiiboSniffer(amiibo)}
                onClick={this.props.toggleView}
                onDoubleClick={() => this.props.add(i)}>

                <img  src={`${amiibo.image}`} alt=''/>
                <p>{amiibo.character}</p>
              </li>

            )
            })}
            </ul>
          </div>
          {
            this.props.isHidden ?

            <ShowAmiibo amiiboShower={this.props.amiiboShower} />
            :
            <Wishlist
              wishList={this.props.wishList}
              change={this.props.change}
              id={this.props.id}
              baseURL={this.props.baseURL}
              handleAddAmiibo={this.props.handleAddAmiibo}
              character={this.props.character}
              type={this.props.type}

              toggleEdit={this.props.toggleEdit}
              delete={this.props.delete}
              editShow={this.props.editShow}
              />


          }

        </div>
      )
    }
  }
