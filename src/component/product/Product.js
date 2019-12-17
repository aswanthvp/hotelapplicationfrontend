import React, { Component } from 'react'
import Title from "../Title"
import { FoodConsumer } from '../../context'
import ProductDetails from './ProductDetails'

export default class Product extends Component {
    render() {
        return (
            <div>
                <Title name="Foods" title="Available" />
                <FoodConsumer>
                    {(value)=>{
                        return(
                            <div className="col-1 ml-auto">
                                <div className=" fas fa-plus-circle add_product" 
                                    onClick={() => {
                                    value.productOpenModalAdd();
                                    }}>
                                </div>
                            </div>
                        )
                    }}
                </FoodConsumer>
                
                <div className="row">
                    <div className="product_window col-7 mx-auto">
                        <FoodConsumer>
                            {(value)=>{
                                return value.productlist.map((product) => {
                                    return <ProductDetails key={product.id} value = {value} product={product} ></ProductDetails>                                
                                })
                            }}
                        </FoodConsumer>
                    </div>
                </div>
            </div>
           
        )
    }
}
