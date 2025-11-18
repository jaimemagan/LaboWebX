// Fronted/laboratorio/src/components/Protected.jsx
import React, { useEffect, useState } from 'react'
import API from '../utils/api'
import { useNavigate } from 'react-router-dom'

import CustomerList from './CustomerList'
import SaleForm from './SaleForm'
import SalesList from './SalesList'
import SalesReport from './SalesReport'

const Protected = () => {
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAccess = async () => {
      try {
      
        const response = await API.get('/protected') 
        setMessage(response.data.message)
        setUser(response.data.user)
      } catch (err) {

        console.error(err)
        localStorage.removeItem('token')
        navigate('/login')
      }
    }
    checkAccess()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  if (!user) {
    return <div>Verificando acceso...</div>
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard Protegido</h1>
      <p>{message}</p>
      <p>Bienvenido, <strong>{user.name || user.email}</strong>.</p>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      
      <hr style={{ margin: '20px 0' }} />
      <SaleForm />
      
      <hr style={{ margin: '20px 0' }} />
      <CustomerList />
      
      <hr style={{ margin: '20px 0' }} />
      <SalesList />
      
      <hr style={{ margin: '20px 0' }} />
      <SalesReport />
    </div>
  )
}

export default Protected