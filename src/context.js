import React, { Component } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import axios from "axios";
import { foodStatus }  from './data'

const FoodContext = React.createContext();
const backendURL = 'https://hotelapplicationbackend.herokuapp.com/';
// const backendURL = 'http://localhost:3030/';

//Provide
//Consumer


class FoodProvider extends Component {
    constructor(props){
        super(props);
        this.state = {
            productlist : [],
            modalProductOpen : false,
            modalProduct : {},
            foodName : "",
            foodPrice : "",
            tableName : "",
            category : "",
            foodCategory : ['All'],
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
        this.gettableOrder();
        this.getCurrentOrders();
        this.gettables();
        this.getProduct();
        this.getCategory();
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
    gettableOrder = (table = false) => {
        axios({
            url:backendURL+`tableorders/getorders`,
            method:"post"
        }).then(response => {
            if(response.data.result==="ok"){
                if (table === false){
                    this.setState(() => {
                        return {
                            tableOrder: [...response.data.data]
                        };
                    });
                }else{
                    let tableitem = response.data.data.find(item =>item.table === table);
                    this.setState(() => {
                        return {
                            tableOrder : [...response.data.data],
                            tableItem : tableitem
                        };
                    });
                }
                
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
                this.gettableOrder(table);
            }
        }).catch(err=>{
            console.log(err)
        });
    }

    //Function to assign table order details in table list 
    tableContentItem = (table) => {
        console.log(table)
        const tableitem = this.state.tableOrder.find(item =>item.table === table);
        console.log(tableitem)
        this.setState(() =>{
            return{
                tableItem : tableitem
            }
        });
    }

    //Function to add the food in to the table
    updateFoodSelected = (food) => {
        if(food !== ""){
            var tableitem = this.state.tableItem;
            var tablename = tableitem.table
            var temptable = {table:tablename,food:food}
            axios({
                url:backendURL+`tableorders/addfood`,
                method:"post",
                data: temptable
            }).then(res => {
                if(res.data.result === 'ok'){
                    this.gettableOrder(tablename);
                    this.getCurrentOrders();
                }else{
                    alert(res.data.data)
                }
            }).catch(error => {
                alert("Error occured while adding product");
                console.log(error)
            })
        }
    }

    
    incrementFoodCount = (food) =>{
        var tableitem = this.state.tableItem;
        var tablename = tableitem.table;
        var temptable = {table:tablename,food:food}
        axios({
            url:backendURL+`tableorders/incrementfood`,
            method:"post",
            data: temptable
        }).then(res => {
            if(res.data.result === 'ok'){
                this.gettableOrder(tablename);
                this.getCurrentOrders();
            }else{
                alert(res.data.data)
            }
        }).catch(error => {
            alert("Error occured while adding more")
        })
    }

    decrementFoodCount = (food) =>{
        var tableitem = this.state.tableItem;
        var tablename = tableitem.table;
        var temptable = {table:tablename,food:food}

        axios({
            url:backendURL+`tableorders/decrementfood`,
            method:"post",
            data: temptable
        }).then(res => {
            if(res.data.result === 'ok'){
                this.gettableOrder(tablename);
                this.getCurrentOrders();
            }else{
                alert(res.data.data)
            }
        }).catch(error => {
            alert("Error occured while adding more")
        })
    }

    removeFood = (food) => {
        var tableitem = this.state.tableItem;
        var tablename = tableitem.table;
        var temptable = {table:tablename,food:food}

        axios({
            url:backendURL+`tableorders/deletefood`,
            method:"post",
            data: temptable
        }).then(res => {
            if(res.data.result === 'ok'){
                this.gettableOrder(tablename);
                this.getCurrentOrders();
            }else if(res.data.result === "ok_partial"){
                
            }else{
                alert(res.data.data)
            }
        }).catch(error => {
            alert("Error occured while adding more")
        })

    }


    removeFood_old = (food) =>{
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
                this.setState(() =>{
                    return{
                        tableItem : {}
                    }
                });
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

    //Function to change the product availability
    handleProductAvailability = (id) => {
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



    //Function regarding the food category


    //Function to get the food catgory from the DB
    getCategory = () => {
        axios({
            url:backendURL+`category/getproductcategory`,
            method:"post",
        }).then(res => {
            if(res.data.result === "ok"){
                var temp = res.data.data.map((item)=>{
                    return item.foodCategory
                });
                var tempfoodcategory =["All"].concat(temp)
                this.setState(() => {
                    return{
                        foodCategory : [...tempfoodcategory]
                    }
                })
            }else{
                alert("Error in getting the food category from the DB")
            }
        }).catch(error => {
            console.log(error)
        })
    }

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
            let tempdata = { foodCategory : category }
            axios({
                url:backendURL+"category/addfoodcategory",
                method:"post",
                data: tempdata
            }).then(res =>{
                if(res.data.result === 'ok'){
                    this.getCategory();
                }else{
                    alert(res.data.data);
                }
            }).catch(error => {
                alert("Error in adding the category");
            });
        }
    }

    //Function to delete product category
    productCategoryDelete = (category) => {
        if(category === "All"){
            alert("Cant delet All")
            return null
        }else{
            let tempdata = { foodCategory : category }
            axios({
                url:backendURL+"category/deletefoodcategory",
                method:"post",
                data:tempdata
            }).then(res => {
                if(res.data.result === 'ok'){
                    this.getCategory();
                }else{
                    alert(res.data.data);
                }
            }).catch(error => {
                alert("Not able to delete the category")
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


    //Function to be handled in orders page

    //Function to get the orders details from the DB
    getCurrentOrders = () => {
        try {
            axios({
                url:backendURL+"orders/getorders",
                method:"post"
            }).then(res => {
                if(res.data.result === 'ok'){
                    this.setState(() =>{
                        return{
                            orderDetails:[...res.data.data]
                        }
                    });
                }else{
                    alert("Error ocuured while fetching data from DB")
                }
            }).catch(error => {
                alert(error)
            });
        } catch (error) {
            
        }
    }

    orderStatusChange = (data) =>{
        var table = data[0]
        var food = data[1]
        var count = data[2]
        var status = data[3]
        var temp ={table:table,food:food,count:count,status:status};
        axios({
            url:backendURL+"orders/orderstatuschange",
            method:"post",
            data:temp
        }).then(response => {
            if(response.data.result === 'ok'){
                this.getCurrentOrders();
            }else{
                alert(response.data.data)
            }
        }).catch(error => {
            alert("Error updating the status")
            console.log(error);
        })
        // var order = orders.find((item) =>{
        //     return item.table === table && item.food === food && item.count === count && item.status === status
        // }) 
        // //  const index = orders.indexOf(order);
        // var tempstatus
        // switch (status) {
        //     case "Placed":
        //         tempstatus = "Preparing"
        //         break;
        //     case "Preparing":
        //         tempstatus = "Ready"
        //         break;
        //     default:
        //         tempstatus = "Served"
        //         break;
        // }
        // // if(tempstatus === "Served"){
        // //     orders.splice(index, 1) 
        // // }else{
        //     order.status = tempstatus;
        // // }
        
        // this.setState(() =>{
        //     return{
        //         orderDetails : orders
        //     }
        // })
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
        var tableitem = this.state.tableItem;
        var table = tableitem.table;
        // axios({
        //     url:backendURL+"table/freetable",
        //     method:"post",
        //     data:{table:table}
        // }).then(resp => {

        // }).catch(error => {
        //     console.log(error);
        //     alert("Error in updating the details")
        // })

        axios({
            url:backendURL+`table/freetable`,
            method:"post",
            data:{table:table}
        }).then(response => {
            if(response.data.result==="ok"){
                console.log(",asjbd")
                this.gettables();
                this.getCurrentOrders();
                this.setState(() =>{
                    return{
                        tableItem : {}
                    }
                });
            }else{
                console.log("Error occure");
                console.log(response.data.data);
                alert("Coudnt update !")
            }
        }).catch(err=>{
            console.log(err)
        });
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