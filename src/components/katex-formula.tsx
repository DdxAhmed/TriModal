import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface KaTeXFormulaProps {
  latex: string;
  displayMode?: boolean;
  className?: string;
}

export const KaTeXFormula: React.FC<KaTeXFormulaProps> = ({
  latex,
  displayMode = true,
  className = '',
}) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode,
        throwOnError: false,
      });
    } catch (error) {
      console.error('KaTeX rendering error:', error);
      return `<span class="text-destructive font-mono">${latex}</span>`;
    }
  }, [latex, displayMode]);

  return (
    <div
      className={`katex-wrapper overflow-x-auto py-1 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
