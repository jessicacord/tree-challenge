import React from 'react'
import { PropTypes } from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';

const TreeForm = (props) => (
    <form onSubmit={props.onSubmit}>
      <Grid container spacing={24} className="settings-grid">
      <Grid item xs={12} className="text-center">
          <Typography variant="display1">Create a new tree</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className="text-center">
          <Input 
            fullWidth
            value={props.tree.name}
            onChange={props.onChange}
            placeholder="Name" 
            name="name" 
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} className="text-center">
          <Input
            fullWidth
            value={props.tree.branches}
            onChange={props.onChange}
            type="number"
            name="branches"
            placeholder="Branches"
          />
        </Grid>
        <Grid item xs={12} className="text-center">
          <Typography variant="subheading">Leaves</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className="text-center">
          <Input
            fullWidth
            value={props.tree.minLeaves}
            onChange={props.onChange}
            type="number"
            name="minLeaves"
            placeholder="Min"
          />
        </Grid>
        <Grid item xs={12} sm={6} className="text-center">
          <Input
            fullWidth
            value={props.tree.maxLeaves}
            onChange={props.onChange}
            type="number"
            name="maxLeaves"
            placeholder="Max"
          />
        </Grid>
        <Grid item xs={12} sm={12} className="text-center">
          <Button fullWidth variant="raised" color="secondary" type="submit">Add Tree</Button>
        </Grid>
      </Grid>
    </form>
  );
  
  TreeForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired
  };
  
  export default TreeForm;