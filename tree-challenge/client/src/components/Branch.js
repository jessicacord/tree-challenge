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
            leaves: 0
        };
        this.addLeaves = this.addLeaves.bind(this);
        this.newLeaves = this.newLeaves.bind(this);
    }

    componentDidMount() {
        this.addLeaves();
    }

    addLeaves () {
        this.setState({ leaves: this.props.branch.leaves });
    }

    newLeaves() {
        console.log("new leaves");
    }

    render() {
        return (
            <Chip
                avatar={
                    <Avatar src="./assets/imgs/leaf.png" />
                }
                label={this.state.leaves}
                onDelete={this.newLeaves}
                deleteIcon={<CachedIcon />}
            />
        )
    }
} 

export default Branch;