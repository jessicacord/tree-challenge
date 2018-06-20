import React from 'react';
import { Grid } from '@material-ui/core';
import "../styles/styles.css";
import Typography from '@material-ui/core/Typography';

const Footer = () => {
    return (
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <div className="footer">
                <Grid container spacing={24}>
                    <Grid item xs={2} sm={3} />
                    <Grid item xs={8} sm={6}>
                        <a className="footer-link" href="https://github.com/jessicacord/tree-challenge" target="_blank"><Typography varient="caption">Github</Typography></a>
                    </Grid>
                    <Grid item xs={2} sm={3} />
                </Grid>
            </div>
          </Grid>
        </Grid>
    )
}

export default Footer;