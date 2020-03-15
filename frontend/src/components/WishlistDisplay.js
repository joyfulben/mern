import React from 'react'
import Update from './UpdateAmiibo.js'
import Hidden from './HiddenDisplay.js'
  export default class Wishlist extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        edit1: false
      }
      this.stateGrabber= this.stateGrabber.bind(this)
      this.stateChanger= this.stateChanger.bind(this)
    }
    async stateGrabber(state){
      // console.log(state);
      this.setState({[`key${state}`]: false})
    }
    async stateChanger(num) {
      try {
        console.log(num);
        console.log(this.state[`key${num}`]);
        this.setState({[`key${num}`]: !this.state[`key${num}`]})

      } catch (e) {
        console.error(e);

      }
    }
  render(){

    return(

      <ul className="wishlist">
              <button onClick={() => this.tester()}>test</button>
        {this.props.wishList.map((amiibo, i) => {
           return (

          <div className="d-flex flex-row" key={i}>

            <li className={`wish${i} `}  onClick={() => {
              this.props.delete(amiibo._id)
            }}>
            <img className="wish" src={`${amiibo.image}`} alt='' />
            <p className="mx-auto">{amiibo.character}</p>

              <button onClick={()=>{this.stateChanger(i)}}>edit</button>


            <hr />
            </li>
            <div>
              {
                this.state[`key${i}`] ?
                <Update
                change={this.props.change}
                id={amiibo._id}
                baseURL={this.props.baseURL}
                handleAddAmiibo={this.props.handleAddAmiibo}
                character={this.props.character}
                type={this.props.type}
                key={i}
                index={i}
                stateGrabber={this.stateGrabber}
                stateChanger={this.stateChanger}
                 />
               :
               <Hidden
                 stateGrabber={this.stateGrabber}
                  />

              }

           </div>
          </div>
      )
      })}
      </ul>
    )
  }
}
