import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  code: string;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ code }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      securityLevel: 'loose',
      fontFamily: 'Fredoka',
    });
  }, []);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!code) return;
      
      try {
        setError(false);
        const id = `mermaid-${Date.now()}`;
        // Validate code roughly
        if (!code.includes('graph') && !code.includes('flowchart') && !code.includes('mindmap') && !code.includes('sequenceDiagram')) {
            // Fallback for simple graph
            const fixedCode = `graph TD\n${code}`;
            const { svg } = await mermaid.render(id, fixedCode);
            setSvg(svg);
        } else {
            const { svg } = await mermaid.render(id, code);
            setSvg(svg);
        }
      } catch (err) {
        console.error("Mermaid render error:", err);
        setError(true);
      }
    };

    renderDiagram();
  }, [code]);

  if (error) return (
      <div className="p-4 bg-gray-100 rounded-lg text-xs font-mono text-gray-500">
          Visual Diagram could not be rendered.
      </div>
  );

  return (
    <div 
        ref={elementRef}
        className="w-full flex justify-center bg-white p-4 rounded-xl overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};