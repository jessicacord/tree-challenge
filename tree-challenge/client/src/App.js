import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { TreeCard, TreeModal } from './components';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      trees: []
    }

    this.getTrees = this.getTrees.bind(this);
  };

  componentDidMount(){
    this.getTrees();
  }

  getTrees() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      let trees = [];
      if(xhr.readyState === 4 && xhr.status === 200){
        let response = JSON.parse(xhr.response);
        this.setState({ trees: response.trees });
        console.log(this.state.trees)
      };
    })
    xhr.open('GET', '/api/getTrees');
    xhr.send();
  };

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <TreeModal />
          {this.state.trees.map(tree => (
              <TreeCard key={tree.id} tree={tree} />
          ))}
        </Grid>
      </div>
    )
  }
}

export default App;
