import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Auth from './components/Auth.js'
import Buttons from './components/Buttons.js'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Auth />
        </Route>
        <Route path="/buttons">
          <Buttons />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
