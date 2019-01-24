
import React
    from 'react';

import {
    withStyles
} from
    '@material-ui/core/styles';

import Table
    from '@material-ui/core/Table';

import TableBody
    from '@material-ui/core/TableBody';

import TableCell
    from '@material-ui/core/TableCell';

import TableHead
    from '@material-ui/core/TableHead';

import TableRow
    from '@material-ui/core/TableRow';

import Paper
    from '@material-ui/core/Paper';

import CreateDeployment
    from './CreateDeployment';

import DisplayChips
    from './displayChips';



const styles =
    theme => ({

        root: {

            width: '100%',

            marginTop:
                theme.spacing.unit *
                3,

            overflowX:
                'auto',

        },

        table: {

            minWidth:
                700,

        }

    });





//function createData(name, calories, fat, carbs, protein) {

//id += 1;

//return { id, name, calories, fat, carbs, protein };

//}



class releasepage
    extends React.Component {


    constructor(props) {

        super(props);

        this.state = {

            releaseId:
                ''

        }

    }





    render() {

        //console.log(this.props.rows);


        return (


            <Paper
                className={this.props.root}>


                <Table
                    className={this.props.table}>

                    <TableHead>

                        <TableRow>

                            <TableCell><h3>Date</h3></TableCell>

                            <TableCell><h3>Environment</h3></TableCell>

                            <TableCell><h3>07 - 9:30 AM (0700 - 0930)</h3></TableCell>

                            <TableCell><h3>01 - 02 PM (1300 - 1400)</h3></TableCell>

                            <TableCell><h3>07 - 08 PM (1900 - 2000)</h3></TableCell>

                            <TableCell><h3>Non Standard</h3></TableCell>

                            <TableCell><CreateDeployment
                                releaseId={this.props.releaseId}
                            /></TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {this.props.rows.map(row => {

                            return (

                                <TableRow
                                    key={row.id}>

                                    <TableCell
                                        component="th"
                                        scope="row">

                                        {row.relDate}

                                    </TableCell>

                                    <TableCell
                                    >{row.relEnv}</TableCell>

                                    <TableCell
                                    >{row.depWindowThree &&
                                        row.depWindowThree.map(comp => {


                                            return (

                                                <DisplayChips
                                                    comp={comp}
                                                />

                                            );


                                        })}</TableCell>

                                    <TableCell
                                    >{row.depWindowOne &&
                                        row.depWindowOne.map(comp => {

                                            return (

                                                <DisplayChips
                                                    comp={comp}
                                                />

                                            );

                                        })}</TableCell>

                                    <TableCell
                                    >{row.depWindowTwo &&
                                        row.depWindowTwo.map(comp => {

                                            return (

                                                <DisplayChips
                                                    comp={comp}
                                                />

                                            );

                                        })}</TableCell>

                                    <TableCell
                                    >{row.depWindowFour &&
                                        row.depWindowFour.map(comp => {


                                            return (

                                                <DisplayChips
                                                    comp={comp}
                                                />

                                            );


                                        })}</TableCell>

                                    <TableCell
                                    >&nbsp;</TableCell>

                                </TableRow>

                            );

                        })}

                    </TableBody>

                </Table>

            </Paper>

        );

    }

};



export default withStyles(styles)(releasepage);