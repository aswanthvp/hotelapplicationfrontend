import React, { Component } from 'react'
import Title from "../Title"
import MUIDataTable from "mui-datatables";
import  { FoodConsumer } from "../../context"

export default class Orders extends Component {
    constructor(props)
    {
      super(props);
      this.state = {
            columns:[
                {
                    name: "table",
                    label: "Table",
                    options:{
                        filter:false
                    }
                },
                {
                    name: "food",
                    label: "Food",
                    options:{
                        filter:false
                    }
                },
                {
                    name: "count",
                    label: "Count",
                    options:{
                        filter:false
                    }
                },
                {
                    name: "status",
                    label: "Status",
                    options:{
                        filter:true
                    }
                },
                {
                    name: 'status',
                    label: 'Action',
                    options: {
                        filter: false,
                        filterType: 'multiselect',
                        customBodyRender: (value, tableMeta, updateValue) => {
                            let buttontext;
                            let buttonclass
                            if(value === "Placed"){
                                buttontext = "Prepare"
                                buttonclass = "btn-info order_button"
                            }
                            
                            else if(value === "Preparing"){
                                buttontext = "Order Ready"
                                buttonclass = "btn-warning order_button"
                            }
                            
                            else if( value === "Ready"){
                                buttontext ="Serve"
                                buttonclass = "btn-success order_button"
                            }
                            
                            else 
                            buttontext = ""
                            
                            return (
                                <FoodConsumer>
                                    {valuecontext =>{
                                            
                                            return (
                                                buttontext !== ""?
                                                    <button className={buttonclass} onClick = { () =>{valuecontext.orderStatusChange(tableMeta.rowData)}}>{buttontext}</button>
                                                    : null
                                            )
                                        }
                                    }
                                </FoodConsumer>
                            )
                        }
                    }
                  }  
            ],
            options : {
                filterType: 'checkbox',
                download:false,
                print:false,
                selectableRowsHeader:false,
                selectableRows:"none"
                // ,
                // onRowsSelect: (rowsSelected, allRows) => {
                //     console.log(rowsSelected, allRows);
                //     // this.setState({ rowsSelected: allRows.map(row => row.dataIndex) });
                // },
                // onRowsDelete: rowsDeleted => {
                //     console.log(rowsDeleted, 'were deleted!');
                // }
            }
        }
    }
    render() {
        return (
            <div>
                <Title name="Current" title="Orders" />
                <div className="container card test py-5">
                    <div className="row">
                        <div className="col-12">

                        </div>
                        <div className="col-12">
                            <FoodConsumer>
                                {value =>{
                                    console.log(value.orderDetails)
                                    return(
                                        <MUIDataTable
                                            title={"Food orders"}
                                            data={value.orderDetails}
                                            columns={this.state.columns}
                                            options={this.state.options}
                                            
                                        />
                                    )
                                }}
                            </FoodConsumer>
                        
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
