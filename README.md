# AI Voice App - Text-to-Speech Converter

A modern, single-page web application that converts text to natural-sounding speech using Google Cloud Text-to-Speech API. Built with React, TypeScript, Vite, and Supabase Edge Functions.

## Features

- **Text Input**: Large, multi-line text area with no word limit
- **Multi-Language Support**: Choose from 12+ languages including English, Spanish, French, German, Japanese, and more
- **Voice Selection**: Multiple voice options for each language (Standard and Wavenet voices)
- **Audio Controls**:
  - Speed control (0.25x - 4.0x)
  - Pitch adjustment (-20 to +20 semitones)
- **Real-time Playback**: HTML5 audio player with controls
- **Download**: Save generated audio as MP3 files
- **Modern UI**: Clean, responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Supabase Edge Functions (Deno)
- **API**: Google Cloud Text-to-Speech API

## Prerequisites

1. **Node.js** (v18 or higher)
2. **Google Cloud Platform Account** with Text-to-Speech API enabled
3. **Supabase Account** (for edge functions)

## Google Cloud Setup

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Cloud Text-to-Speech API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Cloud Text-to-Speech API"
   - Click "Enable"

### 2. Create a Service Account

1. Go to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Enter a name (e.g., "tts-service-account")
4. Grant the role: **Cloud Text-to-Speech User**
5. Click "Done"

### 3. Generate Service Account Key

1. Click on the service account you just created
2. Go to the "Keys" tab
3. Click "Add Key" > "Create New Key"
4. Choose **JSON** format
5. Download the JSON key file
6. **IMPORTANT**: Keep this file secure and never commit it to version control

### 4. Configure the Service Account JSON

The service account JSON file will look like this:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "your-service-account@your-project.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

## Environment Configuration

### Supabase Edge Function Secret

You need to set the `GCP_SERVICE_ACCOUNT_JSON` secret in Supabase:

1. Go to your Supabase project dashboard
2. Navigate to "Edge Functions" > "Secrets"
3. Add a new secret:
   - **Name**: `GCP_SERVICE_ACCOUNT_JSON`
   - **Value**: Paste the entire JSON content from your service account key file (as a single-line string)

Alternatively, if testing locally with Supabase CLI:

```bash
# Set the secret locally
supabase secrets set GCP_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"...","private_key":"..."}'
```

### Frontend Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd ai-voice-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables** (see above)

4. **Run the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## How It Works

### Architecture

1. **Frontend (React)**: User enters text, selects language/voice, and adjusts audio parameters
2. **Supabase Edge Function**: Receives the request and communicates with Google Cloud TTS API
3. **Google Cloud TTS API**: Generates the audio based on the provided parameters
4. **Response**: Audio is returned to the frontend as an MP3 file

### API Parameter Mapping

The application maps user controls to Google Cloud TTS API parameters:

```typescript
// Request to Supabase Edge Function
{
  text: "Hello, world!",
  language: "en-US",
  voice: "en-US-Standard-C",
  speed: 1.0,    // Maps to speakingRate (0.25 - 4.0)
  pitch: 0       // Maps to pitch (-20.0 to 20.0)
}

// Converted to GCP TTS API format
{
  input: { text: "Hello, world!" },
  voice: {
    languageCode: "en-US",
    name: "en-US-Standard-C"
  },
  audioConfig: {
    audioEncoding: "MP3",
    speakingRate: 1.0,  // Speed parameter
    pitch: 0            // Pitch parameter
  }
}
```

### Edge Function Authentication Flow

The Supabase Edge Function handles authentication with Google Cloud:

1. Reads the service account JSON from environment variable
2. Creates a JWT (JSON Web Token) using the private key
3. Exchanges the JWT for an OAuth 2.0 access token
4. Uses the access token to authenticate API requests

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck

# Linting
npm run lint
```

## Project Structure

```
ai-voice-app/
├── src/
│   ├── components/
│   │   ├── Navigation.tsx       # Top navigation bar
│   │   ├── TextInput.tsx        # Text input component
│   │   ├── VoiceSelector.tsx    # Language and voice selection
│   │   ├── AudioControls.tsx    # Speed and pitch sliders
│   │   └── AudioPlayer.tsx      # Audio playback and download
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles
├── supabase/
│   └── functions/
│       └── text-to-speech/
│           └── index.ts         # Edge function for GCP TTS integration
└── README.md
```

## Supported Languages

- English (US, UK)
- Spanish (Spain, US)
- French
- German
- Italian
- Portuguese (Brazil)
- Japanese
- Korean
- Chinese (Mandarin)
- Hindi

Each language has multiple voice options including Standard and Wavenet voices.

## Security Considerations

1. **Never commit** your Google Cloud service account JSON file to version control
2. Add `gcp-*.json` to your `.gitignore` file
3. Store credentials securely using Supabase secrets
4. Use environment variables for all sensitive configuration
5. The Edge Function validates all input parameters before calling the API

## Troubleshooting

### "Google Cloud credentials not configured" error

- Ensure you've set the `GCP_SERVICE_ACCOUNT_JSON` secret in Supabase
- Verify the JSON is properly formatted (single-line string with escaped quotes)

### "Failed to obtain access token" error

- Check that your service account has the correct permissions
- Verify the private key in your service account JSON is valid
- Ensure the Text-to-Speech API is enabled in your GCP project

### Audio generation fails

- Check that the selected voice is available for the chosen language
- Verify your GCP project has billing enabled
- Check the browser console for detailed error messages

## Cost Considerations

Google Cloud Text-to-Speech API pricing (as of 2024):

- **Standard voices**: $4 per 1 million characters
- **Wavenet voices**: $16 per 1 million characters
- First 1 million characters per month are free (Standard voices)

Always monitor your usage in the Google Cloud Console.

## License

MIT

## Support

For issues and questions:
- Google Cloud TTS Documentation: https://cloud.google.com/text-to-speech/docs
- Supabase Edge Functions: https://supabase.com/docs/guides/functions
