import React, { Component } from 'react'
import { AppBar, Toolbar, Typography} from '@material-ui/core'

export default class Header extends Component {
    render() {
        return (
                <AppBar position="static">
                    <Toolbar>
                  
                        <Typography
                        variant="h6"
                        color="secondary">
                           fashion forward
          </Typography>
                        
                    </Toolbar>
                </AppBar>
        )
    }
}
