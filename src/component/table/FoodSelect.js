import React, { Component } from 'react'

export default class FoodSelect extends Component {
    constructor(props)
    {
      super(props);
      this.state = {
          foodCategorySelect:"All",
          foodSelected :""
        };
    }
    updateCategory = (event) => {
        let category = event.target.value;
        document.getElementById('foodselect').value="DEFAULT";
        this.setState(()=>{
            return{foodCategorySelect:category,foodSelected:""}
        })
    }
    updateFoodSelected = (event) => {
        let foodselectedtmp =  event.target.value;
        console.log(foodselectedtmp)
        this.setState(()=>{
            return { foodSelected : foodselectedtmp }
        })
    }
    render() {
        const foods = this.props.value.productlist;
        const foodcategory = this.props.value.foodCategory;
        const updateFoodSelected = this.props.value.updateFoodSelected;
        return (
            <div className="col-lg-3 col-md-3 col-sm-12 mx-auto  mr-3 py-4">
                <div className=" p-4 maincontainer">
                 <h6 className="text-center">Add food to the table</h6>
                 
                 <center>
                     <select defaultValue='All' className="m-2" onChange={(e)=>
                                                {
                                                   this.updateCategory(e); 
                                                } }>
                        {foodcategory.map((item)=>{
                            if(item !== "All")
                                return <option className="text-capitalize" value={item} key={item}>{item}</option>
                            else
                                return <option  value={item} key={item}>All</option>
                            })
                        }
                     </select>
                    <select id="foodselect" className="my-2" defaultValue='DEFAULT' onChange={(e)=>{this.updateFoodSelected(e);}}>
                        <option value='DEFAULT' disabled>Select the food</option>             
                        {
                        foods.map((item)=>{
                            if(this.state.foodCategorySelect === "All"){
                                if(item.available)
                            return <option className="text-capitalize" key={item._id} value={item.product}>{item.product} </option>
                                else
                                return <option className="text-capitalize" value={item._id} key={item.product} disabled>{item.product}</option>
                            }else if(item.category === this.state.foodCategorySelect){
                                if(item.available)
                                return <option className="text-capitalize" key={item._id} value={item.product}>{item.product}</option>
                                else
                                return <option className="text-capitalize" value={item._id} key={item.product} disabled>{item.product}</option>
                            }else{
                                return null
                            }
                            
                        })
                        }
                    </select>
                 </center>
                 <center>
                    <button className="btn btn-outline-info my-2 my-sm-0 button_add_category" onClick = {()=>{ updateFoodSelected(this.state.foodSelected) }}>Add the food</button>
                    {/* <button className="my-3 btn btn-default btn-sm button_add_category" onClick = {()=>{ updateFoodSelected(this.state.foodSelected) }}>Add the food</button> */}
                 </center>
                 </div>
            </div>
           
        )
    }
}
