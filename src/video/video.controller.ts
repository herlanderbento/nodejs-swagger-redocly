import { Request, Response } from 'express'
import { Video, VideoService } from './video.service'
 
const videoService = new VideoService()

class VideoController{

  create(request: Request, response: Response){
    const video = request.body as Video

    const videoCreated = videoService.create(video)
    return response.json(videoCreated)
  }

  list(request: Request, response: Response){
    const list = videoService.list()

    return response.json(list)
  }
  
  findById(request: Request, response: Response){
    const { id } = request.params

    const video = videoService.findById(id);

    if(!video){
      response.statusCode = 204

      return response.end()
    }

    return response.json(video)
  }
}

export { VideoController }