import React from 'react';    
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
import {Link } from 'react-router-dom'

import { getAllBands } from './band_api.js'

class BandList extends React.Component {
  
    constructor() {
        super()
        this.state = {
            fetching: true,
            bands: []
        }
    }

    componentDidMount() {
        // when starting load the list of bands, the callback will set the state
        // and hence convert the page from loading to showing the list. 
        // This is the same in the album page as well
        getAllBands((bands) => {
            this.setState({
                fetching: false,
                bands: bands
            })
        })
    }

    render() {

        const { fetching, bands } = this.state;

        // just put this here for clarity to show the linking to the band route. 
        const LinkToBand = ({bandName}) => 
            <Link to={ "/band/" + bandName }>{ bandName }</Link>

        if (fetching) {
            return <div>Loading Bands...</div>
        } else {
            return  (
                <Table>
                <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
                    <TableRow>
                    <TableHeaderColumn>Band Name</TableHeaderColumn>
                    <TableHeaderColumn>Year Formed</TableHeaderColumn>
                    <TableHeaderColumn>Country Of Origin</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={ false }>
                    { bands.map(b => 
                        <TableRow>
                            <TableRowColumn><LinkToBand bandName={ b.name } /></TableRowColumn>
                            <TableRowColumn>{ b.year }</TableRowColumn>
                            <TableRowColumn>{ b.country }</TableRowColumn>
                        </TableRow>
                    ) }
                </TableBody>
                </Table>
            )
        }
    }
}

export default BandList;