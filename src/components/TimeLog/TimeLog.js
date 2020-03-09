// INITIAL
import React from 'react';
import { useEffect, useState } from 'react';

// DATABASE
import firebase from '../../firebase.js';
import { useAuth0 } from "../../react-auth0-spa";

// MUI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import Checkbox from '@material-ui/core/Checkbox';


// STYLES
import './TimeLog.css';



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

const TimeSelect = withStyles({
    root: {
        '& .MuiInput-underline:before': {
            borderBottomColor: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#00a0dd',
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottomColor: 'white',
        },
    },
})(FormControl);

function useTimes() {
    const { user } = useAuth0();
    const [time, setTime] = useState([])

    useEffect(() => {
        firebase
            .firestore()
            .collection('timelog')
            .doc('active')
            .collection(user.email)
            .onSnapshot((snapshot) => {
                const newTime = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setTime(newTime)
            })

    }, [])

    return time;
}

const TimeLog = () => {
    const time = useTimes()
    const { user } = useAuth0();
    const classes = useStyles();
    const [username, setUsername] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [task, setTask] = React.useState('');
    const [hours, setHours] = React.useState('0');
    const [minutes, setMinutes] = React.useState('0');
    const [checked, setChecked] = React.useState(false);

    const handleTimeCheckBox = event => {
      setChecked(event.target.checked);

      function onMove(id) {
        const db = firebase.firestore()
        db.collection('timelog').delete('active')
        }
    };
    
   

    function onSubmit(e) {
        e.preventDefault();
        setMinutes(minutes);
        setHours(user.email)
        setUsername(user.name);
        setEmail(user.email)

        firebase
            .firestore()
            .collection('timelog')
            .doc('active')
            .collection(user.email)
            .add({
                username,
                email,
                created_at: firebase.firestore.Timestamp.fromDate(new Date()),
                task,
                hours,
                minutes,
            })
            .then(() => {
                setUsername(user.name);
                setEmail(user.email);
                setTask('');
                setMinutes('0');
                setHours('0');
            })

    }


    return (
        <div className={classes.root}>
            <Paper style={{ height: '100%', overflow: 'auto' }}>
                <div className="timelog-header" style={{ display: 'flex', position: 'sticky', top: 0, padding: 16, borderRadius: '4px 4px 0 0', background: '#00a0dd' }}>
                    <AccessAlarmIcon style={{ color: 'white', marginRight: 8, }} />
                    <h2 style={{ color: 'white' }}>Čas na zapísanie</h2>
                </div>
                <div>
                    <form
                        className="timelog-input"
                        onSubmit={onSubmit}
                        style={{ display: 'flex', position: 'sticky', top: 0, flexDirection: 'column', padding: 16, borderBottom: '1px solid #E2E2E2', background: "white" }}>
                        <textarea
                            rows="3"
                            cols="50"
                            value={task}
                            placeholder="Describe yourself here..."
                            onChange={e => setTask(e.currentTarget.value)}
                            style={{ border: 'none', resize: 'none', background: 'transparent', color: '#474747' }}>
                        </textarea>
                        <div style={{ height: '30px' }}>
                            <TimeSelect required className={classes.formControl}>
                                <NativeSelect
                                    value={hours}
                                    onChange={e => setHours(e.currentTarget.value)}
                                    name="hours"
                                    className={classes.selectEmpty}
                                    inputProps={{ 'aria-label': 'hours' }}
                                >
                                    <option value={0}>0 hodín</option>
                                    <option value={1}>1 hod</option>
                                    <option value={2}>2 hod</option>
                                    <option value={3}>3 hod</option>
                                    <option value={4}>4 hod</option>
                                    <option value={5}>5 hod</option>
                                    <option value={6}>6 hod</option>
                                    <option value={7}>7 hod</option>
                                    <option value={8}>8 hod</option>
                                    <option value={9}>9 hod</option>
                                </NativeSelect>
                            </TimeSelect>
                            <TimeSelect required className={classes.formControl}>
                                <NativeSelect
                                    value={minutes}
                                    onChange={e => setMinutes(e.currentTarget.value)}
                                    name="minutes"
                                    className={classes.selectEmpty}
                                    inputProps={{ 'aria-label': 'minutes' }}
                                >
                                    <option value="none">0 min</option>
                                    <option value={15}>15 min</option>
                                    <option value={30}>30 min</option>
                                    <option value={45}>45 min</option>
                                </NativeSelect>
                            </TimeSelect>
                            <Fab type="submit" size="medium" color="secondary" aria-label="add" style={{ position: 'relative', top: 22, left: 48, boxShadow: ' 0 0 20px 30px white', outline: 'none' }} >
                                <AddIcon />
                            </Fab>
                        </div>
                    </form>
                    <div className="time-list">
                        <h2 style={{
                            margin: '32px 0 0 16px'
                        }}>
                            Zapísať do 5pm</h2>
                        {time.map((time) =>
                            <div className="time-item"
                                style={{
                                    background: '#FAFAFA',
                                    padding: 24,
                                    marginTop: 16
                                }}>

                                {/* Time Item – Created At */}
                                <p style={{ margin: 0, fontSize: '14px' }}>
                                    {new Date(time.created_at.toDate()).toDateString()}
                                </p>

                                {/* Time Item – Task Name */}
                                <h2 style={{ margin: '12px 0px' }}>
                                    {time.task}
                                </h2>

                                {/* Time Item – Logged Time */}
                                <h2 style={{
                                    display: 'inline-block',
                                    padding: '4px 8px',
                                    background: 'rgba(0, 160, 221, 0.1)',
                                    color: '#00A0DD',
                                    borderRadius: '6px',
                                    fontSize: '14px'
                                }}>
                                    {time.hours}h {time.minutes}min
                                </h2>

                                <Checkbox
                                    onChange={handleTimeCheckBox}
                                    value="primary"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    style={{ float: 'right' }}
                                />

                            </div>
                        )}
                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default TimeLog
