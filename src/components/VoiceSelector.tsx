import { Globe, Mic } from 'lucide-react';

interface VoiceSelectorProps {
  language: string;
  voice: string;
  onLanguageChange: (language: string) => void;
  onVoiceChange: (voice: string) => void;
}

const languages = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'en-GB', name: 'English (UK)' },
  { code: 'es-ES', name: 'Spanish (Spain)' },
  { code: 'es-US', name: 'Spanish (US)' },
  { code: 'fr-FR', name: 'French' },
  { code: 'de-DE', name: 'German' },
  { code: 'it-IT', name: 'Italian' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)' },
  { code: 'ja-JP', name: 'Japanese' },
  { code: 'ko-KR', name: 'Korean' },
  { code: 'zh-CN', name: 'Chinese (Mandarin)' },
  { code: 'hi-IN', name: 'Hindi' },
];

const voicesByLanguage: Record<string, { value: string; name: string }[]> = {
  'en-US': [
    { value: 'en-US-Standard-A', name: 'Standard A (Male)' },
    { value: 'en-US-Standard-B', name: 'Standard B (Male)' },
    { value: 'en-US-Standard-C', name: 'Standard C (Female)' },
    { value: 'en-US-Standard-D', name: 'Standard D (Male)' },
    { value: 'en-US-Standard-E', name: 'Standard E (Female)' },
    { value: 'en-US-Wavenet-A', name: 'Wavenet A (Male)' },
    { value: 'en-US-Wavenet-B', name: 'Wavenet B (Male)' },
    { value: 'en-US-Wavenet-C', name: 'Wavenet C (Female)' },
    { value: 'en-US-Wavenet-D', name: 'Wavenet D (Male)' },
  ],
  'en-GB': [
    { value: 'en-GB-Standard-A', name: 'Standard A (Female)' },
    { value: 'en-GB-Standard-B', name: 'Standard B (Male)' },
    { value: 'en-GB-Standard-C', name: 'Standard C (Female)' },
    { value: 'en-GB-Standard-D', name: 'Standard D (Male)' },
    { value: 'en-GB-Wavenet-A', name: 'Wavenet A (Female)' },
    { value: 'en-GB-Wavenet-B', name: 'Wavenet B (Male)' },
  ],
  'es-ES': [
    { value: 'es-ES-Standard-A', name: 'Standard A (Female)' },
    { value: 'es-ES-Standard-B', name: 'Standard B (Male)' },
    { value: 'es-ES-Wavenet-B', name: 'Wavenet B (Male)' },
    { value: 'es-ES-Wavenet-C', name: 'Wavenet C (Female)' },
  ],
  'es-US': [
    { value: 'es-US-Standard-A', name: 'Standard A (Female)' },
    { value: 'es-US-Standard-B', name: 'Standard B (Male)' },
    { value: 'es-US-Wavenet-A', name: 'Wavenet A (Female)' },
    { value: 'es-US-Wavenet-B', name: 'Wavenet B (Male)' },
  ],
  'fr-FR': [
    { value: 'fr-FR-Standard-A', name: 'Standard A (Female)' },
    { value: 'fr-FR-Standard-B', name: 'Standard B (Male)' },
    { value: 'fr-FR-Wavenet-A', name: 'Wavenet A (Female)' },
    { value: 'fr-FR-Wavenet-B', name: 'Wavenet B (Male)' },
  ],
  'de-DE': [
    { value: 'de-DE-Standard-A', name: 'Standard A (Female)' },
    { value: 'de-DE-Standard-B', name: 'Standard B (Male)' },
    { value: 'de-DE-Wavenet-A', name: 'Wavenet A (Female)' },
    { value: 'de-DE-Wavenet-B', name: 'Wavenet B (Male)' },
  ],
  'it-IT': [
    { value: 'it-IT-Standard-A', name: 'Standard A (Female)' },
    { value: 'it-IT-Standard-B', name: 'Standard B (Female)' },
    { value: 'it-IT-Wavenet-A', name: 'Wavenet A (Female)' },
    { value: 'it-IT-Wavenet-B', name: 'Wavenet B (Female)' },
  ],
  'pt-BR': [
    { value: 'pt-BR-Standard-A', name: 'Standard A (Female)' },
    { value: 'pt-BR-Standard-B', name: 'Standard B (Male)' },
    { value: 'pt-BR-Wavenet-A', name: 'Wavenet A (Female)' },
    { value: 'pt-BR-Wavenet-B', name: 'Wavenet B (Male)' },
  ],
  'ja-JP': [
    { value: 'ja-JP-Standard-A', name: 'Standard A (Female)' },
    { value: 'ja-JP-Standard-B', name: 'Standard B (Female)' },
    { value: 'ja-JP-Wavenet-A', name: 'Wavenet A (Female)' },
    { value: 'ja-JP-Wavenet-B', name: 'Wavenet B (Female)' },
  ],
  'ko-KR': [
    { value: 'ko-KR-Standard-A', name: 'Standard A (Female)' },
    { value: 'ko-KR-Standard-B', name: 'Standard B (Female)' },
    { value: 'ko-KR-Wavenet-A', name: 'Wavenet A (Female)' },
    { value: 'ko-KR-Wavenet-B', name: 'Wavenet B (Female)' },
  ],
  'zh-CN': [
    { value: 'zh-CN-Standard-A', name: 'Standard A (Female)' },
    { value: 'zh-CN-Standard-B', name: 'Standard B (Male)' },
    { value: 'zh-CN-Wavenet-A', name: 'Wavenet A (Female)' },
    { value: 'zh-CN-Wavenet-B', name: 'Wavenet B (Male)' },
  ],
  'hi-IN': [
    { value: 'hi-IN-Standard-A', name: 'Standard A (Female)' },
    { value: 'hi-IN-Standard-B', name: 'Standard B (Male)' },
    { value: 'hi-IN-Wavenet-A', name: 'Wavenet A (Female)' },
    { value: 'hi-IN-Wavenet-B', name: 'Wavenet B (Male)' },
  ],
};

export default function VoiceSelector({
  language,
  voice,
  onLanguageChange,
  onVoiceChange,
}: VoiceSelectorProps) {
  const availableVoices = voicesByLanguage[language] || [];

  const handleLanguageChange = (newLanguage: string) => {
    onLanguageChange(newLanguage);
    const defaultVoice = voicesByLanguage[newLanguage]?.[0]?.value || '';
    onVoiceChange(defaultVoice);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
          <Globe className="w-4 h-4" />
          Language
        </label>
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none text-slate-700 bg-white cursor-pointer"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
          <Mic className="w-4 h-4" />
          Voice
        </label>
        <select
          value={voice}
          onChange={(e) => onVoiceChange(e.target.value)}
          className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none text-slate-700 bg-white cursor-pointer"
        >
          {availableVoices.map((v) => (
            <option key={v.value} value={v.value}>
              {v.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
