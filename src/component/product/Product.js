import React, { Component } from 'react'
import Title from "../Title"
import { FoodConsumer } from '../../context'
import ProductDetails from './ProductDetails'

export default class Product extends Component {
    render() {
        return (
            <div>
                 <Title name="Product" title="Available" />
                 <div className="row">
                    <FoodConsumer>
                        {(value)=>{
                            return value.productlist.map((product) => {
                                console.log(product)
                                return <ProductDetails key={product.id} value = {value} product={product} ></ProductDetails>                                
                            })
                        }}
                    </FoodConsumer>
                </div>
            </div>
           
        )
    }
}
