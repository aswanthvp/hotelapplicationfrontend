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
            <div className="col-4 product_category">
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
                    <div className="row">

                    </div>
                    <p className="float_left">Add category</p>
                    <p className="float_right p-1 fas fa-edit" onClick = {()=>{value.productCategoryEdit()}}></p>
                    <p className="text-muted float_none">category : <input id="foodCategory"  type="text" ref={(c) => this.category = c}/></p>
                    <button className="" onClick={()=>{value.productCategoryAdd(this.category.value)}}>Add</button>
                </div>
               
            </div>
        )
    }
}

