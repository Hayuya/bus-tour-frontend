// src/components/Tab.tsx
import React from 'react';
import { Box, Tabs, Tab as MuiTab } from '@mui/material';

interface TabProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const Tab: React.FC<TabProps> = ({ tabs, activeTab, onTabClick }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onTabClick(tabs[newValue]);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs 
        value={tabs.indexOf(activeTab)}
        onChange={handleChange}
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
      >
        {tabs.map((tab) => (
          <MuiTab key={tab} label={tab} />
        ))}
      </Tabs>
    </Box>
  );
};

export default Tab;