import React from 'react';

interface HelpModalProps {
  section: string;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ section, onClose }) => {
  const [activeTab, setActiveTab] = React.useState<string>(section);
  const [animStep, setAnimStep] = React.useState<number>(0);

  React.useEffect(() => {
    setActiveTab(section);
  }, [section]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setAnimStep(prev => (prev + 1) % 5);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'overview', label: '🏠 Overview', title: 'Lennma Logic Playground Overview' },
    { id: 'sandbox', label: '🧪 Proof Sandbox', title: 'Writing Logical Formulas' },
    { id: 'tracer', label: '⚡ Real-Time Tracer', title: 'How Search Iterations Work' },
    { id: 'ast', label: '🌳 AST Inspector', title: 'Abstract Syntax Tree Representation' },
    { id: 'derivation', label: '📐 Derivation Tree', title: 'Mathematical Proof Tree (Gentzen Layout)' },
    { id: 'internals', label: '⚙️ Engine Internals', title: 'Lisp Compilation & Web Workers' },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(5, 5, 8, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '2rem',
      animation: 'fadeIn 0.25s ease-out'
    }}>
      <div 
        className="glass-panel" 
        style={{
          width: '100%',
          maxWidth: '900px',
          height: '100%',
          maxHeight: '650px',
          display: 'grid',
          gridTemplateColumns: '240px 1fr',
          padding: 0,
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Sidebar Tabs */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          borderRight: '1px solid var(--color-border)',
          padding: '1.5rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          overflowY: 'auto'
        }}>
          <div style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: 'var(--color-text-secondary)',
            fontWeight: 700,
            marginBottom: '0.75rem',
            paddingLeft: '0.5rem'
          }}>
            Help Guide
          </div>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === tab.id ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(126, 34, 206, 0.08) 100%)' : 'transparent',
                borderLeft: activeTab === tab.id ? '3px solid var(--color-primary)' : '3px solid transparent',
                color: activeTab === tab.id ? '#c084fc' : 'var(--color-text-secondary)',
                textAlign: 'left',
                fontSize: '0.85rem',
                fontWeight: activeTab === tab.id ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {tab.label}
            </button>
          ))}
          
          <button 
            onClick={onClose}
            style={{
              marginTop: 'auto',
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              background: 'rgba(239, 68, 68, 0.05)',
              color: '#ef4444',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              textAlign: 'center'
            }}
          >
            Close Guide
          </button>
        </div>

        {/* Content Panel */}
        <div style={{
          padding: '2rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          position: 'relative'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: '1rem'
          }}>
            <div>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #ffffff 0%, #c084fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0
              }}>
                {tabs.find(t => t.id === activeTab)?.title}
              </h1>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                Detailed explanation and walkthrough of the feature
              </p>
            </div>
            <button 
              onClick={onClose} 
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.1rem',
                lineHeight: 1,
                transition: 'all 0.2s'
              }}
              title="Close Guide"
            >
              &times;
            </button>
          </div>

          {/* Tab Body Content */}
          <div style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#e4e4e7', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {activeTab === 'overview' && (
              <>
                <p>
                  Welcome to the <strong>Lennma Logic Playground</strong>! This application is an interactive mathematical verification environment and first-order logic theorem prover.
                </p>
                <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.05rem', fontWeight: 600, borderLeft: '3px solid var(--color-primary)', paddingLeft: '0.5rem', marginTop: '0.5rem' }}>
                  What are we doing here?
                </h3>
                <p>
                  At its core, this playground showcases the execution of a <strong>Lisp-based automated theorem prover</strong> running inside your browser. Automated theorem provers are tools used in formal verification to mathematically prove that a software program or physical hardware complies with specified rules without testing every input.
                </p>
                <p>
                  In this sandbox, you enter premises (assumptions) and a desired goal (target formula). The prover will try to construct a formal, step-by-step mathematical proof showing that the target formula is a logical consequence of your assumptions.
                </p>
                <div style={{
                  padding: '1rem',
                  borderRadius: '10px',
                  background: 'rgba(168, 85, 247, 0.05)',
                  border: '1px solid rgba(168, 85, 247, 0.15)',
                  marginTop: '0.5rem'
                }}>
                  <div style={{ fontWeight: 600, color: '#c084fc', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>💡</span> Quick Start:
                  </div>
                  <ol style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: '#d4d4d8' }}>
                    <li>Select a preset template from the dropdown (e.g., <strong>Transitivity of Implication</strong>).</li>
                    <li>Toggle <strong>Slow-motion Search</strong> on if you want to watch the priority queue evaluations in real-time.</li>
                    <li>Click <strong>"Search & Verify Proof"</strong> to start the search.</li>
                    <li>Once completed, click on any node in the derivation tree at the bottom right to inspect its abstract syntax tree structure.</li>
                  </ol>
                </div>
              </>
            )}

            {activeTab === 'sandbox' && (
              <>
                <p>
                  The <strong>Proof Sandbox</strong> panel is where you input the premises (assumptions) and the target conclusion you want to prove.
                </p>
                <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.05rem', fontWeight: 600, borderLeft: '3px solid var(--color-primary)', paddingLeft: '0.5rem', marginTop: '0.5rem' }}>
                  Writing Logical Terms
                </h3>
                <p>
                  The sandbox parses Lisp S-expression formats. This structure allows us to represent formula trees unambiguously.
                </p>
                <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li>
                    <strong>Propositional Constants</strong>: Represented with a <code>.l_.</code> prefix (e.g. <code>.l_.A</code>, <code>.l_.B</code>). In logic, these represent atomic statements that can be true or false (e.g. "It is raining" or "The grass is wet").
                  </li>
                  <li>
                    <strong>Implication</strong>: Represented as <code>(.to A B)</code>. This translates to $A \rightarrow B$ ("If A, then B").
                  </li>
                  <li>
                    <strong>Negation</strong>: Represented as <code>(.neg A)</code>. This translates to $\neg A$ ("Not A").
                  </li>
                  <li>
                    <strong>Logical Variables</strong>: Represented with a prefix <code>?</code> (e.g. <code>?U</code>, <code>?V</code>). These are free variables that the engine will try to match and instantiate with specific expressions during unification.
                  </li>
                </ul>
                <div style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.8rem',
                  fontFamily: 'monospace',
                  color: '#e4e4e7',
                  marginTop: '0.5rem'
                }}>
                  <strong>Example - Modus Ponens:</strong>
                  <br />Assumptions (one per line):
                  <br />&nbsp;&nbsp;(.to .l_.A .l_.B)  <span style={{ color: 'var(--color-text-secondary)' }}>; If A implies B</span>
                  <br />&nbsp;&nbsp;.l_.A             <span style={{ color: 'var(--color-text-secondary)' }}>; And A is true</span>
                  <br />Target Formula:
                  <br />&nbsp;&nbsp;.l_.B             <span style={{ color: 'var(--color-text-secondary)' }}>; Prove that B is true</span>
                </div>
              </>
            )}

            {activeTab === 'tracer' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ margin: 0 }}>
                  Imagine a logical chain of dominos. If you know fact <strong>A</strong> is true, and you know <strong>A → B</strong> (if A is true, then B is true), you can deduce that <strong>B</strong> must also be true.
                </p>

                {/* Animated Graphic Box */}
                <div style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: '12px',
                  border: '1px solid var(--color-border)',
                  padding: '1rem 1.5rem',
                  height: '170px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  marginTop: '0.5rem'
                }}>
                  {/* Column 1: Input Facts */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', zIndex: 2, width: '90px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Premises</div>
                    <div style={{ height: '70px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.5rem' }}>
                      <div style={{
                        padding: '0.3rem 0.6rem',
                        background: 'rgba(34, 211, 238, 0.12)',
                        border: '1px solid #22d3ee',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontFamily: 'monospace',
                        color: '#cffafe',
                        transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
                        position: 'absolute',
                        left: animStep === 0 ? '40px' : animStep === 1 ? '160px' : animStep === 2 ? '160px' : '-100px',
                        top: animStep === 0 ? '60px' : '80px',
                        transform: (animStep === 1 || animStep === 2) ? 'translateX(-50%)' : 'none',
                        opacity: animStep === 3 ? 0 : 1
                      }}>
                        A
                      </div>
                      <div style={{
                        padding: '0.3rem 0.6rem',
                        background: 'rgba(168, 85, 247, 0.15)',
                        border: '1px solid #c084fc',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontFamily: 'monospace',
                        color: '#e9d5ff',
                        transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
                        position: 'absolute',
                        left: animStep <= 1 ? '40px' : animStep === 2 ? '160px' : '-100px',
                        top: animStep <= 1 ? '100px' : '80px',
                        transform: animStep === 2 ? 'translateX(-50%)' : 'none',
                        opacity: animStep === 3 ? 0 : 1
                      }}>
                        A → B
                      </div>
                    </div>
                  </div>

                  {/* Flow Arrow 1 */}
                  <div style={{ color: 'rgba(255, 255, 255, 0.15)', fontSize: '1.25rem', userSelect: 'none' }}>➔</div>

                  {/* Column 2: Unification Mixer */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', zIndex: 2, position: 'relative' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Logic Mixer</div>
                    <div style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: '50%',
                      border: animStep === 2 ? '2px dashed #a855f7' : '2px dashed rgba(255, 255, 255, 0.15)',
                      background: animStep === 2 ? 'rgba(168, 85, 247, 0.1)' : 'rgba(0, 0, 0, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      animation: animStep === 2 ? 'spin 6s linear infinite, pulse 1.2s infinite alternate' : 'none',
                      color: animStep === 2 ? '#c084fc' : 'var(--color-text-secondary)',
                      transition: 'all 0.4s'
                    }}>
                      {animStep === 2 ? '🌀' : '⚙️'}
                    </div>
                    {/* Floating Result Node */}
                    <div style={{
                      padding: '0.3rem 0.6rem',
                      background: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid #10b981',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontFamily: 'monospace',
                      color: '#d1fae5',
                      transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
                      position: 'absolute',
                      left: animStep <= 2 ? '80px' : animStep === 3 ? '260px' : animStep === 4 ? '260px' : '80px',
                      top: '52px',
                      transform: 'translateX(-50%)',
                      opacity: animStep <= 2 ? 0 : 1,
                      boxShadow: animStep === 4 ? '0 0 12px rgba(16, 185, 129, 0.4)' : 'none',
                      fontWeight: animStep === 4 ? 700 : 'normal'
                    }}>
                      B
                    </div>
                  </div>

                  {/* Flow Arrow 2 */}
                  <div style={{ color: 'rgba(255, 255, 255, 0.15)', fontSize: '1.25rem', userSelect: 'none' }}>➔</div>

                  {/* Column 3: The Queue */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', zIndex: 2, width: '90px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Consequences</div>
                    <div style={{ height: '70px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      {/* Empty slot placeholder */}
                      <div style={{
                        width: '60px',
                        height: '28px',
                        borderRadius: '6px',
                        border: animStep === 4 ? '1px solid rgba(16, 185, 129, 0.3)' : '1px dashed rgba(255, 255, 255, 0.08)',
                        background: animStep === 4 ? 'rgba(16, 185, 129, 0.04)' : 'transparent',
                        transition: 'all 0.4s'
                      }} />
                    </div>
                  </div>
                </div>

                {/* Animated Status Description */}
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.82rem',
                  color: '#e4e4e7',
                  minHeight: '54px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s'
                }}>
                  <span style={{ fontSize: '1rem' }}>
                    {animStep === 0 && '⚙️'}
                    {animStep === 1 && '📥'}
                    {animStep === 2 && '🌀'}
                    {animStep === 3 && '📤'}
                    {animStep === 4 && '🎉'}
                  </span>
                  <span>
                    {animStep === 0 && 'The engine starts with the facts you entered (Premises), sitting in the queue.'}
                    {animStep === 1 && '1. Pull: The engine takes the simplest fact out of the queue (Fact A) to evaluate it.'}
                    {animStep === 2 && '2. Combine: The engine mixes and unifies Fact A with the rule (A → B) in the Logic Mixer.'}
                    {animStep === 3 && '3. Conclude: A new fact, B, is derived and added to the waiting list.'}
                    {animStep === 4 && '4. Goal Reached! Fact B matches our Target. The proof is complete!'}
                  </span>
                </div>

                <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1rem', fontWeight: 600, borderLeft: '3px solid var(--color-primary)', paddingLeft: '0.5rem', marginTop: '0.5rem', margin: '0.5rem 0 0 0' }}>
                  What the Prover is Doing
                </h3>
                <p style={{ margin: 0 }}>
                  Instead of guessing or thinking backwards, the prover uses **forward chaining** (mixing known facts to synthesize new ones):
                </p>
                <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', margin: 0, fontSize: '0.85rem', color: '#d4d4d8' }}>
                  <li>
                    <strong>Waiting Line (Queue)</strong>: All derived facts wait in a queue, sorted from simplest to most complex.
                  </li>
                  <li>
                    <strong>Taking Turns</strong>: Each turn (Iteration), the engine takes the first fact out of the queue.
                  </li>
                  <li>
                    <strong>Mixing</strong>: It unifies variables and mixes that fact with logical rules to produce new immediate consequences.
                  </li>
                  <li>
                    <strong>Logs</strong>: The Tracer console shows <code>Iteration #N</code> (current step count), <code>Queue size: X</code> (how many facts are waiting), and <code>Inspecting state: A</code> (the current fact being evaluated).
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'ast' && (
              <>
                <p>
                  The <strong>Formula AST Inspector</strong> visualizes the Abstract Syntax Tree (AST) of the selected formula.
                </p>
                <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.05rem', fontWeight: 600, borderLeft: '3px solid var(--color-primary)', paddingLeft: '0.5rem', marginTop: '0.5rem' }}>
                  Reading the AST
                </h3>
                <p>
                  An Abstract Syntax Tree is a graphical representation of the nested hierarchical structure of a formula:
                </p>
                <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li>
                    <strong>Root & Branches</strong>: The top node is the main logical operator (e.g. <code>.TO</code> or <code>.NEG</code>). Lines link the operator to its child operands, displaying how sub-formulas are nested.
                  </li>
                  <li>
                    <strong>Node Types & Color Guide</strong>:
                    <br />
                    - 🟣 <strong>Operators</strong> (e.g. <code>.TO</code>, <code>.NEG</code>): logical connectives.
                    <br />
                    - 🔵 <strong>Variables</strong> (e.g. <code>?U</code>): free logical variables that can represent any term.
                    <br />
                    - ⚪ <strong>Constants</strong> (e.g. <code>A</code>, <code>B</code>): terminal atomic logic symbols.
                  </li>
                </ul>
                <p>
                  Analyzing the AST helps logicians and developers see how the Lisp parser breaks down complex nested formulas (like double implications) into simple tree operations.
                </p>
              </>
            )}

            {activeTab === 'derivation' && (
              <>
                <p>
                  The <strong>Mathematical Derivation Proof Tree</strong> is a visual representation of the final, formal proof.
                </p>
                <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.05rem', fontWeight: 600, borderLeft: '3px solid var(--color-primary)', paddingLeft: '0.5rem', marginTop: '0.5rem' }}>
                  Gentzen Natural Deduction Layout
                </h3>
                <p>
                  The proof is rendered using a standard Gentzen-style natural deduction tree:
                </p>
                <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li>
                    <strong>Read Direction</strong>: The tree is read from top to bottom.
                  </li>
                  <li>
                    <strong>Assumptions</strong>: The leaves at the very top represent the starting assumptions (labeled with <code>Assumption</code>).
                  </li>
                  <li>
                    <strong>Inference Steps</strong>: The horizontal lines represent steps of deductive reasoning. The rule applied in the step is labeled to the right of the line (e.g., <code>Modus Ponens</code>).
                  </li>
                  <li>
                    <strong>Conclusion</strong>: The formula at the bottom of the tree is the target formula that we set out to prove.
                  </li>
                </ul>
                <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                  💡 <strong>Interactive Feature:</strong> You can hover over and click any conclusion box in the derivation tree to load that specific formula into the **Formula AST Inspector** above it.
                </p>
              </>
            )}

            {activeTab === 'internals' && (
              <>
                <p>
                  Here is an explanation of the technical stack powering this playground:
                </p>
                <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li>
                    <strong>Lennma Math Engine</strong>: Written in Common Lisp, Lennma is a formal verification logic solver designed for mathematical validation.
                  </li>
                  <li>
                    <strong>In-Browser Compilation (JSCL)</strong>: JSCL is a Lisp-to-Javascript compiler. We precompile the Lennma engine forms into Javascript code, allowing the solver to run natively in any modern web browser without needing a remote backend server.
                  </li>
                  <li>
                    <strong>Web Workers</strong>: Logic proof searches are computationally heavy. Running the Lisp evaluation directly on the main thread would freeze your browser page. We run the JSCL runtime inside a background Web Worker.
                  </li>
                  <li>
                    <strong>Dynamic Messaging</strong>: As the search runs in the background thread, it issues iteration callbacks. The worker intercepts these and posts them (`postMessage`) back to the main React thread where they are collected, throttled (in slow-motion), and rendered.
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
