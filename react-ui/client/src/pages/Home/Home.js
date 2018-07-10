import React, { Component } from 'react';
import Jumbotron from '../../components/Jumbotron';
import Articles from "../Articles";

class Home extends Component {

    render() {
      return (
        <div className="App">
            <div className="container">
                <Jumbotron />
                <Articles />
            </div>
        </div>
      )
    }
}

export default Home;