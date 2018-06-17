import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import CachedIcon from '@material-ui/icons/Cached';

const styles = theme => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
});

class Branch extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            errorMessage:'',
            min: 0,
            max: 0,
            branch: {}
        };
        this.newLeaves = this.newLeaves.bind(this);
        this.createLeaves = this.createLeaves.bind(this);
    }

    componentDidMount() {
        this.setState({ branch: this.props.branch });
        this.setState({ min: this.props.min });
        this.setState({ max: this.props.max });
    }

    createLeaves(min, max) {
        console.log("New Leaves");
        let leaves = Math.floor(Math.random() * (max - min + 1) + min);
        return leaves;
    }

    newLeaves() {
        const id = this.state.branch.id;
        const leaves = this.createLeaves(this.state.min, this.state.max);
        const branchData = `leaves=${leaves}`;
        const url = '/api/updateBranch/' + id;
        const xhr = new XMLHttpRequest();
        xhr.open('put', url);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({ errorMessage: '' });
                this.setState({ branch: {leaves: leaves }});
            }
            else if(xhr.status === 500){
                this.setState({ errorMessage: "Something went wrong on our end! Please try again later." });
            } 
            else {
                this.setState({ errorMessage: xhr.response.message });
            }
        });
        xhr.send(branchData); 
    }

    render() {
        return (
            <Chip
                avatar={
                    <Avatar src="./assets/imgs/leaf.png" />
                }
                label={this.state.branch.leaves}
                onDelete={this.newLeaves}
                deleteIcon={<CachedIcon />}
                key={this.state.branch.id}
            />
        )
    }
} 

export default Branch;