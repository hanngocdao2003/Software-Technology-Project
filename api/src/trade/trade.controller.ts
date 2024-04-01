import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TradeDTO } from './dto';
import { TradeService } from './trade.service';
import { MyJwtGuard } from 'src/auth/guard';

@Controller('trade')
export class TradeController {
    constructor(
        private tradeService : TradeService
    ){}
    // CRUD
    @Get('all')
    get(){
        return this.tradeService.getAllTrade()
    }
    // ADD
    @UseGuards(MyJwtGuard)
    @UsePipes(ValidationPipe)
    @Post('add-trade')
    add(@Body() insertDTO : TradeDTO ){
        return this.tradeService.addTrade(insertDTO)
    }

    @Post('update-trade/:id')
    @UsePipes(ValidationPipe)
    update(@Body() insertDTO : TradeDTO, @Param('id') id : number){
        return this.tradeService.updateTrade(insertDTO,id)
    }
    @Delete('delete-trade/:id')
    delete(@Param('id') id : number){
        return this.tradeService.deleteTrade(id)
    }
}