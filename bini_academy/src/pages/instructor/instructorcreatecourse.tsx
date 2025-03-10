import { useState } from "react";
import { Sidebar } from "../../components/sidebar";
import { Button, Paper } from "@mantine/core";
import { CourseTabs } from "../../components/coursetabs";
import { HeaderAdmin } from "../../components/headeradmin";
import { BasicInfoTab } from "../../components/basicinfotab";
import { AdvanceInfoTab } from "../../components/advanceinfotab";
import { CourseCurriculum } from "../../components/coursecurriculum";
import { PublishTab } from "../../components/publishtab"; // ✅ Import PublishTab

export const InstructorCreateCourse = () => {
  const [activeTab, setActiveTab] = useState("basic");

  // State to track completed fields dynamically
  const [progress, setProgress] = useState({
    basic: { completed: 0, total: 5 },
    advance: { completed: 0, total: 8 },
    curriculum: { completed: 0, total: 3 }, // Adjust based on curriculum tracking
    publish: { completed: 0, total: 2 }, // ✅ Added publish progress tracking
  });

  // Function to update progress dynamically
  const updateProgress = (
    tab: "basic" | "advance" | "curriculum" | "publish",
    completed: number,
    total: number
  ) => {
    setProgress((prev) => ({
      ...prev,
      [tab]: { completed, total },
    }));
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 bg-gray-50">
        {/* Header */}
        <HeaderAdmin title="Create a New Course" />

        <div className="p-8">
          {/* Tabs Navigation with Dynamic Progress */}
          <div className="w-full flex">
            <CourseTabs activeTab={activeTab} setActiveTab={setActiveTab} progress={progress} />
          </div>

          <Paper shadow="sm" p="lg" className="mt-6">
            {/* Tabs Content */}
            {activeTab === "basic" && <BasicInfoTab setActiveTab={setActiveTab} updateProgress={updateProgress} />}
            {activeTab === "advance" && <AdvanceInfoTab setActiveTab={setActiveTab} updateProgress={updateProgress} />}
            {activeTab === "curriculum" && <CourseCurriculum setActiveTab={setActiveTab} updateProgress={updateProgress} />}
            {activeTab === "publish" && <PublishTab setActiveTab={setActiveTab} updateProgress={updateProgress} />} {/* ✅ Added PublishTab */}
          </Paper>
        </div>
      </div>
    </div>
  );
};
