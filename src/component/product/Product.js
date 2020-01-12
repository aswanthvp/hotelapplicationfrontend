import React, { Component } from 'react'
import Title from "../Title"
import { FoodConsumer } from '../../context'
import ProductDetails from './ProductDetails'
import ProductCategory from './ProductCategory'

export default class Product extends Component {
    render() {
        return (
            <div>
                <Title name="Food" title="Available" />
                <FoodConsumer>
                    {(value)=>{
                        return(
                            <div>
                                <div className="row">
                                    <ProductCategory value = {value}></ProductCategory>
                                    <div className="col-12 mx-auto col-md-4 col-lg-7 my-3">
                                        <div className="row container">
                                            <div className="product_menu_selected">{value.foodCategoryDisplay} Menu  </div>
                                            <div className="col-2 mx-auto">
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
                                        <div className="row container margin_auto">
                                            <div className="product_window col-12 ">
                                                        {
                                                            value.foodCategoryDisplay === "All"?
                                                                (
                                                                    (value.productlist.length>0?
                                                                        (
                                                                            value.productlist.map((product) => {
                                                                             return <ProductDetails key={product._id} value = {value} product={product} ></ProductDetails>                                
                                                                            })
                                                                        ):(
                                                                            <p>No Food Available Here.<br/>Add Food to the category to display here</p>
                                                                        )
                                                                    )
                                                                ):(
                                                                        
                                                                        (value.productlist.filter((product) =>{
                                                                            console.log(value.foodCategoryDisplay)
                                                                            console.log(product)
                                                                            return product.category === value.foodCategoryDisplay
                                                                        }).length>0?
                                                                            (
                                                                                value.productlist.filter((product) =>{
                                                                                    return product.category === value.foodCategoryDisplay;
                                                                                }).map((product)=>{
                                                                                    return <ProductDetails key={product._id} value = {value} product={product} ></ProductDetails>
                                                                                })
                                                                            ):(
                                                                                <p>No Food Available Here.<br/>Add Food to the category to display here</p>
                                                                                 
                                                                            )
                                                                        )
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
