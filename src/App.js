import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header'
import FormCreateToDo from './components/create_to_do/create_to_do';
import ListToDo from './components/list_to_do/List_to_do'
import Admin from './components/admin/admin'
import UpdateForm from './components/admin/UpdateForm'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact>
            <ListToDo />
          </Route>
          <Route path="/create">
            <FormCreateToDo />
          </Route>
          <Route path="/login">
            <Admin />
          </Route>
          <Route path="/update_todo">
            <UpdateForm />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
