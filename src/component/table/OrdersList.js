import React, { Component } from 'react'
import { FoodConsumer } from '../../context'

export default class OrdersList extends Component {
    render() {
        return (
            <div className="col-12 mx-auto col-md-4 col-lg-7 my-3 maincontainer py-4">
                <h6> Foods ordered till now...  <i className="fas fa-hamburger foodlist_icon"></i></h6>
                <FoodConsumer>
                {(value) => {
                    return(
                        <div>
                        {
                            value.tableItem.orders?
                                value.tableItem.orders.length>0?
                                    value.tableItem.orders.map((item) => {
                                        return(
                                            <div className="card foodname_card" key = {item.item}>
                                                <div className="row foodname_row">
                                                    <div className="col-6 text-center text-capitalize">{item.item}</div>
                                                    <div className="col-4 text-center text-title-second">{(item.count===1)?<span className="itemcount mx-1 disabled">-</span>:<span className="itemcount mx-1" onClick = {()=>{value.decrementFoodCount(item.item)}}>-</span>}<span className="itemcount mx-1">{item.count}</span><span className="itemcount mx-1" onClick = {()=>{value.incrementFoodCount(item.item)}}>+</span></div>
                                                    <div className="col-2 text-center text-capitalize removefood fas fa-trash-alt" onClick={()=>{value.removeFood(item.item)}}></div>
                                                </div>
                                            </div>  
                                        )
                                    })
                                :<center> <p> No Item avalible in the cart.... </p> </center>
                            :<center> <p> No Item avalible in the cart.... </p> </center>
                        }
                        </div>
                    )
                        // if(value.tableItem.orders){
                        //     for(var i in value.tableItem.orders){
                        //         return(
                        //             <div className="card">
                        //                 <div className="row">
                        //                     <div className="col-3 text-center text-capitalize">{i}</div>
                        //                     <div className="col-3 text-center text-title-second">jlvh</div>
                        //                 </div>
                        //             </div>  
                        //         )
                        //     }
                        // }
                    }
                }
                </FoodConsumer>
            </div>
        )
    }
}
