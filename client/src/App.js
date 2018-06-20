import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { TreeCard, TreeModal } from './components';
import { Banner } from './containers';
import io from 'socket.io-client';
var socket = io.connect();

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      trees: []
    }

    this.getTrees = this.getTrees.bind(this);
    this.send = this.send.bind(this);
    this.receive = this.receive.bind(this);
  };

  componentDidMount(){
    this.getTrees();
  }

  receive() {
    socket.on('updateTrees', trees => {
      this.setState({trees: trees})
    });
  }

  //Send 
  send(trees) {
    socket.emit('getTrees', trees);
  }
  
  //DB: Get Trees
  getTrees() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      let trees = [];
      if(xhr.readyState === 4 && xhr.status === 200){
        let response = JSON.parse(xhr.response);
        this.setState({ trees: response.trees });
        this.send(response.trees);
        console.log(this.state.trees)
      };
    })
    xhr.open('GET', '/api/getTrees');
    xhr.send();
  };

  render() {
    this.receive();
    return (
      <div>
        <Grid container spacing={24}>
          <Banner getTrees={this.getTrees}/>
          {this.state.trees.map(tree => (
              <TreeCard key={tree.id} tree={tree} getTrees={this.getTrees} />
          ))}
        </Grid>
      </div>
    )
  }
}

export default App;
