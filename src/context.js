import React, { Component } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import axios from "axios";
import { productlist ,foodCategory, tableList, tableOrder, orderDetails, foodStatus }  from './data'

const FoodContext = React.createContext();
const backendURL = 'https://hotelapplicationbackend.herokuapp.com/';
const backendURL1 = 'https://hotelapplicationbackend.herokuapp.com/';
const backendURL2 = 'http://localhost:3030/';

//Provide
//Consumer


class FoodProvider extends Component {
    constructor(props){
        super(props);
        this.state = {
            // productlist : productlist,
            // modalProductOpen : false,
            // modalProduct : {},
            // foodName : "",
            // foodPrice : "",
            // foodCategory : foodCategory,
            // foodCategoryDisplay : "All",
            // deleteCategory : false,
            // tableList : tableList,
            // tableOrder : tableOrder,
            // tableItem : {},
            // orderDetails : orderDetails,
            // foodStatus : foodStatus,
            // modalTableOpen : true

            ////////////////////////////////
            productlist : [],
            modalProductOpen : false,
            modalProduct : {},
            foodName : "",
            foodPrice : "",
            tableName : "",
            foodCategory : foodCategory,
            foodCategoryDisplay : "All",
            deleteCategory : false,
            tableList : [],
            tableOrder : [],
            tableItem : {},
            orderDetails : [],
            foodStatus : foodStatus,
            modalTableOpen : false,
            modalTable : {}
        }
    }
    componentDidMount() {
        this.gettables();
        this.gettableOrder();
        this.getProduct();
    }

    //Table operations **********************************************
    //Function to close the table modal
    closeTableModal = () => {
        this.setState(() => {
            return { modalTableOpen: false };
        });
    };

    //Function to open the table modal to edit the table
    tableOpenModalUpdate = (id,table) =>{
        this.setState(() => {
            return { modalTable:{_id:id,table:table,edit:true}, modalTableOpen: true };
        });
    }

    //Function to open the table modal to add the table
    tableOpenModalAdd = () => {
        this.setState(() => {
          return {  modalTableOpen: true };
        });
    };

    //Function to get the table details from the DB
    gettables = () =>{
        axios({
            url:backendURL+`table/getables`,
            method:"get"
        }).then(response => {
            if(response.data.result==="ok"){
                this.setState(() => {
                    return {
                        tableList: [...response.data.data]
                    };
                });
            }
        }).catch(err=>{
            console.log(err)
        });
    }

    //Function to delete the table from the DB
    tableDelete = (id,table) => {
        let temptable= {id:id};
        axios({
            url:backendURL+`table/deletetable`,
            method:"post",
            data: temptable
        }).then(response => {
            if(response.data.result==="ok"){
                this.gettables();
                this.setState(() => {
                    return { modalTableOpen: false };
                });
            }
        }).catch(err=>{
            console.log(err)
        });
    }

    //Function to update the table name from the DB
    updateTable = (table) =>{
        let modaltable = this.state.modalTable;
        let temptable= {table:table,id:modaltable._id};
        axios({
            url:backendURL+`table/updatetable`,
            method:"post",
            data: temptable
        }).then(response => {
            if(response.data.result==="ok"){
                this.gettables();
                this.setState(() => {
                    return { modalTableOpen: false };
                });
            }else if(response.data.result === "failed"){
                alert("able name already there");
            }else{
                alert("Error occured while adding the table")
            }
        }).catch(err=>{
            console.log(err)
        });
    };

    //Function to add the table to the DB
    addTable = (tableName) =>{
        let temptable= {table:tableName};
        axios({
            url:backendURL+`table/addtable`,
            method:"post",
            data: temptable
        }).then(response => {
            if(response.data.result==="ok"){
                this.gettables();
                this.setState(() => {
                    return { modalTableOpen: false };
                });
            }else if(response.data.result === "failed"){
                alert("able name already there");
            }else{
                alert("Error occured while adding the table")
            }
        }).catch(err=>{
            console.log(err)
        });
    }

    //Function to get the table orders details
    gettableOrder = () => {
        axios({
            url:backendURL+`tableorders/getorders`,
            method:"post"
        }).then(response => {
            if(response.data.result==="ok"){
                this.setState(() => {
                    return {
                        tableOrder: [...response.data.data]
                    };
                });
            }
        }).catch(err=>{
            console.log(err)
        });
    }

    //Function to take the table or to make it occupied
    tableTake = (id,table) => {
        let temptable= {id:id,table:table};
        axios({
            url:backendURL+`table/taketable`,
            method:"post",
            data: temptable
        }).then(response => {
            if(response.data.result==="ok"){
                this.gettables();
                this.gettableOrder();
            }
        }).catch(err=>{
            console.log(err)
        });
    }

    //Function to assign table order details in table list 
    tableContentItem = (table) => {
        const tableitem = this.state.tableOrder.find(item =>item.table === table);
        this.setState(() =>{
            return{
                tableItem : tableitem
            }
        });
    }

    //Function to free the table 
    freeTable = () =>{
        var tableitem = this.state.tableItem;
        let temptable= {id:tableitem._id,table:tableitem.table};
        axios({
            url:backendURL+`table/freetable`,
            method:"post",
            data: temptable
        }).then(response => {
            if(response.data.result==="ok"){
                this.gettables();
                return{
                    tableItem : {}
                }
            }
        }).catch(err=>{
            console.log(err)
        });
    }



    //****************************************** */
    //Function to handle the product

    //Function to get the product from the DB
    getProduct = () => {
        axios({
            url:backendURL+`product/getproduct`,
            method:"get"
        }).then(response => {
            if(response.data.result==="ok"){
                this.setState(() => {
                    return {
                        productlist: [...response.data.data]
                    };
                });
            }
        }).catch(err=>{
            console.log(err)
        });
    }

    //Function to add the product
    addProduct = ( food, price ,category) => {
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
            let tempFood = {_id:Math.floor(Math.random()*1000),product:food,price:price,available:true,category:category}
            axios({
                url:backendURL+`product/addproduct`,
                method:"post",
                data : tempFood
            }).then(response => {
                if(response.data.result==="ok"){
                    this.getProduct();
                    this.setState(() => {
                        return {
                            modalProductOpen: false  
                        };
                    });
                }else if(response.data.result === 'failed'){
                    alert("Product already added")
                }else{
                    alert("Error occured while adding product")
                }
            }).catch(err=>{
                console.log(err)
            });
            
        }
    }

    //Function to update the product
    updateProduct = (id, food, price,category) => {
        let tempFood = {id:id,product:food,price:price,category:category}
        axios({
            url:backendURL+`product/updateproduct`,
            method:"post",
            data : tempFood
        }).then(response => {
            if(response.data.result==="ok"){
                this.getProduct();
                this.setState(() => {
                    return {
                        modalProductOpen: false  
                    };
                });
            }else if(response.data.result === 'failed'){
                alert("Product already added")
            }else{
                alert("Error occured while adding product")
            }
        }).catch(err=>{
            console.log(err)
        });
    }

    //Function to chnage the product availability
    handleProductAvailability = (id) => {
        // let tempProductList = [...this.state.productlist];
        // const selectedProduct = tempProductList.find(item => {
        //     return item._id === id;
        // });
        // const index = tempProductList.indexOf(selectedProduct);
        // const product = tempProductList[index];
        // product.available = product.available ? false: true;
        // this.setState(() => {
        //     return {
        //         productlist: [...tempProductList]
        //     };
        // });
        let tempFood ={id:id}
        axios({
            url:backendURL+`product/updateproductavailability`,
            method:"post",
            data : tempFood
        }).then(response => {
            if(response.data.result==="ok"){
                this.getProduct();
                this.setState(() => {
                    return {
                        modalProductOpen: false  
                    };
                });
            }else if(response.data.result === 'failed'){
                alert("Product already added")
            }else{
                alert("Error occured while adding product")
            }
        }).catch(err=>{
            console.log(err)
        });
    }

    //Function to close the product modal 
    closeProductModal = () => {
        this.setState(() => {
            return { modalProductOpen: false };
        });
    };

    //Function to open the product modal
    productOpenModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            product.edit = true
          return { modalProduct: product, modalProductOpen: true };
        });
    };

    //Function to add the product details in
    productOpenModalAdd = () => {
        this.setState(() => {
          return { modalProduct: {_id:"sdas", product:"", price:"", available:true, edit:false}, modalProductOpen: true };
        });
    };

    //Function to edit the product category
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

    //Function to add the product category
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

    //Function to delete product category
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

    

    getItem = id => {
        const product = this.state.productlist.find(item => item._id === id);
        return product;
    };


    updateFoodSelected = (food) =>{
        if(food !== ""){
            var tableitem = this.state.tableItem;
            var orderslist = [...this.state.orderDetails];  
            var id = orderslist.length + 1
            var tablename = tableitem.table

            if(tableitem.hasOwnProperty("orders")){
                var orders = [...tableitem.orders];
                var foodcheck = orders.filter((item) => {
                    return item.item === food
                })
                if(foodcheck.length === 0){
                    orders.push({
                        item : food,
                        count : 1
                    })
                    orderslist.push({
                        _id : id,
                        table : tablename,
                        food : food,
                        count : 1,
                        status : "Placed"
                    })
                }else{
                    foodcheck[0]["count"]++;
                    var ordercheck = orderslist.find((item) =>{
                        return item.food === food && item.table === tablename && item.status === "Placed"
                    })
                    if(ordercheck){
                        const index = orderslist.indexOf(ordercheck);
                        ordercheck.count = ordercheck.count + 1;
                        orderslist[index] = ordercheck;
                    }else{
                        orderslist.push({
                            _id : id,
                            table : tablename,
                            food : food,
                            count : 1,
                            status : "Placed"
                        })
                    }
                }
                tableitem.orders = orders;
                console.log(orderslist)
                this.setState(() =>{
                    return{
                        tableItem : tableitem,
                        orderDetails : orderslist
                    }
                })
            }
        }
    }

    incrementFoodCount = (food) =>{
        var tableitem = this.state.tableItem;
        var productlist = [...this.state.productlist]
        var orderslist = [...this.state.orderDetails];
        var tablename = tableitem.table;
        var id = tableitem._id
        var foodavailability = productlist.filter((item) =>{
            return item.product === food
        })
        if(foodavailability[0].available){
            var orders = [...tableitem.orders];
            var foodcheck = orders.filter((item) => {
                return item.item === food
            })
            foodcheck[0]["count"]++;

            var ordercheck = orderslist.find((item) =>{
                return item.food === food && item.table === tablename && item.status === "Placed"
            })
            if(ordercheck){
                const index = orderslist.indexOf(ordercheck);
                ordercheck.count = ordercheck.count + 1;
                orderslist[index] = ordercheck;
            }else{
                orderslist.push({
                    _id : id,
                    table : tablename,
                    food : food,
                    count : 1,
                    status : "Placed"
                })
            }


            tableitem.orders = orders;
            this.setState(() =>{
                return{
                    tableItem : tableitem,
                    orderDetails : orderslist
                }
            })
        }else{
            alert("Food Not Available any more....")
            return  null
        }
    }

    decrementFoodCount = (food) =>{
        var tableitem = this.state.tableItem;
        var orders = [...tableitem.orders];
        var orderslist = [...this.state.orderDetails];
        var tablename = tableitem.table;

        var foodcheck = orders.filter((item) => {
            return item.item === food
        })
        


        var ordercheck = orderslist.find((item) =>{
            return item.food === food && item.table === tablename && item.status === "Placed"
        })
        if(ordercheck){
            const index = orderslist.indexOf(ordercheck);
           
            if(ordercheck.count >1){
                ordercheck.count = ordercheck.count - 1;
                orderslist[index] = ordercheck;
            }else{
                orderslist.splice(index, 1) 
            }
            
            foodcheck[0]["count"]--;
            tableitem.orders = orders;
            this.setState(() =>{
                return{
                    tableItem : tableitem,
                    orderDetails : orderslist
                }
            })
        }else{
            alert("Can't cancel.. Already started preparing")
        }
    }

    removeFood = (food) =>{
        var tableitem = this.state.tableItem;
        var orders = [...tableitem.orders];
        var orderslist = [...this.state.orderDetails];
        var tablename = tableitem.table;

        var ordercheckplaced = orderslist.find((item) =>{
            return item.food === food && item.table === tablename && item.status === "Placed"
        })
        var ordercheck = orderslist.filter((item) =>{
            return item.food === food && item.table === tablename && item.status !== "Placed"
        })
        if(ordercheck.length === 0){
            const index = orderslist.indexOf(ordercheckplaced);
            orderslist.splice(index, 1);
            var foodcheck = orders.filter((item) => {
                return item.item !== food
            })
            tableitem.orders = foodcheck;
            this.setState(() =>{
                return{
                    tableItem : tableitem,
                    orderDetails : orderslist
                }
            })
        }else{
            if(!ordercheckplaced){
                alert("cant cancel the orders")
            }else{
                console.log(ordercheckplaced)
                var count = ordercheckplaced.count
                confirmAlert({
                    title: 'Cancel partial..',
                    message: 'can cancel '+ordercheckplaced.count+' item',
                    buttons: [
                      {
                        label: 'Yes',
                        onClick: () => {
                            const index = orderslist.indexOf(ordercheckplaced);
                            orderslist.splice(index, 1);
                            var foodcheck = orders.find((item) => {
                                return item.item === food
                            })
                            const indexfoodtable = orders.indexOf(foodcheck);
                            orders[indexfoodtable].count = orders[indexfoodtable].count - count
                            tableitem.orders = orders;
                            this.setState(() =>{
                                return{
                                    tableItem : tableitem,
                                    orderDetails : orderslist
                                }
                            })
                        }
                      },
                      {
                        label: 'No',
                        onClick: () => console.log("canceled the partial delete")
                      }
                    ]
                  })
            }
        }

       
    }

    orderStatusChange = (data) =>{
        var orders = [...this.state.orderDetails]
        var table = data[0]
        var food = data[1]
        var count = data[2]
        var status = data[3]
        var order = orders.find((item) =>{
            return item.table === table && item.food === food && item.count === count && item.status === status
        }) 
        const index = orders.indexOf(order);
        var tempstatus
        switch (status) {
            case "Placed":
                tempstatus = "Preparing"
                break;
            case "Preparing":
                tempstatus = "Ready"
                break;
            default:
                tempstatus = "Served"
                break;
        }
        // if(tempstatus === "Served"){
        //     orders.splice(index, 1) 
        // }else{
            order.status = tempstatus;
        // }
        
        this.setState(() =>{
            return{
                orderDetails : orders
            }
        })
    }

    calTotal = () =>{
        var tableitem = this.state.tableItem;
        if(tableitem.hasOwnProperty("orders")){
            var orders = tableitem.orders;
            var productlist = [...this.state.productlist]
            let total = 0;
            const amount = orders.map((item) =>{
                let temp = productlist.filter((item2) =>{
                    return item2.product === item.item
                })
                return item.count * temp[0].price;
            });
            amount.forEach(element => {
                total = total + element
            });
            return total
        }else{
            return 0
        }
    }

    billPaid = () => {
        var orders = [...this.state.orderDetails]
        var tableorders = [...this.state.tableOrder]
        var tablelist = [...this.state.tableList]
        var tableitem = this.state.tableItem;
        var table = tableitem.table;

        var tableorder = tableorders.find((item) =>{
            return item.table === table
        });
        var index = tableorders.indexOf(tableorder);
        tableorders.splice(index,1);

        for (var i in orders){
            if(orders[i].table === table)
            orders[i].status = "Served"
        }

        var tablestatus = tablelist.find((item) =>{
            return item.table === table
        })
        var indextable = tablelist.indexOf(tablestatus)
        tablelist[indextable].occupied = false

        this.setState(() =>{
            return{
                orderDetails : orders,
                tableList : tablelist,
                tableOrder : tableorders,
                tableItem : {}
            }
        })
        // return  <Redirect  to="/" />
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
                        tableTake : this.tableTake,
                        updateFoodSelected : this.updateFoodSelected,
                        incrementFoodCount :this.incrementFoodCount,
                        decrementFoodCount : this.decrementFoodCount,
                        removeFood : this.removeFood,
                        calTotal : this.calTotal,
                        orderStatusChange : this.orderStatusChange,
                        billPaid : this.billPaid,
                        freeTable : this.freeTable,
                        closeTableModal : this.closeTableModal,
                        updateTable : this.updateTable,
                        addTable : this.addTable,
                        tableOpenModalAdd : this.tableOpenModalAdd,
                        tableOpenModalUpdate : this.tableOpenModalUpdate,
                        tableDelete : this.tableDelete
                    } 
                }>
                {this.props.children}
            </FoodContext.Provider>
        );
    }
}


const FoodConsumer = FoodContext.Consumer;

export { FoodProvider, FoodConsumer} ; 