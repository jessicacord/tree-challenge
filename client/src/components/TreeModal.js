import React, { Component } from "react";
import TreeForm from './TreeForm';
import ReactModal from 'react-modal';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { Grid } from '@material-ui/core';
import "../styles/styles.css";


class TreeModal extends Component {
  constructor (props, context) {
    super(props, context);
      this.state = { 
        errorMessage: '',
        showModal: false, 
        tree: {
          name: '',
          branches: '',
          minLeaves: '',
          maxLeaves: ''
        }
      };
      ReactModal.setAppElement('#root');
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
      this.changeTree = this.changeTree.bind(this);
      this.createLeaves = this.createLeaves.bind(this);
      this.createBranches = this.createBranches.bind(this);
      this.processTreeForm = this.processTreeForm.bind(this);
    }
    
    componentDidMount() {
      
    };

    handleOpenModal () {
      this.setState({ showModal: true});
    }
    
    handleCloseModal () {
      this.setState({ showModal: false });
      document.getElementById('root').click();
    }

    changeTree(event) {
      const field = event.target.name;
      const tree = this.state.tree;
      tree[field] = event.target.value;
      this.setState({ tree });
    }

    createLeaves(min, max) {
        console.log("Min: " + min + " Max: " + max)
        const minInt = parseInt(min);
        const maxInt = parseInt(max);
        const leaves = Math.floor((Math.random() * (maxInt - minInt + 1)) + minInt);
        console.log(leaves);
        return leaves;
    }

    createBranches(response, branch) {
        console.log("Creating Branches");
        const newTree = response;
        let count = branch
        const treeId = response.id;
        const minLeaves = response.minLeaves;
        const maxLeaves = response.maxLeaves;
        let leaves;
        let branchData;
        const xhr = new XMLHttpRequest();

        if (count > 0) {
            count -= 1;
            leaves = this.createLeaves(minLeaves, maxLeaves);
            branchData = `TreeId=${treeId}&leaves=${leaves}`;

            xhr.open('post', '/api/newBranch');
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.responseType = 'json';
            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {
                    this.setState({ errorMessage: '' });
                    this.createBranches(newTree, count);
                }
                else if(xhr.status === 500){
                    this.setState({ errorMessage: "Something went wrong on our end! Please try again later." });
                } 
                else {
                    this.setState({ errorMessage: xhr.response.message });
                }
            });
            xhr.send(branchData); 
        } else {
          this.props.getTrees();
        }
    }

    processTreeForm(event, getTrees) {
      event.preventDefault();
      const name = encodeURIComponent(this.state.tree.name);
      const branches = encodeURIComponent(this.state.tree.branches);
      const minLeaves = encodeURIComponent(this.state.tree.minLeaves);
      const maxLeaves = encodeURIComponent(this.state.tree.maxLeaves);
      const formData = `name=${name}&branches=${branches}&minLeaves=${minLeaves}&maxLeaves=${maxLeaves}`;
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/api/newTree');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          this.setState({ errorMessage: '' });
          let treeCopy = {
            name: '',
            branches: '',
            minLeaves: '',
            maxLeaves: ''
          };
          this.setState({ tree: treeCopy });
          this.createBranches(xhr.response, branches);
          this.handleCloseModal();         
        }
        else if(xhr.status === 500){
          this.setState({ errorMessage: "Something went wrong on our end! Please try again later." });
        } 
        else {
          this.setState({ errorMessage: xhr.response.message });
        }
      });
      xhr.send(formData);
    }
    
  render (){
    const { classes } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <Button fullWidth color="secondary" variant="raised" onClick={this.handleOpenModal}>Add A Tree</Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ReactModal 
            isOpen={this.state.showModal}
            contentLabel="Minimal Modal Example"
            shouldFocusAfterRender= {true}
            shouldCloseOnOverlayClick= {true}
          >        
            <TreeForm 
              onSubmit={this.processTreeForm}
              onChange={this.changeTree}
              errorMessage={this.state.errorMessage}
              tree={this.state.tree}
            />
            <Button fullWidth color="primary" variant="raised" onClick={this.handleCloseModal}>Close</Button>
          </ReactModal>
        </Grid>
      </Grid>
    );
  }
}
  
export default TreeModal;