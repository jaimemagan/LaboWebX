import { pool } from '../../database.js'

export const getCustomers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers;')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor', error: err.message })
  }
}