import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Branch from './Branch';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';




const TreeCard = (props) => {
    return (
        <Grid item xs={12} sm={6} lg={3}>
            <Card>
                <CardContent>
                    <Typography variant="headline">{props.tree.name}</Typography>
                    {props.tree.Branches.map(branch => (
                        <Branch key={branch.id} branch={branch} min={props.tree.minLeaves} max={props.tree.maxLeaves} />
                    ))}
                </CardContent>
            </Card>
        </Grid>
    )
};

export default TreeCard;