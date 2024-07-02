import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RestoreForgottenPasswordDto } from './dto/restore-forgotten-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { JwtRefreshGuard } from './guards/jwtRefresh.guard';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Login user with the local strategy by email and password.',
  })
  @ApiOkResponse({
    description: 'User has been successfully login in the system',
  })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any) {
    return await this.authService.login(req.user.id, req.user.email);
  }

  @ApiOperation({ summary: 'Refresh token with JWT strategy.' })
  @ApiOkResponse({
    description: 'Refresh token was succesfully updated in the Redis store',
  })
  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh(@Request() req: any) {
    return await this.authService.refresh(req.user.id, req.user.refreshToken);
  }

  @ApiOperation({ summary: 'Update user password.' })
  @ApiBody({
    type: RestoreForgottenPasswordDto,
  })
  @Post('reset/:id')
  async resetForgottenPassword(
    @Param('id') id: string,
    @Body() body: RestoreForgottenPasswordDto,
  ) {
    return await this.authService.resetForgottenPassword(id, body.password);
  }

  @ApiOperation({ summary: 'Request password reset.' })
  @ApiBody({
    type: RestoreForgottenPasswordDto,
  })
  @Post('forgot-password')
  async requestPasswordReset(@Body() body: ForgotPasswordDto) {
    return await this.authService.forgotPassword(body.email);
  }

  @ApiOperation({ summary: 'Update user password.' })
  @ApiBody({
    type: UpdatePasswordDto,
  })
  @Patch('reset')
  @UseGuards(JwtAuthGuard)
  async reset(@Request() req: any, @Body() passwordsDto: UpdatePasswordDto) {
    return await this.authService.resetPassword(req.user.id, passwordsDto);
  }

  @ApiOperation({ summary: 'Activation link send' })
  @ApiOkResponse({
    description: 'Activation link was succesfully sent to the user email',
  })
  @Get('activate/:link')
  async activate(@Param('link') link: string) {
    return this.authService.activate(link);
  }
}
