import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import classes from '../create_to_do/create_to_do.module.css'

const UpdateForm = () => {
    const [formData, setFormData] = useState({
        text: '',
        id: null,
        statusText: '',
        token: null,
        status: null
    })

    useEffect(() => {
        setFormData({...formData, 
            text: data.text,
            id: data.id,
            token,
            status: data.status,
            statusText: data.statusText
        })
    },[])

    useEffect(() => {
        if (formData.text !== data.text && formData.statusText === 'Выполнено') {
            setFormData({...formData, status: 11})
        }
        if (formData.text !== data.text && formData.statusText === 'Не выполнено') {
            setFormData({...formData, status: 1})
        }
        if (formData.statusText === 'Выполнено') {
            setFormData({...formData, status: 10})
        }
        if (formData.statusText === 'Не выполнено') {
            setFormData({...formData, status: 0})
        }
    }, [formData.text, formData.statusText])
    const history = useHistory()
    const data = useSelector(state => state.app.textForChange)
    const token = useSelector(state => state.app.token)
    const changeHandler = event => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const setList = async (event) => {
        event.preventDefault()
        if(formData.text.length<1) {
            return alert('Введите текст задания')
        }
        const form = new FormData()
        form.append('text', formData.text)
        form.append('status', formData.status)
        form.append('token', formData.token)
        const responce = await fetch(`https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${formData.id}?developer=Vlad`, 
             {
                 method: 'POST',
                 body: form    
             }
         )
        const data = await responce.json()
        if (data.status === 'ok') history.push('/')
    }

        return (
            <form id="formElem" className={classes.form} >
                <label><span>Текст задания</span>
                <input type="text" name="text" 
                        placeholder="Текст задания" 
                        onChange={changeHandler} 
                        value={formData.text}/></label>
                <label><span>Статус</span>
                <input type="text" name="statusText" 
                        onChange={changeHandler} 
                        value={formData.statusText}/></label>             
                <button onClick={setList}>Отредактировать задание</button> 
            </form>
        )
}

export default UpdateForm