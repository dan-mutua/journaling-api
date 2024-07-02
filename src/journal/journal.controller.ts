import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { JournalService } from './journal.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Journal } from './entities/journal-entry.entity';
import { CreateJournalEntryDto } from './dto/create-journal-entry.dto';
import { UpdateJournalEntryDto } from './dto/update-journal-entry.dto';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @ApiOperation({ summary: 'Get all journal entries' })
  @ApiResponse({
    status: 200,
    description: 'Return all journal entries',
    type: [Journal],
  })
  @Get()
  async findAll(): Promise<Journal[]> {
    return this.journalService.findAll();
  }

  @ApiOperation({ summary: 'Get a journal entry by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the journal entry',
    type: Journal,
  })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Journal> {
    return this.journalService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new journal entry' })
  @ApiResponse({
    status: 201,
    description: 'The journal entry has been created.',
    type: Journal,
  })
  @Post()
  async create(
    @Body() createJournalEntryDto: CreateJournalEntryDto,
  ): Promise<Journal> {
    return this.journalService.create(createJournalEntryDto);
  }

  @ApiOperation({ summary: 'Update a journal entry by ID' })
  @ApiResponse({
    status: 200,
    description: 'The journal entry has been updated.',
    type: Journal,
  })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateJournalEntryDto: UpdateJournalEntryDto,
  ): Promise<Journal> {
    return this.journalService.update(id, updateJournalEntryDto);
  }

  @ApiOperation({ summary: 'Delete a journal entry by ID' })
  @ApiResponse({
    status: 200,
    description: 'The journal entry has been deleted.',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.journalService.delete(id);
  }
}
