import React, { useEffect } from 'react';

/**
 * CustomScrollbar component that applies a styled scrollbar with breathing animation
 * to the entire page. This component should be used once at the app root level.
 */
export const CustomScrollbar: React.FC = () => {
  useEffect(() => {
    // Add custom scrollbar styles to document
    const style = document.createElement('style');
    style.textContent = `
      /* Custom Scrollbar Styles */
      ::-webkit-scrollbar {
        width: 14px;
      }

      ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
      }

      ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #ff6b35 0%, #e95001 25%, #d14801 50%, #b83d01 75%, #a03501 100%);
        border-radius: 10px;
        border: 2px solid #f1f1f1;
        box-shadow: 0 0 10px rgba(255, 107, 53, 0.6),
                    0 0 20px rgba(233, 80, 1, 0.4),
                    inset 0 0 8px rgba(255, 255, 255, 0.3);
        animation: scrollbar-breathing 3s ease-in-out infinite;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #ff8c61 0%, #ff6b35 25%, #e95001 50%, #d14801 75%, #b83d01 100%);
        animation: scrollbar-breathing-hover 2s ease-in-out infinite;
      }

      /* Firefox scrollbar - animated */
      * {
        scrollbar-width: thin;
      }
      
      @supports (scrollbar-color: auto) {
        * {
          scrollbar-color: #e95001 #f1f1f1;
          animation: firefox-scrollbar-breathing 3s ease-in-out infinite;
        }
      }

      /* Breathing animation keyframes - continuous glow with gradient shifts */
      @keyframes scrollbar-breathing {
        0%, 100% {
          background: linear-gradient(180deg, #ff6b35 0%, #e95001 25%, #d14801 50%, #b83d01 75%, #a03501 100%);
          box-shadow: 0 0 8px rgba(255, 107, 53, 0.5),
                      0 0 15px rgba(233, 80, 1, 0.4),
                      inset 0 0 8px rgba(255, 255, 255, 0.3);
          filter: brightness(1) hue-rotate(0deg);
        }
        25% {
          background: linear-gradient(180deg, #ff8c61 0%, #ff6b35 25%, #e95001 50%, #d14801 75%, #b83d01 100%);
          box-shadow: 0 0 12px rgba(255, 140, 97, 0.7),
                      0 0 25px rgba(255, 107, 53, 0.6),
                      inset 0 0 10px rgba(255, 255, 255, 0.4);
          filter: brightness(1.15) hue-rotate(5deg);
        }
        50% {
          background: linear-gradient(180deg, #ffaa88 0%, #ff8c61 25%, #ff6b35 50%, #e95001 75%, #d14801 100%);
          box-shadow: 0 0 18px rgba(255, 170, 136, 0.9),
                      0 0 35px rgba(255, 140, 97, 0.8),
                      inset 0 0 15px rgba(255, 255, 255, 0.5);
          filter: brightness(1.3) hue-rotate(10deg);
        }
        75% {
          background: linear-gradient(180deg, #ff8c61 0%, #ff6b35 25%, #e95001 50%, #d14801 75%, #b83d01 100%);
          box-shadow: 0 0 12px rgba(255, 140, 97, 0.7),
                      0 0 25px rgba(255, 107, 53, 0.6),
                      inset 0 0 10px rgba(255, 255, 255, 0.4);
          filter: brightness(1.15) hue-rotate(5deg);
        }
      }

      /* Stronger breathing on hover */
      @keyframes scrollbar-breathing-hover {
        0%, 100% {
          background: linear-gradient(180deg, #ff8c61 0%, #ff6b35 25%, #e95001 50%, #d14801 75%, #b83d01 100%);
          box-shadow: 0 0 15px rgba(255, 140, 97, 0.8),
                      0 0 30px rgba(255, 107, 53, 0.7),
                      inset 0 0 12px rgba(255, 255, 255, 0.5);
          filter: brightness(1.2) hue-rotate(5deg);
        }
        50% {
          background: linear-gradient(180deg, #ffaa88 0%, #ff8c61 25%, #ff6b35 50%, #e95001 75%, #d14801 100%);
          box-shadow: 0 0 25px rgba(255, 170, 136, 1),
                      0 0 45px rgba(255, 140, 97, 0.9),
                      inset 0 0 18px rgba(255, 255, 255, 0.6);
          filter: brightness(1.4) hue-rotate(15deg);
        }
      }

      /* Firefox scrollbar color breathing */
      @keyframes firefox-scrollbar-breathing {
        0%, 100% { scrollbar-color: #e95001 #f1f1f1; }
        50% { scrollbar-color: #ff6b35 #f1f1f1; }
      }

      /* Active state - strongest glow */
      ::-webkit-scrollbar-thumb:active {
        background: linear-gradient(180deg, #ffaa88 0%, #ff6b35 25%, #e95001 50%, #d14801 75%, #8a2e01 100%);
        box-shadow: 0 0 30px rgba(255, 170, 136, 1),
                    0 0 50px rgba(255, 107, 53, 1),
                    inset 0 0 20px rgba(255, 255, 255, 0.7);
        filter: brightness(1.5) hue-rotate(15deg);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};
