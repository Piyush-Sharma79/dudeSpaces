# Deployment Guide

## Overview
This project consists of two parts:
- **Client**: React + Vite frontend
- **Server**: Node.js + Express backend

## Deployment Strategy: Separate Hosting

### Server Deployment (Railway)

1. **Prepare the server for deployment:**
   - The server is already configured with proper build scripts
   - Environment variables are set up in `.env`

2. **Deploy to Railway:**
   - Go to [railway.app](https://railway.app)
   - Sign up/login with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect it's a Node.js project
   - Set the following environment variables in Railway:
     ```
     STREAM_API_KEY=hyfhuskn2cs3
     STREAM_API_SECRET=um98pvqvsmg6nzcqutxtm49c4a2yhyh5ysbjfvdgm4m47saxaff4avdu4jryct23
     PORT=3000
     ```
   - Railway will automatically run `npm run build` and `npm start`

3. **Note your Railway server URL** (e.g., `https://your-app-name.railway.app`)

### Client Deployment (Vercel)

1. **Update environment variables:**
   - Update `client/.env` with your Railway server URL:
     ```
     VITE_STREAM_API_KEY=hyfhuskn2cs3
     VITE_SERVER_URL=https://your-railway-app.railway.app
     ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository
   - Set Root Directory to `client`
   - Set the following environment variables in Vercel:
     ```
     VITE_STREAM_API_KEY=hyfhuskn2cs3
     VITE_SERVER_URL=https://your-railway-app.railway.app
     ```
   - Deploy!

### Important Notes

- Make sure to update `VITE_SERVER_URL` with your actual Railway deployment URL
- The server needs to be deployed first to get the URL for the client
- Both platforms offer free tiers perfect for personal projects

## Local Development

### Server:
```bash
cd server
npm install
npm run dev
```

### Client:
```bash
cd client
npm install
npm run dev
```

Make sure your local `.env` files are properly configured for development.
