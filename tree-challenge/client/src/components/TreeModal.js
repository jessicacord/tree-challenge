import React, { Component } from "react";
import TreeForm from './TreeForm';
import ReactModal from 'react-modal';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { Grid } from '@material-ui/core';

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
      this.changeLocation = this.changeLocation.bind(this);
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

    changeLocation(event) {
      const field = event.target.name;
      const tree = this.state.tree;
      tree[field] = event.target.value;
      this.setState({ tree });
    }

    processTreeForm(event) {
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
          this.setState({ location: treeCopy });
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
              onChange={this.changeLocation}
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
  
export default TreeModal