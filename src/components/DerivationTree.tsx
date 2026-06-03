import React, { useMemo } from 'react';
import { lispToJs } from '../lennma-bridge';

interface ProofNode {
  logicType: string;
  kNumber: number;
  vars: any[];
  formal: any; // Nested Lisp array
}

interface DerivationNode {
  conclusion: ProofNode;
  rule: string;
  parents: DerivationNode[];
}

interface DerivationTreeProps {
  proofSteps: any[]; // Raw jsResult[1] which is an array of formal-node objects from Lisp
  targetFormula: any; // The target formula AST we wanted to prove
  onFormulaSelect?: (formula: any) => void;
}

export const DerivationTree: React.FC<DerivationTreeProps> = ({
  proofSteps,
  targetFormula,
  onFormulaSelect,
}) => {
  
  // 1. Convert Lisp formal-node objects to typed ProofNode structures
  const parsedNodes = useMemo<ProofNode[]>(() => {
    if (!proofSteps) return [];
    
    return proofSteps.map((node: any) => {
      console.log("Maki Node keys:", Object.keys(node), node);
      // Extract properties based on JSCL structure bindings
      // A formal-node is a JS object/structure with compiled properties
      return {
        logicType: lispToJs(node['LOGIC-TYPE0']) || 'L^HYPOTHESIS',
        kNumber: typeof node['K-NUMBER1'] === 'number' ? node['K-NUMBER1'] : -1,
        vars: lispToJs(node['VARS2']) || [],
        formal: lispToJs(node['FORMAL3'])
      };
    });
  }, [proofSteps]);

  // 2. Reconstruct the derivation tree from the flat list of nodes
  const derivationTree = useMemo<DerivationNode | null>(() => {
    if (parsedNodes.length === 0) return null;
    
    // Find the goal node matching the target formula shape
    const goalNode = parsedNodes.find(node => 
      JSON.stringify(node.formal) === JSON.stringify(targetFormula)
    ) || parsedNodes[0]; // fallback to first node
    
    // Axiom definitions to match shapes
    // Axiom II-1: [".to", ?A, [".to", ?B, ?A]]
    function isAxiomII1(formal: any): boolean {
      if (Array.isArray(formal) && formal[0] === '.TO') {
        const right = formal[2];
        if (Array.isArray(right) && right[0] === '.TO') {
          return JSON.stringify(formal[1]) === JSON.stringify(right[2]);
        }
      }
      return false;
    }
    
    // Axiom II-3: [".to", [".to", [".neg", ?B], [".neg", ?A]], [".to", ?A, ?B]]
    function isAxiomII3(formal: any): boolean {
      if (Array.isArray(formal) && formal[0] === '.TO') {
        const left = formal[1];
        const right = formal[2];
        if (Array.isArray(left) && left[0] === '.TO' && Array.isArray(right) && right[0] === '.TO') {
          const negB = left[1];
          const negA = left[2];
          if (Array.isArray(negB) && negB[0] === '.NEG' && Array.isArray(negA) && negA[0] === '.NEG') {
            return JSON.stringify(negB[1]) === JSON.stringify(right[2]) &&
                   JSON.stringify(negA[1]) === JSON.stringify(right[1]);
          }
        }
      }
      return false;
    }



    // Cache to prevent infinite recursion
    const built = new Map<number, DerivationNode>();

    function build(node: ProofNode): DerivationNode {
      if (built.has(node.kNumber)) return built.get(node.kNumber)!;

      // Check if it's an assumption
      if (node.logicType === 'L^HYPOAXIOMA') {
        const dNode = { conclusion: node, rule: 'Assumption', parents: [] };
        built.set(node.kNumber, dNode);
        return dNode;
      }
      
      // Check if it is an Axiom
      if (isAxiomII1(node.formal)) {
        const dNode = { conclusion: node, rule: 'Axiom II.1', parents: [] };
        built.set(node.kNumber, dNode);
        return dNode;
      }
      if (isAxiomII3(node.formal)) {
        const dNode = { conclusion: node, rule: 'Axiom II.3', parents: [] };
        built.set(node.kNumber, dNode);
        return dNode;
      }
      if (node.logicType === 'L^AXIOM') {
        const dNode = { conclusion: node, rule: 'Axiom', parents: [] };
        built.set(node.kNumber, dNode);
        return dNode;
      }
      
      // Try to find Modus Ponens parents:
      // We look for a node A_i and a node A_j = (A_i -> node) in the proof steps.
      // Both parents must have been derived *before* the current node (strict lower kNumber) to prevent cycles.
      for (const parentA of parsedNodes) {
        if (parentA.kNumber >= node.kNumber) continue;
        
        const mpPattern = ['.TO', parentA.formal, node.formal];
        const parentB = parsedNodes.find(n => 
          n.kNumber < node.kNumber &&
          JSON.stringify(n.formal) === JSON.stringify(mpPattern)
        );
        
        if (parentB) {
          const dNode: DerivationNode = {
            conclusion: node,
            rule: 'Modus Ponens',
            parents: [build(parentA), build(parentB)]
          };
          built.set(node.kNumber, dNode);
          return dNode;
        }
      }

      // Fallback if no parents found
      const fallbackRule = node.logicType === 'L^HYPOAXIOMA' ? 'Assumption' : 'Axiom / Hypothesis';
      const dNode = { conclusion: node, rule: fallbackRule, parents: [] };
      built.set(node.kNumber, dNode);
      return dNode;
    }

    return build(goalNode);
  }, [parsedNodes, targetFormula]);

  // Recursively format formula nested arrays to human-readable strings
  function formatFormula(expr: any): string {
    if (Array.isArray(expr)) {
      if (expr[0] === '.TO') return `(${formatFormula(expr[1])} → ${formatFormula(expr[2])})`;
      if (expr[0] === '.NEG') return `¬${formatFormula(expr[1])}`;
      return `(${expr.map(formatFormula).join(' ')})`;
    }
    return String(expr).replace(/^\.L_\./i, '').replace(/^\./, '');
  }

  // Recursive renderer for the Gentzen-style proof tree layout
  const renderDerivation = (node: DerivationNode): React.ReactNode => {
    return (
      <div className="proof-step-wrapper" key={`step-${node.conclusion.kNumber}`}>
        {node.parents.length > 0 && (
          <div className="proof-premises">
            {node.parents.map(parent => renderDerivation(parent))}
          </div>
        )}
        
        <div className="proof-derivation-bar-row">
          <div className="proof-derivation-line" />
          <span className="proof-derivation-rule">{node.rule}</span>
        </div>
        
        <div 
          className="proof-conclusion" 
          onClick={() => onFormulaSelect && onFormulaSelect(node.conclusion.formal)}
          title="Click to view AST"
        >
          <span className="proof-number">({node.conclusion.kNumber})</span>
          <span className="proof-formula-text">{formatFormula(node.conclusion.formal)}</span>
        </div>
      </div>
    );
  };

  if (!proofSteps || proofSteps.length === 0) {
    return (
      <div className="proof-tree-empty">
        <p>No proof path generated yet</p>
      </div>
    );
  }

  return (
    <div className="proof-tree-container">
      <h3>Mathematical Derivation Proof Tree</h3>
      <div className="proof-tree-scroll-wrapper">
        <div className="proof-tree-scroll-content">
          {derivationTree ? renderDerivation(derivationTree) : (
            <p>Failed to construct derivation tree.</p>
          )}
        </div>
      </div>
    </div>
  );
};
