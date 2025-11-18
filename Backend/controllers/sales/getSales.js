
import { pool } from '../../database.js'

export const getSales = async (req, res) => {
  try {
    const query = `
      SELECT s.id, s.amount, s.created_at, c.name
      FROM sales s
      INNER JOIN customers c ON s.id_customer = c.id
      ORDER BY s.created_at DESC;
    `
    const result = await pool.query(query)
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor', error: err.message })
  }
}