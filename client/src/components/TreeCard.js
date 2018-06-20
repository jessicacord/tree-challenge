import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Branch from './Branch';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditTreeModal from './EditTreeModal';



class TreeCard extends Component {
    constructor(props, context) {
        super(props, context);
        this.state ={
            tree: {},
            branches: []
        }
        this.deleteTree =this.deleteTree.bind(this);
    };

    componentDidMount() {
        this.setState({tree: this.props.tree});
        this.setState({branches: this.props.tree.Branches})
        console.log("Branch Update:" + this.props.tree.Branches);
    }

    deleteTree() {
        const id = this.props.tree.id;
        const xhr = new XMLHttpRequest();
        xhr.open('delete', '/api/deleteTree/' + id);
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
              this.setState({ errorMessage: '' });
              this.props.getTrees();
          }
          else if(xhr.status === 500){
              this.setState({ errorMessage: "Something went wrong on our end! Please try again later." });
          } 
          else {
              this.setState({ errorMessage: xhr.response.message });
          }
        });
        xhr.send();
      }
    render() {
        return (
            <Grid item xs={12} sm={6} lg={3}>
                <Card>
                    <CardContent>
                        <Typography variant="headline">{this.props.tree.name}</Typography>
                        <Grid item xs={12}>
                            {this.props.tree.Branches.map(branch => (
                                <Branch key={branch.id} branch={branch} min={this.props.tree.minLeaves} max={this.props.tree.maxLeaves} getTrees={this.props.getTrees} />
                            ))}
                        </Grid>
                        <EditTreeModal tree={this.props.tree} getTrees={this.props.getTrees} />
                        <Button mini variant="fab" aria-label="delete" onClick={this.deleteTree}>
                            <DeleteIcon />
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
     
};

export default TreeCard;