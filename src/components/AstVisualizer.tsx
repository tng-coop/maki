import React, { useMemo } from 'react';

interface TreeNode {
  label: string;
  children: TreeNode[];
  x: number;
  y: number;
  width: number;
}

interface AstVisualizerProps {
  expression: any; // Nested arrays/strings representing the Lisp S-expression
  title?: string;
  width?: number;
  height?: number;
}

export const AstVisualizer: React.FC<AstVisualizerProps> = ({
  expression,
  title = "S-Expression AST",
  width = 400,
  height = 300,
}) => {
  const treeData = useMemo(() => {
    if (!expression) return null;
    
    // 1. Build tree structure recursively
    function buildTree(expr: any, depth = 0): TreeNode {
      if (expr === null || expr === undefined) {
        return { label: "NIL", children: [], x: 0, y: depth * 60 + 30, width: 50 };
      }
      
      if (Array.isArray(expr)) {
        if (expr.length === 0) {
          return { label: "NIL", children: [], x: 0, y: depth * 60 + 30, width: 50 };
        }
        
        // S-expression format: [operator, ...arguments]
        const label = String(expr[0]);
        const children = expr.slice(1).map(child => buildTree(child, depth + 1));
        
        const childrenWidth = children.reduce((sum, c) => sum + c.width, 0) + (children.length - 1) * 30;
        const width = Math.max(50, childrenWidth);
        
        return { label, children, x: 0, y: depth * 60 + 30, width };
      }
      
      return { label: String(expr), children: [], x: 0, y: depth * 60 + 30, width: 50 };
    }
    
    // 2. Assign X coordinates to center parent nodes above children
    function assignX(node: TreeNode, leftBoundary: number): number {
      if (node.children.length === 0) {
        node.x = leftBoundary + node.width / 2;
        return leftBoundary + node.width;
      }
      
      let currentLeft = leftBoundary;
      for (const child of node.children) {
        currentLeft = assignX(child, currentLeft) + 30; // 30px gap between sibling trees
      }
      
      const firstChildX = node.children[0].x;
      const lastChildX = node.children[node.children.length - 1].x;
      node.x = (firstChildX + lastChildX) / 2;
      
      return currentLeft - 30; // return right-most boundary
    }
    
    const root = buildTree(expression);
    assignX(root, 10);
    return root;
  }, [expression]);

  // Recursively collect nodes and links for rendering
  const renderElements = (node: TreeNode, elements: { links: React.ReactNode[]; nodes: React.ReactNode[] } = { links: [], nodes: [] }) => {
    // Styling classes based on Lisp token types
    let nodeClass = "ast-node-const";
    if (node.label.startsWith("?") || node.label.startsWith("??")) {
      nodeClass = "ast-node-var"; // Variable like ?A, ?B
    } else if (node.label.startsWith(".") && !node.label.startsWith(".L_")) {
      nodeClass = "ast-node-type"; // Type tag like .T2_
    } else if ([".TO", ".NEG", ".IN", ".FORALL", ".EXISTS", ".IFF", ".AND", ".OR", ".EQUAL", "^SUBST"].includes(node.label.toUpperCase())) {
      nodeClass = "ast-node-op"; // Operator like .to, .neg
    }

    elements.nodes.push(
      <g key={`node-${node.label}-${node.x}-${node.y}`} className={`ast-node ${nodeClass}`}>
        <rect
          x={node.x - 24}
          y={node.y - 14}
          width={48}
          height={28}
          rx={6}
          className="ast-node-bg"
        />
        <text
          x={node.x}
          y={node.y}
          dy="0.3em"
          textAnchor="middle"
          className="ast-node-text"
        >
          {node.label}
        </text>
      </g>
    );

    for (const child of node.children) {
      elements.links.push(
        <line
          key={`link-${node.x}-${node.y}-${child.x}-${child.y}`}
          x1={node.x}
          y1={node.y + 14}
          x2={child.x}
          y2={child.y - 14}
          className="ast-edge"
        />
      );
      renderElements(child, elements);
    }

    return elements;
  };

  const svgContent = useMemo(() => {
    if (!treeData) return null;
    return renderElements(treeData);
  }, [treeData]);

  // Calculate SVG viewBox based on node layout bounds
  const viewBox = useMemo(() => {
    if (!treeData) return `0 0 ${width} ${height}`;
    
    // Find boundaries
    let minX = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    
    function findBounds(node: TreeNode) {
      if (node.x - 30 < minX) minX = node.x - 30;
      if (node.x + 30 > maxX) maxX = node.x + 30;
      if (node.y + 30 > maxY) maxY = node.y + 30;
      node.children.forEach(findBounds);
    }
    
    findBounds(treeData);
    
    const w = maxX - minX;
    const h = maxY;
    return `${minX} 0 ${w} ${h + 20}`;
  }, [treeData, width, height]);

  if (!expression) {
    return (
      <div className="ast-empty">
        <p>No expression selected to visualize</p>
      </div>
    );
  }

  return (
    <div className="ast-container">
      <h3>{title}</h3>
      <div className="ast-svg-wrapper">
        <svg
          viewBox={viewBox}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
        >
          {svgContent && (
            <>
              <g>{svgContent.links}</g>
              <g>{svgContent.nodes}</g>
            </>
          )}
        </svg>
      </div>
    </div>
  );
};
