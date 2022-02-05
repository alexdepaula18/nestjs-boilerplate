import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class ReturnUserDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  message: string;
}
