import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Navbar extends Component {

    
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <Link to='/'>
                  <img src="https://img.icons8.com/nolan/64/000000/remittance-slip.png" alt="Table" className="navbar-brand"/>
               </Link>
               <Link to="/" className="nav-link nav-bar-app-name">
                            EasyBill
                        </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
              
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                    <Link to="/">
                             <i className="nav-item nav-link nav-bar-item" data-toggle="collapse" data-target="#navbarSupportedContent" >Home </i>
                         </Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/orders">
                             <i className="nav-item nav-link nav-bar-item" data-toggle="collapse" data-target="#navbarSupportedContent" >Orders </i>
                         </Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/product">
                             <i className="nav-item nav-link nav-bar-item" data-toggle="collapse" data-target="#navbarSupportedContent" >Food </i>
                         </Link>
                    </li>
                  </ul>
                  {/* <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                  </form> */}
                </div>
              </nav> 
        )
    }
}








            
        //    <nav className="navbar navbar-expand-sm bg-primary navbar-dark px-sm-2">
        //        {/*https://img.icons8.com/nolan/64/000000/remittance-slip.png*/}
        //        <Link to='/'>
        //            <img src="https://img.icons8.com/nolan/64/000000/remittance-slip.png" alt="Table" className="navbar-brand"/>
        //        </Link>
        //        <ul className="navbar-nav align-items-center">
        //            <li className="nav-item ml-1">
        //                <Link to="/" className="nav-link nav-bar-app-name">
        //                    EasyBill
        //                </Link>
        //            </li>
        //        </ul>
               
        //         <div className="collapse navbar-collapse">
        //             <div className="navbar-nav ml-auto">
        //                 <Link to="/">
        //                     <i className="nav-item nav-link nav-bar-item" >Home </i>
        //                 </Link>
        //                 <Link to="/orders">
        //                     <i className="nav-item nav-link nav-bar-item" >Orders </i>
        //                 </Link>
        //                 <Link to="/product">
        //                     <i className="nav-item nav-link nav-bar-item" >Food </i>
        //                 </Link>
        //             </div>
        //         </div>

        //    </nav>