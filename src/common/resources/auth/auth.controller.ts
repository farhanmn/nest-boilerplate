import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { errorResponse, successResponse } from '../../../utils/response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a user' })
  @ApiBody({ type: registerDto })
  @ApiResponse({
    status: 201,
    description: 'User registered'
  })
  register(@Body() dto: registerDto) {
    return this.authService.signUp(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: loginDto })
  @ApiResponse({
    status: 200,
    description: 'User login'
  })
  async login(@Body() dto: loginDto) {
    try {
      const user = await this.authService.signIn(dto);
      return successResponse('OK', user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      return errorResponse('Internal Server Error');
    }
  }
}
