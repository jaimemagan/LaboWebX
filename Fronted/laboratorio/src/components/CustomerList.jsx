import React, { useState, useEffect } from 'react'
import API from '../utils/api' // Importamos la instancia de Axios

const CustomerList = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  
  const fetchAllCustomers = async () => {
    try {
      setLoading(true)
      const response = await API.get('/api/customers')
      setCustomers(response.data)
      setError(null)
    } catch (err) {
      setError('Error al cargar clientes: ' + (err.response?.data?.message || err.message))
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchAllCustomers()
  }, [])


  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchTerm) {
      fetchAllCustomers() 
      return
    }

    try {
      setIsSearching(true)
      setError(null)
     
      const response = await API.get(`/api/customers/search?code=${searchTerm}`)
      setCustomers(response.data)
    } catch (err) {
      setError('Error en la búsqueda: ' + (err.response?.data?.message || err.message))
      setCustomers([]) 
    } finally {
      setIsSearching(false)
    }
  }

  
  const clearSearch = () => {
    setSearchTerm('')
    fetchAllCustomers()
  }

  if (loading && !isSearching) return <div>Cargando clientes...</div>
  
  return (
    <div>
      <h2>Listado de Clientes</h2>

      {/* Formulario de Búsqueda */}
      <form onSubmit={handleSearch} style={{ margin: '10px 0' }}>
        <input
          type="text"
          placeholder="Buscar por Código"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" disabled={isSearching}>
          {isSearching ? 'Buscando...' : 'Buscar'}
        </button>
        <button type="button" onClick={clearSearch} disabled={loading}>
          Limpiar
        </button>
      </form>

      {/* Mensajes de estado (Carga o Error) */}
      {loading && <div>Cargando...</div>}
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

      {/* Tabla de Resultados */}
      {!loading && (
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Código</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.address}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.code}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No hay clientes para mostrar.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default CustomerList