import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Typography } from '@material-ui/core';

const styles = () => ({
  submitButton: {
    background: '#ff5c5c',
    color: 'white',
    '&:hover': {
      background: '#B83737',
      color: 'white'
    },
    marginBottom: '5px'
  }
});

const TreeForm = (props) => {
  const { classes } = props;
  return(
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
          <FormHelperText className="error-text">{props.formErrors.name}</FormHelperText>
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
          <FormHelperText className="error-text">{props.formErrors.branches}</FormHelperText>
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
          <FormHelperText className="error-text">{props.formErrors.min}</FormHelperText>
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
          <FormHelperText className="error-text">{props.formErrors.max}</FormHelperText>
        </Grid>
        <Grid item xs={12} sm={12} className="text-center">
          <Button disabled={props.submitDisabled} className={classes.submitButton} fullWidth variant="raised" color="secondary" type="submit">Add Tree</Button>
        </Grid>
      </Grid>
    </form>
  )
};
  
  TreeForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    tree: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(TreeForm);