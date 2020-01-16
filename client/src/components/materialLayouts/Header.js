import React, { Component } from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Link to='/'>
                        <Typography
                            variant="h6"
                            color="secondary">
                            fashion forward
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
        )
    }
}
