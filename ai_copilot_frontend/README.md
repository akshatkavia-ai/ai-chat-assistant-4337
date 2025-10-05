# AI Copilot Frontend

A beautiful, elegant chat interface for interacting with your AI Copilot. Built with React and styled with the Champagne theme featuring sophisticated cream and pearl highlights.

## Features

- **Elegant Champagne Theme**: Sophisticated design with soft pastels, gentle gradients, and refined components
- **Real-time Chat Interface**: Seamless conversation with the AI assistant
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Environment-based Configuration**: Easy backend URL configuration via environment variables
- **Error Handling**: Graceful error messages and loading states
- **Auto-scroll**: Automatically scrolls to the latest message

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Running AI Copilot backend (FastAPI server)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure the backend URL:

Create a `.env` file in the root of the frontend directory:
```bash
cp .env.example .env
```

Edit the `.env` file and set your backend URL:
```
REACT_APP_BACKEND_URL=http://localhost:3001
```

**Note:** Replace `http://localhost:3001` with your actual backend URL if different.

### Running the Application

Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

Build the optimized production version:
```bash
npm run build
```

The build artifacts will be in the `build/` folder.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_BACKEND_URL` | URL of the FastAPI backend server | `http://localhost:3001` |

## Usage

1. Type your message in the input box at the bottom of the screen
2. Press **Enter** or click the **Send** button to send your message
3. Use **Shift+Enter** to create a new line without sending
4. The AI assistant will respond with helpful information
5. Your conversation history is maintained during the session

## Theme

The application uses the **Champagne** theme with the following color palette:

- **Primary**: `#D97706` (Amber)
- **Secondary**: `#F3F4F6` (Light Gray)
- **Success**: `#10B981` (Green)
- **Error**: `#EF4444` (Red)
- **Background**: `#FFFBEB` (Cream)
- **Surface**: `#FFFFFF` (White)
- **Text**: `#374151` (Dark Gray)

## API Integration

The frontend communicates with the backend via REST API:

- **Endpoint**: `POST /api/chat`
- **Request Body**:
  ```json
  {
    "message": "User's message",
    "history": [
      {"role": "user", "content": "Previous user message"},
      {"role": "assistant", "content": "Previous AI response"}
    ]
  }
  ```
- **Response**:
  ```json
  {
    "response": "AI assistant's reply"
  }
  ```

## Project Structure

```
ai_copilot_frontend/
├── public/              # Static files
├── src/
│   ├── App.js          # Main chat component
│   ├── App.css         # Champagne theme styles
│   ├── api.js          # Axios configuration
│   ├── index.js        # App entry point
│   └── index.css       # Global styles
├── .env.example        # Environment variable template
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## Troubleshooting

### Cannot connect to backend

- Verify the backend server is running
- Check that `REACT_APP_BACKEND_URL` in `.env` matches your backend URL
- Ensure CORS is properly configured on the backend

### Messages not sending

- Check browser console for error messages
- Verify the backend `/api/chat` endpoint is working
- Ensure you have a valid Gemini API key configured in the backend

## Testing

Run the test suite:
```bash
npm test
```

## Learn More

- [React Documentation](https://reactjs.org/)
- [Create React App Documentation](https://create-react-app.dev/)
- [Axios Documentation](https://axios-http.com/)

## License

This project is part of the AI Copilot application.
