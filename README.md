# Quick Auth - Microsoft Login

A simple React application with Microsoft authentication.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

## API Endpoints

The application expects the following API endpoints:

- `GET /api/auth/microsoft` - Initiates Microsoft authentication (will redirect to Microsoft login)
- `GET /me` - Returns user data when authenticated (requires Bearer token in Authorization header)

## How it works

1. User clicks "Auth with Microsoft" button
2. Application sends request to `/api/auth/microsoft`
3. API redirects to Microsoft login
4. After authentication, API returns a token
5. Token is stored in localStorage
6. Application sends request to `/me` endpoint with the token
7. If authenticated, displays "You are authed" page

## Notes

- The token is stored in localStorage
- The `/me` endpoint should return user data (name, email, etc.)
- Make sure your API handles CORS if running on different ports

