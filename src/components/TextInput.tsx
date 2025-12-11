import { FileText } from 'lucide-react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TextInput({ value, onChange }: TextInputProps) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
        <FileText className="w-4 h-4" />
        Enter Your Text
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type or paste your text here... (no word limit)"
        className="w-full h-48 px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none text-slate-700 placeholder-slate-400"
      />
      <div className="text-right text-sm text-slate-500 mt-1">
        {value.length} characters
      </div>
    </div>
  );
}
