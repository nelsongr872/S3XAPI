import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../role/role.entity';
import { ReadRoleDto, CreateRoleDto, UpdateRoleDto } from './dto';
import { plainToClass } from 'class-transformer';
import { Status } from '../../shared/entity-status.enum';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async get(id: number): Promise<ReadRoleDto> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }
    const role: Role = await this._roleRepository.findOne(id, {
      where: { status: Status.ACTIVE },
    });
    if (!role) {
      throw new NotFoundException();
    }
    return plainToClass(ReadRoleDto, role);
  }

  async getAll(): Promise<ReadRoleDto[]> {
    const roles: Role[] = await this._roleRepository.find({
      where: { status: Status.ACTIVE },
    });

    return roles.map((role: Role) => plainToClass(ReadRoleDto, role));
  }

  async create(role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    const savedRole = await this._roleRepository.save(role);
    return plainToClass(ReadRoleDto, savedRole);
  }
  async update(id: number, role: Partial<UpdateRoleDto>): Promise<ReadRoleDto> {
    const foundRole: Role = await this._roleRepository.findOne(id, {
      where: { status: Status.ACTIVE },
    });
    if (!foundRole) {
      throw new NotFoundException('This role does not exist');
    }
    foundRole.name = role.name;
    foundRole.description = role.description;

    const updateRole: Role = await this._roleRepository.save(foundRole);
    await this._roleRepository.update(id, role);

    return plainToClass(ReadRoleDto, updateRole);
  }

  async delete(id: number): Promise<void> {
    const roleExists = await this._roleRepository.findOne(id, {
      where: { status: Status.ACTIVE },
    });
    if (!roleExists) {
      throw new NotFoundException();
    }
    await this._roleRepository.update(id, { status: Status.INACTIVE });
  }
}
