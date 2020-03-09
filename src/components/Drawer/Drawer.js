// INITIAL
import React from 'react';

// ROUTER
import { Link } from 'react-router-dom'

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

// STYLES
import './Drawer.css';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '400px',
        maxWidth: 220,
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
    }

}));

const Drawer = () => {

    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <div className={classes.root}>
            <Paper style={{height: '100%'}}>
                <List aria-label="main mailbox folders">
                    <ListItem
                        button
                        selected={selectedIndex === 0}
                        onClick={event => handleListItemClick(event, 0)}
                    >
                        <ListItemIcon>
                            <InboxIcon style={{color: '#00a0dd'}}/>
                        </ListItemIcon>
                        <ListItemText primary="Domov" />
                    </ListItem>
                    <ListItem
                        button
                        selected={selectedIndex === 1}
                        onClick={event => handleListItemClick(event, 1)}
                    >
                        <ListItemIcon>
                            <DraftsIcon style={{color: '#00a0dd'}}/>
                        </ListItemIcon>
                        <ListItemText primary="Wish"  />
                    </ListItem>
                    <ListItem
                        button
                        selected={selectedIndex === 2}
                        onClick={event => handleListItemClick(event, 2)}
                    >
                        <ListItemIcon>
                            <DraftsIcon style={{color: '#00a0dd'}}/>
                        </ListItemIcon>
                        <ListItemText primary="Rýchle odkazy"  />
                    </ListItem>
                </List>
            </Paper>
        </div>
    )
}

export default Drawer
