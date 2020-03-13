import React from 'react';
let baseURL = ''
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
}

  class App extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        amiibos: [],
        isHidden: false
      }
    }

    componentDidMount(){
      this.getAmiibos()
    }

    async getAmiibos() {
      try {
        // SETTING THE ARRAY WE ARE PERMUTING TO
        let completeData = []
        // INITIAL DATABASE PULL OF THE CUSTOM AMIIBOS
        let response = await fetch(`${baseURL}/amiibos`)
        let data = await response.json()
        // PULLING FROM EXTERNAL API
        let amiiboExternalApi = await fetch(`https://www.amiiboapi.com/api/amiibo/`)
        let externalData = await amiiboExternalApi.json()
        completeData = [data, ...externalData.amiibo]
        this.setState({amiibos: completeData})
        console.log(completeData);
      } catch (err) {
        console.log(err);
      }
    }
    render(){
      return(
        <h1>Welcome to Amiibo Wishlist!</h1>
      )
    }
  }

export default App;
