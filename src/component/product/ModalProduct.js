import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { FoodConsumer } from '../../context'
import styled from "styled-components";


export default class ModalProduct extends Component {
    constructor(props)
    {
      super(props);
      this.state = {
          foodName: '',
          foodPrice:"",
          foodCategory:""
        };
    }
    
    updateCategory = (event) => {
        let category = event.target.value;
        console.log(category)
        this.setState(()=>{
            return{foodCategory:category}
        })
    }
    render() {
        return (
            <FoodConsumer>
                {value =>{
                    const { modalProductOpen, closeProductModal, updateProduct, addProduct } = value;
                    const { id, product, price, edit } = value.modalProduct;
                    if(!modalProductOpen){
                        return null
                    }else{
                        return(
                            <ModalContainer>
                                <div className="container ">
                                    <div className="row ">
                                        <div
                                        className="col-8 mx-auto col-md-6 col-lg-4 p-5 text-center text-capitalize product_modal"
                                        id="modalProduct"
                                        >
                                        <h5>{edit ? "Food Edit" :"Add Food"}</h5>
                                        <p className="text-muted">Food: <input id="foodName"   type="text" defaultValue = { product } ref={(c) => this.foodName = c}/></p>
                                        <p className="text-muted">Category: 
                                            <select onChange={(e)=>
                                                {
                                                   this.updateCategory(e); 
                                                }
                                            }>
                                                {value.foodCategory.map((item)=>{
                                                        if(item !== "All")
                                                            return <option value={item} key={item}>{item}</option>
                                                        else
                                                            return null
                                                })
                                                }
                                            </select>
                                        </p>
                                        <p className="text-muted">Price: <input id="foodPrice"  type="text" defaultValue = { price } ref={(c) => this.foodPrice = c}/></p>

                                        <Link to="/product">
                                            <button className="product_button"   
                                                onClick={ () => { 
                                                    closeProductModal() 
                                                }}> 
                                                Cancel 
                                            </button>
                                        </Link>
                                        <Link to="/product">
                                            {edit ? 
                                                <button className="product_button"
                                                    onClick={() => {
                                                        updateProduct(id, this.foodName.value,this.foodPrice.value,this.foodCategory)
                                                    }}>
                                                    Update
                                                </button>
                                            :
                                                <button className="product_button"
                                                    onClick={() => {
                                                        console.log(this.state)
                                                        addProduct(this.foodName.value,this.foodPrice.value, this.state.foodCategory)
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