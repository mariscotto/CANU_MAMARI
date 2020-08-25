import React from 'react';
import Grid from '@material-ui/core/Grid';

import DonutChart from 'react-donut-chart';
import {
    BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import './Overview.css';

class Overview extends React.Component {

    // Calculate graph data based on studies for bar chart
    calculateGraphData = () => {
        let data = [];
        this.props.studies.map((study) => (
            data.push({ 'studyName': study.study.study_name, 'cscore': study.creative_mean })
        ))
        return data;
    }

    // Calculate open and closed studies for donut chart
    calculateOpenStudies = () => {
        const count = this.props.studies.filter((study) => study.study.open === true).length;
        return count;
    }

    calculateClosedStudies = () => {
        const count = this.props.studies.filter((study) => study.study.open === false).length;
        return count;
    }

    render() {

        return (
            <div style={{ paddingTop: "60px", marginLeft: "290px" }}>
                <h2>Overview</h2>
                <Grid container>
                    <Grid item style={{ padding: "0 80px 20px 0" }}>
                        <div style={{ width: '300px', height: '225px', backgroundColor: 'white' }}>
                            <h3 className="card-heading-overview">STUDIES</h3>
                            <div style={{ width: '100%', height: '100%', display: "flex", alignItems: "center", justifyContent: "center", margin: "-30px 0 0 0" }}>
                                <DonutChart
                                    data={[{
                                        label: 'Open',
                                        value: this.calculateOpenStudies()
                                    },
                                    {
                                        label: 'Closed',
                                        value: this.calculateClosedStudies()
                                    }]}
                                    legend={false}
                                    height={200}
                                    width={200}

                                    colors={['#FFA54D', '#AC98FF']}
                                    strokeColor={'white'}
                                    clickToggle={false}
                                    innerRadius={0.5}
                                    outerRadius={0.7}
                                    formatValues={(values, total) => values} />
                            </div>


                        </div>
                    </Grid>
                    <Grid item style={{ padding: "0 80px 20px 0" }}>
                        <div style={{ minWidth: '650px', height: '225px', backgroundColor: 'white' }}>
                            <h3 className="card-heading-overview">STUDY COMPARISON</h3>

                            {this.props.studies.every(study => study.participants_count === 0) ?
                                <p style={{ marginLeft: "1rem" }}>No entries yet</p> :

                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <BarChart
                                        width={600}
                                        height={190}
                                        data={this.calculateGraphData()}
                                        margin={{
                                            top: 5, right: 30, left: 20, bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="studyName" />
                                        <YAxis label={{ value: 'Creativity Score', angle: -90, position: 'insideBottomLeft' }} />
                                        <Tooltip />
                                        <Legend verticalAlign="top" align="right" />
                                        <Bar dataKey="cscore" fill="rgb(254, 224, 29)" />
                                    </BarChart>
                                </div>
                            }
                        </div>

                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Overview;