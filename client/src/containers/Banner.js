import React from 'react';
import { Grid } from '@material-ui/core';
import { TreeModal } from '../components';
import "../styles/styles.css";


const Banner = (props) => {
    
    return (
        <Grid container spacing={24}>
        <Grid item xs={12}>
        <div className="banner">
            <TreeModal getTrees={props.getTrees}/>
        </div>
        </Grid>
        </Grid>
    )
}

export default Banner;