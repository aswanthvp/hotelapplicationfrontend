import React, { Component } from 'react'

export default class ProductDetails extends Component {
    render() {
        const value = this.props.value;
        const { id,product,price,available } = this.props.product;
        return (
                <div className="col-7 mx-auto my-1 text-center text-title">
                    <div className="card">
                        <div className="row">
                            <div className="col-3 text-center text-capitalize">{product}</div>
                            <div className="col-3 text-center text-title-second">Rs: {price}</div>
                            <div className={`col-3 text-center p-1 ${available? 'fas fa-check-circle product_avalable':'fas fa-times-circle product_non_avalable '}` } 
                                onClick={ ()=> 
                                    {value.handleProductAvailability(id)}
                                }>

                            </div>
                            <div className="col-3 text-center p-1 fas fa-edit" 
                                onClick={(id)=>console.log("Clicked on edit button")}>

                            </div>
                        </div>
                    </div>                   
                </div>
        )
    }
}
