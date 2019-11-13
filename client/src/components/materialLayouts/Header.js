import React, { Component } from 'react'
import { AppBar, Toolbar, Typography} from '@material-ui/core'

export default class Header extends Component {
    render() {
        return (
                <AppBar position="static">
                    <Toolbar>
                        {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton> */}
                        <Typography variant="h6">
                           fashion forward
          </Typography>
                        {/* <Button color="inherit">Login</Button> */}
                    </Toolbar>
                </AppBar>
        )
    }
}
