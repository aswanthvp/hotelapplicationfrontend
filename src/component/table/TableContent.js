import React, { Component } from 'react'
import { FoodConsumer } from '../../context'
import Title from "../Title"

export default class TableContent extends Component {
    render() {
        return (         
            <FoodConsumer>
                {value => {
                    return(
                        <Title name={value.tableItem.table} title="Orders" />
                    )
                }}
            </FoodConsumer>
        )
    }
}
