import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(40)
  password: string;

  @IsEmail()
  @IsOptional()
  email: string;
}
