import React, { useState } from 'react'
import API from '../utils/api'

const SaleForm = () => {
  const [amount, setAmount] = useState('')
  const [idCustomer, setIdCustomer] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)
    setError(null)

    if (!amount || !idCustomer) {
      setError('Ambos campos son obligatorios.')
      return
    }

    try {
      const response = await API.post('/api/sales', {
        amount: parseFloat(amount),
        id_customer: parseInt(idCustomer, 10),
      })
      
      setMessage(`Venta #${response.data.id} registrada con éxito.`) // [cite: 155]
      setAmount('')
      setIdCustomer('')
    } catch (err) {
      setError('Error al registrar la venta: ' + (err.response?.data?.message || err.message))
    }
  }

  return (
    <div>
      <h2>Registrar Nueva Venta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Monto (Amount):
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
              min="0"
            />
          </label>
        </div>
        <div>
          <label>
            ID del Cliente (id_customer):
            <input
              type="number"
              value={idCustomer}
              onChange={(e) => setIdCustomer(e.target.value)}
              min="1"
            />
          </label>
        </div>
        <button type="submit">Registrar Venta</button>
      </form>
      {message && <div style={{ color: 'green', marginTop: '10px' }}>{message}</div>}
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
    </div>
  )
}

export default SaleForm