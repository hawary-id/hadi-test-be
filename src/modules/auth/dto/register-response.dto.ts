export class RegisterResponseDto {
  // @ApiProperty({ example: 'uuid-id' })
  id: string;

  // @ApiProperty({ example: 'hadi@mail.com' })
  email: string;

  // @ApiProperty({ example: 'Syamsul Hadi' })
  name: string;

  // @ApiProperty({ example: 'Syamsul Hadi' })
  createdAt: Date;
}
