import React from 'react';
import AmiiboHomepage from './components/AmiiboHomepage'
let baseURL = ''
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
}
  export default class App extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        amiiboExternal: [],
        amiiboWishlist: [],
        isHidden: false,
        character: '',
        gameSeries: '',
        image: '',
        type: '',
      }
      this.deleteAmiibo = this.deleteAmiibo.bind(this)
      this.addToList = this.addToList.bind(this)
      this.handleAddAmiibo = this.handleAddAmiibo.bind(this)
    }

    async getAmiibos() {
      try {
        // INITIAL DATABASE PULL OF THE CUSTOM AMIIBOS
        let response = await fetch(`${baseURL}/amiibos`)
        let data = await response.json()
        // PULLING FROM EXTERNAL API
        let amiiboExternalApi = await fetch(`https://www.amiiboapi.com/api/amiibo/`)
        let externalData = await amiiboExternalApi.json()
        externalData = externalData.amiibo.slice(5, 40)
        // SETTING STATE OF THE AMIIBO ARRAYS
        this.setState({amiiboExternal: externalData, amiiboWishlist: data})
      } catch (err) {
        console.error(err);
      }
    }


    async deleteAmiibo (id){
   try {
   let response = await fetch(baseURL + '/amiibos/' +  id, {
      method: 'DELETE'
      })
      let data = await response.json()
      const foundAmiibo = this.state.amiiboWishlist.findIndex(amiibo => amiibo._id === id)
      const copyAmiibo = [...this.state.amiiboWishlist]
      copyAmiibo.splice(foundAmiibo, 1)
      this.setState({amiiboWishlist: copyAmiibo})
   } catch(e){
     console.error(e)
   }
 }
    async addToList (i) {
      try{
        let response = await fetch(baseURL + '/amiibos', {
          method: 'POST',
          body: JSON.stringify({
            character: this.state.amiiboExternal[i].character,
            gameSeries: this.state.amiiboExternal[i].gameSeries,
            image: this.state.amiiboExternal[i].image,
            type: this.state.amiiboExternal[i].type
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        let data = await response.json()
        const likedCharacter = [data, ...this.state.amiiboWishlist]
        this.setState({
          amiiboWishlist: likedCharacter,
          character: '',
          gameSeries: '',
          image: '',
          type: ''
        })
      }catch(e){
        console.error({'Error': e})
      }
    }
    componentDidMount(){
      this.getAmiibos()
    }
    handleAddAmiibo(amiibo) {
      const copyAmiibos = [amiibo, ...this.state.amiiboWishlist]
      this.setState({
        amiiboWishlist: copyAmiibos
      })
    }
    render(){
      return(
        <>
        <h1>Welcome to <img src="https://i2.wp.com/www.superco-opbros.com/wp-content/uploads/2020/01/amiibo_logo_e3-scaled.jpg?fit=2560%2C896&ssl=1" alt=''/> Wishlist!</h1>
          <AmiiboHomepage mainList={this.state.amiiboExternal} wishList={this.state.amiiboWishlist}
          baseURL={baseURL}
          add={this.addToList}
          delete={this.deleteAmiibo}

          />
        <footer className="d-flex">
          <a href="https://www.nintendo.com/amiibo/">Amiibo Info</a>
          <h4>MADE BY JAMAL AND BEN</h4>
          <h5>Special thanks to <a href="https://www.amiiboapi.com/">AmiiboAPI</a></h5>
        </footer>
         </>
      )
    }
  }
