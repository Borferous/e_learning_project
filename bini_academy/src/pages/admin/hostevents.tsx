import { useState } from "react";
import { HeaderAdmin } from "../../components/headeradmin";
import { HostEventsTabs } from "../../components/hosteventstab";
import { BasicInfoEventTab } from "../../components/basicinfoeventtab";
import { AdvancedInfoEventTab } from "../../components/advanceinfoeventtab";
import { StartEventTab } from "../../components/starteventtab";
import { UserRole } from "../../types";
import { Sidebar } from "../../components/sidebar";

export const HostEvents = () => {
  const [activeTab, setActiveTab] = useState<string>("basic");

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar role={UserRole.Admin} />

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
