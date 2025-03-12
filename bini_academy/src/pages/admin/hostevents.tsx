import { useState } from "react";
import { SidebarAdmin } from "../../components/sidebaradmin";
import { HeaderAdmin } from "../../components/headeradmin";
import { HostEventsTabs } from "../../components/hosteventstab";
import { BasicInfoEventTab } from "../../components/basicinfoeventtab";
import { AdvancedInfoEventTab } from "../../components/advanceinfoeventtab";
import { StartEventTab } from "../../components/starteventtab";

export const HostEvents = () => {
  const [activeTab, setActiveTab] = useState<string>("basic");

  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarAdmin />

      <div className="flex flex-col flex-1">
        {/* Header with dynamic title */}
        <HeaderAdmin title="Host Events" />

        {/* Tabs for switching between event sections */}
        <div className="p-6">
          <HostEventsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Render the correct tab content */}
          <div className="mt-4">
            {activeTab === "basic" && <BasicInfoEventTab />}
            {activeTab === "advanced" && <AdvancedInfoEventTab />}
            {activeTab === "start" && <StartEventTab />}
           
          </div>
        </div>
      </div>
    </div>
  );
};
