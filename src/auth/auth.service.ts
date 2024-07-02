import {
  UnauthorizedException,
  Injectable,
  Inject,
  BadRequestException,
  forwardRef,
} from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { TokenService } from 'src/tokens/token.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    @Inject(TokenService)
    private tokenService: TokenService,

    private eventEmitter: EventEmitter2,
  ) {}

  async login(id: number | string, email: string): Promise<any> {
    return await this.tokenService.update(id, email);
  }

  async refresh(userId: number | string, refreshToken: string): Promise<any> {
    const user = await this.userService.findUserById(userId);
    if (!user) throw new UnauthorizedException();

    return await this.tokenService.update(user.id, user.email);
  }

  async resetPassword(
    userId: number | string,
    passwordsDto: UpdatePasswordDto,
  ): Promise<any> {
    const user = await this.userService.findUserById(userId);

    if (!user) throw new UnauthorizedException('User not found!');

    const isPasswordVerified = await this.userService.compareHash(
      passwordsDto.old,
      user.password,
    );

    if (!isPasswordVerified)
      throw new BadRequestException('Incorrect old password');

    return await this.userService.updateUser(userId, {
      password: passwordsDto.new,
    });
  }

  async resetForgottenPassword(
    recoverToken: number | string,
    password: string,
  ): Promise<any> {
    const user = await this.userService.findOneBy('recoverToken', recoverToken);

    if (!user) {
      throw new BadRequestException('Token expired');
    }

    const newPassword = await this.userService.hashPassword(password);

    return this.userService.updateUser(user.id, {
      password: newPassword,
      recoverToken: null,
    });
  }

  async forgotPassword(email: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const recoverToken = (await this.tokenService.generate(user.id, user.email))
      .accessToken;
    //

    // await this.userService.updateUser(user.id, {
    //   recoverToken,
    // });

    try {
      await this.userService.updateUser(user.id, {
        recoverToken,
      });

      this.eventEmitter.emitAsync('auth.forgotPassword', {
        ...user,
        recoverToken,
      });

      return true;
    } catch (error) {
      console.error(error);
    }
  }

  async validateUser(
    emailOrId: string,
    pass: string,
    findById = false as boolean,
  ): Promise<any> {
    const user = findById
      ? await this.userService.findUserById(emailOrId)
      : await this.userService.findByEmail(emailOrId);

    if (!user) throw new UnauthorizedException();

    //if (!user.isActivated)
    //  throw new BadRequestException('Please, activate your account');

    const isValidUserPassword = await this.userService.compareHash(
      pass,
      user.password,
    );
    if (!isValidUserPassword) throw new UnauthorizedException();

    const { password, ...res } = user;

    return res;
  }

  async activate(link: string) {
    const user: User = await this.userService.findOne({
      activationLink: link,
    });

    if (!user) throw new BadRequestException("User doesn't exist!");

    if (user.isActivated) return user;
    //

    const newUser = {
      isActivated: true,
    };

    return this.userService.updateUser(user.id, newUser);
  }
}
