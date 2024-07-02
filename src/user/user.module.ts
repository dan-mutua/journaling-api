import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProvider } from './user.provider';
import { TokenModule } from 'src/tokens/token.module';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TokenModule, DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, userProvider],
  exports: [UserService],
})
export class UserModule {}
