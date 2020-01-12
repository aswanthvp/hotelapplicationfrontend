import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { FoodConsumer } from '../../context'
import styled from "styled-components";

export default class ModalTable extends Component {
    constructor(props)
    {
      super(props);
      this.state = {
          tableName: ''
        };
    }
    render() {
        return (
            <FoodConsumer>
                {value =>{
                    const { modalTableOpen, closeTableModal, updateTable, addTable } = value;
                    const {  table,edit} = value.modalTable;
                    if(!modalTableOpen){
                        return null
                    }else{
                        return(
                            <ModalContainer>
                                <div className="container ">
                                    <div className="row ">
                                        <div
                                        className="col-8 mx-auto col-md-6 col-lg-4 p-5 text-center text-capitalize product_modal" id="modalProduct"
                                        >
                                        <h5>{edit ? "Food Edit" :"Add Table"}</h5>
                                        <p className="text-muted">Table name: <input id="tableName"   type="text" defaultValue = { table } ref={(c) => this.tableName = c}/></p>
                                        <Link to="/">
                                            <button className="product_button"   
                                                onClick={ () => { 
                                                    closeTableModal() 
                                                }}> 
                                                Cancel 
                                            </button>
                                        </Link>
                                        <Link to="/">
                                            {edit ? 
                                                <button className="product_button"
                                                    onClick={() => {
                                                        updateTable(this.tableName.value)
                                                    }}>
                                                    Update
                                                </button>
                                            :
                                                <button className="product_button"
                                                    onClick={() => {
                                                        addTable(this.tableName.value)
                                                    }}>
                                                    Add
                                                </button>
                                            }
                                        </Link>
                                        </div>
                                    </div>
                                    </div>
                            </ModalContainer>
                        )
                    }
                }}
            </FoodConsumer>
        )
    }
}


const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal {
    background: var(--mainWhite);
  }
`;