import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { authAC } from '../../redux/actions'
import classes from '../create_to_do/create_to_do.module.css'

const Admin = () => {
    const [formData, setFormData] = useState({
        username: '', 
        password: ''
    })

    const dispatch = useDispatch()
    const history = useHistory()
    const changeHandler = event => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const login = async () => {  
        const form = new FormData()
        form.append('username', formData.username)
        form.append('password', formData.password)
        const responce = await fetch('https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=Vlad', 
             {
                 method: 'POST',
                 body: form  
             }
         )
        const data = await responce.json()
        if(data.message.token) {
            localStorage.setItem('token', JSON.stringify({
                    token: data.message.token
                })
            )
            dispatch(authAC(data.message.token))
            console.log(localStorage.getItem('token'))
            history.push('/')
       } else {
           alert('Некорректные данные')
           setFormData({...formData, username: ''})
           setFormData({...formData, password: ''})
       }
    }

        return (
            <form id="formElem" className={classes.form} >
                <input type="text" name="username" 
                        placeholder="Логин" 
                        onChange={changeHandler}  
                        value={formData.login} />
                
                <input type="password" name="password" 
                        placeholder="Введите пароль" 
                        onChange={changeHandler} 
                    value={formData.password}/>              
                <button onClick={e => {e.preventDefault()
                        login()}} >Войти</button> 
            </form>
        )
}

export default Admin