import React from 'react';
import amiiboImage from './amiiboImage.png';
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
        showEdit: false,
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
      this.handleAddAmiibo = this.handleAddAmiibo.bind(this)
      this.toggleView = this.toggleView.bind(this)
      this.amiiboSniffer = this.amiiboSniffer.bind(this)
      this.toggleEdit = this.toggleEdit.bind(this)
    }
    async toggleEdit(){
      this.setState({showEdit: !this.state.showEdit})
    }
    componentDidMount(){
      this.getAmiibos()
    }
    amiiboSniffer(amiibo){
      this.setState({amiibo: amiibo})
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
handleAddAmiibo(amiiboEdit) {
  try{
  let testId = amiiboEdit._id
        let copyAmiibo = [...this.state.amiiboWishlist]
  const foundAmiibo = copyAmiibo.findIndex(foundAmiibo => foundAmiibo._id === testId)

  copyAmiibo[foundAmiibo].character = amiiboEdit.character
  copyAmiibo[foundAmiibo].type = amiiboEdit.type
  this.setState({amiiboWishlist: copyAmiibo})
} catch(e){
  console.error(e);
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

    async toggleView(){
      try{
        this.setState({isHidden: !this.state.isHidden})
      }catch(e){
        console.error(e);
      }
    }

    render(){
      return(
        <>
        <h1>Welcome to <img src={amiiboImage} alt=''/> Wishlist!</h1>
          <AmiiboHomepage mainList={this.state.amiiboExternal} wishList={this.state.amiiboWishlist}
          baseURL={baseURL}
          add={this.addToList}
          delete={this.deleteAmiibo}
          update={this.handleUpdateAmiibo}
          change={this.handleChange}
          submit={this.handleSubmit}
          handleAddAmiibo={this.handleAddAmiibo}
          character={this.state.character}
          type={this.state.type}
          toggleView={this.toggleView}
          isHidden={this.state.isHidden}
          amiiboShower={this.state.amiibo}
          amiiboSniffer={this.amiiboSniffer}
          toggleEdit={this.toggleEdit}
          editShow={this.state.showEdit}
          />
        <footer className="d-flex justify-content-between">
          <a href="https://www.nintendo.com/amiibo/">Amiibo Info</a>
          <h6>MADE BY JAMAL AND BEN</h6>
          <h6>Special thanks to <a href="https://www.amiiboapi.com/">AmiiboAPI</a></h6>
        </footer>
         </>
      )
    }
  }
