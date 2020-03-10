// INITIAL
import React from 'react';

// COMPONENTS
import TimeLog from './TimeLog';

// MUI TREASURY
import Tabs from '@mui-treasury/components/tabs/twitterIcon';

// MUI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// MUI ICONS
import AccessAlarmOutlinedIcon from '@material-ui/icons/AccessAlarmOutlined';
import LibraryAddCheckOutlinedIcon from '@material-ui/icons/LibraryAddCheckOutlined';


// STYLES
import './Widgets.scss';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '700px',
        maxWidth: 350,
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
    },

    selectEmpty: {
        marginRight: 16,
    },

    fab: {

    },
}));

const Widgets = () => {

    {/* Tabs */ }
    const [index, setIndex] = React.useState(0);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper style={{ height: '100%', overflow: 'auto' }}>
                <div className="tabs-header" style={{ display: 'flex', position: 'sticky', top: 0, paddingTop: 4, borderRadius: '4px 4px 0 0', background: '#61d1ff4d' }}>
                    <Tabs
                        tabs={[
                            { icon: <AccessAlarmOutlinedIcon />, badgeProps: { badgeContent: 18 } },
                            { icon: <LibraryAddCheckOutlinedIcon /> },
                        ]}
                        value={index}
                        onChange={(e, i) => setIndex(i)}
                    />
                </div>
                <TimeLog />
            </Paper>
        </div>
    )
}

export default Widgets