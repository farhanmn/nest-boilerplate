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
  HttpException,
  Query
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
import { ApiResponses } from '../../models/response';
import { UserPaginationDto } from './dto/user-pagination.dto';
import { UserData } from '../../models/user';

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
  async create(@Body() dto: CreateUserDto): Promise<ApiResponses<UserData>> {
    try {
      const user = await this.userService.create(dto);
      return successResponse('Create user successfully', user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      return errorResponse('Internal Server Error');
    }
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
  async findAll(
    @Query() query: UserPaginationDto,
    @Query('name') name?: string
  ): Promise<
    ApiResponses<{
      data: UserData[];
      meta: UserPaginationDto;
    }>
  > {
    try {
      const users = await this.userService.findAll({
        name,
        paginationDto: query
      });
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
  async findOne(
    @Param('id') id: number
  ): Promise<ApiResponses<UserData | null>> {
    try {
      const user = await this.userService.findOne(id);
      return successResponse('OK', user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      return errorResponse('Internal Server Error');
    }
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
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateUserDto
  ): Promise<ApiResponses<UserData>> {
    try {
      const user = await this.userService.update(id, dto);
      return successResponse('User updated successfully', user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      return errorResponse('Internal Server Error');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully'
  })
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number): Promise<ApiResponses<boolean>> {
    try {
      const user = await this.userService.remove(id);
      return successResponse('User deleted successfully', user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      return errorResponse('Internal Server Error');
    }
  }
}
