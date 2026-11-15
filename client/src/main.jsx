// import React from 'react'
// import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
// import {AuthProvider} from '.context/AuthContext'
import App from './App.jsx'
import './index.css'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'




// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <App />
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </StrictMode>
); 

