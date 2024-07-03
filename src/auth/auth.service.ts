import { HttpException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

// entity
import { User } from 'src/user/entities/user.entity';

// encrtption
import { hash, compare } from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async create(registerAuthDto: RegisterAuthDto) {
    const plainToHash =  await hash(registerAuthDto.password, 10);

    registerAuthDto = {...registerAuthDto, password: plainToHash};
    return this.userRepository.save(registerAuthDto);
  }

  async login(loginAuthDto: LoginAuthDto) {

    const findUser = await this.userRepository.findOne({
      where: {
        email: loginAuthDto.email
      }
    });

    if(!findUser) throw new HttpException('User not found', 404);

    const checkPass = await compare(loginAuthDto.password, findUser.password);

    if(!checkPass) throw new HttpException('incorrect password', 403);

    const token = this.jwtService.sign({id: findUser.id});

    const data = {
      user: findUser,
      token
    };

    return data

  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: RegisterAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
