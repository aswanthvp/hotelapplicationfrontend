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
                                console.log(value.tableList)
                                return value.tableList.map(table => {
                                    console.log(table._id);
                                    return <Table key={table._id} table={table} />;
                                });
                            }}
                        </FoodConsumer>
                    </div>
                </div>
            </div>
        )
    }
}
