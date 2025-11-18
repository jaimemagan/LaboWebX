import React, { useState, useEffect } from 'react'
import API from '../utils/api'

const SalesReport = () => {
  const [reportData, setReportData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true)
        const response = await API.get('/api/sales/report')
        setReportData(response.data)
        setError(null)
      } catch (err) {
        setError('Error al cargar el reporte: ' + (err.response?.data?.message || err.message))
      } finally {
        setLoading(false)
      }
    }

    fetchReport()
  }, [])

  if (loading) return <div>Cargando reporte...</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>

  return (
    <div>
      <h2>Reporte de Ventas por Cliente</h2>
      <table border="1" style={{ width: '50%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Total Ventas</th>
          </tr>
        </thead>
        <tbody>
          {reportData.length > 0 ? (
            reportData.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>${parseFloat(row.total_sales).toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No hay datos para el reporte.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default SalesReport