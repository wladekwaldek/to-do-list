import React from 'react'
import { connect } from 'react-redux'
import Todo from '../todo/Todo'
import { getTodos, nextPage, previousPage } from '../../redux/actions'
import preloader from '../../img/preloader.gif'
import classes from './List_to_do.module.css'

class ListToDo extends React.Component {
    
    componentDidMount() {
        this.props.getTodos(this.props.currentPage)
        
    } 
    
    componentDidUpdate(prevProps) {
        if(prevProps.currentPage !== this.props.currentPage) {
            this.props.getTodos(this.props.currentPage) 
        }
    }

    render() {
         if(this.props.loading) return <img src={preloader} />      
        return (
        <>  <div className={classes.wraper}>
                {this.props.list.map((el, index) => <Todo key={index} value={el} />)}
            </div>
            <div className={classes.pages}>
                <button disabled={this.props.currentPage==1} 
                    onClick={this.props.previousPage}>Пред.</button>
                <span>{this.props.currentPage} ... {this.props.countPages}</span>
                <button disabled={this.props.currentPage==this.props.countPages} 
                    onClick={this.props.nextPage}>След.</button>
            </div>
        </>
        )
    }
}

const mapStateToProps = state => {
    return {
        list: state.todos.list,
        totalCount: state.todos.totalCount,
        currentPage: state.todos.currentPage,
        countPages: state.todos.countPages,
        loading: state.app.loading
    }
}

const mapDispatchToProps = {
    getTodos, nextPage, previousPage
}

export default connect(mapStateToProps, mapDispatchToProps)(ListToDo)