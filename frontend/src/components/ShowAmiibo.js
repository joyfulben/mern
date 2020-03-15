import React from 'react'

  export default class ShowAmiibo extends React.Component {

    render(){
      return(
        <div className="wishlist">
          <img className="test" src={this.props.amiiboShower.image} />
        <h2 >{this.props.amiiboShower.name}</h2>
        </div>
      )
    }
  }
