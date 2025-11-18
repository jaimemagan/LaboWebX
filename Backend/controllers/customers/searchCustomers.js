
import { pool } from '../../database.js'

export const searchCustomers = async (req, res) => {
  const { code } = req.query 

  if (!code) {
    return res.status(400).json({ message: 'El parámetro "code" es requerido.' })
  }

  try {
    const query = 'SELECT * FROM customers WHERE code = $1;' 
    const result = await pool.query(query, [code])
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No se encontraron clientes con ese código.' })
    }
    
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor', error: err.message })
  }
}