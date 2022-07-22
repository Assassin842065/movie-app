import React, { Component } from 'react'
import logo from './logo.jpg'
import { Link } from 'react-router-dom'

export default class navbar extends Component {
    render() {
        return (
            <div className='nav'>
                <img src={logo} alt='' style={{width: '5rem',height: '5rem'}}></img>
                <div className='opt'>
                    <Link to="/" id='home' style={{textDecoration: 'none'}}><h2>MoviesApp</h2></Link>
                    <Link to="/favourites" id='favourites' style={{textDecoration: 'none'}}><h4>Favourites</h4></Link>
                </div>
            </div>
        )
    }
}
