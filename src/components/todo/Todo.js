import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, useHistory } from 'react-router-dom'
import classes from './Todo.module.css'
import {textForChangeAC} from '../../redux/actions'

const Todo = (props) => {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.app.isAuthenticated)
    const [status, setStatus] = useState('Не выполнено')
    const history = useHistory()
    const changeTodo = () => {
        dispatch(textForChangeAC({
            text: props.value.text,
            id: props.value.id,
            status: props.value.status,
            statusText: status
        }))
        history.push('/update_todo')
    }

    useEffect(() => {
        if (props.value.status === 1) {
            setStatus('Не выполнено, отредактировано админом')
        } else if (props.value.status === 10) {
            setStatus('Выполнено')
        } else if (props.value.status === 11) {
            setStatus('Выполнено, отредактировано админом') 
        }
     }, [props.value.status])

    return (
        <div className={classes.container}>
            <img src={props.value.image_path} style={{width: '35px', height: '35px'}} />
            <div className={classes.item}><p>{props.value.username}</p></div>            
            <div className={classes.item}><p>{props.value.email}</p></div>                        
            <textarea onChange={()=>{}} style={{width: '98%', color: 'white'}} className={classes.item} value={props.value.text}></textarea>
            <div className={classes.item}><p>{status}</p></div> 
            {isAuthenticated && <button onClick={changeTodo} className={classes.button}>Отредактировать задание</button>}
            {(props.value.status==10 || props.value.status==11) && <div className={classes.completed}></div>}
                   
        </div>        
    )
}

export default Todo