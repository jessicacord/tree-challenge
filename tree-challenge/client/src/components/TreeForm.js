import React from 'react'
import { PropTypes } from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const TreeForm = (props) => (
    <form onSubmit={props.onSubmit}>
      <Grid container spacing={24} className="settings-grid">
        <Grid item xs={12} sm={12} className="text-center">
          <Input 
            fullWidth 
            value={props.tree.name}
            onChange={props.onChange}
            placeholder="Name" 
            name="name" 
            required
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