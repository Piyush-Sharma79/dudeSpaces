# Deployment Guide

## Overview
This project consists of two parts:
- **Client**: React + Vite frontend
- **Server**: Node.js + Express backend

## Deployment Strategy: Separate Hosting

### Server Deployment (Render)

1. **Prepare the server for deployment:**
   - The server is already configured with proper build scripts
   - Environment variables are set up in `.env`

2. **Deploy to Render:**
   - Go to [render.com](https://render.com)
   - Sign up/login with GitHub
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Root Directory**: `server`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Environment**: Node
   - Set the following environment variables in Render:
     ```
     STREAM_API_KEY=hyfhuskn2cs3
     STREAM_API_SECRET=um98pvqvsmg6nzcqutxtm49c4a2yhyh5ysbjfvdgm4m47saxaff4avdu4jryct23
     ```
   - Click "Create Web Service"

3. **Note your Render server URL** (e.g., `https://your-app-name.onrender.com`)

### Client Deployment (Vercel)

1. **Update environment variables:**
   - Update `client/.env` with your Render server URL:
     ```
     VITE_STREAM_API_KEY=hyfhuskn2cs3
     VITE_SERVER_URL=https://your-render-app.onrender.com
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
     VITE_SERVER_URL=https://your-render-app.onrender.com
     ```
   - Deploy!

### Important Notes

- Make sure to update `VITE_SERVER_URL` with your actual Render deployment URL
- The server needs to be deployed first to get the URL for the client
- Both platforms offer free tiers perfect for personal projects
- Render's free tier may "spin down" after 15 minutes of inactivity, causing a brief delay on first request

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
