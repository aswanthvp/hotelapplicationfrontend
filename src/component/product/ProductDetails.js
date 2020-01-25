import React, { Component } from 'react'

export default class ProductDetails extends Component {
    render() {
        const value = this.props.value;
        const { _id,product,price,available } = this.props.product;
        return (
            <div className="col-lg-9 col-md-12 col-sm-12 mx-auto py-1 text-center text-title">
                <div className="card food_details_card">
                    <div className="row">
                        <div className="col-6 col-lg-3 text-center p-1 text-capitalize">{product}</div>
                        <div className="col-6 col-lg-3 text-center p-1 text-title-second">Rs: {price}</div>
                        <div className={`col-6 col-lg-3 text-center p-1 ${available? 'fas fa-check-circle product_avalable':'fas fa-times-circle product_non_avalable '}` } 
                            onClick={ ()=>  
                                {value.handleProductAvailability(_id)}
                            }>

                        </div>
                        <div className="col-6 col-lg-3 text-center p-1 fas fa-edit" 
                            onClick={ ()=>
                               {value.productOpenModal(_id)}
                            }>

                        </div>
                    </div>
                </div>                   
            </div>
        )
    }
}
