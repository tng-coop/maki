import React from 'react';
import { DetailedStep, TRANSITIVITY_STEPS, AXIOM_STEPS } from './walkthroughData';

interface HelpModalProps {
  section: string;
  onClose: () => void;
}

interface WalkthroughFormula {
  raw: string;
  display: string;
}

interface WalkthroughStep {
  title: string;
  queueBefore: WalkthroughFormula[];
  popped: WalkthroughFormula | null;
  ruleApplied: string;
  derived: WalkthroughFormula[];
  queueAfter: WalkthroughFormula[];
  description: string;
  spokenText: string;
}

interface WalkthroughExample {
  id: string;
  name: string;
  goal: string;
  assumptions: string[];
  target: string;
  steps: WalkthroughStep[];
}

function parseDisplayImplication(display: string): { antecedent: string, consequent: string } | null {
  let str = display.trim();
  // Strip outermost matching parentheses
  if (str.startsWith('(') && str.endsWith(')')) {
    let depth = 0;
    let matchesAll = true;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '(') depth++;
      else if (str[i] === ')') depth--;
      if (depth === 0 && i < str.length - 1) {
        matchesAll = false;
        break;
      }
    }
    if (matchesAll) {
      str = str.substring(1, str.length - 1).trim();
    }
  }

  // Find the top-level '→' or '->'
  let depth = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') depth++;
    else if (str[i] === ')') depth--;
    else if (depth === 0) {
      if (str.substring(i, i + 1) === '→') {
        return {
          antecedent: str.substring(0, i).trim(),
          consequent: str.substring(i + 1).trim()
        };
      }
      if (str.substring(i, i + 4) === ' -> ') {
        return {
          antecedent: str.substring(0, i).trim(),
          consequent: str.substring(i + 4).trim()
        };
      }
    }
  }
  return null;
}

const GLOSSARY = {
  sequent: "A formal logical expression relating premises (left) to conclusions (right), written as Γ ⊢ Δ. It means 'if all premises in Γ are true, then at least one conclusion in Δ must be true.'",
  "Cut rule": "An inference rule that allows using an intermediate lemma to chain two proofs together. Eliminating this rule is the central task of Cut Elimination.",
  "cut formula": "The formula that is eliminated by the Cut rule. It is the intermediate lemma shared by the two premises of a Cut.",
  "sub-formula": "A component part of a larger logical formula. For example, A, B, and A → B are sub-formulas of (A → B) → C.",
  "Modus Ponens": "The classic rule of inference stating that if we know P is true and P → Q is true, we can deduce Q.",
  "tetration": "A mathematical operator representing iterated exponentiation (a 'power tower'), e.g. 2^(2^(2^...)). Cut elimination can cause proof sizes to grow tetrationally.",
  "Curry-Howard correspondence": "The deep mathematical isomorphism linking computer programs to logical proofs. Under this, cut elimination is equivalent to program evaluation (β-reduction).",
  "admissibility": "A property of a rule of inference. A rule is admissible if adding it to a logic system does not expand the set of provable theorems.",
  "LK": "Gentzen's classical logic sequent calculus system. The name stands for 'Logistischer Kalkül Klassisch' (German for Classical Logistic Calculus). It allows multiple formulas on both sides of the sequent.",
  "LJ": "Gentzen's intuitionistic logic sequent calculus system. The name stands for 'Logistischer Kalkül Intuitionistisch' (using 'J' instead of 'I' to avoid typographical confusion with the Roman numeral I or identity rules). It restricts the right-hand side to at most one formula.",
  "sequent calculus": "A formal system for writing and analyzing logical proofs using sequents, developed by Gerhard Gentzen in 1935.",
  "Hauptsatz": "Gerhard Gentzen's original German term for his Cut Elimination Theorem (meaning 'Main Theorem').",
  "Normalization Theorem": "The natural deduction equivalent of cut-elimination, showing that proof terms can be reduced to a normal (simplest) form.",
  "sub-formula property": "The property that every formula appearing in a proof tree is a sub-formula of the final assumptions or conclusion.",
  "ordinal analysis": "A branch of proof theory that uses ordinal numbers to measure the computational strength and consistency of formal mathematical systems.",
  "consistency": "The property of a logical system showing that it contains no contradictions (it is impossible to prove both P and ¬P, or the absurd/empty sequent)."
};

type GlossaryTermName = keyof typeof GLOSSARY;

const GlossaryTerm: React.FC<{ term: GlossaryTermName; children: React.ReactNode }> = ({ term, children }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const definition = GLOSSARY[term];

  return (
    <span 
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip(!showTooltip)}
      style={{
        cursor: 'help',
        position: 'relative',
        display: 'inline-block',
        color: '#c084fc',
      }}
    >
      {children}
      {showTooltip && (
        <span style={{
          position: 'absolute',
          bottom: '125%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '240px',
          background: 'rgba(15, 15, 25, 0.96)',
          backdropFilter: 'blur(10px)',
          border: '1px solid #c084fc',
          borderRadius: '8px',
          padding: '0.6rem 0.8rem',
          color: '#e4e4e7',
          fontSize: '0.75rem',
          lineHeight: '1.45',
          zIndex: 10000,
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          textAlign: 'left',
          pointerEvents: 'none',
          whiteSpace: 'normal',
          fontWeight: 400
        }}>
          <strong style={{ color: '#c084fc', display: 'block', marginBottom: '0.25rem', fontSize: '0.8rem' }}>{term}</strong>
          {definition}
          <span style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            borderWidth: '6px',
            borderStyle: 'solid',
            borderColor: '#c084fc transparent transparent transparent'
          }} />
        </span>
      )}
    </span>
  );
};

function getStepCase(raw: string, display: string): 1 | 2 | 3 {
  if (raw.includes('?') || display.includes('?')) {
    return 3;
  }
  const impl = parseDisplayImplication(display);
  if (impl) {
    return 1;
  }
  return 2;
}

function generateStepsFromTrace(
  trace: DetailedStep[],
  goal: string,
  assumptions: string[]
): WalkthroughStep[] {
  const steps: WalkthroughStep[] = [];

  // Step 0: Initialization
  const initialQueue: WalkthroughFormula[] = assumptions.map(a => ({ raw: a, display: a }));
  initialQueue.push({ raw: "axiom1", display: "?P → (?Q → ?P) [Axiom Schema]" });
  initialQueue.push({ raw: "axiom2", display: "(?P → (?Q → ?R)) → ((?P → ?Q) → (?P → ?R)) [Axiom Schema]" });

  steps.push({
    title: "Step 0: Initializing the Engine",
    queueBefore: initialQueue,
    popped: null,
    ruleApplied: "None",
    derived: [],
    queueAfter: initialQueue,
    description: `The synthesis queue is seeded with the starting premises: [${assumptions.join(', ')}] and general Axiom Schemas. The engine is ready to perform forward-chaining search to prove: ${goal}.`,
    spokenText: `We initialize the logic engine for proving ${goal}. The synthesis queue is seeded with our assumptions and axiom schemas.`
  });

  trace.forEach((step, idx) => {
    const poppedRaw = step.poppedRaw;
    const poppedDisplay = step.poppedDisplay;
    const derivedDisplay = step.derivedDisplay;
    const poppedCase = getStepCase(poppedRaw, poppedDisplay);
    const queueSize = step.queueSize;

    let caseText = "";
    let caseSpoken = "";
    let isGoal = poppedDisplay.replace(/\s+/g, '') === goal.replace(/\s+/g, '');

    const impl = parseDisplayImplication(poppedDisplay);

    if (poppedCase === 3) {
      caseText = `The popped term is an Axiom Schema: ${poppedDisplay} (contains logical variables prefixed with ?). The engine matches these variables against all known sub-formulas in the workspace to construct concrete instantiated rules.`;
      caseSpoken = `The popped term is an Axiom Schema. The engine instantiates its variables against known sub-formulas, generating concrete rules that are pushed back into the queue.`;
    } else if (poppedCase === 1 && impl) {
      caseText = `The popped term is an Implication: ${poppedDisplay}. The engine registers it as a proven implication rule. It scans memory for any previously registered constant ${impl.antecedent}. If found, it instantly triggers Modus Ponens and derives ${impl.consequent}. If ${impl.antecedent} is not yet proven, the engine takes no action and waits for it to be evaluated in a later iteration.`;
      caseSpoken = `The popped term is the implication: ${poppedDisplay}. The engine registers it as a proven implication, and checks if the antecedent, ${impl.antecedent}, is proven. If it is, it triggers Modus Ponens to derive ${impl.consequent}. Otherwise, it waits.`;
    } else {
      caseText = `The popped term is a Constant or Fact: ${poppedDisplay}. The engine registers it as a proven constant. It searches the database of registered implications for any rules of the form ${poppedDisplay} → X. If a match is found, unification succeeds, and consequence X is derived and prepended to the queue.`;
      caseSpoken = `The popped term is the constant fact: ${poppedDisplay}. The engine registers it as a proven fact, then searches for any implication rules starting with ${poppedDisplay} to trigger Modus Ponens and derive new consequences.`;
    }

    let outcomeText = "";
    let outcomeSpoken = "";
    let ruleApplied = "";
    const derived: WalkthroughFormula[] = [];

    if (derivedDisplay && derivedDisplay !== "NIL" && derivedDisplay.trim() !== "") {
      ruleApplied = "Modus Ponens Unification";
      
      let cleanDerived = derivedDisplay.trim();
      if (cleanDerived.startsWith('(') && cleanDerived.endsWith(')')) {
        cleanDerived = cleanDerived.substring(1, cleanDerived.length - 1).trim();
      }
      
      let currentFormula = "";
      let parenDepth = 0;
      for (let i = 0; i < cleanDerived.length; i++) {
        const char = cleanDerived[i];
        if (char === '(') parenDepth++;
        else if (char === ')') parenDepth--;
        
        currentFormula += char;
        
        if (parenDepth === 0 && (char === ' ' || i === cleanDerived.length - 1)) {
          const f = currentFormula.trim();
          if (f) {
            derived.push({ raw: f, display: f });
          }
          currentFormula = "";
        }
      }

      if (derived.length === 0 && cleanDerived) {
        derived.push({ raw: cleanDerived, display: cleanDerived });
      }

      const derivedList = derived.map(d => d.display).join(', ');
      outcomeText = ` Unification succeeds! The engine derives logical consequence(s): [${derivedList}] and prepends them to the queue.`;
      outcomeSpoken = ` Unification succeeds! The engine derives the consequence: ${derivedList}, and pushes it into the queue.`;
    } else {
      ruleApplied = isGoal ? "Target Verification" : "Rule Registration";
      outcomeText = " The engine registers this formula in memory, but no immediate Modus Ponens match is triggered in this step.";
      outcomeSpoken = " The engine registers this formula in memory, with no new consequences derived in this step.";
    }

    if (isGoal) {
      outcomeText += ` Goal Reached! The popped formula matches the target goal "${goal}". The proof search terminates successfully!`;
      outcomeSpoken += ` Goal Reached! The popped formula matches the target goal. The proof is complete!`;
      ruleApplied = "Target Comparison";
    }

    // Mock/simulate the queue:
    // Show popped at top, and then the popped elements of the next few steps
    const queueBefore: WalkthroughFormula[] = [
      { raw: poppedRaw, display: poppedDisplay }
    ];
    for (let k = 1; k <= 3; k++) {
      const nextStep = trace[idx + k];
      if (nextStep) {
        queueBefore.push({ raw: nextStep.poppedRaw, display: nextStep.poppedDisplay });
      }
    }

    steps.push({
      title: `Step ${step.stepNum}: Iteration #${step.stepNum}`,
      queueBefore,
      popped: { raw: poppedRaw, display: poppedDisplay },
      ruleApplied,
      derived,
      queueAfter: [],
      description: `${caseText}${outcomeText} (Queue size: ${queueSize} formulas waiting)`,
      spokenText: `Iteration ${step.stepNum}. ${caseSpoken}${outcomeSpoken}`
    });
  });

  return steps;
}

export const HelpModal: React.FC<HelpModalProps> = ({ section, onClose }) => {
  const [activeTab, setActiveTab] = React.useState<string>(section);
  const [animStep, setAnimStep] = React.useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = React.useState<boolean>(false);
  const speechUtteranceRef = React.useRef<SpeechSynthesisUtterance | null>(null);
  const [walkthroughStepIdx, setWalkthroughStepIdx] = React.useState<number>(0);
  const [selectedExample, setSelectedExample] = React.useState<'mp' | 'axiom' | 'transitivity'>('mp');
  const [isAutoplayActive, setIsAutoplayActive] = React.useState<boolean>(false);
  const [autoplaySpeed, setAutoplaySpeed] = React.useState<number>(1200);

  // Draggable and Resizable Modal States
  const [size, setSize] = React.useState({ width: 900, height: 650 });
  const [position, setPosition] = React.useState({ x: 100, y: 50 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [isResizing, setIsResizing] = React.useState(false);
  const dragStart = React.useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const resizeStart = React.useRef({ x: 0, y: 0, w: 0, h: 0 });

  // Initialize size and position to center of viewport on mount
  React.useEffect(() => {
    const startW = Math.min(900, window.innerWidth - 40);
    const startH = Math.min(650, window.innerHeight - 40);
    setSize({ width: startW, height: startH });
    setPosition({
      x: (window.innerWidth - startW) / 2,
      y: (window.innerHeight - startH) / 2
    });
  }, []);

  const handleDragStart = (e: React.MouseEvent) => {
    // Avoid dragging when clicking interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('select') || target.closest('a')) {
      return;
    }
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      posX: position.x,
      posY: position.y
    };
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      w: size.width,
      h: size.height
    };
  };

  // Dragging mousemove/mouseup listeners
  React.useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      // Constraint position inside the viewport
      const x = Math.max(0, Math.min(window.innerWidth - size.width, dragStart.current.posX + dx));
      const y = Math.max(0, Math.min(window.innerHeight - size.height, dragStart.current.posY + dy));
      setPosition({ x, y });
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, size]);

  // Resizing mousemove/mouseup listeners
  React.useEffect(() => {
    if (!isResizing) return;
    const handleMouseMove = (e: MouseEvent) => {
      const dw = e.clientX - resizeStart.current.x;
      const dh = e.clientY - resizeStart.current.y;
      // Constraint size
      const width = Math.max(600, Math.min(window.innerWidth - position.x - 20, resizeStart.current.w + dw));
      const height = Math.max(450, Math.min(window.innerHeight - position.y - 20, resizeStart.current.h + dh));
      setSize({ width, height });
    };
    const handleMouseUp = () => {
      setIsResizing(false);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, position]);

  // Axiom Instantiation Animation States
  const [subFormulas] = React.useState<string[]>(['A', 'B', 'C', 'A → B', 'B → C', 'A → C']);
  const [activeSchemaName, setActiveSchemaName] = React.useState<'ii1' | 'ii2' | 'ii3'>('ii1');
  const [slotP, setSlotP] = React.useState<string>('?P');
  const [slotQ, setSlotQ] = React.useState<string>('?Q');
  const [slotR, setSlotR] = React.useState<string>('?R');
  const [animStage, setAnimStage] = React.useState<number>(0); // 0: variable names, 1: highlight, 2: substituted
  const [generatedCount, setGeneratedCount] = React.useState<number>(0);

  // Cut Elimination Tutorial States
  const [cutAnimStage, setCutAnimStage] = React.useState<number>(0);
  const [isCutPlaying, setIsCutPlaying] = React.useState<boolean>(true);
  const [playingAudioId, setPlayingAudioId] = React.useState<string | null>(null);

  const getVarStyle = (vName: 'P' | 'Q' | 'R') => {
    let color = '#38bdf8'; // cyan for P
    if (vName === 'Q') color = '#fbbf24'; // yellow for Q
    if (vName === 'R') color = '#ec4899'; // pink for R
    
    const isSubstituted = animStage === 2;
    const isHighlighted = animStage === 1;

    return {
      color: isSubstituted ? '#fff' : color,
      background: isSubstituted ? 'rgba(255,255,255,0.08)' : isHighlighted ? 'rgba(255,255,255,0.04)' : 'transparent',
      border: isSubstituted ? '1px solid rgba(255,255,255,0.2)' : isHighlighted ? `1px dashed ${color}` : '1px solid transparent',
      borderRadius: '4px',
      padding: isSubstituted ? '0.1rem 0.3rem' : '0.1rem 0.2rem',
      fontWeight: 700,
      fontFamily: 'monospace',
      transition: 'all 0.4s ease',
      display: 'inline-block',
      margin: '0 0.1rem'
    };
  };

  React.useEffect(() => {
    let stage = 0;
    const interval = setInterval(() => {
      stage = (stage + 1) % 3;
      setAnimStage(stage);
      
      if (stage === 0) {
        setSlotP('?P');
        setSlotQ('?Q');
        setSlotR('?R');
        const schemas: ('ii1' | 'ii2' | 'ii3')[] = ['ii1', 'ii2', 'ii3'];
        const nextSchema = schemas[Math.floor(Math.random() * schemas.length)];
        setActiveSchemaName(nextSchema);
      } else if (stage === 2) {
        const pVal = subFormulas[Math.floor(Math.random() * subFormulas.length)];
        const qVal = subFormulas[Math.floor(Math.random() * subFormulas.length)];
        const rVal = subFormulas[Math.floor(Math.random() * subFormulas.length)];
        setSlotP(pVal);
        setSlotQ(qVal);
        setSlotR(rVal);
        setGeneratedCount(prev => (prev + 1) % 289);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [subFormulas]);

  React.useEffect(() => {
    if (!isCutPlaying) return;
    const interval = setInterval(() => {
      setCutAnimStage(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, [isCutPlaying]);

  const walkthroughExamples: Record<string, WalkthroughExample> = {
    mp: {
      id: 'mp',
      name: "🎬 Modus Ponens",
      goal: "Prove B from assumptions (A → B) and A",
      assumptions: ["A → B", "A"],
      target: "B",
      steps: [
        {
          title: "Step 0: Initializing the Engine",
          queueBefore: [
            { raw: "(.TO .L_.A .L_.B)", display: "A → B" },
            { raw: ".L_.A", display: "A" }
          ],
          popped: null,
          ruleApplied: "None",
          derived: [],
          queueAfter: [
            { raw: "(.TO .L_.A .L_.B)", display: "A → B" },
            { raw: ".L_.A", display: "A" }
          ],
          description: "The synthesis queue is seeded with the starting premises: (A → B) and A. The Lisp engine is now ready to begin forward chaining.",
          spokenText: "We initialize the engine. The synthesis queue is seeded with our two starting premises: A implies B, and A is true."
        },
        {
          title: "Step 1: First Iteration - Popping Implication",
          queueBefore: [
            { raw: "(.TO .L_.A .L_.B)", display: "A → B" },
            { raw: ".L_.A", display: "A" }
          ],
          popped: { raw: "(.TO .L_.A .L_.B)", display: "A → B" },
          ruleApplied: "Axiom II Match (Modus Ponens LHS)",
          derived: [],
          queueAfter: [
            { raw: ".L_.A", display: "A" }
          ],
          description: "The engine pulls the implication (A → B) from the top of the queue. It registers this formula and checks if it can be unified with any existing constants. Since no constants have been evaluated yet, no new formulas are derived.",
          spokenText: "In the first iteration, the engine pulls the implication A implies B from the queue. Because no other facts have been evaluated yet, it cannot derive anything new, and the queue is left with just Fact A."
        },
        {
          title: "Step 2: Second Iteration - Deriving the Goal",
          queueBefore: [
            { raw: ".L_.A", display: "A" }
          ],
          popped: { raw: ".L_.A", display: "A" },
          ruleApplied: "Modus Ponens Unification",
          derived: [
            { raw: ".L_.B", display: "B" }
          ],
          queueAfter: [
            { raw: ".L_.B", display: "B" }
          ],
          description: "The engine pulls A from the queue. It unifies A with the left-hand premise of the implication (A → B) evaluated in Step 1. The match succeeds! The engine derives B as a new logical consequence and pushes it into the queue.",
          spokenText: "In the second iteration, the engine pulls Fact A from the queue. It matches A against the implication A implies B. The unification succeeds, deriving new Fact B, which is pushed into the queue."
        },
        {
          title: "Step 3: Third Iteration - Goal Verification",
          queueBefore: [
            { raw: ".L_.B", display: "B" }
          ],
          popped: { raw: ".L_.B", display: "B" },
          ruleApplied: "Target Comparison",
          derived: [],
          queueAfter: [],
          description: "The engine pulls B from the queue and checks it against the target goal B. They match! The search terminates successfully and returns the completed proof tree.",
          spokenText: "In the third iteration, the engine pulls Fact B from the queue. It matches the target B, meaning the proof is successful, and the search terminates."
        }
      ]
    }
  };

  const currentExampleData = React.useMemo<WalkthroughExample>(() => {
    if (selectedExample === 'mp') {
      return walkthroughExamples.mp;
    }
    if (selectedExample === 'axiom') {
      const steps = generateStepsFromTrace(
        AXIOM_STEPS,
        "B → A",
        ["A"]
      );
      return {
        id: 'axiom',
        name: "⚙️ Axiom II.1 Instantiation",
        goal: "Prove (B → A) from assumption A",
        assumptions: ["A"],
        target: "B → A",
        steps
      };
    }
    // transitivity
    const steps = generateStepsFromTrace(
      TRANSITIVITY_STEPS,
      "A → C",
      ["A → B", "B → C"]
    );
    return {
      id: 'transitivity',
      name: "🔗 Transitivity of Implication",
      goal: "Prove (A → C) from assumptions (A → B) and (B → C)",
      assumptions: ["A → B", "B → C"],
      target: "A → C",
      steps
    };
  }, [selectedExample]);

  const spokenSummaries: Record<string, string> = {
    overview: "Welcome to the Lennma Logic Playground. This playground uses a Lisp-based prover that seeds a priority queue with 290 initial formulas, combining your premises with 288 instantiated axioms. We construct these concrete axioms using a mathematical substitutions formula based on the 6 unique sub-formulas of your inputs. This bounding of the search space is mathematically guaranteed by Gentzen's Cut Elimination Theorem, which proves that any valid theorem has a cut-free proof containing only its own sub-formulas. The prover executes a priority-based modus ponens loop, deduplicating popped formulas and forward-chaining to derive the target goal.",
    sandbox: "The Proof Sandbox is where you write your starting assumptions and your target conclusion. The sandbox parses standard prefix Lisp formulas. For constants, prefix them with dot L dot, such as dot L dot A. Implication is written as dot to, negation as dot neg, and logic variables start with a question mark. For example, to prove modus ponens, enter dot to A B and A as assumptions, and B as your target.",
    tracer: "The Real-Time Tracer shows how the forward-chaining engine runs in a four-phase loop. First, it pulls the simplest formula from the priority queue. Second, it unifies that formula depending on its logical type. Popped implications are registered in memory to match future variables. Popped constants trigger modus ponens against registered implications to derive new consequences. Popped axioms substitute logic variables with known terms to generate rule schemas. Third, the formula is added to memory. Finally, it checks if the goal is reached.",
    ast: "The Formula AST Inspector visualizes the abstract syntax tree of a formula. It shows how complex formulas are broken down hierarchically. The top node displays the main operator like implication or negation, branching down into sub-formulas. Operators are colored purple, variables are cyan, and constants are white.",
    derivation: "The Mathematical Derivation Proof Tree renders the final proof using a natural deduction Gentzen layout. It is read from top to bottom. The leaves at the very top are your starting assumptions. The horizontal lines represent reasoning steps, with the logical rules applied shown to the right, leading down to the final target conclusion at the bottom. You can click any box in the tree to load its syntax structure into the inspector above.",
    internals: "The engine runs in Lisp, compiled to Javascript via JSCL, and runs inside a background Web Worker. This prevents the browser page from freezing during search, sending progress updates back to the React UI in real-time."
  };

  const speakStepText = (text: string, id: string = 'global') => {
    if (!window.speechSynthesis) return;

    if (isPlayingAudio && playingAudioId === id) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setPlayingAudioId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.onend = () => {
      setIsPlayingAudio(false);
      setPlayingAudioId(null);
    };
    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setPlayingAudioId(null);
    };
    speechUtteranceRef.current = utterance;
    setIsPlayingAudio(true);
    setPlayingAudioId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handlePlayAudio = () => {
    if (!window.speechSynthesis) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    const textToSpeak = activeTab === 'walkthrough' 
      ? currentExampleData.steps[walkthroughStepIdx]?.spokenText 
      : spokenSummaries[activeTab] || "";
      
    if (!textToSpeak) return;

    speakStepText(textToSpeak, 'global');
  };

  React.useEffect(() => {
    setActiveTab(section);
  }, [section]);

  React.useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setPlayingAudioId(null);
    setWalkthroughStepIdx(0);
    setIsAutoplayActive(false);
  }, [activeTab]);

  React.useEffect(() => {
    if (isPlayingAudio) {
      if (activeTab === 'walkthrough') {
        const stepData = currentExampleData?.steps[walkthroughStepIdx];
        if (stepData && window.speechSynthesis) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(stepData.spokenText);
          utterance.lang = 'en-US';
          utterance.onend = () => {
            setIsPlayingAudio(false);
            setPlayingAudioId(null);
          };
          utterance.onerror = () => {
            setIsPlayingAudio(false);
            setPlayingAudioId(null);
          };
          speechUtteranceRef.current = utterance;
          setPlayingAudioId('global');
          window.speechSynthesis.speak(utterance);
        }
      }
    } else {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }
  }, [walkthroughStepIdx, selectedExample, isPlayingAudio]);

  React.useEffect(() => {
    if (!isAutoplayActive) return;

    const interval = setInterval(() => {
      setWalkthroughStepIdx(prev => {
        if (prev >= currentExampleData.steps.length - 1) {
          setIsAutoplayActive(false);
          return prev;
        }
        return prev + 1;
      });
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [isAutoplayActive, autoplaySpeed, currentExampleData]);

  React.useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setAnimStep(prev => (prev + 1) % 5);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const getCutStageSpokenText = () => {
    switch (cutAnimStage) {
      case 0:
        return "Stage 1: Proof with Lemma. To prove that A implies C, we traditionally introduce an intermediate lemma B. This splits the proof into proving B using A and then proving C using B. Fusing these branches is the Cut step.";
      case 1:
        return "Stage 2: Identifying the Bridge. The Cut rule acts as a gluing logic. The intermediate term B is the bridge. However, the term B was never in our starting goal. It is a new formula introduced to make the proof convenient.";
      case 2:
        return "Stage 3: Elimination in Progress. Gentzen’s algorithm systematically removes the Cut node. It shifts the proof steps upward, bypassing the intermediate bridge B and directly chaining the derivations.";
      case 3:
        return "Stage 4: The Cut-Free Result. Success! The proof is now Cut-Free. The intermediate lemma B is completely gone. The proof tree contains only sub-formulas of our inputs. The search space is now mathematically bounded.";
      default:
        return "";
    }
  };

  const tabs = [
    { id: 'overview', label: '🏠 Overview', title: 'Lennma Logic Playground Overview' },
    { id: 'sandbox', label: '🧪 Proof Sandbox', title: 'Writing Logical Formulas' },
    { id: 'tracer', label: '⚡ Real-Time Tracer', title: 'How Search Iterations Work' },
    { id: 'walkthrough', label: '🎬 Step Walkthrough', title: 'Step-by-Step Proof Walkthrough' },
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
      backgroundColor: 'rgba(5, 5, 8, 0.4)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      zIndex: 1000,
      animation: 'fadeIn 0.25s ease-out',
      pointerEvents: 'none' // Let clicks pass through outside the modal
    }}>
      <div 
        className="glass-panel" 
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${size.width}px`,
          height: `${size.height}px`,
          display: 'grid',
          gridTemplateColumns: '240px 1fr',
          padding: 0,
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'auto' // Re-enable pointer events for the modal
        }}
      >
        {/* Sidebar Tabs */}
        <div 
          onMouseDown={handleDragStart}
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRight: '1px solid var(--color-border)',
            padding: '1.5rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
            overflowY: 'auto',
            cursor: 'move',
            userSelect: 'none'
          }}
        >
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
          <div 
            onMouseDown={handleDragStart}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--color-border)',
              paddingBottom: '1rem',
              cursor: 'move',
              userSelect: 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div>
                <h1 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #ffffff 0%, #c084fc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: 0
                }}>
                  {tabs.find(t => t.id === activeTab)?.title}
                </h1>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem', margin: 0 }}>
                  Detailed explanation and walkthrough of the feature
                </p>
              </div>
              
              <button 
                onClick={handlePlayAudio}
                style={{
                  background: isPlayingAudio ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  border: isPlayingAudio ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                  color: isPlayingAudio ? '#c084fc' : 'var(--color-text-secondary)',
                  borderRadius: '8px',
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s',
                }}
              >
                <span>{isPlayingAudio ? '⏹️ Stop Audio' : '🔊 Play Aloud'}</span>
              </button>
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
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#e4e4e7' }}>
                  Welcome to the <strong>Lennma Logic Playground</strong>! This application is an interactive mathematical verification environment and first-order logic theorem prover. Below is a comprehensive breakdown of the mathematics, theory, and computational logic powering our solver.
                </p>
                
                {/* 1. The Big Picture Metaphor */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  marginTop: '0.25rem'
                }}>
                  <h3 style={{ color: '#c084fc', fontSize: '1.05rem', fontWeight: 700, borderLeft: '3px solid var(--color-primary)', paddingLeft: '0.5rem', margin: 0 }}>
                    💡 How the Logic Engine Works: The Logical Maze
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#d4d4d8', lineHeight: 1.5 }}>
                    Imagine a logical maze. You start at the entrance with a few facts (your <strong>Premises</strong>, like <em>"A implies B"</em> and <em>"B implies C"</em>), and your goal is to find a path to the exit (your <strong>Target Goal</strong>, <em>"A implies C"</em>).
                  </p>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#d4d4d8', lineHeight: 1.5 }}>
                    To move through the maze, you have general laws of logic (<strong>Axioms</strong>) that act as bridges. However, computers cannot guess which bridges to build. Instead, they use a systematic, mathematically guided search.
                  </p>
                </div>

                {/* 2. Mathematical Mystery: Why exactly 290 formulas? */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}>
                  <h3 style={{ color: '#38bdf8', fontSize: '1.05rem', fontWeight: 700, borderLeft: '3px solid #38bdf8', paddingLeft: '0.5rem', margin: 0 }}>
                    🧮 The Combinatorial Seeding: Why Exactly 290 Formulas?
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#d4d4d8', lineHeight: 1.5 }}>
                    When you run the <strong>Syllogism (Transitivity)</strong> proof, the search logs show that the priority queue is seeded with exactly <strong>290 initial formulas</strong>. Where does this number come from?
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: '#38bdf8', fontSize: '0.85rem' }}>1. The Building Blocks (Sub-formulas): N = 6</div>
                    <p style={{ margin: 0, color: '#a1a1aa' }}>
                      The engine first scans the premises (<code>A → B</code>, <code>B → C</code>) and the target conclusion (<code>A → C</code>) to extract every unique logical sub-part. This results in exactly <strong>6 unique <GlossaryTerm term="sub-formula">sub-formulas</GlossaryTerm></strong>:
                    </p>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', margin: '0.2rem 0' }}>
                      {['A', 'B', 'C', 'A → B', 'B → C', 'A → C'].map((term, idx) => (
                        <span key={idx} style={{ fontFamily: 'monospace', padding: '0.1rem 0.4rem', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', borderRadius: '4px', fontSize: '0.75rem' }}>
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: '#38bdf8', fontSize: '0.85rem' }}>2. Axiom Substitution: N<sup>V</sup> Permutations</div>
                    <p style={{ margin: 0, color: '#a1a1aa' }}>
                      To initialize our logical database, the engine substitutes these 6 building blocks into the variables of the following 3 classic Axiom Schemas:
                    </p>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '0.4rem', color: '#e4e4e7', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', color: '#a1a1aa' }}>
                          <th style={{ padding: '0.4rem 0.25rem' }}>Axiom Schema</th>
                          <th style={{ padding: '0.4rem 0.25rem' }}>Variables (V)</th>
                          <th style={{ padding: '0.4rem 0.25rem' }}>Math Formula</th>
                          <th style={{ padding: '0.4rem 0.25rem', textAlign: 'right' }}>Substitutions</th>
                        </tr>
                      </thead>
                      <tbody style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={{ padding: '0.4rem 0.25rem' }}>II.1: P → (Q → P)</td>
                          <td style={{ padding: '0.4rem 0.25rem' }}>2 (P, Q)</td>
                          <td style={{ padding: '0.4rem 0.25rem' }}>6<sup>2</sup></td>
                          <td style={{ padding: '0.4rem 0.25rem', textAlign: 'right', fontWeight: 700, color: '#38bdf8' }}>36</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={{ padding: '0.4rem 0.25rem' }}>II.2: (P→(Q→R)) → ((P→Q)→(P→R))</td>
                          <td style={{ padding: '0.4rem 0.25rem' }}>3 (P, Q, R)</td>
                          <td style={{ padding: '0.4rem 0.25rem' }}>6<sup>3</sup></td>
                          <td style={{ padding: '0.4rem 0.25rem', textAlign: 'right', fontWeight: 700, color: '#38bdf8' }}>216</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={{ padding: '0.4rem 0.25rem' }}>II.3: (¬P → ¬Q) → (Q → P)</td>
                          <td style={{ padding: '0.4rem 0.25rem' }}>2 (P, Q)</td>
                          <td style={{ padding: '0.4rem 0.25rem' }}>6<sup>2</sup></td>
                          <td style={{ padding: '0.4rem 0.25rem', textAlign: 'right', fontWeight: 700, color: '#38bdf8' }}>36</td>
                        </tr>
                      </tbody>
                    </table>
                    <p style={{ margin: '0.4rem 0 0 0', color: '#a1a1aa' }}>
                      Summing these up gives: <strong>36 + 216 + 36 = 288</strong> concrete axiom rules.
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: '#38bdf8', fontSize: '0.85rem' }}>3. The Final Sum</div>
                    <p style={{ margin: 0, color: '#a1a1aa', fontFamily: 'monospace' }}>
                      288 axiom instances + 2 starting assumptions (A → B, B → C) = 290 initial queue formulas.
                    </p>
                  </div>
                </div>

                {/* 3. Gentzen's Cut Elimination & Bounding the Search Space */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}>
                  <h3 style={{ color: '#34d399', fontSize: '1.05rem', fontWeight: 700, borderLeft: '3px solid #34d399', paddingLeft: '0.5rem', margin: 0 }}>
                    ✂️ Bounding the Search Space: Gentzen's Cut Elimination
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#d4d4d8', lineHeight: 1.5 }}>
                    Why are we allowed to only substitute the 6 <GlossaryTerm term="sub-formula">sub-formulas</GlossaryTerm> of the inputs? Why do we stop at 290 and never dynamically generate new formulas like <code>D</code>, <code>X</code>, or <code>A → (B → D)</code> to add to the substitution pool?
                  </p>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#d4d4d8', lineHeight: 1.5 }}>
                    This is justified by one of the most famous theorems in mathematical logic: <strong>Gentzen's Cut Elimination Theorem (<GlossaryTerm term="Hauptsatz">Hauptsatz</GlossaryTerm>)</strong>.
                  </p>
                  
                  <div style={{
                    padding: '0.85rem 1rem',
                    background: 'rgba(52, 211, 153, 0.04)',
                    border: '1px solid rgba(52, 211, 153, 0.15)',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    lineHeight: 1.45,
                    color: '#d4d4d8'
                  }}>
                    <strong style={{ color: '#34d399', display: 'block', marginBottom: '0.25rem' }}>📖 The <GlossaryTerm term="sub-formula property">Sub-formula Property</GlossaryTerm>:</strong>
                    In a traditional proof, a logician will introduce an intermediate lemma (like proving <code>B</code> to bridge <code>A</code> and <code>C</code>). This is the <strong><GlossaryTerm term="Cut rule">Cut Rule</GlossaryTerm></strong>. To find this lemma, an automated prover would have to guess from <em>infinitely many</em> possible formulas, making the search space infinite and causing heap overflows.
                    <br /><br />
                    Gentzen proved that <strong>any theorem that can be proved with a Cut can also be proved without one (cut-free)</strong>. In a cut-free proof, <em>every formula in the derivation tree is a <GlossaryTerm term="sub-formula">sub-formula</GlossaryTerm> of the premises or the target goal</em>.
                    <br /><br />
                    This gives us a massive guarantee: we only need the 6 <GlossaryTerm term="sub-formula">sub-formulas</GlossaryTerm>. The search space is **strictly bounded** from the start, and we do not need to expand the variable pool!
                  </div>
                </div>

                {/* 4. Priority Queue & Modus Ponens Execution */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}>
                  <h3 style={{ color: '#fbbf24', fontSize: '1.05rem', fontWeight: 700, borderLeft: '3px solid #fbbf24', paddingLeft: '0.5rem', margin: 0 }}>
                    🌀 Priority Queue & <GlossaryTerm term="Modus Ponens">Modus Ponens</GlossaryTerm> Execution
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#d4d4d8', lineHeight: 1.5 }}>
                    The search engine operates in a loop:
                  </p>
                  <ol style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.82rem', color: '#a1a1aa', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <li>
                      <strong>Pop Simpler Terms</strong>: The priority queue is sorted by term size (simplest first). Popping the smallest formulas first ensures that the prover finds the shortest, most elegant derivation.
                    </li>
                    <li>
                      <strong><GlossaryTerm term="Modus Ponens">Modus Ponens</GlossaryTerm> Unification</strong>:
                      <ul style={{ paddingLeft: '1.2rem', marginTop: '0.2rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <li>If a fact <code>P</code> is popped, the engine scans proven rules for any implication <code>P → Q</code> to derive <code>Q</code>.</li>
                        <li>If an implication <code>P → Q</code> is popped, the engine scans proven facts for <code>P</code> to derive <code>Q</code>.</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Deduplication</strong>: If a derived formula is already proven, it is discarded. If it is new, it is pushed into the queue.
                    </li>
                  </ol>
                  <div style={{
                    padding: '0.85rem 1rem',
                    background: 'rgba(251, 191, 36, 0.04)',
                    border: '1px solid rgba(251, 191, 36, 0.15)',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    lineHeight: 1.45,
                    color: '#d4d4d8',
                    marginTop: '0.25rem'
                  }}>
                    <strong style={{ color: '#fbbf24', display: 'block', marginBottom: '0.25rem' }}>❓ Why do some formulas pop twice in the logs (e.g. Iteration #266)?</strong>
                    Since multiple logical paths can lead to the same derivation, a formula like <code>((A → B) → (A → B))</code> might be pushed to the queue multiple times. When popped, if the engine sees it is already registered, it logs the pop and discards the duplicate immediately, avoiding redundant work and preventing loops.
                  </div>
                </div>

                {/* 5. The Chain Reaction */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}>
                  <h3 style={{ color: '#f43f5e', fontSize: '1.05rem', fontWeight: 700, borderLeft: '3px solid #f43f5e', paddingLeft: '0.5rem', margin: 0 }}>
                    ⛓️ The Chain Reaction (Syllogism Proof Lifecycle)
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#d4d4d8', lineHeight: 1.5 }}>
                    As the priority search runs, the queue slowly drains from 290 down to 76. For the first 262 steps, the engine passively registers axiom instances. Then, a fast domino effect occurs:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'monospace', fontSize: '0.8rem', background: 'rgba(0,0,0,0.3)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--color-border)', color: '#e4e4e7' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <span style={{ color: '#f43f5e', fontWeight: 700 }}>Step 265:</span>
                      <span>Fact <code style={{ color: '#38bdf8' }}>A</code> is popped. Matches implication <code style={{ color: '#a855f7' }}>A → B</code> (Premise). Derives fact <code style={{ color: '#34d399' }}>B</code>.</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.4rem' }}>
                      <span style={{ color: '#f43f5e', fontWeight: 700 }}>Step 266:</span>
                      <span>Fact <code style={{ color: '#38bdf8' }}>B</code> is popped. Matches implication <code style={{ color: '#a855f7' }}>B → C</code> (Premise). Derives fact <code style={{ color: '#34d399' }}>C</code>.</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.4rem' }}>
                      <span style={{ color: '#f43f5e', fontWeight: 700 }}>Step 267:</span>
                      <span>Fact <code style={{ color: '#38bdf8' }}>C</code> is popped. Matches Axiom <code style={{ color: '#a855f7' }}>C → (A → C)</code> (Axiom II.1 instance). Derives goal <code style={{ color: '#34d399' }}>A → C</code>.</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.4rem' }}>
                      <span style={{ color: '#f43f5e', fontWeight: 700 }}>Step 268:</span>
                      <span>Target Goal <code style={{ color: '#38bdf8' }}>A → C</code> is popped. Goal matches target! The prover terminates successfully.</span>
                    </div>
                  </div>
                </div>

                {/* Quick Start Guide */}
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  background: 'rgba(168, 85, 247, 0.05)',
                  border: '1px solid rgba(168, 85, 247, 0.15)',
                  marginTop: '0.25rem'
                }}>
                  <div style={{ fontWeight: 600, color: '#c084fc', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                    <span>💡</span> Quick Start Guide:
                  </div>
                  <ol style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.8rem', color: '#d4d4d8' }}>
                    <li>Select a preset template from the dropdown (e.g., <strong>Transitivity of Implication</strong>).</li>
                    <li>Toggle <strong>Slow-motion Search</strong> on to watch the search logs stream in real-time.</li>
                    <li>Click <strong>"Search & Verify Proof"</strong>. Once completed, click log lines to inspect their AST structures, or inspect the final derivation tree!</li>
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

                <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1rem', fontWeight: 600, borderLeft: '3px solid var(--color-primary)', paddingLeft: '0.5rem', marginTop: '0.5rem', margin: '0.5rem 0 0 0' }}>
                  Anatomy of a Search Iteration
                </h3>
                <p style={{ margin: 0 }}>
                  In each iteration, the engine behaves differently depending on the <strong>logical structure</strong> of the popped formula:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.25rem' }}>
                  <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.05)', border: '1px solid rgba(168, 85, 247, 0.15)' }}>
                    <div style={{ fontWeight: 600, color: '#c084fc', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                      Case 1: Popped term is an Implication (e.g., A → B)
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#d4d4d8', lineHeight: 1.4 }}>
                      The engine registers it as a proven implication rule. It scans memory for any previously registered constant <code style={{ color: '#c084fc' }}>A</code>. If found, it instantly triggers <strong>Modus Ponens</strong> and derives <code style={{ color: '#10b981' }}>B</code>. If <code style={{ color: '#c084fc' }}>A</code> is not yet proven, the engine takes no action and waits for <code style={{ color: '#c084fc' }}>A</code> to be evaluated in a later iteration.
                    </p>
                  </div>

                  <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(34, 211, 238, 0.05)', border: '1px solid rgba(34, 211, 238, 0.15)' }}>
                    <div style={{ fontWeight: 600, color: '#22d3ee', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                      Case 2: Popped term is a Constant or Fact (e.g., A)
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#d4d4d8', lineHeight: 1.4 }}>
                      The engine registers it as a proven constant. It searches the database of registered implications for any rules of the form <code style={{ color: '#22d3ee' }}>A → X</code>. If a match is found, unification succeeds, and consequence <code style={{ color: '#10b981' }}>X</code> is derived and prepended to the queue.
                    </p>
                  </div>

                  <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(251, 191, 36, 0.05)', border: '1px solid rgba(251, 191, 36, 0.15)' }}>
                    <div style={{ fontWeight: 600, color: '#fbbf24', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                      Case 3: Popped term is an Axiom Schema (e.g., ?P → (?Q → ?P))
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#d4d4d8', lineHeight: 1.4 }}>
                      Axioms contain logical variables (prefixed with <code style={{ color: '#fbbf24' }}>?</code>). The engine matches these variables against all known sub-formulas in the workspace to construct concrete instantiated rules (e.g., replacing <code style={{ color: '#fbbf24' }}>?P</code> with <code style={{ color: '#fff' }}>A</code> and <code style={{ color: '#fbbf24' }}>?Q</code> with <code style={{ color: '#fff' }}>B</code> to form <code style={{ color: '#fbbf24' }}>A → (B → A)</code>). These instantiated rules are then pushed back to the queue to assist other reasoning paths.
                    </p>
                  </div>
                </div>

                <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1rem', fontWeight: 600, borderLeft: '3px solid var(--color-primary)', paddingLeft: '0.5rem', marginTop: '1rem', margin: '1rem 0 0 0' }}>
                  Why Proving Takes Hundreds of Iterations
                </h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#d4d4d8', lineHeight: 1.5 }}>
                  Proving seemingly simple logic theorems (such as Transitivity, which takes 266 steps) requires hundreds of queue iterations. This is an inherent property of forward-chaining proof search:
                </p>
                <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', margin: 0, fontSize: '0.82rem', color: '#a1a1aa' }}>
                  <li>
                    <strong>Exhaustive Generation</strong>: Rather than guessing a path backwards from the target goal, the engine systematically generates all possible immediate consequences, starting from the simplest formulas.
                  </li>
                  <li>
                    <strong>Axiom Exploded Seed</strong>: During initialization, standard general axiom schemas are instantiated against all known sub-formulas in the workspace. This generates hundreds of rule instances (e.g., 288 for Syllogism) that must sit in the priority queue.
                  </li>
                  <li>
                    <strong>Passive Iterations (Most Steps)</strong>: The vast majority (over 95%) of iterations are passive rule registrations. The engine pops an implication rule, but because its left-hand side is not yet proven, it cannot trigger any action. It simply saves it in memory and pops the next. This returns <code>NIL</code> derived consequences.
                  </li>
                  <li>
                    <strong>Active Derivations (Key Steps)</strong>: Only when the required constant/fact is finally evaluated and popped does it match the registered implications, triggering Modus Ponens to derive new facts.
                  </li>
                </ul>

                <h4 style={{ color: '#c084fc', fontSize: '0.85rem', fontWeight: 600, margin: '0.75rem 0 0.25rem 0' }}>
                  The Buildup to 290 Initial Formulas (Seed Phase)
                </h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#d4d4d8', lineHeight: 1.45 }}>
                  When search starts, the queue size is initialized at <strong>290</strong> formulas. This starting set is constructed systematically:
                </p>
                <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#a1a1aa' }}>
                  <li>
                    <strong>2 Premises</strong>: The initial assumptions entered by the user: <code>(A → B)</code> and <code>(B → C)</code>.
                  </li>
                  <li>
                    <strong>288 Axiom Instances</strong>: The Lisp engine extracts all unique sub-formulas (sub-trees) present in both the premises and the target goal.
                    <div style={{
                      margin: '0.4rem 0',
                      padding: '0.5rem 0.75rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px dashed rgba(255,255,255,0.1)',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      lineHeight: 1.45,
                      color: '#a1a1aa'
                    }}>
                      <strong>Why exactly N = 6 sub-formulas?</strong> The engine decomposes all inputs:
                      <ul style={{ paddingLeft: '1.2rem', margin: '0.2rem 0', listStyleType: 'circle' }}>
                        <li>From Premise 1 (<code>A → B</code>): Extracts <code>A</code>, <code>B</code>, and <code>A → B</code>.</li>
                        <li>From Premise 2 (<code>B → C</code>): Extracts <code>C</code>, <code>B → C</code> (plus duplicate <code>B</code>).</li>
                        <li>From the Goal (<code>A → C</code>): Extracts <code>A → C</code> (plus duplicates <code>A</code> and <code>C</code>).</li>
                      </ul>
                      This results in the unique union set: <code>{"{ A, B, C, A → B, B → C, A → C }"}</code> (precisely 6 sub-formulas).
                    </div>
                  </li>
                </ul>

                {/* Exponentiation Explanation Block */}
                <div style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  background: 'rgba(168, 85, 247, 0.04)',
                  border: '1px solid rgba(168, 85, 247, 0.12)',
                  fontSize: '0.8rem',
                  lineHeight: 1.4,
                  color: '#d4d4d8',
                  marginTop: '0.25rem'
                }}>
                  <div style={{ fontWeight: 600, color: '#c084fc', marginBottom: '0.25rem' }}>
                    📐 Permutations with Repetition Formula: <em>N<sup>V</sup></em>
                  </div>
                  If there are <strong>N</strong> sub-formulas available in the workspace, and an axiom schema contains <strong>V</strong> independent variables, the number of unique concrete substitutions is given by the exponentiation formula <strong>N<sup>V</sup></strong> (since each variable can take any of the N sub-formulas independently):
                  <ul style={{ paddingLeft: '1.2rem', margin: '0.25rem 0 0 0', display: 'flex', flexDirection: 'column', gap: '0.25rem', color: '#a1a1aa' }}>
                    <li>
                      <strong>Axiom II.1</strong> (<code>?P → (?Q → ?P)</code>): Contains <strong>V = 2</strong> variables (<code>?P</code>, <code>?Q</code>).
                      <br />With N = 6 sub-formulas, this generates: <strong>6<sup>2</sup> = 36</strong> instances.
                    </li>
                    <li>
                      <strong>Axiom II.2</strong> (<code>(?P → (?Q → ?R)) → ((?P → ?Q) → (?P → ?R))</code>): Contains <strong>V = 3</strong> variables (<code>?P</code>, <code>?Q</code>, <code>?R</code>).
                      <br />With N = 6 sub-formulas, this generates: <strong>6<sup>3</sup> = 216</strong> instances.
                    </li>
                    <li>
                      <strong>Axiom II.3</strong> (<code>(¬?P → ¬?Q) → (?Q → ?P)</code>): Contains <strong>V = 2</strong> variables (<code>?P</code>, <code>?Q</code>).
                      <br />With N = 6 sub-formulas, this generates: <strong>6<sup>2</sup> = 36</strong> instances.
                    </li>
                  </ul>
                  <div style={{ color: '#fff', fontWeight: 600, marginTop: '0.4rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.4rem' }}>
                    Total Instances = 36 (II.1) + 216 (II.2) + 36 (II.3) = 288 instances.
                  </div>
                </div>

                <div style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.8rem',
                  fontFamily: 'monospace',
                  color: '#c084fc',
                  margin: '0.5rem 0 0 0',
                  textAlign: 'center',
                  fontWeight: 600
                }}>
                  Total Queue = 2 Premises + 36 (II.1) + 216 (II.2) + 36 (II.3) = 290 Initial Formulas!
                </div>

                {/* Cut Elimination & The Sub-Formula Property Explanation */}
                <div style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '10px',
                  background: 'rgba(16, 185, 129, 0.03)',
                  border: '1px solid rgba(16, 185, 129, 0.15)',
                  fontSize: '0.82rem',
                  lineHeight: 1.5,
                  color: '#d4d4d8',
                  marginTop: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  <div style={{ fontWeight: 700, color: '#34d399', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem', borderBottom: '1px solid rgba(52, 211, 153, 0.15)', paddingBottom: '0.4rem' }}>
                    <span>✂️</span> Gentzen's Cut Elimination & The <GlossaryTerm term="sub-formula property">Sub-Formula Property</GlossaryTerm> (Deep Dive)
                  </div>
                  
                  <div>
                    In proof theory, Gerhard Gentzen's <strong>Cut Elimination Theorem (<GlossaryTerm term="Hauptsatz">Hauptsatz</GlossaryTerm>)</strong> is the central result establishing the significance of the <em><GlossaryTerm term="sequent calculus">sequent calculus</GlossaryTerm></em>. First proved in Gentzen's landmark 1935 paper <em>"Investigations in Logical Deduction"</em>, it states that any logical <GlossaryTerm term="sequent">sequent</GlossaryTerm> provable using the <strong><GlossaryTerm term="Cut rule">Cut Rule</GlossaryTerm></strong> can be proved <strong>without</strong> the Cut rule (making the rule <em><GlossaryTerm term="admissibility">admissible</GlossaryTerm></em>).
                  </div>

                  <div style={{
                    background: 'rgba(0,0,0,0.25)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '10px',
                    padding: '1.25rem',
                    fontSize: '0.8rem',
                    lineHeight: '1.5',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    color: '#d4d4d8'
                  }}>
                    <div style={{ fontWeight: 700, color: '#38bdf8', fontSize: '0.9rem', borderBottom: '1px solid rgba(56, 189, 248, 0.15)', paddingBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span>📜</span> The Historical Context: Hilbert's Program & Gödel's Challenge
                    </div>
                    <div>
                      In the 1920s, the mathematician David Hilbert proposed <strong>Hilbert's Program</strong>: a grand project to put all of mathematics on a secure formal foundation. The goal was to prove the <GlossaryTerm term="consistency">consistency</GlossaryTerm> of strong mathematical systems (like arithmetic and set theory) using only "finitary" methods—simple, concrete, and self-evident reasoning steps.
                    </div>
                    <div>
                      However, in 1931, Kurt Gödel published his famous <strong>Incompleteness Theorems</strong>. Gödel proved that any consistent formal system capable of expressing arithmetic cannot prove its own <GlossaryTerm term="consistency">consistency</GlossaryTerm> using its own formal language. This dealt a devastating blow to Hilbert's Program.
                    </div>
                    <div>
                      <strong>Gerhard Gentzen's Breakthrough:</strong>
                      <br />
                      To salvage consistency proofs, Gerhard Gentzen published his landmark 1935 paper <em>"Investigations in Logical Deduction"</em>. Gentzen invented the <strong><GlossaryTerm term="sequent calculus">sequent calculus</GlossaryTerm></strong> (the systems <strong><GlossaryTerm term="LK">LK</GlossaryTerm></strong> and <strong><GlossaryTerm term="LJ">LJ</GlossaryTerm></strong>) as a tool to analyze mathematical proofs. 
                      <br />
                      In this paper, he proved his famous <strong><GlossaryTerm term="Hauptsatz">Hauptsatz</GlossaryTerm> (Cut Elimination Theorem)</strong>. Gentzen showed that proofs could be made "cut-free"—completely eliminating intermediate lemmas.
                    </div>
                    <div>
                      <strong>Bypassing Gödel's Limit:</strong>
                      <br />
                      Using the structural properties of his sequent calculus, in 1936 Gentzen succeeded in proving the consistency of elementary arithmetic (Peano Arithmetic). He bypassed Gödel's limit by using a transfinite induction principle on ordinals up to <strong>ε₀ (epsilon-nought)</strong>. While this transfinite induction was non-finitary (meaning Peano Arithmetic itself couldn't prove it), it was still constructive and intuitive, providing a fresh path for mathematical proof theory.
                    </div>
                    <div style={{
                      background: 'rgba(56, 189, 248, 0.05)',
                      border: '1px solid rgba(56, 189, 248, 0.15)',
                      borderRadius: '8px',
                      padding: '0.75rem 1.25rem',
                      marginTop: '0.5rem',
                      fontSize: '0.78rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4rem'
                    }}>
                      <div style={{ fontWeight: 700, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.4rem', borderBottom: '1px solid rgba(56, 189, 248, 0.15)', paddingBottom: '0.3rem' }}>
                        <span>🇩🇪</span> German Naming Etymology (LK, LJ, NK, NJ)
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <div>
                          Gerhard Gentzen organized his proof systems using a systematic German abbreviation scheme:
                        </div>
                        <ul style={{ margin: '0 0 0 1.2rem', padding: 0, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                          <li>
                            <strong>L</strong> stands for <strong>Logistischer Kalkül</strong> (Logistic/Logical Calculus) &mdash; Gentzen's name for his <em>sequent calculus</em> systems.
                          </li>
                          <li>
                            <strong>N</strong> stands for <strong>Natürliches Schließen</strong> (Natural Deduction) &mdash; Gentzen's systems designed to mimic actual mathematical proofs.
                          </li>
                          <li>
                            <strong>K</strong> stands for <strong>Klassische Logik</strong> (Classical Logic) &mdash; Systems formalizing classical logic (allowing rules like double negation elimination).
                          </li>
                          <li>
                            <strong>J</strong> stands for <strong>Intuitionistische Logik</strong> (Intuitionistic Logic) &mdash; Gentzen chose <strong>J</strong> instead of <strong>I</strong> to avoid typographical confusion in standard typeset print and Sütterlin handwriting with the Roman numeral <strong>I</strong> or the Identity rule (often written as 'I').
                          </li>
                        </ul>
                        <div style={{ fontSize: '0.75rem', color: '#a1a1aa', marginTop: '0.2rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '0.3rem' }}>
                          Thus, we have: <strong>LK</strong> (Classical Sequent Calculus), <strong>LJ</strong> (Intuitionistic Sequent Calculus), <strong>NK</strong> (Classical Natural Deduction), and <strong>NJ</strong> (Intuitionistic Natural Deduction).
                        </div>
                      </div>
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '0.5rem', fontSize: '0.75rem', color: '#a1a1aa' }}>
                      💡 <strong>Later Developments:</strong> In 1965, <strong>Dag Prawitz</strong> and Andrès Raggio independently proved the <strong><GlossaryTerm term="Normalization Theorem">Normalization Theorem</GlossaryTerm></strong>, showing that natural deduction proofs also possess an equivalent cut-free property.
                    </div>
                  </div>

                  <div style={{
                    padding: '0.75rem 1rem',
                    background: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    lineHeight: '1.45',
                    color: '#d4d4d8'
                  }}>
                    <strong style={{ color: '#34d399', display: 'block', marginBottom: '0.25rem' }}>⚖️ <GlossaryTerm term="admissibility">Admissibility</GlossaryTerm> & <GlossaryTerm term="sequent">Sequents</GlossaryTerm>:</strong>
                    A <GlossaryTerm term="sequent">sequent</GlossaryTerm> written as Γ ⊢ Δ means that if all premises in Γ are true, at least one conclusion in Δ must hold. The <GlossaryTerm term="Cut rule">Cut rule</GlossaryTerm> is a rule of logical inference that bridges proofs. Showing it is <em>admissible</em> means any proof using Cut can be resolved into a proof that does not need it (inlining the lemma).
                  </div>

                  {/* Logical Sequent Box */}
                  <div style={{
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '6px',
                    padding: '0.75rem',
                    fontFamily: 'monospace',
                    fontSize: '0.78rem',
                    textAlign: 'center',
                    lineHeight: 1.4,
                    color: '#e4e4e7'
                  }}>
                    <div style={{ textTransform: 'uppercase', fontSize: '0.65rem', color: '#34d399', fontWeight: 700, marginBottom: '0.4rem', textAlign: 'left' }}>
                      The <GlossaryTerm term="sequent calculus">Sequent Calculus</GlossaryTerm> <GlossaryTerm term="Cut rule">Cut Rule</GlossaryTerm>:
                    </div>
                    <div style={{ display: 'inline-block', textAlign: 'center' }}>
                      <div style={{ borderBottom: '1px solid #a1a1aa', paddingBottom: '0.15rem', marginBottom: '0.15rem', display: 'flex', gap: '1.5rem' }}>
                        <span>Γ ⊢ A, Δ</span>
                        <span>Π, A ⊢ Λ</span>
                      </div>
                      <div>Γ, Π ⊢ Δ, Λ</div>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#a1a1aa', marginTop: '0.4rem' }}>
                      (The <GlossaryTerm term="Cut rule">Cut rule</GlossaryTerm> eliminates the intermediate formula A, representing a temporary helper lemma)
                    </div>
                  </div>

                  <div>
                    <strong>Gentzen's Proof Rewriting & Termination:</strong>
                    <p style={{ margin: '0.25rem 0', color: '#a1a1aa' }}>
                      Gentzen proved the theorem by defining a set of tree-rewriting rules that push Cuts upwards towards the leaves:
                    </p>
                    <ul style={{ paddingLeft: '1.2rem', marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', color: '#a1a1aa' }}>
                      <li>
                        <strong style={{ color: '#e4e4e7' }}>Commutation Rules:</strong> If the <GlossaryTerm term="cut formula">cut formula</GlossaryTerm> is not the main operator of the active inference rule, the <GlossaryTerm term="Cut rule">Cut</GlossaryTerm> is shifted upward past the rule without modification.
                      </li>
                      <li>
                        <strong style={{ color: '#e4e4e7' }}>Principal Reductions:</strong> If the <GlossaryTerm term="cut formula">cut formula</GlossaryTerm> is active (e.g., cutting a compound formula $P \to Q$), the <GlossaryTerm term="Cut rule">Cut</GlossaryTerm> is split into simpler, nested cuts on its <GlossaryTerm term="sub-formula">sub-parts</GlossaryTerm> (P and Q).
                      </li>
                      <li>
                        <strong style={{ color: '#e4e4e7' }}>Contraction Reductions:</strong> If a branch duplicates a formula, the algorithm duplicates the <GlossaryTerm term="Cut rule">Cut</GlossaryTerm>. Proving termination here requires <strong><GlossaryTerm term="ordinal analysis">Ordinal Analysis</GlossaryTerm></strong>, showing the rewriting steps decrease ordinal numbers well-ordered up to <strong>ε₀ (epsilon-nought)</strong>.
                      </li>
                    </ul>
                  </div>

                  <div style={{
                    padding: '0.75rem',
                    background: 'rgba(239, 68, 68, 0.04)',
                    border: '1px solid rgba(239, 68, 68, 0.15)',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    lineHeight: 1.4,
                    color: '#f87171'
                  }}>
                    <strong style={{ display: 'block', marginBottom: '0.25rem', color: '#f87171' }}>⚡ Complexity & Proof Size Explosion (<GlossaryTerm term="tetration">Tetration</GlossaryTerm>):</strong>
                    Under the <GlossaryTerm term="Curry-Howard correspondence">Curry-Howard correspondence</GlossaryTerm>, cut-elimination is equivalent to β-reduction of typed λ-terms. Removing <GlossaryTerm term="Cut rule">Cuts</GlossaryTerm> can increase the proof tree size <strong>superexponentially</strong>. A short, elegant proof with <GlossaryTerm term="Cut rule">cuts</GlossaryTerm> (lemmas) can blow up into a massive, tetration-sized (2^(2^(2^...))) proof tree when cuts are eliminated. This explains why our search takes 266 steps for a simple transitivity proof!
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem', color: '#34d399', fontWeight: 600 }}>
                    💡 Core Consequences for Logic Solvers (Analytic Proof Search):
                  </div>
                  <div style={{ margin: 0, fontSize: '0.8rem', color: '#a1a1aa' }}>
                    1. **The <GlossaryTerm term="sub-formula property">Subformula Property</GlossaryTerm>**: In a cut-free proof, every formula is a <GlossaryTerm term="sub-formula">sub-formula</GlossaryTerm> of the final inputs. We only need the $N = 6$ <GlossaryTerm term="sub-formula">sub-formulas</GlossaryTerm>, bounding our search space to exactly 290 initial formulas.
                    <br />
                    2. **Consistency Proofs**: Proving a system has cut-elimination makes proving <GlossaryTerm term="consistency">consistency</GlossaryTerm> trivial, since there are no cut-free proofs of contradictions (empty sequents).
                    <br />
                    3. **Resolution & Prolog**: Proof search algorithms (like resolution-based deduction used in logic programming languages like Prolog) directly rely on the <GlossaryTerm term="admissibility">admissibility</GlossaryTerm> of the <GlossaryTerm term="Cut rule">Cut rule</GlossaryTerm> in Gentzen systems.
                  </div>

                  <div style={{
                    background: 'rgba(168, 85, 247, 0.05)',
                    border: '1px solid rgba(168, 85, 247, 0.15)',
                    borderRadius: '8px',
                    padding: '0.75rem 1.25rem',
                    marginTop: '0.5rem',
                    fontSize: '0.78rem',
                    color: '#d4d4d8',
                    lineHeight: '1.45'
                  }}>
                    <strong style={{ color: '#c084fc', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                      <span>🧩</span> Search vs. Transformation: Why "Toy Hauptsatz"?
                    </strong>
                    <div>
                      Technically, a <em>Cut Elimination</em> algorithm is a <strong>proof-transformation</strong> process &mdash; it takes a proof that already contains Cut rules (lemmas) and rewrites it into a cut-free proof.
                      <br /><br />
                      Our playground's engine is a <strong>proof-search</strong> engine (a theorem prover). It does not transform existing proofs. However, its entire correctness and ability to search in a finite space is <strong>completely guaranteed by the Hauptsatz</strong>. Because Gentzen proved that any theorem has a cut-free proof (and therefore satisfies the <em>Sub-formula Property</em>), we are mathematically allowed to limit our search to just the $N=6$ sub-formulas, bounding our database to 290 starting formulas.
                      <br /><br />
                      Without the Hauptsatz, our search space would be infinite because we would be forced to guess arbitrary intermediate lemmas (which is what allowing Cuts amounts to). Thus, the app is a <strong>simulator/visualizer for searching cut-free proofs</strong>, enabled entirely by the Hauptsatz!
                    </div>
                  </div>
                </div>

                {/* Cut Elimination Animated Tutorial Panel */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  marginTop: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  <div style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border)',
                    paddingBottom: '0.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>🎬 Gentzen's Cut Elimination: Step-by-Step Tutorial</span>
                      <button
                        onClick={() => speakStepText(
                          getCutStageSpokenText(),
                          "cut-tutorial"
                        )}
                        style={{
                          background: playingAudioId === 'cut-tutorial' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                          border: playingAudioId === 'cut-tutorial' ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                          borderRadius: '4px',
                          color: playingAudioId === 'cut-tutorial' ? '#c084fc' : 'var(--color-text-secondary)',
                          padding: '0.15rem 0.35rem',
                          fontSize: '0.65rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.2rem',
                          fontWeight: 600
                        }}
                      >
                        <span>🔊 Play Aloud</span>
                      </button>
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <button
                        onClick={() => setIsCutPlaying(!isCutPlaying)}
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          color: '#fff',
                          padding: '0.15rem 0.4rem',
                          fontSize: '0.7rem',
                          cursor: 'pointer',
                          fontWeight: 600
                        }}
                      >
                        {isCutPlaying ? '⏸ Pause' : '▶ Play'}
                      </button>
                      <button
                        onClick={() => {
                          setIsCutPlaying(false);
                          setCutAnimStage(prev => (prev + 1) % 4);
                        }}
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          color: '#fff',
                          padding: '0.15rem 0.4rem',
                          fontSize: '0.7rem',
                          cursor: 'pointer',
                          fontWeight: 600
                        }}
                      >
                        Next Step ⏭
                      </button>
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 280px',
                    gap: '1.25rem',
                    alignItems: 'center'
                  }}>
                    {/* Left side: Explanatory text card */}
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.2)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                      padding: '1rem',
                      minHeight: '140px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      justifyContent: 'center'
                    }}>
                      <div style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#34d399',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        Stage {cutAnimStage + 1} of 4: {
                          cutAnimStage === 0 ? 'Proof with Lemma (The Cut)' :
                          cutAnimStage === 1 ? 'Identifying the Bridge' :
                          cutAnimStage === 2 ? 'Elimination in Progress' :
                          'The Cut-Free Result'
                        }
                      </div>
                      <p style={{ margin: 0, fontSize: '0.82rem', color: '#f4f4f5', lineHeight: 1.5 }}>
                        {cutAnimStage === 0 && 'To prove that A implies C, we traditionally introduce an intermediate lemma: B. This splits the proof into proving B (using A) and then proving C (using B). Fusing these branches is the "Cut" step.'}
                        {cutAnimStage === 1 && 'The Cut rule acts as a gluing logic. The intermediate term B is the bridge. However, the term B was never in our starting goal (A → C). It is a new formula introduced to make the proof convenient.'}
                        {cutAnimStage === 2 && 'Gentzen’s algorithm systematically removes the Cut node. It shifts the proof steps upward, bypassing the intermediate bridge B and directly Chaining the derivations.'}
                        {cutAnimStage === 3 && 'Success! The proof is now "Cut-Free". The intermediate lemma B is completely gone. The proof tree contains only sub-formulas of our inputs. The search space is now mathematically bounded.'}
                      </p>
                    </div>

                    {/* Right side: Animation Screen */}
                    <div style={{
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                      height: '140px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      {/* Stage 0: Initial Proof with Cut */}
                      {cutAnimStage === 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', animation: 'fadeIn 0.4s ease' }}>
                          <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ padding: '0.2rem 0.4rem', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', fontSize: '0.65rem', fontFamily: 'monospace' }}>A → B</div>
                            <div style={{ padding: '0.2rem 0.4rem', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', fontSize: '0.65rem', fontFamily: 'monospace' }}>B → C</div>
                          </div>
                          <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>↓</div>
                          <div style={{ padding: '0.25rem 0.5rem', border: '1px solid #ef4444', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, color: '#f87171' }}>[ CUT on B ]</div>
                          <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>↓</div>
                          <div style={{ padding: '0.2rem 0.4rem', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', fontSize: '0.7rem', fontFamily: 'monospace', color: '#fff' }}>A → C</div>
                        </div>
                      )}

                      {/* Stage 1: Highlight Lemma */}
                      {cutAnimStage === 1 && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', animation: 'fadeIn 0.4s ease' }}>
                          <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ padding: '0.2rem 0.4rem', border: '1px dashed #fbbf24', background: 'rgba(251, 191, 36, 0.05)', borderRadius: '4px', fontSize: '0.65rem', fontFamily: 'monospace', color: '#fbbf24' }}>A → [B]</div>
                            <div style={{ padding: '0.2rem 0.4rem', border: '1px dashed #fbbf24', background: 'rgba(251, 191, 36, 0.05)', borderRadius: '4px', fontSize: '0.65rem', fontFamily: 'monospace', color: '#fbbf24' }}>[B] → C</div>
                          </div>
                          <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>↓</div>
                          <div style={{ padding: '0.25rem 0.5rem', border: '2px solid #ef4444', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, color: '#f87171', animation: 'pulse 1s infinite alternate' }}>[ CUT on B ]</div>
                          <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>↓</div>
                          <div style={{ padding: '0.2rem 0.4rem', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', fontSize: '0.7rem', fontFamily: 'monospace', color: '#fff' }}>A → C</div>
                        </div>
                      )}

                      {/* Stage 2: Elimination / Shifting */}
                      {cutAnimStage === 2 && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', animation: 'fadeIn 0.4s ease' }}>
                          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', opacity: 0.5, transform: 'scale(0.9)', transition: 'all 0.5s' }}>
                            <span style={{ fontSize: '0.65rem', color: '#a1a1aa' }}>A → B</span>
                            <span style={{ fontSize: '0.65rem', color: '#a1a1aa' }}>B → C</span>
                          </div>
                          <div style={{ fontSize: '0.9rem', color: '#fbbf24', animation: 'spin 4s linear infinite' }}>🌀</div>
                          <div style={{ padding: '0.2rem 0.4rem', border: '1px dashed #34d399', background: 'rgba(52, 211, 153, 0.1)', borderRadius: '4px', fontSize: '0.7rem', color: '#34d399', fontWeight: 600 }}>Eliminating Lemma B...</div>
                          <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>↓</div>
                          <div style={{ padding: '0.2rem 0.4rem', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', fontSize: '0.7rem', fontFamily: 'monospace', color: '#fff' }}>A → C</div>
                        </div>
                      )}

                      {/* Stage 3: Cut-Free Result */}
                      {cutAnimStage === 3 && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', animation: 'fadeIn 0.4s ease' }}>
                          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ padding: '0.2rem 0.4rem', border: '1px solid #10b981', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '4px', fontSize: '0.65rem', fontFamily: 'monospace', color: '#34d399' }}>A → B</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>➔</div>
                            <div style={{ padding: '0.2rem 0.4rem', border: '1px solid #10b981', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '4px', fontSize: '0.65rem', fontFamily: 'monospace', color: '#34d399' }}>B → C</div>
                          </div>
                          <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>↓ (Direct Chain)</div>
                          <div style={{
                            padding: '0.3rem 0.6rem',
                            border: '1px solid #10b981',
                            background: 'rgba(16, 185, 129, 0.2)',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontFamily: 'monospace',
                            color: '#fff',
                            fontWeight: 700,
                            boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)',
                            animation: 'pulse 1s infinite alternate'
                          }}>
                            A → C
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Axiom Instantiation Animation Panel */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  marginTop: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  <div style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border)',
                    paddingBottom: '0.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>⚡ Axiom Instantiation Live Simulator</span>
                      <button
                        onClick={() => speakStepText(
                          "Axiom Instantiation is the process of replacing schema variables like ?P, ?Q, and ?R with concrete sub-formulas from the workspace. In the Syllogism workspace, we have 6 sub-formulas. This yields 36 concrete instances for Axiom II.1, 216 for Axiom II.2, and 36 for Axiom II.3, seeding the priority queue with 288 axiom instances.",
                          "axiom-simulator"
                        )}
                        style={{
                          background: playingAudioId === 'axiom-simulator' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                          border: playingAudioId === 'axiom-simulator' ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                          borderRadius: '4px',
                          color: playingAudioId === 'axiom-simulator' ? '#c084fc' : 'var(--color-text-secondary)',
                          padding: '0.15rem 0.35rem',
                          fontSize: '0.65rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.2rem',
                          fontWeight: 600
                        }}
                      >
                        <span>🔊 Play Aloud</span>
                      </button>
                    </div>
                    <span style={{
                      fontSize: '0.75rem',
                      fontFamily: 'monospace',
                      background: 'rgba(168, 85, 247, 0.15)',
                      color: '#c084fc',
                      padding: '0.15rem 0.4rem',
                      borderRadius: '4px'
                    }}>
                      Generating Concrete Proof Seeds
                    </span>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '160px 1fr 200px',
                    gap: '1.25rem',
                    alignItems: 'stretch'
                  }}>
                    {/* Column 1: Sub-Formulas List */}
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.25)',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      padding: '0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4rem'
                    }}>
                      <div style={{
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        color: 'var(--color-text-secondary)',
                        textTransform: 'uppercase',
                        marginBottom: '0.25rem',
                        letterSpacing: '0.5px'
                      }}>
                        Workspace Sub-Formulas (6)
                      </div>
                      {subFormulas.map((f, idx) => {
                        const isP = animStage === 2 && slotP === f;
                        const isQ = animStage === 2 && slotQ === f;
                        const isR = animStage === 2 && slotR === f;
                        
                        let borderStyle = '1px solid rgba(255, 255, 255, 0.05)';
                        let bgStyle = 'rgba(255, 255, 255, 0.02)';
                        let textColor = 'var(--color-text-secondary)';
                        
                        if (isP) {
                          borderStyle = '1px solid #38bdf8';
                          bgStyle = 'rgba(56, 189, 248, 0.15)';
                          textColor = '#38bdf8';
                        } else if (isQ) {
                          borderStyle = '1px solid #fbbf24';
                          bgStyle = 'rgba(251, 191, 36, 0.15)';
                          textColor = '#fbbf24';
                        } else if (isR) {
                          borderStyle = '1px solid #ec4899';
                          bgStyle = 'rgba(236, 72, 153, 0.15)';
                          textColor = '#ec4899';
                        }

                        return (
                          <div
                            key={idx}
                            style={{
                              padding: '0.35rem 0.5rem',
                              borderRadius: '6px',
                              border: borderStyle,
                              background: bgStyle,
                              color: textColor,
                              fontFamily: 'monospace',
                              fontSize: '0.7rem',
                              fontWeight: (isP || isQ || isR) ? 700 : 500,
                              transition: 'all 0.3s ease',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <span>{f}</span>
                            {(isP || isQ || isR) && (
                              <span style={{
                                fontSize: '0.6rem',
                                padding: '0.05rem 0.2rem',
                                borderRadius: '3px',
                                background: isP ? 'rgba(56, 189, 248, 0.2)' : isQ ? 'rgba(251, 191, 36, 0.2)' : 'rgba(236, 72, 153, 0.2)',
                                fontWeight: 800
                              }}>
                                {isP ? '?P' : isQ ? '?Q' : '?R'}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Column 2: Slot Machine Axiom Morpher */}
                    <div style={{
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      padding: '0.75rem 1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '0.75rem',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '0.5rem',
                        left: '0.75rem',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        color: 'var(--color-text-secondary)',
                        textTransform: 'uppercase'
                      }}>
                        Axiom Schema: {
                          activeSchemaName === 'ii1' ? 'Axiom II.1 (?P → (?Q → ?P))' :
                          activeSchemaName === 'ii2' ? 'Axiom II.2 ((?P → (?Q → ?R)) → ...)' :
                          'Axiom II.3 ((¬?P → ¬?Q) → ...)'
                        }
                      </div>

                      {/* Formula Rendering Box */}
                      <div style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        background: 'rgba(0, 0, 0, 0.4)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        width: '100%',
                        textAlign: 'center',
                        fontSize: '0.8rem',
                        minHeight: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: 1.6,
                        overflowX: 'auto'
                      }}>
                        {activeSchemaName === 'ii1' && (
                          <div style={{ fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                            <span style={getVarStyle('P')}>{slotP}</span>
                            <span style={{ color: 'var(--color-text-secondary)', margin: '0 0.25rem' }}>→</span>
                            <span style={{ color: '#fff' }}>(</span>
                            <span style={getVarStyle('Q')}>{slotQ}</span>
                            <span style={{ color: 'var(--color-text-secondary)', margin: '0 0.25rem' }}>→</span>
                            <span style={getVarStyle('P')}>{slotP}</span>
                            <span style={{ color: '#fff' }}>)</span>
                          </div>
                        )}
                        {activeSchemaName === 'ii2' && (
                          <div style={{ fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                            <span style={{ color: '#fff' }}>(</span>
                            <span style={getVarStyle('P')}>{slotP}</span>
                            <span style={{ color: 'var(--color-text-secondary)', margin: '0 0.25rem' }}>→</span>
                            <span style={{ color: '#fff' }}>(</span>
                            <span style={getVarStyle('Q')}>{slotQ}</span>
                            <span style={{ color: 'var(--color-text-secondary)', margin: '0 0.25rem' }}>→</span>
                            <span style={getVarStyle('R')}>{slotR}</span>
                            <span style={{ color: '#fff' }}>))</span>
                            <span style={{ color: 'var(--color-text-secondary)', margin: '0 0.25rem' }}>→</span>
                            <span style={{ color: '#fff' }}>((</span>
                            <span style={getVarStyle('P')}>{slotP}</span>
                            <span style={{ color: 'var(--color-text-secondary)', margin: '0 0.25rem' }}>→</span>
                            <span style={getVarStyle('Q')}>{slotQ}</span>
                            <span style={{ color: '#fff' }}>)</span>
                            <span style={{ color: 'var(--color-text-secondary)', margin: '0 0.25rem' }}>→</span>
                            <span style={{ color: '#fff' }}>(</span>
                            <span style={getVarStyle('P')}>{slotP}</span>
                            <span style={{ color: 'var(--color-text-secondary)', margin: '0 0.25rem' }}>→</span>
                            <span style={getVarStyle('R')}>{slotR}</span>
                            <span style={{ color: '#fff' }}>))</span>
                          </div>
                        )}
                        {activeSchemaName === 'ii3' && (
                          <div style={{ fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                            <span style={{ color: '#fff' }}>(¬</span>
                            <span style={getVarStyle('P')}>{slotP}</span>
                            <span style={{ color: 'var(--color-text-secondary)', margin: '0 0.25rem' }}>→</span>
                            <span style={{ color: '#fff' }}>¬</span>
                            <span style={getVarStyle('Q')}>{slotQ}</span>
                            <span style={{ color: '#fff' }}>)</span>
                            <span style={{ color: 'var(--color-text-secondary)', margin: '0 0.25rem' }}>→</span>
                            <span style={{ color: '#fff' }}>(</span>
                            <span style={getVarStyle('Q')}>{slotQ}</span>
                            <span style={{ color: 'var(--color-text-secondary)', margin: '0 0.25rem' }}>→</span>
                            <span style={getVarStyle('P')}>{slotP}</span>
                            <span style={{ color: '#fff' }}>)</span>
                          </div>
                        )}
                      </div>

                      {/* Status / State Text */}
                      <div style={{
                        fontSize: '0.72rem',
                        color: 'var(--color-text-secondary)',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        height: '20px'
                      }}>
                        <span style={{
                          display: 'inline-block',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: animStage === 2 ? '#10b981' : animStage === 1 ? '#fbbf24' : '#38bdf8',
                          animation: 'pulse 1s infinite alternate'
                        }} />
                        <span>
                          {animStage === 0 && 'Stage 1: Awaiting variables (?P, ?Q, ?R)...'}
                          {animStage === 1 && 'Stage 2: Scanning workspace for matching sub-formulas...'}
                          {animStage === 2 && 'Stage 3: Substituted! Instantiated axiom generated.'}
                        </span>
                      </div>
                    </div>

                    {/* Column 3: Seeded Queue Stack */}
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.25)',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      padding: '0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem',
                      justifyContent: 'space-between',
                      position: 'relative'
                    }}>
                      <div style={{
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        color: 'var(--color-text-secondary)',
                        textTransform: 'uppercase',
                        alignSelf: 'flex-start',
                        letterSpacing: '0.5px'
                      }}>
                        Priority Queue Setup
                      </div>

                      {/* Stacked Cards Visualization */}
                      <div style={{
                        width: '100%',
                        height: '75px',
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        marginBottom: '0.5rem'
                      }}>
                        {/* Card 3 (Bottom) */}
                        <div style={{
                          position: 'absolute',
                          width: '85%',
                          height: '35px',
                          background: 'rgba(168, 85, 247, 0.05)',
                          border: '1px solid rgba(168, 85, 247, 0.1)',
                          borderRadius: '6px',
                          bottom: '16px',
                          transform: 'scale(0.9)',
                          zIndex: 1,
                          opacity: 0.5
                        }} />
                        {/* Card 2 (Middle) */}
                        <div style={{
                          position: 'absolute',
                          width: '92%',
                          height: '35px',
                          background: 'rgba(168, 85, 247, 0.08)',
                          border: '1px solid rgba(168, 85, 247, 0.15)',
                          borderRadius: '6px',
                          bottom: '8px',
                          transform: 'scale(0.95)',
                          zIndex: 2,
                          opacity: 0.8
                        }} />
                        {/* Card 1 (Top) */}
                        <div style={{
                          position: 'absolute',
                          width: '100%',
                          height: '35px',
                          background: animStage === 2 ? 'rgba(168, 85, 247, 0.22)' : 'rgba(255, 255, 255, 0.03)',
                          border: animStage === 2 ? '1px solid #c084fc' : '1px solid var(--color-border)',
                          borderRadius: '6px',
                          bottom: '0',
                          zIndex: 3,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '0 0.5rem',
                          boxShadow: animStage === 2 ? '0 4px 10px rgba(168, 85, 247, 0.2)' : 'none',
                          transition: 'all 0.3s ease',
                          overflow: 'hidden'
                        }}>
                          <span style={{
                            fontFamily: 'monospace',
                            fontSize: '0.65rem',
                            color: animStage === 2 ? '#e9d5ff' : 'var(--color-text-secondary)',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            width: '100%',
                            textAlign: 'center'
                          }}>
                            {animStage === 2 ? (
                              activeSchemaName === 'ii1' ? `${slotP} → (${slotQ} → ${slotP})` :
                              activeSchemaName === 'ii2' ? `(${slotP} → ...) → ...` :
                              `(¬${slotP} → ...) → ...`
                            ) : (
                              'Waiting for seed...'
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Queue Growth Indicator */}
                      <div style={{ width: '100%' }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '0.65rem',
                          color: 'var(--color-text-secondary)',
                          marginBottom: '0.2rem'
                        }}>
                          <span>Instances Generated</span>
                          <span style={{ color: '#c084fc', fontWeight: 700 }}>
                            {generatedCount === 0 ? 0 : generatedCount} / 288
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div style={{
                          width: '100%',
                          height: '4px',
                          background: 'rgba(255,255,255,0.05)',
                          borderRadius: '2px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${(generatedCount / 288) * 100}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, var(--color-primary) 0%, #10b981 100%)',
                            transition: 'width 0.4s ease'
                          }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'walkthrough' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0 }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#d4d4d8' }}>
                    Select an example to step through its exact logical iterations:
                  </p>
                  
                  {/* Walkthrough Example Tabs */}
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {[
                      { id: 'mp', name: "🎬 Modus Ponens" },
                      { id: 'axiom', name: "⚙️ Axiom Schema" },
                      { id: 'transitivity', name: "🔗 Syllogism" }
                    ].map(ex => (
                      <button
                        key={ex.id}
                        onClick={() => {
                          setSelectedExample(ex.id as any);
                          setWalkthroughStepIdx(0);
                          setIsAutoplayActive(false);
                        }}
                        style={{
                          padding: '0.3rem 0.6rem',
                          borderRadius: '6px',
                          border: '1px solid',
                          borderColor: selectedExample === ex.id ? 'var(--color-primary)' : 'var(--color-border)',
                          background: selectedExample === ex.id ? 'rgba(168, 85, 247, 0.15)' : 'rgba(0,0,0,0.2)',
                          color: selectedExample === ex.id ? '#c084fc' : 'var(--color-text-secondary)',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          transition: 'all 0.2s'
                        }}
                      >
                        {ex.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{
                  padding: '0.75rem 1rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.4
                }}>
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.2rem' }}>
                    {currentExampleData.name} Walkthrough
                  </div>
                  Goal: Prove target <strong style={{ color: '#38bdf8' }}>{currentExampleData.target}</strong> from assumptions: <strong style={{ color: '#e9d5ff' }}>[{currentExampleData.assumptions.join(', ')}]</strong>.
                </div>

                {selectedExample !== 'mp' && (
                  <div style={{
                    padding: '0.85rem 1rem',
                    background: 'rgba(168, 85, 247, 0.04)',
                    border: '1px solid rgba(168, 85, 247, 0.15)',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    lineHeight: 1.45,
                    color: '#d4d4d8'
                  }}>
                    <div style={{ fontWeight: 700, color: '#c084fc', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span>💡</span> Why does this proof take {currentExampleData.steps.length - 1} iterations?
                    </div>
                    <p style={{ margin: '0 0 0.5rem 0' }}>
                      In forward-chaining logic search, the engine does not guess the answer. Instead, it systematically generates all possible immediate consequences:
                    </p>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <li>
                        <strong>Axiom Seeding (Step 0)</strong>: The queue starts with the premises plus **hundreds of instantiated logical axiom rules** (e.g. 46 rules for Axiom II.1, 288 for Syllogism).
                      </li>
                      <li>
                        <strong>Passive Iterations (Most Steps)</strong>: The engine pops rules one-by-one sorted by complexity. In most iterations, the popped implication can't trigger yet because its left-hand side is not proven. The engine simply registers it in memory (returning <code style={{ color: '#fb923c' }}>NIL</code> derived) and goes to the next.
                      </li>
                      <li>
                        <strong>Active Derivations (Key Steps)</strong>: Only on specific iterations does the engine pop a proven fact that matches a registered rule. Modus Ponens instantly unifies them, deriving new facts (e.g., Step 14, 27, 263).
                      </li>
                    </ul>
                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                      💡 Use the timeline slider below to scrub past the passive setup iterations and inspect the key Modus Ponens unifications!
                    </p>
                  </div>
                )}

                {/* Autoplay & Timeline Control Bar */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '1px solid var(--color-border)'
                }}>
                  {/* Row 1: Play, Pause, Speed, Step Input */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    {/* Play/Pause Group */}
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <button
                        onClick={() => setIsAutoplayActive(!isAutoplayActive)}
                        style={{
                          padding: '0.4rem 1rem',
                          borderRadius: '8px',
                          border: 'none',
                          background: isAutoplayActive 
                            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                            : 'linear-gradient(135deg, var(--color-primary) 0%, rgba(126, 34, 206, 0.8) 100%)',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          boxShadow: isAutoplayActive ? '0 0 10px rgba(16, 185, 129, 0.4)' : 'none',
                          transition: 'all 0.2s'
                        }}
                      >
                        {isAutoplayActive ? '⏸ Pause' : '▶ Play Autoplay'}
                      </button>

                      {/* Speed Select Button Group */}
                      <div style={{
                        display: 'flex',
                        background: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '6px',
                        padding: '0.15rem',
                        border: '1px solid var(--color-border)'
                      }}>
                        {[
                          { label: '300ms', value: 300 },
                          { label: '600ms', value: 600 },
                          { label: '1.2s', value: 1200 },
                          { label: '2.5s', value: 2500 }
                        ].map(speedOpt => (
                          <button
                            key={speedOpt.value}
                            onClick={() => setAutoplaySpeed(speedOpt.value)}
                            style={{
                              padding: '0.2rem 0.5rem',
                              borderRadius: '4px',
                              border: 'none',
                              background: autoplaySpeed === speedOpt.value ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                              color: autoplaySpeed === speedOpt.value ? '#c084fc' : 'var(--color-text-secondary)',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                          >
                            {speedOpt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step Input & Total Indicators */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Step</span>
                      <input 
                        type="number"
                        min={0}
                        max={currentExampleData.steps.length - 1}
                        value={walkthroughStepIdx}
                        onChange={(e) => {
                          const val = Math.max(0, Math.min(currentExampleData.steps.length - 1, Number(e.target.value)));
                          setWalkthroughStepIdx(val);
                        }}
                        style={{
                          width: '55px',
                          background: 'rgba(0, 0, 0, 0.4)',
                          border: '1px solid var(--color-border)',
                          color: '#fff',
                          borderRadius: '6px',
                          padding: '0.3rem 0.5rem',
                          textAlign: 'center',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          fontFamily: 'monospace'
                        }}
                      />
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>
                        / {currentExampleData.steps.length - 1}
                      </span>
                    </div>

                    {/* Prev/Next Manual Buttons */}
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button 
                        disabled={walkthroughStepIdx === 0} 
                        onClick={() => {
                          setIsAutoplayActive(false);
                          setWalkthroughStepIdx(prev => prev - 1);
                        }}
                        style={{
                          padding: '0.3rem 0.6rem',
                          borderRadius: '6px',
                          border: '1px solid var(--color-border)',
                          background: walkthroughStepIdx === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.05)',
                          color: walkthroughStepIdx === 0 ? 'var(--color-text-secondary)' : '#fff',
                          cursor: walkthroughStepIdx === 0 ? 'not-allowed' : 'pointer',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          transition: 'all 0.2s'
                        }}
                      >
                        ◀ Prev
                      </button>
                      <button 
                        disabled={walkthroughStepIdx === currentExampleData.steps.length - 1} 
                        onClick={() => {
                          setIsAutoplayActive(false);
                          setWalkthroughStepIdx(prev => prev + 1);
                        }}
                        style={{
                          padding: '0.3rem 0.6rem',
                          borderRadius: '6px',
                          border: '1px solid var(--color-border)',
                          background: walkthroughStepIdx === currentExampleData.steps.length - 1 ? 'transparent' : 'rgba(255, 255, 255, 0.05)',
                          color: walkthroughStepIdx === currentExampleData.steps.length - 1 ? 'var(--color-text-secondary)' : '#fff',
                          cursor: walkthroughStepIdx === currentExampleData.steps.length - 1 ? 'not-allowed' : 'pointer',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          transition: 'all 0.2s'
                        }}
                      >
                        Next ▶
                      </button>
                    </div>
                  </div>

                  {/* Row 2: Range Timeline Slider */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
                    <input 
                      type="range"
                      min={0}
                      max={currentExampleData.steps.length - 1}
                      value={walkthroughStepIdx}
                      onChange={(e) => {
                        setIsAutoplayActive(false);
                        setWalkthroughStepIdx(Number(e.target.value));
                      }}
                      style={{
                        flex: 1,
                        height: '6px',
                        borderRadius: '3px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        outline: 'none',
                        cursor: 'pointer',
                        accentColor: 'var(--color-primary)'
                      }}
                    />
                  </div>
                </div>

                {/* Step Detail Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.25rem', minHeight: '260px' }}>
                  {/* Left Column: Queue State visualization */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '10px',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-primary)', textTransform: 'uppercase', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.4rem' }}>
                      📥 Synthesis Queue
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                      Active formulas waiting in priority line:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, justifyContent: 'flex-start' }}>
                      {currentExampleData.steps[walkthroughStepIdx].queueBefore.length === 0 ? (
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontStyle: 'italic', margin: 'auto' }}>Queue Empty</div>
                      ) : (
                        currentExampleData.steps[walkthroughStepIdx].queueBefore.map((formula, fIdx) => {
                          const isPopped = currentExampleData.steps[walkthroughStepIdx].popped?.raw === formula.raw && fIdx === 0;
                          return (
                            <div 
                              key={fIdx}
                              style={{
                                padding: '0.4rem 0.6rem',
                                borderRadius: '6px',
                                border: isPopped ? '1px solid #c084fc' : '1px solid var(--color-border)',
                                background: isPopped ? 'rgba(168, 85, 247, 0.12)' : 'rgba(0, 0, 0, 0.3)',
                                fontSize: '0.75rem',
                                fontFamily: 'monospace',
                                color: isPopped ? '#e9d5ff' : '#a1a1aa',
                                transition: 'all 0.3s',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}
                            >
                              <span>{formula.display}</span>
                              {isPopped && <span style={{ fontSize: '0.65rem', color: '#c084fc', fontWeight: 600, background: 'rgba(168, 85, 247, 0.2)', padding: '0.1rem 0.3rem', borderRadius: '3px' }}>POPPED</span>}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Right Column: Engine details & outcomes */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.02)', gap: '0.75rem', display: 'flex', flexDirection: 'column' }}>
                      <h4 style={{ color: 'var(--color-text-primary)', fontWeight: 600, margin: 0, fontSize: '0.9rem' }}>
                        {currentExampleData.steps[walkthroughStepIdx].title}
                      </h4>
                      <p style={{ fontSize: '0.82rem', color: '#d4d4d8', margin: 0 }}>
                        {currentExampleData.steps[walkthroughStepIdx].description}
                      </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Rule Applied</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-primary)', fontWeight: 600 }}>
                          {currentExampleData.steps[walkthroughStepIdx].ruleApplied}
                        </div>
                      </div>
                      
                      <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Consequence Derived</div>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          {currentExampleData.steps[walkthroughStepIdx].derived.length === 0 ? (
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>None</span>
                          ) : (
                            currentExampleData.steps[walkthroughStepIdx].derived.map((formula, fIdx) => (
                              <span 
                                key={fIdx}
                                style={{
                                  padding: '0.1rem 0.4rem',
                                  borderRadius: '4px',
                                  border: '1px solid #10b981',
                                  background: 'rgba(16, 185, 129, 0.1)',
                                  color: '#34d399',
                                  fontSize: '0.75rem',
                                  fontFamily: 'monospace',
                                  fontWeight: 600,
                                  animation: 'pulse 1.2s infinite alternate'
                                }}
                              >
                                {formula.display}
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
        {/* Resize Handle */}
        <div 
          onMouseDown={handleResizeStart}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '16px',
            height: '16px',
            cursor: 'se-resize',
            zIndex: 10001,
            background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0.4) 100%)',
            borderBottomRightRadius: '12px'
          }}
        />
      </div>
    </div>
  );
};
