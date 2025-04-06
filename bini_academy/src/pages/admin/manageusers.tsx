import { useState } from "react";
import { HeaderAdmin } from "../../components/headeradmin";
import { ManageUsersTabs } from "../../components/manageuserstab";
import { CreateUserTab } from "../../components/createusertab";
import { EditUsersTab } from "../../components/editusertab";
import { UserRole } from "../../types";
import { Sidebar } from "../../components/sidebar";

export const ManageUsers = () => {
  const [activeTab, setActiveTab] = useState<string>("create");

  return (
    <div className="flex">
      <Sidebar role={UserRole.Admin} />
      <div className="flex flex-col flex-1">
        <HeaderAdmin title="Manage Users" />
        <div className="p-6">
          <ManageUsersTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="mt-4">
            {activeTab === "create" && <CreateUserTab />}
            {activeTab === "edit" && <EditUsersTab />}
          </div>
        </div>
      </div>
    </div>
  );
};
