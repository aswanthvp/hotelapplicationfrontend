import React, { Component } from 'react'

export default class ProductCategory extends Component {
    constructor(props)
    {
      super(props);
      this.state = {
          category: ''
        };
    }
    render() {
        const value = this.props.value;
        return (
            <div className="col-3 mx-auto col-md-3 col-lg-3 my-3 product_category">
                <h5 className="mx-auto text-center">Food category</h5>
                {
                    value.foodCategory.map((item) =>{
                        if(value.deleteCategory){
                            return <button key={item} className="product_category_button btn-info"> {item} <div className="fa fa-times product_category_delete" onClick={()=>{value.productCategoryDelete(item)}}></div></button >
                        }
                        return <button key={item} className="product_category_button btn-info" onClick={()=>
                            value.updatefoodCategoryDisplay(item)
                        }> {item} </button >
                    })
                }
                <div className="product_category_add">
                    <p className="float_left">Add category</p>
                    <i className="float_right p-1 fas fa-edit" onClick = {()=>{value.productCategoryEdit()}}></i>
                    <p className="text-muted float_none ">category : <input id="foodCategory" className="add_category_input"  type="text" ref={(c) => this.category = c}/></p>
                    <button className="btn btn-default btn-sm button_add_category" onClick={()=>{value.productCategoryAdd(this.category.value)}}>Add</button>
                </div>
               
            </div>
        )
    }
}

