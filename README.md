# ArenaMinion Server

## Overview
This is the backend server for ArenaMinion, built with NestJS and TypeScript. It provides REST APIs and real-time features for authentication, user management, character management, deck building, matchmaking, and match state.

## Features
- **NestJS Modular Architecture**: Includes modules for Auth, Users, Characters, Decks, Matchmaking, and Matches.
- **Database**: Uses PostgreSQL with TypeORM. Connection details are managed via environment variables in `.env` (credentials not included).
- **Environment & Config**: Managed with `@nestjs/config`.
- **Logging**: Uses Winston for structured logging.
- **CORS**: Enabled globally for cross-origin requests.
- **Realtime Matchmaking & Match State**: Powered by Socket.IO gateways for matchmaking and match state updates.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Docker (for local PostgreSQL)

### Setup
1. **Install dependencies**
   ```powershell
   cd server
   npm install
   ```
2. **Start PostgreSQL with Docker**
   ```powershell
   docker run --name pg16 -e POSTGRES_PASSWORD=your_password -p 5432:5432 -v pgdata:/var/lib/postgresql/data -d postgres:16
   docker exec -it pg16 psql -U postgres -c "CREATE DATABASE arena_minion;"
   docker exec -it pg16 psql -U postgres -c "CREATE USER game_user WITH PASSWORD 'your_db_password';"
   docker exec -it pg16 psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE arena_minion TO game_user;"
   ```
3. **Configure Environment**
   - Edit `.env` in `server/`:
     ```env
     DB_HOST=localhost
     ```
4. **Run the server**
   ```powershell
   npm run start
   ```

## Realtime API
- **Matchmaking**: Connect to `/matchmaking` namespace via Socket.IO. Emit `findMatch` to join matchmaking. Server emits `matchFound` when matched.
- **Match State**: Connect to `/match-state` namespace. Emit `updateState` to update match state. Server emits `stateUpdated`.

## Project Structure
- `src/app.module.ts` - Main application module
- `src/auth/` - Authentication logic
- `src/users/` - User management
- `src/characters/` - Character management
- `src/decks/` - Deck management
- `src/matchmaking/` - Matchmaking gateway
- `src/gateway/` - Real-time gateway modules
- `src/matches/` - Match logic

## Development
- TypeScript strict mode enabled
- Logging via Winston
- Environment variables via `.env`
- CORS enabled

## License
MIT
