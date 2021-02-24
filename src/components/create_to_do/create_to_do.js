import React, { useState } from 'react'
import classes from './create_to_do.module.css'

const FormCreateToDo = () => {
    const [formData, setFormData] = useState({
        username: '', 
        email: '',
        text: '',
    })

    const [error, setError] = useState('')

    const changeHandler = event => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const setList = async (event) => {
        event.preventDefault()
        try {
        setError('')
        if(formData.username.length<2) {
            alert('Логин не меньше 2 символов')
            return
        } else if(!formData.email.match(/.+@.+\..+/i)){
            setError('Введите корректный email')
            return
        } else if(formData.text.length<1) {
            return
        }
        const form = new FormData()
        form.append('username', formData.username)
        form.append('email', formData.email)
        form.append('text', formData.text)
        const responce = await fetch('https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Vlad', 
             {
                 method: 'POST',
                 body: form    
             }
         )
        const data = await responce.json()
        if (data.status === 'ok') {
            alert('Задание создано успешно')
            setFormData({
                username: '', 
                email: '',
                text: '',
            })
        }
        } catch (e) {alert(e.message)}
    }

        return (
            <form className={classes.form} >
                <input type="text" name="username" 
                        placeholder="name" 
                        onChange={changeHandler}  
                        value={formData.username} />
                <input type="email" name="email" 
                        placeholder="email" 
                        onChange={changeHandler} 
                        value={formData.email} />
                {error && <span>{error}</span>}
                <input type="text" name="text" 
                        placeholder="Текст задания" 
                        onChange={changeHandler} 
                    value={formData.text}/>              
                <button onClick={setList}>Добавить задание</button> 
            </form>
        )
}

export default FormCreateToDo