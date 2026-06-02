import React, { useEffect } from 'react';

export const CustomScrollbar: React.FC = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      ::-webkit-scrollbar {
        width: 14px;
      }

      ::-webkit-scrollbar-track {
        background: var(--surface-color);
        border-radius: 10px;
      }

      ::-webkit-scrollbar-thumb {
        background: var(--accent-color);
        border-radius: 10px;
        border: 2px solid var(--surface-color);
        box-shadow: 0 0 10px var(--accent-color),
                    0 0 20px var(--accent-color),
                    inset 0 0 8px color-mix(in srgb, var(--contrast-color) 30%, transparent);
        animation: scrollbar-breathing 3s ease-in-out infinite;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: var(--accent-color);
        animation: scrollbar-breathing-hover 2s ease-in-out infinite;
      }

      * {
        scrollbar-width: thin;
      }
      
      @supports (scrollbar-color: auto) {
        * {
          scrollbar-color: var(--accent-color) var(--surface-color);
          animation: firefox-scrollbar-breathing 3s ease-in-out infinite;
        }
      }

      @keyframes scrollbar-breathing {
        0%, 100% {
          background: var(--accent-color);
          box-shadow: 0 0 8px var(--accent-color),
                      0 0 15px var(--accent-color),
                      inset 0 0 8px color-mix(in srgb, var(--contrast-color) 30%, transparent);
        }
        25% {
          background: var(--accent-color);
          box-shadow: 0 0 12px var(--accent-color),
                      0 0 25px var(--accent-color),
                      inset 0 0 10px color-mix(in srgb, var(--contrast-color) 40%, transparent);
        }
        50% {
          background: var(--accent-color);
          box-shadow: 0 0 18px var(--accent-color),
                      0 0 35px var(--accent-color),
                      inset 0 0 15px color-mix(in srgb, var(--contrast-color) 50%, transparent);
        }
        75% {
          background: var(--accent-color);
          box-shadow: 0 0 12px var(--accent-color),
                      0 0 25px var(--accent-color),
                      inset 0 0 10px color-mix(in srgb, var(--contrast-color) 40%, transparent);
        }
      }

      @keyframes scrollbar-breathing-hover {
        0%, 100% {
          background: var(--accent-color);
          box-shadow: 0 0 15px var(--accent-color),
                      0 0 30px var(--accent-color),
                      inset 0 0 12px color-mix(in srgb, var(--contrast-color) 50%, transparent);
        }
        50% {
          background: var(--accent-color);
          box-shadow: 0 0 25px var(--accent-color),
                      0 0 45px var(--accent-color),
                      inset 0 0 18px color-mix(in srgb, var(--contrast-color) 60%, transparent);
        }
      }

      @keyframes firefox-scrollbar-breathing {
        0%, 100% { scrollbar-color: var(--accent-color) var(--surface-color); }
        50% { scrollbar-color: var(--accent-color) var(--surface-color); }
      }

      ::-webkit-scrollbar-thumb:active {
        background: var(--accent-color);
        box-shadow: 0 0 30px var(--accent-color),
                    0 0 50px var(--accent-color),
                    inset 0 0 20px color-mix(in srgb, var(--contrast-color) 70%, transparent);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default CustomScrollbar;
