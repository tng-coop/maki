import jscl from 'jscl';
import { lennmaLogicLisp } from '../src/lennma-logic-text.ts';

function splitLispForms(lispStr) {
  const forms = [];
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

// Convert list
function lispToJs(obj) {
  if (obj === null || obj === undefined) return null;
  
  // If it's a Lisp string, convert it to JS string using jscl's internals
  if (typeof obj === 'object' && obj.stringp === 1) {
    const jsclObj = typeof window !== 'undefined' ? window.jscl : (typeof globalThis !== 'undefined' ? globalThis.jscl : null);
    if (jsclObj && jsclObj.internals && typeof jsclObj.internals.lisp_to_js === 'function') {
      return jsclObj.internals.lisp_to_js(obj);
    }
    return obj;
  }

  if (obj && obj.name === "NIL") return [];
  if (obj && obj.name === "T") return true;
  
  if (obj && typeof obj === 'object' && Object.prototype.hasOwnProperty.call(obj, '$$jscl_car')) {
    const arr = [];
    let current = obj;
    while (current && current.name !== "NIL" && Object.prototype.hasOwnProperty.call(current, '$$jscl_car')) {
      arr.push(lispToJs(current.$$jscl_car));
      current = current.$$jscl_cdr;
    }
    return arr;
  }
  
  if (obj && typeof obj === 'object' && Object.prototype.hasOwnProperty.call(obj, 'name')) {
    return lispToJs(obj.name);
  }
  return obj;
}

global.onLennmaSearchStep = (kNum, queueLen, currentFormLisp) => {
  const currentForm = lispToJs(currentFormLisp);
  console.log(`[LISP STEP] Iteration #${kNum}, Queue: ${queueLen}, Form: ${JSON.stringify(currentForm)}`);
};

try {
  console.log("Loading logic form-by-form...");
  const forms = splitLispForms(lennmaLogicLisp);
  console.log(`Split Lisp logic into ${forms.length} forms. Compiling...`);
  for (let idx = 0; idx < forms.length; idx++) {
    jscl.evaluateString(forms[idx]);
  }
  console.log("Logic loaded successfully!");

  console.log("Evaluating test-of-search-poof_1...");
  const res = jscl.evaluateString(`
    (progn
      (in-package :lennma-math)
      (test-of-search-poof_1))
  `);
  
  const jsResult = lispToJs(res);
  console.log("Result:", JSON.stringify(jsResult, null, 2));

} catch (e) {
  console.error("CRASH ERROR:", e);
}
