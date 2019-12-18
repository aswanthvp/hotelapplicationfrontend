import React, { Component } from 'react'
import Title from "../Title"
import { FoodConsumer } from '../../context'
import ProductDetails from './ProductDetails'
import ProductCategory from './ProductCategory'

export default class Product extends Component {
    render() {
        return (
            <div>
                <Title name="Foods" title="Available" />
                <FoodConsumer>
                    {(value)=>{
                        return(
                            <div>
                                <div className="row">
                                    <ProductCategory value = {value}></ProductCategory>
                                    <div className="col-8">
                                        <div className="row">
                                            <div className="col-2">{value.foodCategoryDisplay} Menu  </div>
                                            <div className="col-8 mx-auto">
                                                <p>{}</p>
                                            </div>
                                            <div className="col-2 ml-auto ">
                                                <div className=" fas fa-plus-circle add_product pull-right" 
                                                    onClick={() => {
                                                    value.productOpenModalAdd();
                                                    }}>
                                                </div>
                                            </div>      
                                        </div>                                          
                                        <div className="row">
                                            <div className="product_window col-10 mr-auto">
                                                        {
                                                            value.foodCategoryDisplay === "All"?
                                                                (
                                                                    value.productlist.map((product) => {
                                                                        return <ProductDetails key={product.id} value = {value} product={product} ></ProductDetails>                                
                                                                    })
                                                                ):(
                                                                   value.productlist.filter((product) =>{
                                                                       return product.category === value.foodCategoryDisplay;
                                                                   }).map((product)=>{
                                                                        return <ProductDetails key={product.id} value = {value} product={product} ></ProductDetails>
                                                                   })
                                                                )
                                                        }
                                            </div>
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        )}}
                </FoodConsumer>  
            </div> 
        )
    }
}
