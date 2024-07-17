import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Habitsform from './components/Habitsform.jsx'
import SignUp from './components/SignUp.jsx'
import Login from './components/Login.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router  = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
      {
        path: "/habit",
        element: <Habitsform />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/login",
        element: <Login />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
)
