import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhotoService {
  constructor(@InjectRepository(Photo) private readonly photoRepository: Repository<Photo>) {}

  findAll(): Promise<Photo[]> {
    return this.photoRepository.find();
  }
}
