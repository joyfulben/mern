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
        amiibo: null,
        isHidden: false,
        character: '',
        gameSeries: '',
        image: '',
        type: '',
        id: ''
      }
      this.deleteAmiibo = this.deleteAmiibo.bind(this)
      this.addToList = this.addToList.bind(this)
      this.handleUpdateAmiibo = this.handleUpdateAmiibo.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.idChanger = this.idChanger.bind(this)
    }
    idChanger (id) {
      this.setState({
        id: id
      })
    }
    handleUpdateAmiibo(amiibo) {
      const copyAmiibos = [amiibo, ...this.state.amiiboWishlist]
      this.setState({
        amiiboWishlist: copyAmiibos
      })
    }
    handleChange (event) {
 this.setState({ [event.currentTarget.id]: event.currentTarget.value})
}
  async handleSubmit (event) {
  try{
    let response = await fetch(baseURL + '/amiibos/' + event.id,
    {
        method: 'PUT', // Put, Delete. Only for a non-Get request
        body: JSON.stringify({}),
        headers: {
            'Content-Type': 'application/json'
          }
        })
        let updatedamiibo = await response.json()
        const foundamiibo = this.state.amiiboWishlist.findIndex(foundItem => foundItem._id === event._id)
        const copyAmiibo = [...this.state.amiiboWishlist]
        copyAmiibo[foundamiibo].character = updatedamiibo.character
        copyAmiibo[foundamiibo].type = updatedamiibo.type
        this.setState({amiiboWishlist: copyAmiibo})
      }catch(e){
        console.error({'Error': e})
      }
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
        <h1>Welcome to <img src="https://toppng.com/uploads/preview/amiibo-logo-11563072955fd60xvgciz.png" alt=''/> Wishlist!</h1>
          <AmiiboHomepage mainList={this.state.amiiboExternal} wishList={this.state.amiiboWishlist}
          baseURL={baseURL}
          add={this.addToList}
          delete={this.deleteAmiibo}
          update={this.handleUpdateAmiibo}
          change={this.handleChange}
          submit={this.handleSubmit}
          id={this.idChanger}
          />
        <footer className="d-flex justify-content-between m-3 p-3">
          <a href="https://www.nintendo.com/amiibo/">Amiibo Info</a>
          <h6>MADE BY JAMAL AND BEN</h6>
          <h6>Special thanks to <a href="https://www.amiiboapi.com/">AmiiboAPI</a></h6>
        </footer>
         </>
      )
    }
  }
