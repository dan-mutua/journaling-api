import { Connection } from 'typeorm';
import { Journal } from './entities/journal-entry.entity';
import { JournalService } from './journal.service';

export const journalProviders = [
  JournalService,
  {
    provide: 'JOURNAL_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Journal),
    inject: ['DATABASE_CONNECTION'],
  },
];
