import { Router, type Request } from 'express'
import { getMessage } from '../lib/displayMessages'
import { ERRORS } from '../lib/constants'
import { getVideoDescription } from '../services/videoService'

export const videoDescriptionRouter = Router({ mergeParams: true })

interface DescriptionRequest {
  id: string
}

videoDescriptionRouter.get('/', async (req: Request<DescriptionRequest>, res) => {
  const { params } = req
  const { id } = params
  
  if (!id) {
    res.status(500)
    res.json({
      success: false,
      message: getMessage(ERRORS.LOGICALLY_INNACCESIBLE_ROUTE)
    })
    return
  }

  const description = getVideoDescription(id)

  if (!description) {
    res.status(404)
    res.json({
      success: false,
      message: getMessage(ERRORS.DESCRIPTION_NOT_FOUND, id)
    })

    return
  }

  res.json({
    success: true,
    description
  })
})
