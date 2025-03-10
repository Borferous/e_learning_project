import { Tabs } from "@mantine/core";
import { IconUserPlus, IconUsers } from "@tabler/icons-react";

interface ManageUsersTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const ManageUsersTabs = ({ activeTab, setActiveTab }: ManageUsersTabsProps) => {
  const tabItems = [
    { value: "create", icon: <IconUserPlus size={18} />, label: "Create User" },
    { value: "edit", icon: <IconUsers size={18} />, label: "Edit Users" },
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
