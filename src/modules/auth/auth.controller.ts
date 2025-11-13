import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { LoginDto } from './dto/login.dto';
import { ApiCreatedBaseResponse } from 'src/common/decorators/api-created-base-response.decorator';
import { ApiBaseResponse } from 'src/common/decorators/api-base-response.decorator';
import { LoginResponseDto } from 'src/common/dto/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedBaseResponse(RegisterResponseDto)
  @ApiResponse({ status: 409, description: 'Username already exists' })
  register(@Body() dto: CreateUserDto, userId: string) {
    return this.authService.register(dto, userId);
  }

  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: LoginDto })
  @ApiBaseResponse(LoginResponseDto)
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
