import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Journal } from './entities/journal-entry.entity';

@Injectable()
export class JournalService {
  constructor(
    @Inject('JOURNAL_REPOSITORY')
    private journalRepository: Repository<Journal>,
  ) {}

  async create(entryData: Partial<Journal>): Promise<Journal> {
    const entry = await this.journalRepository.create(entryData);
    return this.journalRepository.save(entry);
  }

  async findAll(): Promise<Journal[]> {
    return this.journalRepository.find();
  }

  async findOne(id: number): Promise<Journal> {
    return this.journalRepository.findOne({ where: id });
  }

  async update(id: number, entryData: Partial<Journal>): Promise<Journal> {
    await this.journalRepository.update(id, entryData);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.journalRepository.delete(id);
  }
}
