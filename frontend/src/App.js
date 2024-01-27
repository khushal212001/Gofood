import Home from './screens/Home';
import Login from './screens/Login';
import {BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './screens/Signup.jsx';
import { CartProvider } from './components/ContextReducer.js';
import MyOrder from './screens/MyOrder.js';

function App() {
  return (
    <CartProvider>
      <Router>
          <div>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/createuser' element={<Signup/>} />
              <Route path='/myOrder' element={<MyOrder/>} />
            </Routes>
          </div>
      </Router>
    </CartProvider>
  );
}

export default App;
