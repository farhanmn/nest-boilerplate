import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
  HttpException
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse
} from '@nestjs/swagger';
import { ResponseDto } from './dto/response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { errorResponse, successResponse } from '../../../utils/response';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({
    description: 'Create a new user',
    schema: {
      example: {
        statusCode: 201,
        message: 'Create user successfully',
        data: {
          id: 1,
          name: 'John',
          email: 'mail@mail.com'
        }
      }
    }
  })
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: ResponseDto,
    isArray: true
  })
  @UseGuards(JwtAuthGuard)
  async findAll() {
    try {
      const users = await this.userService.findAll({});
      return successResponse('OK', users);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      return errorResponse('Internal Server Error');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiQuery({ name: 'id', required: true, description: 'Id of user' })
  @ApiResponse({
    status: 200,
    description: 'User data',
    type: ResponseDto
  })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit user by id' })
  @ApiBody({ type: UpdateUserDto })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: ResponseDto
  })
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully'
  })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
