import { Injectable, NotFoundException } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  getStaticImage(imageName: string): string {
    const path = join(__dirname, '../../static/products', imageName);
    if (!existsSync(path)) {
      throw new NotFoundException(`Image ${imageName} not found`);
    }
    return path;
  }
}
