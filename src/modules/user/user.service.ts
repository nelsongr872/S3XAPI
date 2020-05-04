import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { ReadUserDto, UpdateEmailDto } from './dto';
import { User } from './user.entity';
import { plainToClass } from 'class-transformer';
import { Status } from '../../shared/entity-status.enum';
import { RoleRepository } from '../role/role.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}
  async get(id: number): Promise<ReadUserDto> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }
    const user: User = await this._userRepository.findOne(id, {
      where: { status: Status.ACTIVE },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return plainToClass(ReadUserDto, user);
  }

  async getAll(): Promise<ReadUserDto[]> {
    const users: User[] = await this._userRepository.find({
      where: { status: Status.ACTIVE },
    });

    return users.map((user: User) => plainToClass(ReadUserDto, user));
  }

  async updateEmail(email: string, user: UpdateEmailDto): Promise<ReadUserDto> {
    const foundEmail = await this._userRepository.findOne(email, {
      where: { status: Status.ACTIVE },
    });
    if (!foundEmail) {
      throw new NotFoundException('email does not exist');
    }
    foundEmail.email = user.email;
    const updatedUser = await this._userRepository.save(foundEmail);
    return plainToClass(ReadUserDto, updatedUser);
  }

  async delete(userid: number): Promise<void> {
    const userExist = await this._userRepository.findOne(userid, {
      where: { status: Status.ACTIVE },
    });
    if (!userExist) {
      throw new NotFoundException();
    }
    await this._userRepository.update(userid, { status: Status.INACTIVE });
  }

  async setRoleToUser(userId: number, roleId: number): Promise<boolean> {
    const userExist = await this._userRepository.findOne(userId, {
      where: { status: Status.ACTIVE },
    });
    if (!userExist) {
      throw new NotFoundException();
    }
    const roleExist = await this._roleRepository.findOne(roleId, {
      where: { status: Status.ACTIVE },
    });
    if (!roleExist) {
      throw new NotFoundException('Role does not exist');
    }
    userExist.roles.push(roleExist);
    await this._userRepository.save(userExist);
    return true;
  }
}
