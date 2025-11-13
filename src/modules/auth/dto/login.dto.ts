import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'hadi' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  password: string;
}
