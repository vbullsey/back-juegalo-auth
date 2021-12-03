import { Controller, Post, Body, ValidationPipe, Get, Request } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/user-credentials.dto';
import { User } from './entities/user.entity';
import { GetUser } from './get-user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // POSTS
  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.userService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(authCredentialsDto);
  }

  // GETS
  @Get('/user')
  getUser(
    @Request() req: any): Promise<User> {
      
      console.log(req.headers.bearer)
      return null
    }

}
