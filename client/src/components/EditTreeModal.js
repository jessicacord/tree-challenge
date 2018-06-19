import React, { Component } from "react";
import EditTreeForm from './EditTreeForm';
import ReactModal from 'react-modal';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { Grid } from '@material-ui/core';
import "../styles/modal.css";


class EditTreeModal extends Component {
  constructor (props, context) {
    super(props, context);
      this.state = { 
        errorMessage: '',
        showModal: false, 
        tree: {
          id: '',
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
      this.deleteBranches = this.deleteBranches.bind(this);
      this.processTreeForm = this.processTreeForm.bind(this);
    }
    
    componentDidMount() {
      this.setState({tree: this.props.tree})
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
        let leaves = Math.floor(Math.random() * (max - min + 1) + min);
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
                    this.props.getTrees();
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
    }

    deleteBranches() {
      const treeId = this.state.tree.id;
      const branchData = `TreeId=${treeId}`;
      const xhr = new XMLHttpRequest();
      xhr.open('delete', '/api/deleteBranches');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
              this.setState({ errorMessage: '' });
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

    processTreeForm(event) {
      event.preventDefault();
      this.deleteBranches();
      const id = encodeURIComponent(this.state.tree.id);
      const name = encodeURIComponent(this.state.tree.name);
      const branches = encodeURIComponent(this.state.tree.branches);
      const minLeaves = encodeURIComponent(this.state.tree.minLeaves);
      const maxLeaves = encodeURIComponent(this.state.tree.maxLeaves);
      const formData = `id=${id}&name=${name}&branches=${branches}&minLeaves=${minLeaves}&maxLeaves=${maxLeaves}`;
      const xhr = new XMLHttpRequest();
      xhr.open('put', '/api/updateTree' );
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
        <Button mini variant="fab" color="secondary" aria-label="edit" onClick={this.handleOpenModal}>
            <EditIcon/>
        </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ReactModal 
            isOpen={this.state.showModal}
            contentLabel="Minimal Modal Example"
            shouldFocusAfterRender= {true}
            shouldCloseOnOverlayClick= {true}
          >        
            <EditTreeForm 
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
  
export default EditTreeModal;