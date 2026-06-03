import React, { useState } from 'react';
import { runSearchProof, parseLispStringToJs, SearchStep } from './lennma-bridge';
import { AstVisualizer } from './components/AstVisualizer';
import { DerivationTree } from './components/DerivationTree';

interface Preset {
  name: string;
  assumptions: string[];
  target: string;
  description: string;
}

const PRESETS: Record<string, Preset> = {
  transitivity: {
    name: "Transitivity of Implication",
    assumptions: [
      "(.to .l_.A .l_.B)",
      "(.to .l_.B .l_.C)"
    ],
    target: "(.to .l_.A .l_.C)",
    description: "Proves that if A implies B and B implies C, then A implies C (syllogism)."
  },
  mp: {
    name: "Modus Ponens",
    assumptions: [
      "(.to .l_.A .l_.B)",
      ".l_.A"
    ],
    target: ".l_.B",
    description: "Simple verification of the Modus Ponens rule (deduces B from A and A -> B)."
  },
  axiom: {
    name: "Axiom II.1 Instantiation",
    assumptions: [
      ".l_.A"
    ],
    target: "(.to .l_.B .l_.A)",
    description: "Uses Axiom II.1 (A -> (B -> A)) to deduce that if A is true, then B implies A."
  }
};

export default function App() {
  const [presetKey, setPresetKey] = useState<string>("transitivity");
  const [assumptionsStr, setAssumptionsStr] = useState<string>(
    PRESETS.transitivity.assumptions.join('\n')
  );
  const [targetStr, setTargetStr] = useState<string>(PRESETS.transitivity.target);
  
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [slowMo, setSlowMo] = useState<boolean>(false);
  const [logs, setLogs] = useState<SearchStep[]>([]);
  const [proofSteps, setProofSteps] = useState<any[]>([]);
  const [selectedFormula, setSelectedFormula] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync inputs when preset changes
  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value;
    setPresetKey(key);
    setAssumptionsStr(PRESETS[key].assumptions.join('\n'));
    setTargetStr(PRESETS[key].target);
    resetOutputs();
  };

  const resetOutputs = () => {
    setLogs([]);
    setProofSteps([]);
    setSelectedFormula(null);
    setErrorMsg(null);
  };

  const handleRun = async () => {
    resetOutputs();
    setIsSearching(true);
    
    const assumptions = assumptionsStr
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);
      
    const target = targetStr.trim();
    
    try {
      // Run the worker proof search (which completes instantly)
      const result = await runSearchProof(assumptions, target);
      
      if (slowMo && result.steps.length > 0) {
        let currentStepIdx = 0;
        const intervalId = window.setInterval(() => {
          if (currentStepIdx < result.steps.length) {
            setLogs(prev => [...prev, result.steps[currentStepIdx]]);
            currentStepIdx++;
          } else {
            window.clearInterval(intervalId);
            setIsSearching(false);
            
            if (result.success) {
              setProofSteps(result.proofSteps);
              if (result.proofSteps.length > 0) {
                const goalNode = result.proofSteps[0];
                if (goalNode && goalNode.formal) {
                  setSelectedFormula(goalNode.formal);
                }
              }
            } else {
              setErrorMsg(result.error || "Search finished without finding a valid proof path.");
            }
          }
        }, 30); // 30ms per step playback
      } else {
        // Instant presentation
        setLogs(result.steps);
        setIsSearching(false);
        
        if (result.success) {
          setProofSteps(result.proofSteps);
          if (result.proofSteps.length > 0) {
            const goalNode = result.proofSteps[0];
            if (goalNode && goalNode.formal) {
              setSelectedFormula(goalNode.formal);
            }
          }
        } else {
          setErrorMsg(result.error || "Search finished without finding a valid proof path.");
        }
      }
    } catch (e: any) {
      setErrorMsg(e?.toString() || "Unexpected execution error.");
      setIsSearching(false);
    }
  };

  // Convert array representation back to a simple logic formula string
  function formatFormula(expr: any): string {
    if (Array.isArray(expr)) {
      if (expr[0] === '.TO') return `(${formatFormula(expr[1])} → ${formatFormula(expr[2])})`;
      if (expr[0] === '.NEG') return `¬${formatFormula(expr[1])}`;
      return `(${expr.map(formatFormula).join(' ')})`;
    }
    return String(expr).replace(/^\.L_\./i, '').replace(/^\./, '');
  }

  return (
    <>
      {/* Dynamic background glow blobs */}
      <div className="bg-glow-1" />
      <div className="bg-glow-2" />
      
      <div className="playground-container">
        <header>
          <div className="header-title-row">
            <div className="logo-icon-sm">L</div>
            <div>
              <h1>Lennma Logic Playground</h1>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                Common Lisp Mathematical Verification & Proof Visualizer (JSCL Client-Side compilation)
              </p>
            </div>
          </div>
          
          <div className="maki-badge">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            </svg>
            Lisp Compiler In-Browser
          </div>
        </header>

        <main className="dashboard-grid">
          
          {/* Column 1: Editor & Controls */}
          <section className="glass-panel">
            <div className="panel-header">
              <h2>Proof Sandbox</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                Select Preset Template
              </label>
              <select className="preset-select" value={presetKey} onChange={handlePresetChange}>
                {Object.entries(PRESETS).map(([key, p]) => (
                  <option key={key} value={key}>{p.name}</option>
                ))}
              </select>
            </div>
            
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontStyle: 'italic', lineHeight: 1.4 }}>
              {PRESETS[presetKey].description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                Assumptions (Lisp formulas, one per line)
              </label>
              <textarea
                className="editor-textarea"
                style={{ minHeight: '120px', flex: 'none' }}
                value={assumptionsStr}
                onChange={(e) => setAssumptionsStr(e.target.value)}
                disabled={isSearching}
              />
              
              <label style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                Target Formula
              </label>
              <input
                type="text"
                className="preset-select"
                style={{ fontFamily: 'Fira Code, monospace', color: '#38bdf8' }}
                value={targetStr}
                onChange={(e) => setTargetStr(e.target.value)}
                disabled={isSearching}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', marginTop: '0.5rem' }}>
              <input 
                type="checkbox" 
                id="slow-mo-checkbox" 
                checked={slowMo} 
                onChange={(e) => setSlowMo(e.target.checked)}
                disabled={isSearching}
                style={{ cursor: 'pointer', width: '1rem', height: '1rem' }}
              />
              <label 
                htmlFor="slow-mo-checkbox" 
                style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', cursor: 'pointer', userSelect: 'none' }}
              >
                Slow-motion Search (30ms step delay)
              </label>
            </div>

            <button className="btn-primary" onClick={handleRun} disabled={isSearching}>
              {isSearching ? (
                <>
                  <span className="status-dot" style={{ marginTop: 0 }} />
                  Searching Proof...
                </>
              ) : (
                "Search & Verify Proof"
              )}
            </button>
          </section>

          {/* Column 2: Tracer Console */}
          <section className="glass-panel">
            <div className="panel-header">
              <h2>Real-Time Search logs</h2>
              {isSearching && (
                <div className="status-indicator">
                  <span className="status-dot" />
                  <span>Evaluating in Lisp</span>
                </div>
              )}
            </div>
            
            <div className="console-logs">
              {logs.length === 0 && !errorMsg && (
                <div style={{ margin: 'auto', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
                  <p>Console is idle.</p>
                  <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Click "Search & Verify Proof" to start evaluation.</p>
                </div>
              )}
              
              {logs.map((step, idx) => (
                <div 
                  key={idx} 
                  className={`console-entry ${idx === logs.length - 1 && !isSearching && proofSteps.length > 0 ? 'success' : ''}`}
                >
                  <div className="console-entry-header">
                    <span>Iteration #{step.kNum}</span>
                    <span>Queue size: {step.queueLen}</span>
                  </div>
                  <div className="console-entry-msg">
                    Inspecting state: <strong>{formatFormula(step.currentForm)}</strong>
                  </div>
                </div>
              ))}

              {errorMsg && (
                <div style={{ color: '#ef4444', padding: '0.5rem', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.05)', fontSize: '0.8rem' }}>
                  {errorMsg}
                </div>
              )}
              
              {!isSearching && proofSteps.length > 0 && (
                <div style={{ color: '#10b981', padding: '0.5rem', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.05)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                  ✔ Proof found successfully! Reconstructed derivation tree below.
                </div>
              )}
            </div>
          </section>

          {/* Column 3: Visualizers */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* AST Visualizer */}
            <div className="glass-panel" style={{ flex: 'none', height: '360px' }}>
              <AstVisualizer 
                expression={selectedFormula} 
                title={selectedFormula ? `AST: ${formatFormula(selectedFormula)}` : "Formula AST Inspector"}
              />
            </div>
            
            {/* Derivation Tree */}
            <div className="glass-panel" style={{ flex: 1 }}>
              <DerivationTree 
                proofSteps={proofSteps}
                targetFormula={parseLispStringToJs(targetStr)}
                onFormulaSelect={(formula) => setSelectedFormula(formula)}
              />
            </div>
          </section>

        </main>
      </div>
    </>
  );
}
