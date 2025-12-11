import { Download, Play } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string;
}

export default function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = `voice-${Date.now()}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <Play className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Audio Generated Successfully</h3>
          <p className="text-sm text-slate-600">Your text has been converted to speech</p>
        </div>
      </div>

      <audio
        controls
        src={audioUrl}
        className="w-full mb-4"
        style={{ height: '54px' }}
      />

      <button
        onClick={handleDownload}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Download className="w-5 h-5" />
        Download MP3
      </button>
    </div>
  );
}
