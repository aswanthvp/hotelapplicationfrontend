import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class Navbar extends Component {
    render() {
        return (
           <nav className="navbar navbar-expand-sm bg-primary navbar-dark px-sm-2">
            {/* <nav className="navbar navbar-light bg-light"> */}
               {/*https://img.icons8.com/nolan/64/000000/remittance-slip.png*/}
               <Link to='/'>
                   <img src="https://img.icons8.com/nolan/64/000000/remittance-slip.png" alt="Table" className="navbar-brand"/>
               </Link>
               <ul className="navbar-nav align-items-center">
                   <li className="nav-item ml-1">
                       <Link to="/" className="nav-link">
                           EasyBill
                       </Link>
                   </li>
               </ul>
               
                <div className="collapse navbar-collapse">
                    <div className="navbar-nav ml-auto">
                        <Link to="/">
                        <a className="nav-item nav-link nav-bar-item" >Table </a>
                        </Link>
                        <Link to="/orders">
                        <a className="nav-item nav-link nav-bar-item" >Orders </a>
                        </Link>
                        <Link to="/product">
                        <a className="nav-item nav-link nav-bar-item" >Product </a>
                        </Link>
                    </div>
                </div>

           </nav>
        )
    }
}
