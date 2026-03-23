# EdTech Backend

This backend provides shared multi-user college data using SQLite.

## Setup

1. Open terminal in `backend`
2. Install dependencies:
   npm install
3. Start server:
   npm start

Server runs on `http://localhost:4000`.

## Default Admin Password

- `admin123`
- Change it from Admin Panel after login.

## API

- `GET /api/health`
- `POST /api/admin/login`
- `POST /api/admin/change-password`
- `GET /api/colleges`
- `POST /api/colleges`
- `PUT /api/colleges/:id`
- `DELETE /api/colleges/:id`
- `POST /api/colleges/reset`
- `POST /api/colleges/import`
