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
  const [guideTab, setGuideTab] = useState<'syntax' | 'engine' | 'presets'>('syntax');

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
            const stepToAdd = result.steps[currentStepIdx];
            setLogs(prev => [...prev, stepToAdd]);
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

        <footer className="glass-panel" style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem' }}>📖</span> Lennma Logic & Proof Engine Guide
            </h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => setGuideTab('syntax')} 
                style={{
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.8rem',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: guideTab === 'syntax' ? 'var(--color-primary)' : 'var(--color-border)',
                  background: guideTab === 'syntax' ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
                  color: guideTab === 'syntax' ? '#c084fc' : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
              >
                Syntax & Notation
              </button>
              <button 
                onClick={() => setGuideTab('engine')} 
                style={{
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.8rem',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: guideTab === 'engine' ? 'var(--color-primary)' : 'var(--color-border)',
                  background: guideTab === 'engine' ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
                  color: guideTab === 'engine' ? '#c084fc' : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
              >
                Proof Engine Internals
              </button>
              <button 
                onClick={() => setGuideTab('presets')} 
                style={{
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.8rem',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: guideTab === 'presets' ? 'var(--color-primary)' : 'var(--color-border)',
                  background: guideTab === 'presets' ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
                  color: guideTab === 'presets' ? '#c084fc' : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
              >
                Inference Rules & Presets
              </button>
            </div>
          </div>

          <div style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#d4d4d8' }}>
            {guideTab === 'syntax' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <p>
                  The Lennma engine reads formulas in standard Lisp S-expression prefix format. Use the notation table below to compose assumptions and targets in the Sandbox.
                </p>
                <div style={{ overflowX: 'auto', border: '1px solid var(--color-border)', borderRadius: '8px', background: 'rgba(0, 0, 0, 0.3)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--color-border)', background: 'rgba(255, 255, 255, 0.02)' }}>
                        <th style={{ padding: '0.5rem 0.75rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Lisp Syntax</th>
                        <th style={{ padding: '0.5rem 0.75rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Unicode Render</th>
                        <th style={{ padding: '0.5rem 0.75rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Logical Meaning</th>
                        <th style={{ padding: '0.5rem 0.75rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Example S-Expression</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '0.5rem 0.75rem', fontFamily: 'monospace', color: '#fbbf24' }}>.l_.A</td>
                        <td style={{ padding: '0.5rem 0.75rem' }}>A</td>
                        <td style={{ padding: '0.5rem 0.75rem', color: 'var(--color-text-secondary)' }}>Propositional Constant / Atom</td>
                        <td style={{ padding: '0.5rem 0.75rem', fontFamily: 'monospace' }}>.l_.A</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '0.5rem 0.75rem', fontFamily: 'monospace', color: '#c084fc' }}>(.to A B)</td>
                        <td style={{ padding: '0.5rem 0.75rem' }}>A → B</td>
                        <td style={{ padding: '0.5rem 0.75rem', color: 'var(--color-text-secondary)' }}>Implication (If A then B)</td>
                        <td style={{ padding: '0.5rem 0.75rem', fontFamily: 'monospace' }}>(.to .l_.A .l_.B)</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '0.5rem 0.75rem', fontFamily: 'monospace', color: '#c084fc' }}>(.neg A)</td>
                        <td style={{ padding: '0.5rem 0.75rem' }}>¬A</td>
                        <td style={{ padding: '0.5rem 0.75rem', color: 'var(--color-text-secondary)' }}>Negation (Not A)</td>
                        <td style={{ padding: '0.5rem 0.75rem', fontFamily: 'monospace' }}>(.neg .l_.A)</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.5rem 0.75rem', fontFamily: 'monospace', color: '#22d3ee' }}>?U</td>
                        <td style={{ padding: '0.5rem 0.75rem' }}>U (Var)</td>
                        <td style={{ padding: '0.5rem 0.75rem', color: 'var(--color-text-secondary)' }}>Logical Variable (instantiates terms during unification)</td>
                        <td style={{ padding: '0.5rem 0.75rem', fontFamily: 'monospace' }}>?U</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                  💡 <strong>Tip:</strong> Pressing <strong>"Search & Verify Proof"</strong> compiles the formulas and starts an automated background search. You can click on the derivation tree nodes to visualize their structure as an interactive abstract syntax tree (AST).
                </p>
              </div>
            )}

            {guideTab === 'engine' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.4rem' }}>1. Web Worker Compilation</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
                    Lennma's logic engine is written in Common Lisp. In the playground, the compiler (JSCL) loads precompiled Lisp forms inside a separate background Web Worker thread. This ensures the React UI remains fully responsive and animated during search operations.
                  </p>
                  <h4 style={{ color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.4rem' }}>2. Forward Chaining & Synthesis Queue</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                    Starting with the assumptions, the engine places formulas into a priority-sorted <em>Synthesis Queue</em>. In each iteration, it selects the most relevant formula, unifies its variables against standard inference rules, and derives immediate consequences.
                  </p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.4rem' }}>3. Real-Time Progressive Updates</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
                    During evaluation, the Lisp engine issues callbacks to JS which send updates to the main React thread. If <em>Slow-motion Search</em> is active, the logs and queue sizes playback with a step delay to make the search progression visually understandable.
                  </p>
                  <h4 style={{ color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.4rem' }}>4. Derivation Tree Reconstruction</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                    Forward chaining generates many unrelated side consequences. Once the target is reached, the engine backtracks from the target to the initial assumptions, pruning dead branches to isolate the minimal natural deduction proof sequence.
                  </p>
                </div>
              </div>
            )}

            {guideTab === 'presets' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.4rem' }}>Axiom II (Modus Ponens)</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
                    In the Lennma engine, Modus Ponens is defined as an inference axiom:
                    <br />
                    <code style={{ background: 'rgba(0,0,0,0.3)', padding: '0.1rem 0.3rem', borderRadius: '4px', fontSize: '0.75rem', color: '#c084fc' }}>
                      (implies (and A (implies A B)) B)
                    </code>.
                    <br />
                    When the engine processes a formula $A$ and an implication $A \rightarrow B$, it triggers unification and derives $B$.
                  </p>
                  <h4 style={{ color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.4rem' }}>Modus Ponens Preset</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                    The simplest preset: Given premises $A \rightarrow B$ and $A$, it proves $B$ in 3 iterations. It is the fundamental building block of logical reasoning.
                  </p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.4rem' }}>Transitivity Preset</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
                    Given $A \rightarrow B$ and $B \rightarrow C$, it proves $A \rightarrow C$.
                    The engine uses unification to link the middle term $B$. Since it's a first-order logic solver, it resolves variables by substituting expressions recursively, constructing a 3-step Modus Ponens chain.
                  </p>
                  <h4 style={{ color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.4rem' }}>Custom Sandbox</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                    You can specify any custom assumptions and target. For example, test double implication by using multiple `.to` nodes, and see how the synthesis queue grows and resolves!
                  </p>
                </div>
              </div>
            )}
          </div>
        </footer>

      </div>
    </>
  );
}
