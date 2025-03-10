import {
  forwardRef,
  HttpStatus,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { REPOSITORY } from 'src/constants';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { TokenService } from 'src/tokens/token.service';
import * as bcrypt from 'bcrypt';
import { EntityCondition } from 'src/utils/entity-condition.type';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    @Inject(TokenService) private tokenService: TokenService,

    @Inject(forwardRef(() => AuthService)) private authService: AuthService,

    private eventEmitter: EventEmitter2,
  ) {}

  findOne(fields: EntityCondition<User>) {
    return this.userRepository.findOne({
      where: fields,
    });
  }

  findOneBy(field, value) {
    return this.userRepository.findOneBy({
      [field]: value,
    });
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    return user;
  }

  async create(
    user: CreateUserDto,
    createdBy?: string | undefined,
  ): Promise<User> {
    const { email, password, userName } = user;

    const userExists = await this.userRepository.findOneBy({ email });

    if (userExists) {
      throw new HttpException('User already exists', 409);
    }

    const hashedPassword = await this.hashPassword(password);

    const isActivated = !!createdBy ? true : false;

    const newUser = new User();
    newUser.email = email;
    newUser.userName = userName;
    newUser.password = hashedPassword;

    if (!isActivated) {
      // generate validation link
      newUser.activationLink = (
        await this.tokenService.generate(email, userName)
      ).accessToken;
    }

    try {
      const response = await this.userRepository.save(newUser);

      if (!isActivated) {
        this.eventEmitter.emitAsync('auth.validateSignup', response);
      }

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findUserById(userId: number | string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return user;
  }

  public async updateUser(
    id: number | string,
    userUpdateDto: object,
  ): Promise<User | undefined> {
    try {
      const user = await this.findUserById(id);

      for (const prop in userUpdateDto) {
        if (
          Object.prototype.hasOwnProperty.call(userUpdateDto, prop) &&
          prop != 'id'
        ) {
          user[prop] = userUpdateDto[prop];
        }
      }

      return this.userRepository.save(user);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteUser(id: number | string): Promise<void> {
    const user = await this.findUserById(id);
    await this.userRepository.remove(user);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(REPOSITORY.BCRYPT_ROUNDS);

    return await bcrypt.hash(password, salt);
  }

  async compareHash(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}
