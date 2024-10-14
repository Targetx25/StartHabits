import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store, { persistor } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import {Home, Signup, Login, Habit, Pomodoro} from './pages/index.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Addhabit from './pages/Addhabit.jsx'
import Logout from './components/Logout/Logout.jsx'
import Oauthload from './components/Oauthload.jsx'

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
      },
      {
        path: "/pomodoro",
        element: <Pomodoro/>
      },
      {
        path : "/logout",
        element : <Logout/>
      },
      {
        path : "/oauth/callback",
        element: <Oauthload/>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading = {null} persistor={persistor}>
      <RouterProvider router={router}/>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
