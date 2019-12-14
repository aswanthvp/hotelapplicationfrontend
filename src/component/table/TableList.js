import React, { Component } from 'react'
import Table from './Table'
import Title from '../Title'

export default class TableList extends Component {
    render() {
        return (
            <div>
                <Title name="Table" title=" View" />
                <Table></Table>
            </div>
        )
    }
}
