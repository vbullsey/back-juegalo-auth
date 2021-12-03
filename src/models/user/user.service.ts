import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/user-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto) {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    const user = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { username, email, is_active } = user;

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );

    return { accessToken, username, email, is_active };
  }
}
