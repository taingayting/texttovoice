import { Volume2 } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Volume2 className="w-7 h-7 text-blue-600" />
            <span className="text-xl font-bold text-slate-800">AI Voice App</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="#about"
              className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
            >
              Contact
            </a>
            <a
              href="#login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
