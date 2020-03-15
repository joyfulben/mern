import React from 'react'

  export default class ShowAmiibo extends React.Component {

    render(){
      return(
        <div className="wishlist showAmiibo d-flex position-relative">
        <div className="picName ">
          <img className="showImg m-2" src={this.props.amiiboShower.image} />
          <h2 >{this.props.amiiboShower.name}</h2>
        </div>
        <div className="showInfo">

          <h5>Amiibo Series: <br/><br/> <span>{this.props.amiiboShower.amiiboSeries}</span></h5>
          <h5>Type: <span>{this.props.amiiboShower.type}</span></h5>
        </div>
        </div>
      )
    }
  }
