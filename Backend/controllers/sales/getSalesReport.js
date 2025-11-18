import { pool } from '../../database.js'

export const getSalesReport = async (req, res) => {
  try {
    const query = `
      SELECT c.name, SUM(s.amount) AS total_sales
      FROM sales s
      JOIN customers c ON s.id_customer = c.id
      GROUP BY c.name
      ORDER BY total_sales DESC;
    `
    const result = await pool.query(query)
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor', error: err.message })
  }
}