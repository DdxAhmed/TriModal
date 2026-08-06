# Tri-Modal_Server

A TypeScript and Express-based backend server for the Tri-Modal application, built with MongoDB, esbuild, and Pino logging.

## Features

- **Express Framework**: Fast, unopinionated, minimalist web framework.
- **TypeScript**: Typed JavaScript superset.
- **MongoDB**: Official MongoDB driver for Node.js.
- **Logging**: High performance logging with Pino and Pino HTTP.
- **Bundling**: Extremely fast builds using esbuild.

## Getting Started

### Prerequisites

Make sure you have Node.js and `pnpm` installed.

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Configure environment variables by creating a `.env` file in the root of the server directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/trimodal
   ```

### Scripts

- **Development**: Build the project and run the server.
  ```bash
  pnpm run dev
  ```
- **Build**: Bundle the source code using esbuild.
  ```bash
  pnpm run build
  ```
- **Start**: Run the bundled server from the `dist` folder.
  ```bash
  pnpm run start
  ```
- **Type Check**: Validate TypeScript types without emitting code.
  ```bash
  pnpm run typecheck
  ```
