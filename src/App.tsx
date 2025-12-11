import { useState } from 'react';
import Navigation from './components/Navigation';
import TextInput from './components/TextInput';
import VoiceSelector from './components/VoiceSelector';
import AudioControls from './components/AudioControls';
import AudioPlayer from './components/AudioPlayer';

function App() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [voice, setVoice] = useState('en-US-Standard-C');
  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError('Please enter some text to convert');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAudioUrl(null);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase configuration is missing');
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/text-to-speech`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          language,
          voice,
          speed,
          pitch,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate audio');
      }

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Text-to-Speech Converter
          </h1>
          <p className="text-slate-600">
            Convert your text to natural-sounding speech with AI
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <TextInput value={text} onChange={setText} />

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <VoiceSelector
              language={language}
              voice={voice}
              onLanguageChange={setLanguage}
              onVoiceChange={setVoice}
            />

            <AudioControls
              speed={speed}
              pitch={pitch}
              onSpeedChange={setSpeed}
              onPitchChange={setPitch}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !text.trim()}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating Audio...
              </>
            ) : (
              'Generate Voice'
            )}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
        </div>

        {audioUrl && (
          <AudioPlayer audioUrl={audioUrl} />
        )}
      </main>
    </div>
  );
}

export default App;
