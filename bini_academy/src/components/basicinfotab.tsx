import { useState, useEffect } from "react";
import { Button, TextInput, Select } from "@mantine/core";

interface BasicInfoTabProps {
  setActiveTab: (tab: string) => void;
  updateProgress: (tab: "basic", completed: number, total: number) => void;
}

export const BasicInfoTab = ({ setActiveTab, updateProgress }: BasicInfoTabProps) => {
  const [formValues, setFormValues] = useState({
    title: "",
    subtitle: "",
    programCategory: "",
    courseTopic: "",
    courseLevel: "",
  });

  // Function to count completed fields
  const countCompletedFields = () =>
    Object.values(formValues).filter((value) => value.trim() !== "").length;

  // Update progress when form changes
  useEffect(() => {
    updateProgress("basic", countCompletedFields(), 5);
  }, [formValues]);

  return (
    <>
      <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
      <p className="text-sm text-gray-500">Completed: {countCompletedFields()} / 5</p>

      <div className="space-y-4">
        <TextInput
          label="Title"
          placeholder="Your course title"
          maxLength={80}
          value={formValues.title}
          onChange={(event) => setFormValues({ ...formValues, title: event.target.value })}
        />

        <TextInput
          label="Subtitle"
          placeholder="Your course subtitle"
          maxLength={120}
          value={formValues.subtitle}
          onChange={(event) => setFormValues({ ...formValues, subtitle: event.target.value })}
        />

        <Select
          label="Program Category"
          placeholder="Select..."
          data={["Programming", "Design", "Marketing"]}
          value={formValues.programCategory}
          onChange={(value) => setFormValues({ ...formValues, programCategory: value || "" })}
        />

        <TextInput
          label="Course Topic"
          placeholder="What is primarily taught in your course?"
          value={formValues.courseTopic}
          onChange={(event) => setFormValues({ ...formValues, courseTopic: event.target.value })}
        />

        <Select
          label="Course Level"
          placeholder="Select..."
          data={["Beginner", "Intermediate", "Advanced"]}
          value={formValues.courseLevel}
          onChange={(value) => setFormValues({ ...formValues, courseLevel: value || "" })}
        />
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline">Cancel</Button>
        <Button color="orange" onClick={() => setActiveTab("advance")}>
          Save & Next
        </Button>
      </div>
    </>
  );
};
