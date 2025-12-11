import { Gauge, Music } from 'lucide-react';

interface AudioControlsProps {
  speed: number;
  pitch: number;
  onSpeedChange: (speed: number) => void;
  onPitchChange: (pitch: number) => void;
}

export default function AudioControls({
  speed,
  pitch,
  onSpeedChange,
  onPitchChange,
}: AudioControlsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="flex items-center justify-between text-sm font-semibold text-slate-700 mb-2">
          <span className="flex items-center gap-2">
            <Gauge className="w-4 h-4" />
            Speed (Rate)
          </span>
          <span className="text-blue-600">{speed.toFixed(2)}x</span>
        </label>
        <input
          type="range"
          min="0.25"
          max="4.0"
          step="0.05"
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>0.25x</span>
          <span>1.0x (Normal)</span>
          <span>4.0x</span>
        </div>
      </div>

      <div>
        <label className="flex items-center justify-between text-sm font-semibold text-slate-700 mb-2">
          <span className="flex items-center gap-2">
            <Music className="w-4 h-4" />
            Pitch
          </span>
          <span className="text-blue-600">{pitch > 0 ? '+' : ''}{pitch.toFixed(1)}</span>
        </label>
        <input
          type="range"
          min="-20"
          max="20"
          step="0.5"
          value={pitch}
          onChange={(e) => onPitchChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>-20 (Lower)</span>
          <span>0 (Normal)</span>
          <span>+20 (Higher)</span>
        </div>
      </div>
    </div>
  );
}
