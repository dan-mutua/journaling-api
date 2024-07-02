import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user.' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'User has been successfully created',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto, @Req() req) {
    return this.userService.create(createUserDto, req?.user?.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users and return an array of them.' })
  @ApiOkResponse({
    description: 'All users have been successfully returned in array',
    type: [User],
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get('/me')
  @ApiOperation({ summary: 'Get logged in user' })
  @ApiOkResponse({
    description: 'User found successfully',
    type: [User],
  })
  @UseGuards(JwtAuthGuard)
  getMe(@Req() req: any) {
    return this.userService.findUserById(req.user.id);
  }

  @Get('/email/:email')
  @ApiOperation({ summary: 'Get user by email.' })
  @ApiOkResponse({
    description: 'User with specified email has been successfully returned',
    type: User,
  })
  @UseGuards(JwtAuthGuard)
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get user by id.' })
  @ApiOkResponse({
    description: 'User with specified id have been successfully returned',
    type: User,
  })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: any) {
    return this.userService.findUserById(id);
  }

  @Patch('/:id/deactivate')
  @ApiOperation({ summary: 'Deactivate user' })
  @ApiOkResponse({
    description: 'User with specified id has been successfully deactivated',
    type: User,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  deactivate(@Param('id') id: string) {
    return this.userService.updateUser(id, { isActivated: false });
  }

  @Patch('/:id/activate')
  @ApiOperation({ summary: 'Activate user.' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({
    description: 'User with specified id has been successfully activated',
    type: User,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  activate(@Param('id') id: string) {
    return this.userService.updateUser(id, { isActivated: true });
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update user by id.' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({
    description: 'User with specified id has been successfully updated',
    type: User,
  })
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ) {
    //const user = await this.userService.findUserById(req.user.id);

    if (id !== req.user.id) {
      throw new UnauthorizedException();
    }

    return this.userService.updateUser(id, updateUserDto);
  }
}
