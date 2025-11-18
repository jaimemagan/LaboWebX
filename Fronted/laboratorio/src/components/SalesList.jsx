import React, { useState, useEffect } from 'react'
import API from '../utils/api'

const SalesList = () => {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true)
        const response = await API.get('/api/sales')
        setSales(response.data)
        setError(null)
      } catch (err) {
        setError('Error al cargar ventas: ' + (err.response?.data?.message || err.message))
      } finally {
        setLoading(false)
      }
    }

    fetchSales()
  }, [])

  if (loading) return <div>Cargando ventas...</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>

  return (
    <div>
      <h2>Listado de Ventas</h2>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Nombre del Cliente</th>
          </tr>
        </thead>
        <tbody>
          {sales.length > 0 ? (
            sales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>${parseFloat(sale.amount).toFixed(2)}</td>
                <td>{new Date(sale.created_at).toLocaleString()}</td>
                <td>{sale.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay ventas para mostrar.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default SalesList