import React, { Component } from 'react'

import { productlist , modalProduct }  from './data'

const FoodContext = React.createContext();
//Provide
//Consumer


class FoodProvider extends Component {
    state = {
        productlist : productlist,
        modalProductOpen : false,
        modalProduct : modalProduct,
        foodName : "",
        foodPrice : ""
    }
    handleProductAvailability = (id) => {
        let tempProductList = [...this.state.productlist];
        const selectedProduct = tempProductList.find(item => {
            return item.id === id;
        });
        const index = tempProductList.indexOf(selectedProduct);
        const product = tempProductList[index];
        product.available = product.available ? false: true;
        this.setState(() => {
            return {
                productlist: [...tempProductList]
            };
        });
    }

    closeProductModal = () => {
        this.setState(() => {
            return { modalProductOpen: false };
        });
    };

    productOpenModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            product.edit = true
          return { modalProduct: product, modalProductOpen: true };
        });
    };

    productOpenModalAdd = () => {
        this.setState(() => {
          return { modalProduct: {id:"sdas", product:"", price:"", available:true, edit:false}, modalProductOpen: true };
        });
    };

    updateProduct = (id, food, price) => {
        let tempCart = [...this.state.productlist];
        const selectedProduct = tempCart.find(item => {
        return item.id === id;
        });
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.product = food;
        product.price = price;
        this.setState(() => {
            return {
                 productlist: [...tempCart] , modalProductOpen: false  
            };
        });
    }

    addProduct = ( food, price) => {
        let tempFood = {id:5,product:food,price:price,available:true}
        let tempCart = [...this.state.productlist];
        console.log(this.state.productlist)
        tempCart.push(tempFood);
        this.setState(() => {
            return {
                 productlist: tempCart , modalProductOpen: false  
            };
        });
    }

    getItem = id => {
        const product = this.state.productlist.find(item => item.id === id);
        return product;
    };

    render() {
        return (
            <FoodContext.Provider value={ 
                    {
                        ...this.state ,
                        handleProductAvailability : this.handleProductAvailability,
                        productOpenModal : this.productOpenModal,
                        productOpenModalAdd : this.productOpenModalAdd,
                        closeProductModal : this.closeProductModal,
                        updateProduct : this.updateProduct,
                        addProduct : this.addProduct
                    } 
                }>
                {this.props.children}
            </FoodContext.Provider>
        );
    }
}


const FoodConsumer = FoodContext.Consumer;

export { FoodProvider, FoodConsumer} ; 