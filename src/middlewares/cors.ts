import type { NextFunction, Request, Response } from 'express'
import { ACCEPTED_ORIGINS } from '../lib/constants'

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => (req: Request, res: Response, next: NextFunction) => {
  const origins = [...ACCEPTED_ORIGINS, ...acceptedOrigins]
  
  const origin = req.header('origin')
  const isPreflight = req.method === 'OPTIONS'

  // Si el navegador envía un Origin, lo validamos.
  if (origin) {
    // 1. Si el origen está aceptado, configuramos el header
    if (origins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin)

      // 2. Para peticiones preflight (OPTIONS)
      if (isPreflight) {
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE') // Métodos que tu API acepta
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization') // Headers personalizados que usas
        res.status(204).end() // Responder a OPTIONS y terminar
        return
      }
    }
  }

  next()
}
