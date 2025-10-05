# AI Copilot Frontend

A beautiful, elegant chat interface for interacting with your AI Copilot. Built with React and styled with the Champagne theme featuring sophisticated cream and pearl highlights.

## Features

- **Elegant Champagne Theme**: Sophisticated design with soft pastels, gentle gradients, and refined components
- **Real-time Chat Interface**: Seamless conversation with the AI assistant
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Environment-based Configuration**: Easy backend URL configuration via environment variables
- **Error Handling**: Graceful error messages and loading states
- **Auto-scroll**: Automatically scrolls to the latest message
- **Conversation History**: Maintains context throughout the chat session

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Running AI Copilot backend (FastAPI server on port 3001)

### Installation

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Configure Environment Variables

Create a `.env` file in the root of the frontend directory:

```bash
cp .env.example .env
```

Edit the `.env` file and set your backend URL:

```
REACT_APP_BACKEND_URL=http://localhost:3001
```

**Important:** Replace `http://localhost:3001` with your actual backend URL if different.

##### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_BACKEND_URL` | URL of the FastAPI backend server | `http://localhost:3001` | Yes |

**Note:** In React, environment variables must be prefixed with `REACT_APP_` to be accessible in the browser.

#### Example .env File

```
# Backend API URL
REACT_APP_BACKEND_URL=http://localhost:3001
```

### Running the Application

Start the development server:

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000) in your browser.

**Note:** The frontend runs on port **3000** by default. Ensure this matches the `FRONTEND_ORIGIN` configured in the backend.

### Building for Production

Build the optimized production version:

```bash
npm run build
```

The build artifacts will be in the `build/` folder.

## How the Chat Flow Works

### 1. User Interaction

1. User types a message in the input box at the bottom of the screen
2. User presses **Enter** or clicks the **Send** button
3. The message is added to the local chat history
4. A loading indicator appears while waiting for the AI response

### 2. Frontend to Backend Communication

The frontend sends the message to the backend:

```
User Input
    ↓
React App (http://localhost:3000)
    ↓
POST /api/chat → Backend (http://localhost:3001)
```

The request includes:
- **message**: The current user message
- **history**: Previous conversation messages for context

Example request payload:
```json
{
  "message": "What is machine learning?",
  "history": [
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Hi! How can I help you today?"}
  ]
}
```

### 3. Backend Processing

The backend (FastAPI):
1. Receives the chat request
2. Validates the Gemini API key is configured
3. Sends the message and history to Google's Gemini API
4. Receives the AI-generated response
5. Returns the response to the frontend

```
Backend
    ↓
Gemini API
    ↓
AI Response
    ↓
Backend Response
```

### 4. Frontend Response Handling

The frontend:
1. Receives the AI response
2. Adds it to the conversation history
3. Displays it in the chat interface
4. Automatically scrolls to the latest message
5. Re-enables the input box for the next message

### 5. Conversation Context

The frontend maintains the full conversation history throughout the session:
- Each user message and AI response is stored locally
- The entire history is sent with each new message for context
- This allows the AI to provide contextual responses based on previous exchanges

## Usage

### Sending Messages

- Type your message in the input box at the bottom of the screen
- Press **Enter** or click the **Send** button to send your message
- Use **Shift+Enter** to create a new line without sending

### Message Display

- **User messages**: Displayed on the right with amber background (#D97706)
- **AI responses**: Displayed on the left with white background
- **Timestamps**: Not currently implemented (future enhancement)

### Error Handling

If an error occurs:
- An error message will be displayed in the chat
- The input box will be re-enabled for retry
- Check the browser console for detailed error information

## Connecting Frontend and Backend

To ensure proper communication between frontend and backend:

### 1. Backend Configuration (FastAPI)

In the backend's `.env` file:
```
GEMINI_API_KEY=your_api_key_here
FRONTEND_ORIGIN=http://localhost:3000
```

Run the backend:
```bash
cd ai_copilot_backend
uvicorn src.api.main:app --reload --host 0.0.0.0 --port 3001
```

### 2. Frontend Configuration (React)

In the frontend's `.env` file:
```
REACT_APP_BACKEND_URL=http://localhost:3001
```

Run the frontend:
```bash
cd ai_copilot_frontend
npm start
```

### 3. Verify Connection

1. Open the browser to `http://localhost:3000`
2. Open the browser console (F12)
3. Send a test message
4. Verify no CORS errors appear
5. Backend logs should show incoming requests

## Theme

The application uses the **Champagne** theme with the following color palette:

- **Primary**: `#D97706` (Amber) - Used for user messages and primary buttons
- **Secondary**: `#F3F4F6` (Light Gray) - Used for subtle accents
- **Success**: `#10B981` (Green) - Used for success states
- **Error**: `#EF4444` (Red) - Used for error messages
- **Background**: `#FFFBEB` (Cream) - Main background color
- **Surface**: `#FFFFFF` (White) - Used for AI message bubbles
- **Text**: `#374151` (Dark Gray) - Primary text color

### Design Style

The Champagne theme follows an **Elegant** design philosophy:
- Sophisticated, graceful aesthetic
- Soft pastels and gentle gradients
- Refined, rounded components
- Light backgrounds with subtle styling
- Polished, luxurious feel

## API Integration

The frontend communicates with the backend via REST API using Axios:

### Endpoint

- **URL**: `POST /api/chat`
- **Base URL**: Configured via `REACT_APP_BACKEND_URL`

### Request Format

```javascript
{
  message: "User's message",
  history: [
    { role: "user", content: "Previous user message" },
    { role: "assistant", content: "Previous AI response" }
  ]
}
```

### Response Format

```javascript
{
  reply: "AI assistant's reply"
}
```

### Error Responses

- **400**: Invalid request format
- **500**: Server error or API configuration issue
- **503**: AI service unavailable

## Project Structure

```
ai_copilot_frontend/
├── public/              # Static files
│   ├── index.html       # HTML template
│   └── favicon.ico      # App icon
├── src/
│   ├── App.js           # Main chat component
│   ├── App.css          # Champagne theme styles
│   ├── api.js           # Axios configuration
│   ├── index.js         # App entry point
│   └── index.css        # Global styles
├── .env.example         # Environment variable template
├── .env                 # Your environment variables (not in git)
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## Troubleshooting

### Cannot connect to backend

**Symptoms:**
- Error message: "Failed to send message. Please try again."
- CORS errors in browser console
- Network errors in browser console

**Solutions:**
1. Verify the backend server is running on port 3001
2. Check that `REACT_APP_BACKEND_URL` in `.env` matches your backend URL exactly
3. Ensure CORS is properly configured on the backend (check `FRONTEND_ORIGIN`)
4. Restart the frontend after changing `.env`: Stop the dev server and run `npm start` again
5. Check the backend logs for incoming requests

### Messages not sending

**Symptoms:**
- Send button does nothing
- Messages disappear after sending
- Loading spinner never stops

**Solutions:**
1. Check browser console for error messages
2. Verify the backend `/api/chat` endpoint is working (visit http://localhost:3001/docs)
3. Ensure the backend has a valid `GEMINI_API_KEY` configured
4. Check network tab in browser dev tools for failed requests
5. Try refreshing the page

### Environment variables not working

**Symptoms:**
- Backend URL is undefined
- Requests go to wrong URL

**Solutions:**
1. Ensure the `.env` file is in the root of the frontend directory (same level as `package.json`)
2. Verify the variable is prefixed with `REACT_APP_`
3. **Restart the development server** after changing `.env` (environment variables are loaded at build time)
4. Check for typos in the variable name

### CORS Errors

**Symptoms:**
- Error: "Access to XMLHttpRequest at 'http://localhost:3001/api/chat' from origin 'http://localhost:3000' has been blocked by CORS policy"

**Solutions:**
1. Check backend's `FRONTEND_ORIGIN` is set to `http://localhost:3000`
2. Ensure no trailing slashes in URLs
3. Restart the backend after changing CORS configuration
4. Verify the backend logs show: "CORS configured for origin: http://localhost:3000"

## Development

### Code Quality

Run linting:
```bash
npm run lint
```

### Testing

Run the test suite:
```bash
npm test
```

Run tests in CI mode (non-interactive):
```bash
CI=true npm test
```

### Hot Reload

The development server supports hot reloading:
- Changes to `.js` and `.css` files are automatically reflected
- No need to restart the server for code changes
- The browser will automatically refresh

## Future Enhancements

### Potential Features

- **Persistent Chat History**: Save conversations using Supabase or local storage
- **Multiple Conversations**: Allow users to manage multiple chat threads
- **Message Timestamps**: Display when each message was sent
- **User Authentication**: Add user login and personalized experiences
- **Message Editing**: Allow users to edit previously sent messages
- **Export Chat**: Download conversation history as text or PDF
- **Voice Input**: Support speech-to-text for message input
- **Code Syntax Highlighting**: Better display for code snippets in AI responses
- **Markdown Support**: Render markdown formatting in AI responses

### Supabase Integration (Optional)

The backend includes optional Supabase support for future features:
- **Chat History Persistence**: Store conversations in a database
- **User Profiles**: Manage user preferences and settings
- **Analytics**: Track usage patterns

To enable Supabase, configure the backend's `.env`:
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
```

**Note:** Supabase is not currently used. The app works perfectly without it.

## Learn More

### React Resources
- [React Documentation](https://reactjs.org/)
- [Create React App Documentation](https://create-react-app.dev/)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)

### API & Tools
- [Axios Documentation](https://axios-http.com/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Google Gemini API](https://ai.google.dev/)

### CSS & Styling
- [CSS Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

## Security Notes

- Never commit your `.env` file to version control
- Use `.env.example` as a template for others
- In production, use proper environment variable management
- The backend API key should never be exposed to the frontend

## Support

For issues or questions:
1. Check this README for troubleshooting steps
2. Review the backend documentation at `ai_copilot_backend/README.md`
3. Check the API documentation at http://localhost:3001/docs
4. Review browser console and network tab for errors

## License

This project is part of the AI Copilot application.
