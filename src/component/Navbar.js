import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Navbar extends Component {

    
    render() {
        return (
           <nav className="navbar navbar-expand-sm bg-primary navbar-dark px-sm-2">
               {/*https://img.icons8.com/nolan/64/000000/remittance-slip.png*/}
               <Link to='/'>
                   <img src="https://img.icons8.com/nolan/64/000000/remittance-slip.png" alt="Table" className="navbar-brand"/>
               </Link>
               <ul className="navbar-nav align-items-center">
                   <li className="nav-item ml-1">
                       <Link to="/" className="nav-link nav-bar-app-name">
                           EasyBill
                       </Link>
                   </li>
               </ul>
               
                <div className="collapse navbar-collapse">
                    <div className="navbar-nav ml-auto">
                        <Link to="/">
                            <i className="nav-item nav-link nav-bar-item" >Home </i>
                        </Link>
                        <Link to="/orders">
                            <i className="nav-item nav-link nav-bar-item" >Orders </i>
                        </Link>
                        <Link to="/product">
                            <i className="nav-item nav-link nav-bar-item" >Food </i>
                        </Link>
                    </div>
                </div>

           </nav>
        )
    }
}
