import { Tabs, Progress, Text } from '@mantine/core';
import { TabType } from '../../../types';

interface CourseTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  progress: {
    [key in TabType]: { completed: number; total: number };
  };
}

export const CourseTabs = ({ activeTab, setActiveTab, progress }: CourseTabsProps) => {
  const getProgress = (tab: TabType) => {
    const { completed, total } = progress[tab];
    return Math.round((completed / total) * 100);
  };

  return (
    <Tabs value={activeTab} onChange={(value) => setActiveTab(value as TabType)} className="w-full">
      <Tabs.List>
        {Object.keys(progress).map((tab) => (
          <Tabs.Tab key={tab} value={tab}>
            <div className="space-y-1">
              <Text size="sm">{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
              <Progress value={getProgress(tab as TabType)} size="xs" />
            </div>
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
};