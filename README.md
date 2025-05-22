# Unrepped Web Application

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [pnpm](https://pnpm.io/) (recommended package manager)

## Installation

1. **Install pnpm** (if not already installed)
   
   Using Homebrew (recommended for macOS):
   ```bash
   brew install pnpm
   ```
   
   Or using npm (might require sudo on macOS/Linux):
   ```bash
   npm install -g pnpm
   ```

2. **Install project dependencies**
   
   In the project directory, run:
   ```bash
   pnpm install
   ```

## Running the Application

1. **Start the development server**
   ```bash
   pnpm dev
   ```

2. **Access the application**
   - Open your browser and navigate to:
     - Default URL: [http://localhost:3000](http://localhost:3000)
     - Alternative port (if 3000 is in use): [http://localhost:3001](http://localhost:3001)

   If you can't connect to localhost:3000, try running with a different port:
   ```bash
   PORT=3001 pnpm dev
   ```

## Project Structure

This is a Next.js project that uses:
- React 19
- Next.js 15.2.4
- TailwindCSS for styling
- TypeScript for type safety
- Various Radix UI components for UI elements

## Troubleshooting

If you encounter any issues:

1. **Port already in use**
   - Try using a different port as shown above
   - Or kill the process using the current port

2. **Permission issues during pnpm installation**
   - On macOS, prefer using Homebrew to install pnpm
   - Avoid using sudo with npm if possible

3. **Dependencies installation issues**
   - Clear pnpm cache: `pnpm store prune`
   - Remove node_modules and pnpm-lock.yaml: `rm -rf node_modules pnpm-lock.yaml`
   - Reinstall dependencies: `pnpm install` 