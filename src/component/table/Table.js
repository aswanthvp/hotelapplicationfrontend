import React, { Component } from 'react'
import styled from "styled-components";
import { FoodConsumer } from "../../context";
import { Link } from 'react-router-dom';


export default class Table extends Component {
    render() {
        const {_id , table, occupied} = this.props.table;
        return (
            <TableWrapper className="col-9 mx-auto col-md-6 col-lg-2 my-3">
                <div className="card tablecard">
                    <FoodConsumer>
                        {value => {
                        return (
                          <div>
                            <div className="img-container p-4 align-self-center">
                                <p className="align-self-center text-color">{table}</p>
                                {
                                  occupied?
                                    <div onClick={()=>{
                                        value.tableContentItem(table)
                                      }}>
                                      <Link to="/tablecontent">
                                        <img src='table.jpeg' alt="" className="card-img-top" />
                                      </Link>
                                    </div>:
                                    <div>
                                    <button
                                      className="cart-btn-edit"
                                      // disabled={inCart ? true : false}
                                      onClick={() => {
                                        value.tableOpenModalUpdate(_id,table);
                                      }}
                                    >
                                      
                                        <i className="fas fa-edit" />
                                    </button>
                                    <button
                                      className="cart-btn-delete"
                                      // disabled={inCart ? true : false}
                                      onClick={() => {
                                        value.tableDelete(_id,table);
                                        // value.openModal(id);
                                      }}
                                    >
                                      
                                        <i className="fas fa-trash-alt" />
                                    </button>
                                   <img src='table.jpeg' alt="" className="card-img-top" />
                                   </div>
                                }
                               
                            </div>
                            <div className="card-footer">
                                {occupied?
                                  <button className="align-self-center button button_occupied btn btn-default btn-sm">Occupied <i className="fa fa-arrow-circle-right button_arrow_color"></i></button>:
                                  <button className="align-self-center button button_available btn btn-default btn-sm" onClick={()=>value.tableTake(_id,table)}>Available <i className="fa fa fa-arrow-circle-down button_arrow_color_available"></i></button>   
                                }
                            </div>
                          </div>
                        );
                       
                        }}
                        
                    </FoodConsumer>
                   
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
  .cart-btn-delete {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--mainlightBlue);
    border: none;
    color: var(--mainlightRed);
    font-size: .8rem;
    border-radius: 0 0 0 0.5rem;
    transform: translate(100%, 100%);
    transition: all 1s ease-in-out;
  }
  .cart-btn-edit {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.2rem 0.4rem;
    background: var(--mainlightBlue);
    border: none;
    color: var(--mainlightGreen);
    font-size: .8rem;
    border-radius: 0 0 0.5rem 0;
    transform: translate(-100%, -100%);
    transition: all 1s ease-in-out;
  }
  .img-container:hover .cart-btn-delete {
    transform: translate(0, 0);
  }
  .img-container:hover .cart-btn-edit {
    transform: translate(0, 0);
  }
  .cart-btn-delete:hover {
    color: var(--mainRed);
    background: var(--lightBlue);
    cursor: pointer;
  }
  .cart-btn-edit:hover {
    color: var(--mainGreen);
    background: var(--lightBlue);
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