import { randomUUID } from "crypto";
import { ValidationError } from "../error/ValidationError";

export enum CategoryEnum {
  "COMÉDIA" = "COMÉDIA",
  "DRAMA" = "DRAMA",
  "INFANTIL" = "INFANTIL",
}

export interface Video {
  name: string;
  category: CategoryEnum;
  id?: string;
}

class VideoService {
  videos: Video[] = [];

  list() {
    return this.videos;
  }

  create(video: Video) {
    if (!video.name || !video.category) {
      console.log("Deu erro");
      throw new ValidationError("Preencher campos obrigatórios", 422);
    }

    if (!(video.category in CategoryEnum)) {
      throw new ValidationError("Preencher campos obrigatórios", 422);
    }

    video.id = randomUUID();

    this.videos.push(video);

    return video;
  }

  findById(id: string) {
    return this.videos.find((video) => video.id === id);
  }
}

export { VideoService };
