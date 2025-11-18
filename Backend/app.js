import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import jwt from "jsonwebtoken"

import userRoutes from "./routes/user.routes.js"
import verifyToken from "./middlewares/verifyToken.js"
import { PORT, JWT_SECRET } from "./keys.js"
import customerRoutes from "./routes/customer.routes.js"
import salesRoutes from "./routes/sales.routes.js"     

const app = express()

// Middlewares globales - ORDEN IMPORTANTE
app.use(cors())
app.use(bodyParser.json()) // ← Esto debe ir antes de las rutas
app.use(bodyParser.urlencoded({ extended: true })) // ← Agrega esto

// Ruta pública
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de usuarios ")
})

// Ruta de login
app.post("/signin", async (req, res) => {
  const { email, password } = req.body

  console.log("Datos recibidos:", { email, password }) 

  try {
    const user = {
      id: 1,
      name: "Demo User",
      email,
    }

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' })

    res.status(200).json({ 
      message: "Login exitoso",
      token,
      user 
    })
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor", error: err.message })
  }
})

// Ruta protegida de prueba
app.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "¡Has accedido a la ruta protegida!",
    user: req.user,
  })
})

// Rutas de usuarios
app.use("/", userRoutes)
app.use("/api", verifyToken, customerRoutes) 
app.use("/api", verifyToken, salesRoutes)

app.listen(PORT, () =>
  console.log(` Server running at http://localhost:${PORT}`)
)