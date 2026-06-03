// @ts-ignore
import jscl from 'jscl';
import { compiledForms } from './lennma-logic-compiled';

// Declare global interfaces for JSCL and custom callbacks
declare global {
  var jscl: any;
  var onLennmaSearchStep: ((kNum: number, queueLen: number, currentFormLisp: any) => void) | undefined;
}

// Ensure JSCL is bound to globalThis (needed for script-style loading in some bundlers)
globalThis.jscl = jscl;

/**
 * Splits a concatenated Lisp codebase string into separate top-level forms.
 * Respects parentheses nesting, comments, strings, and escaped quotes.
 */
export function splitLispForms(lispStr: string): string[] {
  const forms: string[] = [];
  let currentForm = '';
  let parenCount = 0;
  let inString = false;
  let inLineComment = false;
  let blockCommentDepth = 0;
  let escape = false;

  for (let i = 0; i < lispStr.length; i++) {
    const char = lispStr[i];

    if (inLineComment) {
      if (char === '\n' || char === '\r') {
        inLineComment = false;
      }
      continue;
    }

    if (blockCommentDepth > 0) {
      if (char === '|' && i + 1 < lispStr.length && lispStr[i+1] === '#') {
        blockCommentDepth--;
        i++; // skip '#'
      } else if (char === '#' && i + 1 < lispStr.length && lispStr[i+1] === '|') {
        blockCommentDepth++;
        i++; // skip '|'
      }
      continue;
    }

    if (inString) {
      currentForm += char;
      if (escape) {
        escape = false;
      } else if (char === '\\') {
        escape = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }

    // Check for comment starting characters
    if (char === ';') {
      inLineComment = true;
      continue;
    }

    if (char === '#' && i + 1 < lispStr.length && lispStr[i+1] === '|') {
      blockCommentDepth = 1;
      i++; // skip '|'
      continue;
    }

    if (char === '"') {
      inString = true;
      currentForm += char;
      continue;
    }

    currentForm += char;

    if (char === '(') {
      parenCount++;
    } else if (char === ')') {
      parenCount--;
      if (parenCount === 0) {
        const trimmed = currentForm.trim();
        if (trimmed) {
          forms.push(trimmed);
        }
        currentForm = '';
      }
    } else if (parenCount === 0 && /\S/.test(char)) {
      let j = i + 1;
      while (j < lispStr.length && !/\s/.test(lispStr[j])) {
        currentForm += lispStr[j];
        j++;
      }
      i = j - 1;
      const trimmed = currentForm.trim();
      if (trimmed) {
        forms.push(trimmed);
      }
      currentForm = '';
    }
  }

  return forms;
}

function deserializeVal(item: any): any {
  if (!item || item.type === 'null') return null;
  if (item.type === 'undefined') return undefined;
  
  if (item.type === 'primitive') {
    return item.value;
  }
  
  if (item.type === 'symbol') {
    const sym = jscl.internals.intern(item.name, item.packageName || 'COMMON-LISP-USER');
    if (item.packageName === 'KEYWORD' || 
        (item.packageName === 'COMMON-LISP' && (item.name === 'T' || item.name === 'NIL'))) {
      sym.value = sym;
    }
    return sym;
  }
  
  if (item.type === 'string') {
    return jscl.internals.make_lisp_string(item.value);
  }
  
  if (item.type === 'cons') {
    return new jscl.internals.Cons(
      deserializeVal(item.car),
      deserializeVal(item.cdr)
    );
  }
  
  if (item.type === 'structure') {
    const struct = Object.create(null);
    struct.dt_Name = deserializeVal(item.dt_Name);
    struct.structDescriptors = Array.isArray(item.structDescriptors)
      ? item.structDescriptors.map(deserializeVal)
      : deserializeVal(item.structDescriptors);
    
    for (const k in item.fields) {
      const val = deserializeVal(item.fields[k]);
      if (val !== undefined) {
        struct[k] = val;
      }
    }
    return struct;
  }
  
  throw new Error(`Unknown serialized type: ${item.type}`);
}

let isLennmaInitialized = false;

/**
 * Initialize the Lennma engine in JSCL.
 * Loads the precompiled Lennma Lisp forms.
 */
export function initLennma() {
  if (isLennmaInitialized) return;
  
  try {
    console.log("Initializing Lennma Lisp Engine...");
    const t0 = performance.now();
    
    for (let idx = 0; idx < compiledForms.length; idx++) {
      const formObj = compiledForms[idx];
      const deserializedData = formObj.data ? formObj.data.map(deserializeVal) : null;
      jscl.internals.globalEval(formObj.code, deserializedData);
    }
    
    isLennmaInitialized = true;
    const t1 = performance.now();
    console.log(`Lennma Lisp Engine initialized successfully in ${(t1 - t0).toFixed(2)} ms!`);
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
  
  // If it's a Lisp string, convert it to JS string using jscl's internals
  if (typeof obj === 'object' && obj.stringp === 1) {
    const jsclObj = globalThis.jscl || jscl;
    if (jsclObj && jsclObj.internals && typeof jsclObj.internals.lisp_to_js === 'function') {
      return jsclObj.internals.lisp_to_js(obj);
    }
    return obj;
  }

  // Check if it's the NIL symbol
  if (obj && obj.name === "NIL") {
    return [];
  }
  
  // Check if it's the T symbol
  if (obj && obj.name === "T") {
    return true;
  }
  
  // Check if it's a Cons cell (Lisp List) using hasOwnProperty to avoid triggering Object.prototype getters
  if (obj && typeof obj === 'object' && Object.prototype.hasOwnProperty.call(obj, '$$jscl_car')) {
    const arr: any[] = [];
    let current = obj;
    while (current && current.name !== "NIL" && Object.prototype.hasOwnProperty.call(current, '$$jscl_car')) {
      arr.push(lispToJs(current.$$jscl_car));
      current = current.$$jscl_cdr;
    }
    return arr;
  }
  
  // Check if it's a Lisp Symbol (recursively convert its name which is a Lisp string)
  if (obj && typeof obj === 'object' && Object.prototype.hasOwnProperty.call(obj, 'name')) {
    return lispToJs(obj.name);
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
 * Runs directly on the current thread (to be called inside the worker).
 */
export async function runSearchProofDirect(
  assumptions: string[],
  target: string,
  onStep?: (step: SearchStep) => void
): Promise<ProofResult> {
  initLennma();
  
  const steps: SearchStep[] = [];
  
  // Register the global step callback to stream results from Lisp
  globalThis.onLennmaSearchStep = (kNum: number, queueLen: number, currentFormLisp: any) => {
    let currentForm: any = null;
    try {
      currentForm = lispToJs(currentFormLisp);
    } catch (e) {
      console.warn("Failed to convert Lisp form to JS:", e);
      currentForm = currentFormLisp;
    }
    
    const step: SearchStep = { kNum, queueLen, currentForm };
    steps.push(step);
    if (onStep) {
      onStep(step);
    }
  };
  
  try {
    // Build the Lisp code to evaluate
    const assumptionsLisp = `(list ${assumptions.map(a => `(make-formal-node :logic-type 'l^hypoaxioma :vars '() :formal '${a})`).join(' ')})`;
    const targetLisp = `(make-formal-node :logic-type 'l^hypoaxioma :vars '() :formal '${target})`;
    
    const runCode = `
(progn
  (in-package :lennma-math)
  (multiple-value-list (search-proof *axiom-list-II* ${assumptionsLisp} ${targetLisp} :num-iter-max 1000)))
`;
    
    console.log("Running Lisp Code:", runCode);
    const rawResult = jscl.evaluateString(runCode);
    
    // rawResult is a Lisp list containing [goal_node, proof_list]
    const jsResult = lispToJs(rawResult);
    console.log("Raw Lisp Search Result:", jsResult);
    
    if (jsResult && jsResult.length > 0 && jsResult[0] !== "NIL") {
      const rawProofSteps = jsResult[1] || [];
      const serializedProofSteps = rawProofSteps.map((node: any) => {
        if (!node) return null;
        return {
          'LOGIC-TYPE0': lispToJs(node['LOGIC-TYPE0']),
          'K-NUMBER1': typeof node['K-NUMBER1'] === 'number' ? node['K-NUMBER1'] : -1,
          'VARS2': lispToJs(node['VARS2']),
          'FORMAL3': lispToJs(node['FORMAL3'])
        };
      }).filter(Boolean);
      return {
        success: true,
        steps,
        proofSteps: serializedProofSteps
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
    delete globalThis.onLennmaSearchStep;
  }
}

/**
 * Basic parser to convert a printed Lisp string back to JS nested arrays.
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
    
    if (/^-?\d+(\.\d+)?$/.test(token)) {
      return Number(token);
    }
    
    return token.toUpperCase();
  }
  
  return parseValue();
}
