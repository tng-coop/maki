// @ts-ignore
import jscl from 'jscl';
import { lennmaLogicLisp } from './lennma-logic-text';

// Declare window interfaces for JSCL and custom callbacks
declare global {
  interface Window {
    jscl: any;
    onLennmaSearchStep?: (kNum: number, queueLen: number, currentFormStr: string) => void;
  }
}

// Ensure JSCL is bound to window (needed for script-style loading in some bundlers)
window.jscl = jscl;

let isLennmaInitialized = false;

/**
 * Initialize the Lennma engine in JSCL.
 * Compiles and loads the lennma-math Lisp files.
 */
export function initLennma() {
  if (isLennmaInitialized) return;
  
  try {
    console.log("Initializing Lennma Lisp Engine...");
    
    // Evaluate the concatenated Lisp codebase
    jscl.evaluateString(lennmaLogicLisp);
    
    isLennmaInitialized = true;
    console.log("Lennma Lisp Engine initialized successfully!");
  } catch (error) {
    console.error("Failed to initialize Lennma Lisp Engine:", error);
    throw error;
  }
}

/**
 * Recursively converts a Lisp cons-cell tree (and symbols) into nested JavaScript arrays/strings.
 */
export function lispToJs(obj: any): any {
  if (obj === null || obj === undefined) {
    return null;
  }
  
  // Check if it's the NIL symbol
  if (obj && obj.name === "NIL") {
    return [];
  }
  
  // Check if it's the T symbol
  if (obj && obj.name === "T") {
    return true;
  }
  
  // Check if it's a Cons cell (Lisp List)
  if (obj && typeof obj === 'object' && '$$jscl_car' in obj) {
    const arr: any[] = [];
    let current = obj;
    while (current && current.name !== "NIL" && '$$jscl_car' in current) {
      arr.push(lispToJs(current.$$jscl_car));
      current = current.$$jscl_cdr;
    }
    return arr;
  }
  
  // Check if it's a Lisp Symbol
  if (obj && typeof obj === 'object' && 'name' in obj) {
    return obj.name;
  }
  
  return obj;
}

export interface SearchStep {
  kNum: number;
  queueLen: number;
  currentForm: any; // Parsed formula AST
}

export interface ProofResult {
  success: boolean;
  steps: SearchStep[];
  proofSteps: any[]; // The final proof derivation sequence
  error?: string;
}

/**
 * Executes a proof search in the browser using the JSCL Lennma math engine.
 * @param assumptions List of Lisp format assumptions, e.g., ["(.to .l_.A .l_.B)", ".l_.A"]
 * @param target The target formula to prove, e.g., ".l_.B"
 * @param onStep Optional callback to receive steps in real time
 */
export async function runSearchProof(
  assumptions: string[],
  target: string,
  onStep?: (step: SearchStep) => void
): Promise<ProofResult> {
  initLennma();
  
  const steps: SearchStep[] = [];
  
  // Register the global step callback to stream results from Lisp
  window.onLennmaSearchStep = (kNum: number, queueLen: number, currentFormStr: string) => {
    // Parse the current formula string back to a JS structure if possible
    // Note: currentFormStr is formatted via (format nil "~S" ...) which is Lisp print syntax.
    let currentForm: any = currentFormStr;
    try {
      // Basic cleanup of Lisp printed nodes to display clean ASTs
      // We can parse the Lisp print string to JS arrays for visualization
      currentForm = parseLispStringToJs(currentFormStr);
    } catch (e) {
      console.warn("Failed to parse Lisp string form:", currentFormStr);
    }
    
    const step: SearchStep = { kNum, queueLen, currentForm };
    steps.push(step);
    if (onStep) {
      onStep(step);
    }
  };
  
  try {
    // Build the Lisp code to evaluate
    // We construct the assumptions list and run (search-proof *axiom-list-ii* (list ...) target)
    const assumptionsLisp = `(list ${assumptions.map(a => `(make-formal-node :logic-type 'l^hypoaxioma :vars '() :formal '${a})`).join(' ')})`;
    const targetLisp = `(make-formal-node :logic-type 'l^hypoaxioma :vars '() :formal '${target})`;
    
    const runCode = `
(in-package :lennma-math)
(multiple-value-list (search-proof *axiom-list-II* ${assumptionsLisp} ${targetLisp} :num-iter-max 300))
`;
    
    console.log("Running Lisp Code:", runCode);
    const rawResult = jscl.evaluateString(runCode);
    
    // rawResult is a Lisp list containing [goal_node, proof_list]
    const jsResult = lispToJs(rawResult);
    console.log("Raw Lisp Search Result:", jsResult);
    
    if (jsResult && jsResult.length > 0 && jsResult[0] !== "NIL") {
      // The search returned a success: [goal_node, proof_list]
      // proof_list is a list of formal-nodes with justifications
      return {
        success: true,
        steps,
        proofSteps: jsResult[1] || []
      };
    } else {
      return {
        success: false,
        steps,
        proofSteps: [],
        error: "Proof search failed (target unreachable within iteration limit)."
      };
    }
  } catch (error: any) {
    console.error("Error during proof search:", error);
    return {
      success: false,
      steps,
      proofSteps: [],
      error: error?.toString() || "Unknown execution error."
    };
  } finally {
    // Clean up callback
    delete window.onLennmaSearchStep;
  }
}

/**
 * Basic parser to convert a printed Lisp string (e.g. "(.TO .L_.A .L_.B)") back to JS nested arrays.
 */
export function parseLispStringToJs(lispStr: string): any {
  let pos = 0;
  
  function skipWhitespace() {
    while (pos < lispStr.length && /\s/.test(lispStr[pos])) {
      pos++;
    }
  }
  
  function parseValue(): any {
    skipWhitespace();
    if (pos >= lispStr.length) return null;
    
    if (lispStr[pos] === '(') {
      pos++; // skip '('
      const list: any[] = [];
      while (true) {
        skipWhitespace();
        if (pos >= lispStr.length) {
          break;
        }
        if (lispStr[pos] === ')') {
          pos++;
          break;
        }
        list.push(parseValue());
      }
      return list;
    }
    
    // Parse symbol/word
    let start = pos;
    while (pos < lispStr.length && !/[\s()]/.test(lispStr[pos])) {
      pos++;
    }
    const token = lispStr.substring(start, pos);
    
    // Convert numbers if numeric
    if (/^-?\d+(\.\d+)?$/.test(token)) {
      return Number(token);
    }
    
    return token;
  }
  
  return parseValue();
}
