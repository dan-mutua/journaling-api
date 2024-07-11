#### Journal API


## Overview

The Journal API is a RESTful service built with NestJS and TypeORM that allows for managing journal entries. This API provides endpoints for creating, reading, updating, and deleting journal entries. Swagger documentation is integrated for easy API exploration and testing.

## Features

- Create journal entries
- Read journal entries
- Update journal entries
- Delete journal entries
- Swagger documentation for API endpoint


## Technologies Used

- NestJS
- TypeORM
- Swagger
- Node.js


## Getting Started

## Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)
- PostgreSQL (or any other SQL database supported by TypeORM)


## Installation

1. Clone the repository:

```bash
git clone git@github.com:dan-mutua/journaling-api.git
cd journal-api
```

2. Install dependencies:

```bash
npm install
```

3. Set up the database configuration in `ormconfig.json`:

```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "yourusername",
  "password": "yourpassword",
  "database": "journaldb",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true
}
```

4. Run database migrations (if any):

```bash
npm run typeorm migration:run
```

## Running the Application

1. Start the server:

```bash
npm run start
```





