import React, { Component } from 'react'
import Table from './Table'
import Title from '../Title'
import { FoodConsumer } from "../../context";

export default class TableList extends Component {
    render() {
        return (
            <div className="">
                <Title name="Table" title=" View" />
                <div className="container py-5">
                    <div className="row">
                        <FoodConsumer>
                            {value => {
                                return value.tableList.map(table => {
                                    return <Table key={table.id} table={table} />;
                                });
                            }}
                        </FoodConsumer>
                    </div>
                </div>
            </div>
        )
    }
}
