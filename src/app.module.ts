import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import mailConfig from './configs/mailer.config';
import appConfig from './configs/app.config';
import { ConfigModule } from '@nestjs/config';
import { JournalModule } from './journal/journal.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, mailConfig],
      envFilePath: ['.env'],
    }),
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    UserModule,
    JournalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
