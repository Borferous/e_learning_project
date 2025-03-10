import { Tabs } from "@mantine/core";
import { IconCalendarEvent, IconClipboardList, IconPlayerPlay} from "@tabler/icons-react";

interface HostEventsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const HostEventsTabs = ({ activeTab, setActiveTab }: HostEventsTabsProps) => {
  const tabItems = [
    { value: "basic", icon: <IconCalendarEvent size={18} />, label: "Basic Information" },
    { value: "advanced", icon: <IconClipboardList size={18} />, label: "Advanced Information" },
    { value: "start", icon: <IconPlayerPlay size={18} />, label: "Start Event" },
  ];

  return (
    <Tabs value={activeTab} onChange={(tab) => setActiveTab(tab as string)} variant="default">
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
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
};
