export const productlist =[
    {
        id:1,
        product:"Rice",
        price:21,
        category:"Lunch",
        available:true
    },
    {
        id:2,
        product:"Milk",
        price:5,
        category:"Deserts",
        available:true
    },
    {
        id:3,
        product:"Curry",
        price:55,
        category:"Lunch",
        available:false
    },
    {
        id:4,
        product:"Juice",
        price:15,
        category:"Juice",
        available:true
    }
]

export const modalProduct = {
    
}

export const foodCategory = ["All","Breakfast","Lunch","Dinner","Snacks","Juice","Deserts"]

export const tableList = [
    {
        id:1,
        table:"Table-1",
        occupied:false
    },
    {
        id:2,
        table:"Table-2",
        occupied:false
    },
    {
        id:3,
        table:"Table-3",
        occupied:true
    },
    {
        id:4,
        table:"Table-4",
        occupied:true
    },
    {
        id:5,
        table:"Table-5",
        occupied:false
    },
    {
        id:6,
        table:"Table-6",
        occupied:false
    },
    {
        id:7,
        table:"Table-7",
        occupied:false
    },
    {
        id:8,
        table:"Table-8",
        occupied:false
    },
    {
        id:9,
        table:"Table-9",
        occupied:false
    }
]


export const tableOrder = [
    {
        id:3,
        table:"Table-3",
        orders:[
            {
                item : "Juice",
                count : 2
            }
        ]
    },
    {
        id:4,
        table:"Table-4",
        orders:[
            {
                item : "Juice",
                count : 6
            },
            {
                item : "Rice",
                count : 2
            }
        ]
    }
]

export const orderDetails = [
    {
        id : 1,
        table : "Table-4",
        food : "Juice",
        count : 6,
        status : "Placed"
    },
    {
        id : 2,
        table : "Table-4",
        food : "Rice",
        count : 2,
        status : "Placed"
    },
    {
        id : 3,
        table : "Table-3",
        food : "Juice",
        count : 2,
        status : "Placed"
    }
]

export const foodStatus = ["All","Placed","Cooking","Done"]