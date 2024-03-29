import { Controller, Get, Res } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { Response } from 'express';
import * as fs from 'fs'
import * as path from 'path'
@Controller('province')
export class ProvinceController {
    constructor(
        private provinceService: ProvinceService
    ){
        
    }
    @Get('/')
    async getProvinces(@Res() res : Response){
        return res.status(200).json({ 
            "provinces": [
              {
                "name": "An Giang",
                "population": 1972805,
                "area_km2": 3536.8,
                "region": "Đồng bằng Sông Cửu Long"
              },
              {
                "name": "Bà Rịa-Vũng Tàu",
                "population": 1097500,
                "area_km2": 1989.5,
                "region": "Đông Nam Bộ"
              },
              {
                "name": "Bắc Giang",
                "population": 2016000,
                "area_km2": 3827.4,
                "region": "Bắc Bộ"
              },
              {
                "name": "Bắc Kạn",
                "population": 316000,
                "area_km2": 4859.4,
                "region": "Bắc Bộ"
              },
              {
                "name": "Bạc Liêu",
                "population": 884500,
                "area_km2": 2468.7,
                "region": "Đồng bằng Sông Cửu Long"
              },
              {
                "name": "Bắc Ninh",
                "population": 1020000,
                "area_km2": 822.7,
                "region": "Bắc Bộ"
              },
              {
                "name": "Bến Tre",
                "population": 1333100,
                "area_km2": 2347.3,
                "region": "Đồng bằng Sông Cửu Long"
              },
              {
                "name": "Bình Định",
                "population": 1520100,
                "area_km2": 6052.6,
                "region": "Nam Trung Bộ"
              },
              {
                "name": "Bình Dương",
                "population": 1780100,
                "area_km2": 2694.4,
                "region": "Đông Nam Bộ"
              },
              {
                "name": "Bình Phước",
                "population": 1003500,
                "area_km2": 6870.8,
                "region": "Đông Nam Bộ"
              },
              {
                "name": "Bình Thuận",
                "population": 1306700,
                "area_km2": 7812.2,
                "region": "Nam Trung Bộ"
              },
              {
                "name": "Cà Mau",
                "population": 1215100,
                "area_km2": 5369.6,
                "region": "Đồng bằng Sông Cửu Long"
              },
              {
                "name": "Cần Thơ",
                "population": 1236700,
                "area_km2": 1439,
                "region": "Đồng bằng Sông Cửu Long"
              },
              {
                "name": "Cao Bằng",
                "population": 535000,
                "area_km2": 6707.9,
                "region": "Bắc Bộ"
              },
              {
                "name": "Đà Nẵng",
                "population": 1029000,
                "area_km2": 1285,
                "region": "Trung Bộ"
              },
              {
                "name": "Đắk Lắk",
                "population": 1797700,
                "area_km2": 13125.4,
                "region": "Tây Nguyên"
              },
              {
                "name": "Đắk Nông",
                "population": 586300,
                "area_km2": 6515.6,
                "region": "Tây Nguyên"
              },
              {
                "name": "Điện Biên",
                "population": 543300,
                "area_km2": 9562.9,
                "region": "Bắc Bộ"
              },
              {
                "name": "Đồng Nai",
                "population": 3212000,
                "area_km2": 5907.2,
                "region": "Đông Nam Bộ"
              },
              {
                "name": "Đồng Tháp",
                "population": 1657600,
                "area_km2": 3377.6,
                "region": "Đồng bằng Sông Cửu Long"
              },
              {
                "name": "Gia Lai",
                "population": 1446700,
                "area_km2": 15536.9,
                "region": "Tây Nguyên"
              },
              {
                "name": "Hà Giang",
                "population": 853000,
                "area_km2": 7914.9,
                "region": "Bắc Bộ"
              },
              {
                "name": "Hà Nam",
                "population": 826200,
                "area_km2": 860.5,
                "region": "Bắc Bộ"
              },
              {
                "name": "Hà Nội",
                "population": 8142000,
                "area_km2": 3329,
                "region": "Bắc Bộ"
              },
              {
                "name": "Hà Tĩnh",
                "population": 1115000,
                "area_km2": 5997.6,
                "region": "Bắc Trung Bộ"
              },
              {
                "name": "Hải Dương",
                "population": 1853200,
                "area_km2": 1660.7,
                "region": "Bắc Bộ"
              },
              {
                "name": "Hải Phòng",
                "population": 2031000,
                "area_km2": 1523.4,
                "region": "Bắc Bộ"
              },
              {
                "name": "Hậu Giang",
                "population": 838100,
                "area_km2": 1607.8,
                "region": "Đồng bằng Sông Cửu Long"
              },
              {
                "name": "Hòa Bình",
                "population": 856300,
                "area_km2": 4608.7,
                "region": "Bắc Bộ"
              },
              {
                "name": "Hưng Yên",
                "population": 1222300,
                "area_km2": 926.5,
                "region": "Bắc Bộ"
              },
              {
                "name": "Khánh Hòa",
                "population": 1152000,
                "area_km2": 5217.7,
                "region": "Nam Trung Bộ"
              },
              {
                "name": "Kiên Giang",
                "population": 1763600,
                "area_km2": 6341.8,
                "region": "Đồng bằng Sông Cửu Long"
              },
              {
                "name": "Kon Tum",
                "population": 450100,
                "area_km2": 9689.6,
                "region": "Tây Nguyên"
              },
              {
                "name": "Lai Châu",
                "population": 373300,
                "area_km2": 9068.8,
                "region": "Bắc Bộ"
              },
              {
                "name": "Lâm Đồng",
                "population": 1284200,
                "area_km2": 9773.5,
                "region": "Tây Nguyên"
              },
              {
                "name": "Lạng Sơn",
                "population": 783300,
                "area_km2": 8327.7,
                "region": "Bắc Bộ"
              },
              {
                "name": "Lào Cai",
                "population": 724500,
                "area_km2": 6383.9,
                "region": "Bắc Bộ"
              },
              {
                "name": "Long An",
                "population": 1681200,
                "area_km2": 4492.7,
                "region": "Đồng bằng Sông Cửu Long"
              },
              {
                "name": "Nam Định",
                "population": 1928400,
                "area_km2": 1657.6,
                "region": "Bắc Bộ"
              },
              {
                "name": "Nghệ An",
                "population": 3133300,
                "area_km2": 16490.1,
                "region": "Bắc Trung Bộ"
              },
              {
                "name": "Ninh Bình",
                "population": 1068400,
                "area_km2": 1376.7,
                "region": "Bắc Trung Bộ"
              },
              {
                "name": "Ninh Thuận",
                "population": 581300,
                "area_km2": 3358,
                "region": "Nam Trung Bộ"
              },
              {
                "name": "Phú Thọ",
                "population": 1562300,
                "area_km2": 3533.3,
                "region": "Bắc Bộ"
              },
              {
                "name": "Phú Yên",
                "population": 901200,
                "area_km2": 5060.6,
                "region": "Nam Trung Bộ"
              },
              {
                "name": "Quảng Bình",
                "population": 854500,
                "area_km2": 8067.9,
                "region": "Bắc Trung Bộ"
              },
              {
                "name": "Quảng Nam",
                "population": 1431400,
                "area_km2": 10438.4,
                "region": "Nam Trung Bộ"
              },
              {
                "name": "Quảng Ngãi",
                "population": 1287500,
                "area_km2": 5156.4,
                "region": "Nam Trung Bộ"
              },
              {
                "name": "Quảng Ninh",
                "population": 1256000,
                "area_km2": 6102.3,
                "region": "Bắc Bộ"
              },
              {
                "name": "Quảng Trị",
                "population": 617400,
                "area_km2": 4759,
                "region": "Bắc Trung Bộ"
              },
              {
                "name": "Sóc Trăng",
                "population": 1307100,
                "area_km2": 3310.6,
                "region": "Đồng bằng Sông Cửu Long"
              },
              {
                "name": "Sơn La",
                "population": 1306400,
                "area_km2": 14174.4,
                "region": "Bắc Bộ"
              },
              {
                "name": "Tây Ninh",
                "population": 1144200,
                "area_km2": 4027.6,
                "region": "Đồng bằng Sông Cửu Long"
              },
              {
                "name": "Thái Bình",
                "population": 1883600,
                "area_km2": 1576.4,
                "region": "Bắc Bộ"
              },{
                "name": "Thái Nguyên",
                "population": 1243600,
                "area_km2": 3530.6,
                "region": "Bắc Bộ"
              },
              {
                "name": "Thanh Hóa",
                "population": 3663000,
                "area_km2": 11129.9,
                "region": "Bắc Trung Bộ"
              },
              {
                "name": "Thừa Thiên-Huế",
                "population": 1212700,
                "area_km2": 5027.8,
                "region": "Bắc Trung Bộ"
              },
              {
                "name": "Tiền Giang",
                "population": 1767100,
                "area_km2": 2496,
                "region": "Đồng bằng Sông Cửu Long"
              },
              {
                "name": "Trà Vinh",
                "population": 1026700,
                "area_km2": 2341.2,
                "region": "Đồng bằng Sông Cửu Long"
              },
              {
                "name": "Tuyên Quang",
                "population": 807000,
                "area_km2": 5867.3,
                "region": "Bắc Bộ"
              },
              {
                "name": "Vĩnh Long",
                "population": 1057200,
                "area_km2": 1455.1,
                "region": "Đồng bằng Sông Cửu Long"
              },
              {
                "name": "Vĩnh Phúc",
                "population": 1214900,
                "area_km2": 1236.5,
                "region": "Bắc Bộ"
              },
              {
                "name": "Yên Bái",
                "population": 764000,
                "area_km2": 6886.3,
                "region": "Bắc Bộ"
              }
            ]
          }
          
             
          
          )
        // return res.status(200).json(fs.readFileSync('../location.json'))
    }
    @Get('/hello')
    async getHello(@Res() res : Response){
        return res.status(200).json('Hello')
    }
}
