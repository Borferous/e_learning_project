import { Tabs } from "@mantine/core";
import { IconFileText, IconSettings, IconLayout, IconCheck } from "@tabler/icons-react";

interface CourseTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  progress: Record<string, { completed: number; total: number }>;
}

export const CourseTabs = ({ activeTab, setActiveTab, progress }: CourseTabsProps) => {
  const tabItems = [
    { value: "basic", icon: <IconFileText size={18} />, label: "Basic Information" },
    { value: "advance", icon: <IconSettings size={18} />, label: "Advance Information" },
    { value: "curriculum", icon: <IconLayout size={18} />, label: "Curriculum" },
    { value: "publish", icon: <IconCheck size={18} />, label: "Publish Course" },
  ];

  return (
    <Tabs value={activeTab} onChange={(tab) => setActiveTab(tab as string)} variant="default">
      {/* Ensure tabs are evenly distributed */}
      <Tabs.List className="flex justify-evenly w-full border-b gap-4">
        {tabItems.map((tab) => (
          <Tabs.Tab
            key={tab.value}
            value={tab.value}
            className={`flex flex-col items-center gap-y-1 px-4 py-2 font-medium ${
              activeTab === tab.value ? "text-orange-600 border-orange-600" : "text-gray-600"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {progress[tab.value] && (
              <span className="text-green-600 text-sm">
                {progress[tab.value].completed}/{progress[tab.value].total}
              </span>
            )}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
};
