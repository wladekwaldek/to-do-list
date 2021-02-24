import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux'
import classes from './Header.module.css'
import {logout, authAC} from '../../redux/actions'

class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
       if(localStorage.getItem('token')) this.props.authAC()
    }

    render() {
        return (
            <>
                <div className={classes.header}>
                    <h2 style={{color: 'white'}}>Список заданий</h2>
                    <ul>
                        <li className={classes.el}><NavLink className={classes.a} style={{color: 'white'}} to="/">Главная</NavLink></li>
                        <li className={classes.el}><NavLink className={classes.a} to="/create">Создать задание</NavLink></li>                                      
                        <li className={classes.el}><NavLink className={classes.a} to="/login">Вход</NavLink></li>
                        {this.props.isAuthenticated && <button className={classes.el} onClick={()=>{localStorage.removeItem('token')
                        this.props.logout()}}>Выход</button>}                    
                    </ul>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.app.isAuthenticated
    }
}

const mapDispatchToProps = {
    logout, authAC
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)