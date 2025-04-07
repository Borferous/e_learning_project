import { useEffect } from "react";
import { Button, TextInput, Select, NumberInput, Textarea } from "@mantine/core";
import { CourseCategoryLabel, CourseLevelLabel } from "../types";
import { useForm } from "@mantine/form";

interface BasicInfoTabProps {
  setActiveTab: (tab: string) => void;
  updateProgress: (tab: "basic", completed: number, total: number) => void;
}

export const BasicInfoTab = ({ setActiveTab, updateProgress }: BasicInfoTabProps) => {
  const form = useForm({
    initialValues: {
      title: "",
      subtitle: "",
      programCategory: "",
      courseTopic: "",
      courseLevel: "",
      price: "" as string | number,
      description: "",
    },
  });

  // Function to count completed fields
  const countCompletedFields = () =>
    Object.values(form.values).filter((value) => String(value).trim() !== "").length;

  // Update progress when form changes
  useEffect(() => {
    updateProgress("basic", countCompletedFields(), 6);
  }, [form.values]);

  const save = async () => {
    
    setActiveTab("advance");
  };

  return (
    <>
      <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
      <p className="text-sm text-gray-500">Completed: {countCompletedFields()} / 6</p>

      <div className="space-y-4">
        <TextInput
          label="Title"
          placeholder="Your course title"
          maxLength={80}
          {...form.getInputProps("title")}
        />

        <TextInput
          label="Subtitle"
          placeholder="Your course subtitle"
          maxLength={120}
          {...form.getInputProps("subtitle")}
        />

        <Select
          label="Program Category"
          placeholder="Select..."
          data={CourseCategoryLabel}
          {...form.getInputProps("programCategory")}
        />

        <TextInput
          label="Course Topic"
          placeholder="What is primarily taught in your course?"
          {...form.getInputProps("courseTopic")}
        />

        <NumberInput
          label="Course Price"
          placeholder="Course Price"
          {...form.getInputProps("price")}
          onChange={(value) => form.setFieldValue("price", value ?? "")} // Ensure it doesn't become null
        />

        <Select
          label="Course Level"
          placeholder="Select..."
          data={CourseLevelLabel}
          {...form.getInputProps("courseLevel")}
        />

        <Textarea
          label="Course Description"
          placeholder="Enter your course description"
          {...form.getInputProps("description")}
          className="mt-4"
        />
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline">Cancel</Button>
        <Button color="orange" onClick={save}>
          Save & Next
        </Button>
      </div>
    </>
  );
};
