## Environment Variables Setup

To configure the application, you need to create a `.env` file in the root directory of your project with the following variables:

1. **VITE_PUBLIC_URL**: This variable defines the URL of your backend server. The application will use this URL as the base for all API requests.

   Example:

   ```env
   VITE_PUBLIC_URL=http://localhost:5000
   ```

2. **VITE_USE_MOCK**: This variable determines whether the HTTP client will make actual requests to the backend server or not. Set this to true to enable mocking (useful for development or testing), or false to disable it and make real request.

   Example:

   ```env
   VITE_USE_MOCK=true
   ```

## Available Scripts

In the project directory, you can run:

### `npm i`

Installs all the dependencies required for the project.<br />

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run dev`

Open the app directly on the browser and runs it on a development mode.<br />

### `npm run lint`

Checks the code for errors and missing things

### `npm run format`

Formats the code according to `prettier` config

### `npm run test`

Launches the test runner in the interactive watch mode.<br />

### `npm run coverage`

Runs all the tests and generate the coverage report.<br />

### `npm run build`

Builds the app for production or local development to the `dist` folder.<br />

## Server Setup

The server is a simple flask application under the `server` folder. Create a `venv` and install the requirements from the `requirements.txt` file.<br />
The server will be open on [http://localhost:5000](http://localhost:5000) by running the following script.

### `python server.py`
