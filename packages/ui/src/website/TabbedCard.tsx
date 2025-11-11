import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '../lib/utils';

export interface ITab {
  id: string;
  label: string;
  icon?: string;
  title: string;
  description: string;
}

export interface ITabbedCardProps {
  tabs: ITab[];
  className?: string;
}

export const TabbedCard: React.FC<ITabbedCardProps> = ({ tabs, className = '' }): JSX.Element => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? '');

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className={cn('bg-white rounded-2xl shadow-xl overflow-hidden', className)}>
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex-1 px-6 py-4 font-semibold text-sm transition-all duration-300 relative',
              'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#e95001]',
              activeTab === tab.id
                ? 'text-white bg-gradient-to-br from-[#e95001] to-[#d14801]'
                : 'text-gray-600 hover:text-[#e95001] hover:bg-gray-100',
            )}
          >
            <div className="flex items-center justify-center space-x-2">
              {tab.icon && <i className={cn(tab.icon, 'text-lg')}></i>}
              <span>{tab.label}</span>
            </div>

            {/* Active indicator */}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-white"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-8">
        <AnimatePresence mode="wait">
          {activeTabData && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#e95001] to-[#d14801] bg-clip-text text-transparent">
                  {activeTabData.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-base">
                  {activeTabData.description}
                </p>
              </div>

              {/* Decorative elements */}
              <div className="mt-6 flex space-x-2">
                {tabs.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      'h-1 rounded-full transition-all duration-300',
                      index === tabs.findIndex((t) => t.id === activeTab)
                        ? 'w-8 bg-gradient-to-r from-[#e95001] to-[#d14801]'
                        : 'w-2 bg-gray-300',
                    )}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
