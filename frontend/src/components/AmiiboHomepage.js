import React, {Component} from 'react'
import Wishlist from './Wishlist.js'
  export default class AmiiboHomepage extends Component {
    constructor(props){
      super(props)
      this.state = {
        wishlist: [],
        character: '',
        gameSeries: '',
        image: '',
        type: ''
      }
    }

    async addToList (i) {
      try{
        let response = await fetch(this.props.baseURL + '/amiibos', {
          method: 'POST',

          body: JSON.stringify({
            character: this.props.mainList[i].character,
            gameSeries: this.props.mainList[i].gameSeries,
            image: this.props.mainList[i].image,
            type: this.props.mainList[i].type
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        let data = await response.json()
        this.props.handleAdd2Wishlist(data)
        this.setState({
          character: '',
          gameSeries: '',
          image: '',
          type: ''
        })
      }catch(e){
        console.error({'Error': e})
      }
      const likedCharacter = [this.props.mainList[i], ...this.state.wishlist]
      this.setState({wishlist: likedCharacter})


    }

    render(){
      console.log(this.state.wishlist)
      return(
        <div className="d-flex">
        <div className="amiibo-index">
        <Wishlist mainList={this.props.mainList} wishList={this.props.wishList} />

        <ul className="d-flex flex-wrap">

        { this.props.mainList.map((amiibo, i) => {
          return (
          <li key={i} onDoubleClick={() => this.addToList(i)}>

            <img  src={amiibo.image} alt=''/>
            <p>{amiibo.name}</p>
          </li>
        )
        })}

        </ul>
        </div>
        <ul className="wishlist">
        { this.state.wishlist.map((amiibo, i) => {
          return (
            <li className={`wish${i} list-group-item`} key={i + ''}>
            <img  src={amiibo.image} alt='' />
            <p>{amiibo.name}</p>
            </li>
          )
        })}
        </ul>
        </div>
      )
    }
  }
