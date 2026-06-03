import fs from 'fs';
import path from 'path';
import jscl from 'jscl';

const srcDir = '/home/yasu/co/lennma-math/src';
const files = [
  'package.lisp',
  'tidtid.lisp',
  'utils.lisp',
  'lisp1.lisp',
  'pat-match.lisp',
  'formal-system_1.lisp',
  'axioms_1.lisp',
  'gen-proof-net.lisp'
];

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
        i++;
      } else if (char === '#' && i + 1 < lispStr.length && lispStr[i+1] === '|') {
        blockCommentDepth++;
        i++;
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

    if (char === ';') {
      inLineComment = true;
      continue;
    }

    if (char === '#' && i + 1 < lispStr.length && lispStr[i+1] === '|') {
      blockCommentDepth = 1;
      i++;
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

let concatenatedLisp = '';

for (const file of files) {
  const filePath = path.join(srcDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (file === 'gen-proof-net.lisp') {
    const injection = `
(defun report-step (k-num queue-len current-form-str)
  (let ((js-fn (jscl::oget jscl::*root* "onLennmaSearchStep")))
    (unless (or (jscl::js-undefined-p js-fn)
                (jscl::js-null-p js-fn))
      (funcall js-fn k-num queue-len current-form-str))))
`;
    content = content.replace('(in-package :lennma-math)', '(in-package :lennma-math)\n' + injection);
    
    const targetString = '(|A_k|_maybe (car Synthetos-Queue))';
    const replacement = `(|A_k|_maybe (car Synthetos-Queue))
         (_dummy (when |A_k|_maybe
                   (report-step k-number-current (length Synthetos-Queue) (formal-node-formal |A_k|_maybe))))`;
    content = content.replace(targetString, replacement);

    content = content.replace(
      '(format t "New formal: ~A~%" (formal-node-formal |A_k|))',
      ';(format t "New formal: ~A~%" (formal-node-formal |A_k|))'
    );
  }
  
  concatenatedLisp += `\n;;;; File: ${file}\n` + content + '\n';
}

const forms = splitLispForms(concatenatedLisp);

const hasOwn = Object.prototype.hasOwnProperty;

function serializeVal(val) {
  if (val === undefined) return { type: 'undefined' };
  if (val === null) return { type: 'null' };
  
  if (typeof val === 'object') {
    // 1. Lisp string
    if (hasOwn.call(val, 'stringp') && val.stringp === 1) {
      return { type: 'string', value: jscl.internals.lisp_to_js(val) };
    }
    
    // 2. Lisp Symbol
    if (hasOwn.call(val, 'name') && hasOwn.call(val, 'package')) {
      return { 
        type: 'symbol', 
        name: jscl.internals.lisp_to_js(val.name), 
        packageName: val.package ? jscl.internals.lisp_to_js(val.package.packageName) : 'COMMON-LISP-USER'
      };
    }
    
    // 3. Lisp Cons
    if (hasOwn.call(val, '$$jscl_car')) {
      return { 
        type: 'cons', 
        car: serializeVal(val.$$jscl_car), 
        cdr: serializeVal(val.$$jscl_cdr) 
      };
    }
    
    // 4. Lisp Structure
    if (hasOwn.call(val, 'dt_Name') && hasOwn.call(val, 'structDescriptors')) {
      const serializedFields = {};
      for (const k in val) {
        if (k !== 'dt_Name' && k !== 'structDescriptors') {
          serializedFields[k] = serializeVal(val[k]);
        }
      }
      return {
        type: 'structure',
        dt_Name: serializeVal(val.dt_Name),
        structDescriptors: Array.isArray(val.structDescriptors) 
          ? val.structDescriptors.map(serializeVal)
          : serializeVal(val.structDescriptors),
        fields: serializedFields
      };
    }
    
    // 5. Standard Object
    return { type: 'object', value: val.toString() };
  }
  
  // Primitives
  return { type: 'primitive', value: val };
}

const compiledList = [];

const originalGlobalEval = jscl.internals.globalEval;
jscl.internals.globalEval = function(code, data) {
  const serializedData = data ? data.map(serializeVal) : null;
  compiledList.push({ code, data: serializedData });
  return originalGlobalEval(code, data);
};

console.log('Compiling 214 forms and serializing data...');
for (let idx = 0; idx < forms.length; idx++) {
  jscl.evaluateString(forms[idx]);
}

console.log(`Successfully compiled and serialized ${compiledList.length} chunks.`);

const outPath = '/home/yasu/co/maki/src/lennma-logic-compiled.ts';
const tsContent = `// This file is auto-generated by build-lisp-precompiled.js. Do not edit directly.
export const compiledForms = ${JSON.stringify(compiledList, null, 2)};
`;

fs.writeFileSync(outPath, tsContent, 'utf8');
console.log(`Saved precompiled output to ${outPath}`);
