import React from 'react';

interface TabProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const Tab: React.FC<TabProps> = ({ tabs, activeTab, onTabClick }) => (
  <div className="border-b border-gray-200 mb-4">
    <ul className="flex -mb-px">
      {tabs.map((tab) => (
        <li key={tab} className="mr-2">
          <button
            className={`inline-block py-2 px-4 border-b-2 ${
              activeTab === tab
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent hover:text-gray-600 hover:border-gray-300'
            }`}
            onClick={() => onTabClick(tab)}
          >
            {tab}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default Tab;
