import React, { Component } from 'react'
import { FoodConsumer } from '../../context'
import Title from "../Title"
import FoodSelect from "./FoodSelect"
import OrdersList from "./OrdersList"

export default class TableContent extends Component {
    render() {
        return (         
            <FoodConsumer>
                {value => {
                    return(
                        <div>
                            <Title name={value.tableItem.table} title="Orders" />
                            <div className="container">
                                <div className="row">
                                    <FoodSelect value={value}></FoodSelect>
                                    <OrdersList ></OrdersList>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </FoodConsumer>
        )
    }
}
