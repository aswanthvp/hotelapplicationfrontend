import React, { Component } from 'react'
import styled from "styled-components";
import { FoodConsumer } from "../../context";

export default class Table extends Component {
    render() {
        const {id, table, occupied} = this.props.table;
        console.log(occupied);
        return (
            <TableWrapper className="col-9 mx-auto col-md-6 col-lg-2 my-3">
                <div className="card">
                    <FoodConsumer>
                        {value => {
                        return (
                            <div className="img-container p-4 align-self-center">
                                <p className="align-self-center text-color">{table}</p>
                                <img src='table.jpeg' alt="" className="card-img-top" />
                            </div>
                            // <div
                            // className="img-container p-5"
                            // onClick={() => value.handleDetail(id)}
                            // >
                            // <Link to="/details">
                            //     <img src={img} alt="" className="card-img-top" />
                            // </Link>
                            // <button
                            //     className="cart-btn"
                            //     disabled={inCart ? true : false}
                            //     onClick={() => {
                            //     value.addToCart(id);
                            //     value.openModal(id);
                            //     }}
                            // >
                            //     {inCart ? (
                            //     <p className="text-capitalize mb-0" disabled>
                            //         in cart
                            //     </p>
                            //     ) : (
                            //     <i className="fas fa-cart-plus" />
                            //     )}
                            // </button>
                            // </div>
                            // <p>aksb</p>
                        );
                        }}
                    </FoodConsumer>
                    <div className="card-footer">
                        {occupied?
                          <a className="align-self-center button button_occupied">Occupied <i className="fa fa-arrow-circle-right button_arrow_color"></i></a>:
                          <a className="align-self-center button button_available">Available <i className="fa fa fa-arrow-circle-down button_arrow_color_available"></i></a>
                          
                        }
                        
                    </div>
                </div>
            </TableWrapper>
        )
    }
}


const TableWrapper = styled.div`
  .card {
    border-radius: 5px;
    border-color: transparent;
    transition: all 1s linear;
  }
  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all 1s linear;
    padding :0px !important;
    background-color:var(--mainWhite) !important;
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .card-footer {
      background: rgba(247, 247, 247);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
  }
  .card-img-top {
    transition: all 1s linear;
  }
  .img-container:hover .card-img-top {
    transform: scale(1.1);
  }
  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 1s ease-in-out;
  }
  .img-container:hover .cart-btn {
    transform: translate(0, 0);
  }
  .cart-btn:hover {
    color: var(--mainBlue);
    cursor: pointer;
  }
  .text-color{
    color:#3b5cd6!important;
  }
  .button{
    width: -webkit-fill-available;
    cursor: grab;
    border: none;
    text-align: center;
    text-decoration: none;
    display: inline-block;
  }
  .button_occupied{
    background-color:#ffffff!important;
  }
  .button_available{
    background-color: #4CAF50;
  }
  .button_arrow_color{
    color:#23f34f;
    margin-left: 10%;
  }
  .button_arrow_color_available{
    color:#f8f9fa;
    margin-left:10%;
  }
`;