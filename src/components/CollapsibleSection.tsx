import { useState, useRef, useEffect } from "react";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function CollapsibleSection({ title, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, children]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex justify-between items-center bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg rounded-t-lg transition-all duration-300"
      >
        <span className="transition-transform duration-300 transform">{title}</span>
        <span 
          className={`transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          ▼
        </span>
      </button>
      
      <div
        ref={contentRef}
        style={{ height: contentHeight ? `${contentHeight}px` : '0px' }}
        className="transition-all duration-300 ease-in-out"
      >
        <div className={`p-6 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
