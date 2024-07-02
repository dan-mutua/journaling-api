import { Module } from '@nestjs/common';
import { JournalController } from './journal.controller';
import { DatabaseModule } from 'src/database/database.module';
import { journalProviders } from './journal.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [JournalController],
  providers: [...journalProviders],
})
export class JournalModule {}
