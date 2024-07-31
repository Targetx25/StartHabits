import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import {Home, Signup, Login, Habit} from './pages/index.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Addhabit from './pages/Addhabit.jsx'

const router  = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/add-habit",
        element: <Addhabit />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/habit/:habitId", 
        element: <Habit/>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
)
