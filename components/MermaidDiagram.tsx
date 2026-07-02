import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  code: string;
}

const tryToFixMermaid = (rawCode: string): string => {
  let clean = rawCode.replace(/```mermaid/g, '').replace(/```/g, '').trim();

  if (!clean) return 'graph TD\n  Start --> End';

  // Find parts separated by arrows
  const parts = clean.split(/\s*[-=]+>\s*|\s*<[-=]+>\s*/);
  if (parts.length > 1) {
    const nodeNames: string[] = [];
    
    parts.forEach((part) => {
      const quoteMatch = part.match(/['"](.*?)['"]/);
      let label = quoteMatch ? quoteMatch[1] : part;
      
      label = label.replace(/^(Center point|Arrow pointing to|Result|Start|End|Node|Step\s*\d+)\s*:\s*/i, '').trim();
      label = label.replace(/^['"]|['"]$/g, '').trim();
      
      if (label) {
        nodeNames.push(label);
      }
    });

    if (nodeNames.length > 1) {
      const lines: string[] = ['graph TD'];
      nodeNames.forEach((name, idx) => {
        lines.push(`  N${idx}["${name.replace(/"/g, '\\"')}\"]`);
      });
      for (let idx = 0; idx < nodeNames.length - 1; idx++) {
        if (clean.toLowerCase().includes('double-headed') || clean.toLowerCase().includes('influence each other')) {
          lines.push(`  N${idx} <--> N${idx + 1}`);
        } else {
          lines.push(`  N${idx} --> N${idx + 1}`);
        }
      }
      return lines.join('\n');
    }
  }

  // Fallback to simple flowchart of sentences
  const sentences = clean.split(/[.\n]+/).map(s => s.trim()).filter(s => s.length > 3 && !s.toLowerCase().includes('double-headed') && !s.toLowerCase().includes('influence each other'));
  if (sentences.length > 0) {
    const lines: string[] = ['graph TD'];
    sentences.forEach((s, idx) => {
      lines.push(`  S${idx}["${s.replace(/"/g, '\\"')}\"]`);
    });
    for (let idx = 0; idx < sentences.length - 1; idx++) {
      lines.push(`  S${idx} --> S${idx + 1}`);
    }
    return lines.join('\n');
  }

  return 'graph TD\n  Start --> End';
};

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
        
        let targetCode = code.trim();
        if (!targetCode.includes('graph') && !targetCode.includes('flowchart') && !targetCode.includes('mindmap') && !targetCode.includes('sequenceDiagram')) {
          targetCode = tryToFixMermaid(targetCode);
        }

        try {
          const { svg } = await mermaid.render(id, targetCode);
          setSvg(svg);
        } catch (firstErr) {
          console.warn("First Mermaid render failed, trying fallback cleaner:", firstErr);
          const fallbackCode = tryToFixMermaid(code);
          const fallbackId = `mermaid-fallback-${Date.now()}`;
          const { svg } = await mermaid.render(fallbackId, fallbackCode);
          setSvg(svg);
        }
      } catch (err) {
        console.error("Mermaid render error after fallback:", err);
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