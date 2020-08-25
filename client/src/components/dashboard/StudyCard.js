// Functional Study Card Component

import React from 'react';

import { People, Lock, LockOpen, KeyboardArrowRightRounded } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';

const StudyCard = props => (
    <div className="Card">
        <Grid container spacing={0} direction="column"
            justify="space-between"
            alignItems="flex-start">

            <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
            >
                <Grid item style={{ marginTop: '1rem', marginRight: '1rem' }}>
                    <div style={{}}>
                        <div className="valign-center">
                            <People style={{ marginRight: '0.5rem' }} />
                            <span>{props.completedParticipants} Completed</span>
                        </div>
                        {props.studyOpen ?
                            (<div className="valign-center"><LockOpen style={{ fill: '#FFA54D', marginRight: '0.5rem' }} /><span>Open</span></div>)
                            : (<div className="valign-center"><Lock style={{ fill: '#3100FF', marginRight: '0.5rem' }} /><p>Closed</p></div>)}
                    </div>
                </Grid>
            </Grid>

            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Grid item>
                    <div className="study-card-name">
                        <h3 style={{ margin: '0.5rem' }}>{props.studyName}</h3>
                        <p className="study-card-date" style={{ margin: '0.5rem' }}>{props.studyDate}</p>
                    </div>
                </Grid>
                <Grid item>
                    <KeyboardArrowRightRounded fontSize="large" className="study-arrow" />
                </Grid>
            </Grid>
        </Grid>
    </div>
)


export default StudyCard;