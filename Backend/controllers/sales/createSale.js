
import { pool } from '../../database.js'

export const createSale = async (req, res) => {
  const { amount, id_customer } = req.body

  if (!amount || !id_customer) {
    return res.status(400).json({ message: 'Faltan los campos amount o id_customer.' })
  }

  try {
    
    const customerCheck = await pool.query('SELECT id FROM customers WHERE id = $1', [id_customer])
    
    if (customerCheck.rows.length === 0) {
      return res.status(404).json({ message: 'El cliente (id_customer) no existe.' })
    }

    
    const result = await pool.query(
      'INSERT INTO sales (amount, created_at, id_customer) VALUES ($1, NOW(), $2) RETURNING *',
      [amount, id_customer]
    )
    
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor', error: err.message })
  }
}