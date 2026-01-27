import React, { useState } from 'react';
import { Github, Copy, CheckCircle } from 'lucide-react';

const codeSnippets = {
  javascript: `import { initializeSDK } from "zeroapi-sdk";

const app = initializeSDK({
  apiKey: "sk_live_abc123",
  environment: "production"
});

// Generate AI response with streaming
const response = await app.generateAIResponse({
  model: "gpt-4",
  messages: [
    { role: "user", content: "Hello, world!" }
  ],
  stream: true
});

console.log(response.data);`,
  python: `from zeroapi import initialize_sdk
import asyncio

# Initialize the SDK
app = initialize_sdk(
    api_key="sk_live_abc123",
    environment="production"
)

# Generate AI response with streaming
async def main():
    response = await app.generate_ai_response(
        model="gpt-4",
        messages=[
            {"role": "user", "content": "Hello, world!"}
        ],
        stream=True
    )
    
    print(response.data)

asyncio.run(main())`,
};

function Banner() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedLang, setSelectedLang] = useState('javascript');
  const [copied, setCopied] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[selectedLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const glowColor = '#0168fa22';
  
  return (
    <div
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 text-gray-900"
      onMouseMove={handleMouseMove}
    >
      {/* Background: dotted grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-[size:24px_24px] z-0" />
      
      {/* Radial mouse glow */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor} 0%, transparent 400px)`,
        }}
      />
      
      {/* Mouse locator */}
      <div
        className="absolute w-4 h-4 bg-white/60 rounded-full border border-blue-200 shadow-lg pointer-events-none z-20"
        style={{
          left: `${mousePos.x - 8}px`,
          top: `${mousePos.y - 8}px`,
          transition: 'left 40ms linear, top 40ms linear',
        }}
      />
      
      {/* Main content */}
      <div className="z-30 max-w-5xl w-full px-8 text-center">
        <h1 className="text-6xl font-black tracking-tight text-gray-900 mb-2">
          If it's code, show how it works
        </h1>
        <p className="text-xl text-gray-600 mb-12 font-medium">
          Show why ZeroAPI is better — with real working examples.
        </p>
        
        {/* Glassmorphism Code Editor */}
        <div className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl">
          {/* Gradient overlay for extra depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          
          {/* Header */}
          <div className="relative flex justify-between items-center px-6 py-4 border-b border-white/20 bg-white/10 backdrop-blur-sm">
            <div className="flex space-x-3">
              {['javascript', 'python'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLang(lang)}
                  className={`relative text-sm px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    selectedLang === lang
                      ? 'bg-[#0168fa] text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-700 bg-white/30 hover:bg-white/40 backdrop-blur-sm'
                  }`}
                >
                  {lang === 'javascript' ? 'JavaScript' : 'Python'}
                </button>
              ))}
            </div>
            <div className="flex items-center text-sm text-gray-600 gap-3">
              <Github className="w-4 h-4" />
              <span className="font-medium">1,234</span>
            </div>
          </div>
          
          {/* Code Block */}
          <div className="relative bg-white/10 backdrop-blur-sm p-6">
            <pre className="text-sm leading-relaxed overflow-auto max-h-80 text-left">
              <code className="text-gray-800">
                {codeSnippets[selectedLang].split('\n').map((line, index) => (
                  <div key={index} className="flex">
                    <span className="text-gray-500 mr-4 select-none w-8 text-right">
                      {index + 1}
                    </span>
                    <span className="syntax-highlight">
                      {line.includes('import') || line.includes('from') ? (
                        <span className="text-blue-500 font-semibold">{line}</span>
                      ) : line.includes('const') || line.includes('def') || line.includes('async') ? (
                        <span className="text-blue-500 font-semibold">{line}</span>
                      ) : line.includes('//') || line.includes('#') ? (
                        <span className="text-gray-500 italic">{line}</span>
                      ) : line.includes('"') ? (
                        <span className="text-blue-500">{line}</span>
                      ) : line.includes('await') || line.includes('console') || line.includes('print') ? (
                        <span className="text-blue-500 font-medium">{line}</span>
                      ) : (
                        <span className="text-blue-500">{line}</span>
                      )}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
            
            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 text-gray-600 hover:text-gray-800 transition-all duration-200 backdrop-blur-sm"
            >
              {copied ? <CheckCircle size={18} className="text-green-600" /> : <Copy size={18} />}
            </button>
          </div>
          
          {/* Bottom glassmorphism bar */}
          <div className="relative px-6 py-3 bg-white/10 backdrop-blur-sm border-t border-white/20">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span className="font-medium">ZeroAPI SDK v0.0.1</span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                Under Development
              </span>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-12">
          <a
            href="#get-started"
            className="inline-block bg-[#0168fa] text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-[#0152d4] transition-all duration-200 font-semibold text-lg"
          >
            Get Started Free
          </a>
        </div>
      </div>
    </div>
  );
}

export default Banner;