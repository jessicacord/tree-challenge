import React from 'react';
import { Grid } from '@material-ui/core';
import { TreeModal } from '../components';
import "../styles/styles.css";

const Banner = (props) => {
    return (
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <div className="banner">
                <Grid container spacing={24}>
                    <Grid item xs={2} sm={3} />
                    <Grid item xs={8} sm={6}>
                        <img id="banner-logo" src="./assets/imgs/logo.png" />
                        <TreeModal getTrees={props.getTrees}/>
                    </Grid>
                    <Grid item xs={2} sm={3} />
                </Grid>
            </div>
          </Grid>
        </Grid>
    )
}

export default Banner;