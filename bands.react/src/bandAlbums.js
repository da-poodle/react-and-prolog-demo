import React from 'react';    
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

import { getAlbumsForBand } from './band_api.js'

class BandAlbums extends React.Component {
  
    constructor() {
        super()
        this.state = {
            fetching: true,
            albums: []
        }
    }

    componentDidMount() {
        // this is how we get the id that is specified in the /band/:id of the route.
        let id = this.props.match.params.id;

        // same as for the band list page
        getAlbumsForBand(id, (bands) => {
            this.setState({
                fetching: false,
                albums: bands
            })
        })
    }

    render() {

        const { fetching, albums } = this.state;

        if (fetching) {
            return <div>Loading Albums...</div>
        } else {
            return  (
                <Table>
                <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
                    <TableRow>
                    <TableHeaderColumn>Album Name</TableHeaderColumn>
                    <TableHeaderColumn>Year Released</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={ false }>
                    { albums.map(b => 
                        <TableRow>
                            <TableRowColumn>{ b.name }</TableRowColumn>
                            <TableRowColumn>{ b.year }</TableRowColumn>
                        </TableRow>
                    ) }
                </TableBody>
                </Table>
            )
        }
    }
}

export default BandAlbums;