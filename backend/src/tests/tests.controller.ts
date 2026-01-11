import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TestsService } from './tests.service';

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  // ===== Tests =====
  @Get()
  getTests() {
    return this.testsService.findAllTests();
  }

  @Patch(':id/price')
  updatePrice(
    @Param('id') id: string,
    @Body('price') price: number,
  ) {
    return this.testsService.updatePrice(Number(id), price);
  }

  // ===== Parameters =====
  @Get(':id/parameters')
  getParameters(@Param('id') id: string) {
    return this.testsService.getParametersByTest(Number(id));
  }

  @Post(':id/parameters')
  addParameter(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.testsService.addParameter(Number(id), body);
  }
}
