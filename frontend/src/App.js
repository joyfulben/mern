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
        isHidden: false
      }
    }

    componentDidMount(){
      this.getAmiibos()
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
        console.log(err);
      }
    }
    render(){

      return(
        <>
        <h1>Welcome to Amiibo Wishlist!</h1>
          <AmiiboHomepage mainList={this.state.amiiboExternal} wishList={this.state.amiiboWishlist}
          baseURL={baseURL} />

        <footer className="d-flex">
          <a href="https://www.nintendo.com/amiibo/">Amiibo Info</a>
          <h4>MADE BY JAMAL AND BEN</h4>
          <h5>Special thanks to <a href="https://www.amiiboapi.com/">AmiiboAPI</a></h5>
        </footer>
         </>
      )
    }
  }
