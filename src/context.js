import React, { Component } from 'react'

import { productlist , modalProduct, foodCategory, tableList, tableOrder }  from './data'

const FoodContext = React.createContext();
//Provide
//Consumer


class FoodProvider extends Component {
    state = {
        productlist : productlist,
        modalProductOpen : false,
        modalProduct : modalProduct,
        foodName : "",
        foodPrice : "",
        foodCategory : foodCategory,
        foodCategoryDisplay : "All",
        deleteCategory : false,
        tableList : tableList,
        tableOrder : tableOrder,
        tableItem : {}
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

    productCategoryEdit = () =>{
        let temp;
        if(this.state.deleteCategory){
            temp = false;
        }else{
            temp = true;
        }
        this.setState(() =>{
            return{deleteCategory:temp}
        })
    }

    productCategoryAdd = (category) => {
        if(category === ""){
            
            document.getElementById("foodCategory").classList.add("warning");
        }else{
            document.getElementById("foodCategory").classList.remove("warning");
            let temp = [...this.state.foodCategory];
            temp.push(category);
            temp = [...new Set(temp)];
            console.log(temp)
            this.setState(()=>{
                return {foodCategory:temp}
            });
            document.getElementById("foodCategory").value = "";
        }
    }

    productCategoryDelete = (category) => {
        if(category === "All"){
            alert("Cant delet All")
            return null
        }else{

            let temp = [...this.state.foodCategory]
            let tempNew = [];
            temp.forEach((item)=>{
                if (item !== category){
                    tempNew.push(item)
                }
            });
            this.setState(()=>{
                return {foodCategory:tempNew}
            })
        }
    }

    updatefoodCategoryDisplay = (foodCategory) => {
        this.setState(()=>{
            return {foodCategoryDisplay:foodCategory}
        })
    }

    updateProduct = (id, food, price,category) => {
        let tempCart = [...this.state.productlist];
        const selectedProduct = tempCart.find(item => {
        return item.id === id;
        });
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.product = food;
        product.price = price;
        product.category = category;
        this.setState(() => {
            return {
                 productlist: [...tempCart] , modalProductOpen: false  
            };
        });
    }

    addProduct = ( food, price ,category) => {
        console.log(category)
        if(food === ""){
            console.log("please enter food name");
            document.getElementById("foodName").classList.add("warning");
        }
        else if(category === ""){
            console.log("please select the category");
            document.getElementById("selectCategory").classList.add("warning");
            document.getElementById("foodName").classList.remove("warning");
        }
        else if(price === "" || isNaN(price)){
            console.log("please enter the food price");
            document.getElementById("foodName").classList.remove("warning");
            document.getElementById("foodPrice").classList.add("warning");
        }
        else{

            document.getElementById("foodName").classList.remove("warning");
            document.getElementById("foodPrice").classList.remove("warning");
            let tempFood = {id:Math.floor(Math.random()*1000),product:food,price:price,available:true,category:category}
            let tempCart = [...this.state.productlist];
            console.log(this.state.productlist)
            tempCart.push(tempFood);
            console.log(tempCart)
            this.setState(() => {
                return {
                    productlist: tempCart , modalProductOpen: false  
                };
            });
        }
    }

    getItem = id => {
        const product = this.state.productlist.find(item => item.id === id);
        return product;
    };

    tableContentItem = (id) => {
        const tableitem = this.state.tableOrder.find(item =>item.id === id);
        console.log(tableitem);
        this.setState(() =>{
            return{
                tableItem : tableitem
            }
        });
    }

    tableTake = id => {
        let tables = [...this.state.tableList];
        let tabletake = tables.find((item) =>item.id === id);
        const index = tables.indexOf(tabletake);
        const table = tables[index];
        table.occupied = true;
        let tableorders = [...this.state.tableOrder];
        let tablenew = {id:id,table:table.table,order:{}}
        tableorders.push(tablenew);
        this.setState(() =>{
            return{
                tableList : [...tables],
                tableOrder : tableorders
            }
        })
    }

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
                        addProduct : this.addProduct,
                        productCategoryEdit : this.productCategoryEdit,
                        productCategoryDelete : this.productCategoryDelete,
                        productCategoryAdd : this.productCategoryAdd,
                        updatefoodCategoryDisplay : this.updatefoodCategoryDisplay,
                        tableContentItem : this.tableContentItem,
                        tableTake : this.tableTake
                    } 
                }>
                {this.props.children}
            </FoodContext.Provider>
        );
    }
}


const FoodConsumer = FoodContext.Consumer;

export { FoodProvider, FoodConsumer} ; 