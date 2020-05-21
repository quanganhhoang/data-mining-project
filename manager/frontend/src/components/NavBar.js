import React, { Component } from 'react'

export class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <img src={"/static/frontend/logo.svg"} alt="logo"></img>
          <a className="navbar-brand">Navbar</a>
          <form className="form-inline">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </nav>
      </div>
    )
  }
}

export default NavBar
