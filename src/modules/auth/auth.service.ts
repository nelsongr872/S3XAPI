import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { IJwtPayload } from './jwt-payload.interface';
import { User } from '../user/user.entity';
import { RoleType } from '../role/roletype.enum';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
  ) {}
  async signup(signuDto: SignupDto): Promise<void> {
    const { email } = signuDto;
    const userExists = await this._authRepository.findOne({
      where: [{ email }],
    });
    if (userExists) {
      throw new ConflictException('Email alredy exists');
    }
    return this._authRepository.signup(signuDto);
  }
  async signin(signinDto: SigninDto): Promise<{ token: string }> {
    const { email, password } = signinDto;
    const user: User = await this._authRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException('user does not exist');
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('invalid credentials');
    }
    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      roles: user.roles.map(r => r.name as RoleType),
    };
    const token = await this._jwtService.sign(payload);
    return { token };
  }
}
