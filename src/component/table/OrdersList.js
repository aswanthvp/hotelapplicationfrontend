import React, { Component } from 'react'
import { FoodConsumer } from '../../context'
import { Link } from "react-router-dom";

export default class OrdersList extends Component {
    render() {
        return (
            <div className="mx-auto col-lg-8 col-md-8 col-sm-12 my-3 maincontainer py-4 backgrounwhite">
                <h6> Foods ordered till now...  <i className="fas fa-hamburger foodlist_icon"></i></h6>
                <FoodConsumer>
                {(value) => {
                    return(
                        <div className="mt-4">
                        {
                            value.tableItem.orders?
                                value.tableItem.orders.length>0?
                                    value.tableItem.orders.map((item) => {
                                        let productdetails = value.productlist.filter((food) =>{return food.product === item.item});
                                        return(
                                            <div className="card foodname_card mb-2 pb-2" key = {item.item}>
                                                <div className="row foodname_row">
                                                    <div className="col-3 col-sm-3 col-xs-3 text-center text-capitalize foodlist">{item.item}</div>
                                                    <div className="col-1 col-sm-1 col-xs-1 text-center text-capitalize foodlist">Rs. {productdetails[0].price}</div>
                                                    <div className="col-5 col-sm-5 col-xs-5 text-center text-title-second foodlist">{(item.count===1)?<span className="itemcount mx-1 disabled">-</span>:<span className="itemcount mx-1" onClick = {()=>{value.decrementFoodCount(item.item)}}>-</span>}<span className="itemcount mx-1">{item.count}</span><span className="itemcount mx-1" onClick = {()=>{value.incrementFoodCount(item.item)}}>+</span></div>
                                                    <div className="col-2 col-sm-2 col-xs-2 text-center text-capitalize foodlist">Rs. {productdetails[0].price * item.count}</div>
                                                    <div className="col-1 col-sm-1 col-xs-2 text-center text-capitalize removefood fas fa-trash-alt foodlist" onClick={()=>{value.removeFood(item.item)}}></div>
                                                </div>
                                            </div>  
                                        )
                                    })
                                :<center> <p> No Item avalible in the cart.... </p> </center>
                            :<center> <p> No Item avalible in the cart.... </p> </center>
                        }
                        <p className="text-right mr-5 m-4">Total:  Rs. {value.calTotal()}</p>
                        {
                            value.tableItem.orders?
                                value.tableItem.orders.length>0?
                                    <Link to="/">
                                        {/* <button className="my-3 btn btn-default btn-sm button_add_category float-right" onClick={() =>{value.billPaid()}} >Bill paid</button> */}
                                        <button className="btn btn-outline-info my-2 my-sm-0 button_add_category" onClick={() =>{value.billPaid()}} >Bill paid</button>
                                    </Link>
                                :   <Link to="/">
                                    <button className="btn btn-outline-info my-2 my-sm-0 button_add_category" onClick={() =>{value.freeTable()}} >Free Table</button>
                                        {/* <button className="my-3 btn btn-default btn-sm button_add_category float-right" onClick={() =>{value.freeTable()}} >Free Table</button> */}
                                    </Link>
                            : null
                        }
                        </div>
                    )}
                }
                </FoodConsumer>
                
            </div>
        )
    }
}
