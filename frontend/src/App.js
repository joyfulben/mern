import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render () {
    return (
      <>
        <header>
          <h1>Amibo Wishlist</h1>
        </header>
        <footer>
          <a href="https://www.nintendo.com/amiibo/">Amiibo Info</a>
          <h4>MADE BY JAMAL AND BEN</h4>
          <h5>Special thanks to <a href="https://www.amiiboapi.com/">AmiiboAPI</a></h5>
        </footer>
      </>
    )
  }
}
