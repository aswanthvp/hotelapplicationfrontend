import React, { Component } from 'react'

import { productlist }  from './data'

const FoodContext = React.createContext();
//Provide
//Consumer


class FoodProvider extends Component {
    state = {
        productlist : productlist
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
    render() {
        return (
            <FoodContext.Provider value={ 
                    {
                        ...this.state ,
                        handleProductAvailability:this.handleProductAvailability
                    } 
                }>
                {this.props.children}
            </FoodContext.Provider>
        );
    }
}


const FoodConsumer = FoodContext.Consumer;

export { FoodProvider, FoodConsumer} ; 