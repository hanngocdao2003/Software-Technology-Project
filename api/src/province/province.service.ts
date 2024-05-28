import { ForbiddenException, Injectable, Res } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path'

@Injectable()
export class ProvinceService {
    async getProvince(){
        return  'Hello world'
    }
}
