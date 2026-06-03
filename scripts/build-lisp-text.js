import fs from 'fs';
import path from 'path';

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

let concatenatedLisp = '';

for (const file of files) {
  const filePath = path.join(srcDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Inject the reporting function and hooks in gen-proof-net.lisp
  if (file === 'gen-proof-net.lisp') {
    // Add report-step definition inside lennma-math package using jscl::oget and jscl::*root*
    const injection = `
(defun report-step (k-num queue-len current-form-str)
  (let ((js-fn (jscl::oget jscl::*root* "onLennmaSearchStep")))
    (unless (or (jscl::js-undefined-p js-fn)
                (jscl::js-null-p js-fn))
      (funcall js-fn k-num queue-len current-form-str))))
`;
    content = content.replace('(in-package :lennma-math)', '(in-package :lennma-math)\n' + injection);
    
    // Inject the report-step call inside search-proof-aux
    const targetString = '(|A_k|_maybe (car Synthetos-Queue))';
    const replacement = `(|A_k|_maybe (car Synthetos-Queue))
         (_dummy (when |A_k|_maybe
                   (report-step k-number-current (length Synthetos-Queue) (formal-node-formal |A_k|_maybe))))`;
    content = content.replace(targetString, replacement);

    // Comment out the deep recursive format print statement that causes stack overflows in JSCL's standard printer
    content = content.replace(
      '(format t "New formal: ~A~%" (formal-node-formal |A_k|))',
      ';(format t "New formal: ~A~%" (formal-node-formal |A_k|))'
    );
  }
  
  concatenatedLisp += `\n;;;; File: ${file}\n` + content + '\n';
}

const tsContent = `// This file is auto-generated. Do not edit directly.
export const lennmaLogicLisp = ${JSON.stringify(concatenatedLisp)};
`;

const outputPath = '/home/yasu/co/maki/src/lennma-logic-text.ts';
fs.writeFileSync(outputPath, tsContent, 'utf8');
console.log('Successfully generated lennma-logic-text.ts!');
