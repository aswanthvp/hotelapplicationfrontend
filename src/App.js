import React from 'react';
// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

// import './component/Navbar'
// import './component/Orders'
// import './component/Product'
// import './component/table/TableList'
import Navbar from './component/Navbar';
import TableList from './component/table/TableList';
import Orders from './component/Orders';
import Product from './component/Product'




class App extends React.Component {
  render(){
    return (
      <React.Fragment>
        <Navbar></Navbar>
        <TableList></TableList>
        <Orders></Orders>
        <Product></Product>
      </React.Fragment>
    );
  }
}



// class App extends React.Component {
//   render(){
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src="https://img.icons8.com/nolan/64/000000/remittance-slip.png" className="App-logo" alt="logo" />
//           <h1 className="app-name">EasyBill</h1>
          
//         <Buttonshome/>
//         <div id="mainContent">
          
//         </div>
//         </header>
//       </div>
//     );
//   }
// }





class Buttonshome extends React.Component{
  constructor(props){
    super(props);
    this.state={names: ["Orders","Home"]};
  }
  render(){
    return(
      <div className="main">
        {
          this.state.names.map((value, index) => {
            return <ButtonsContent key={value.toString()} name={value}></ButtonsContent>
          })
        }
      </div>
    );
  }
}

class ButtonsContent extends React.Component{
  render(){
    return(
      <div className="tablink">
        <p>{this.props.name}</p>
      </div>
    );
  }
}





export default App;
