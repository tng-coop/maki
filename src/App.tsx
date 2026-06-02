
export default function App() {
  return (
    <>
      <div className="bg-glow-1" />
      <div className="bg-glow-2" />
      
      <div className="container">
        <div className="card">
          <div className="logo-container">
            <span className="logo-icon">M</span>
          </div>
          <h1>hello</h1>
          <p className="subtitle">
            Welcome to <strong>maki</strong>. A fresh workspace created with React, Vite, and TypeScript.
          </p>
          
          <div className="badge-container">
            <span className="maki-badge">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              </svg>
              React 19 • Vite • TypeScript
            </span>
            <div className="status-indicator">
              <span className="status-dot" />
              <span>Ready for development</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
