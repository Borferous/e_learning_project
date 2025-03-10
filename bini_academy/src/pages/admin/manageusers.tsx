import { useState } from "react";
import { SidebarAdmin } from "../../components/sidebaradmin";
import { HeaderAdmin } from "../../components/headeradmin";
import { ManageUsersTabs } from "../../components/manageuserstab";
import { CreateUserTab } from "../../components/createusertab";
import { EditUsersTab } from "../../components/editusertab";

export const ManageUsers = () => {
  const [activeTab, setActiveTab] = useState<string>("create");

  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarAdmin />

      <div className="flex flex-col flex-1">
        {/* Header with dynamic title */}
        <HeaderAdmin title="Manage Users" />

        {/* Tabs for switching between Create & Edit Users */}
        <div className="p-6">
          <ManageUsersTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {/* Render the correct tab content */}
          <div className="mt-4">
            {activeTab === "create" && <CreateUserTab />}
            {activeTab === "edit" && <EditUsersTab />}
          </div>
        </div>
      </div>
    </div>
  );
};
