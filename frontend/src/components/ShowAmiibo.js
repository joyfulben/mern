import React from 'react'

  export default class ShowAmiibo extends React.Component {

    render(){
      return(
        <div className="wishlist">{this.props.amiiboShower.character}</div>
      )
    }
  }
