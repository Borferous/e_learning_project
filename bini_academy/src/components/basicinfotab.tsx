import { useState, useEffect } from "react";
import { Button, TextInput, Select, NumberInput, Textarea } from "@mantine/core";
import { createCourse } from "../api/course";
import { CourseCategoryLabel, CourseLevelLabel } from "../types";

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
    price: "" as string | number,
    description: "",
  });

  // Function to count completed fields
  const countCompletedFields = () =>
    Object.values(formValues).filter((value) => String(value).trim() !== "").length;

  // Update progress when form changes
  useEffect(() => {
    updateProgress("basic", countCompletedFields(), 6);
  }, [formValues]);

  const save = async () => {
    const userId = localStorage.getItem('user_id') as string
    await createCourse({
      teacher_id: userId,
      course_title: formValues.title,
      program_category: formValues.programCategory,
      price: formValues.price,
      description: formValues.description,
      course_level: formValues.courseLevel,
      course_topic: formValues.courseTopic,
    })
    setActiveTab("advance")
  }

  return (
    <>
      <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
      <p className="text-sm text-gray-500">Completed: {countCompletedFields()} / 6</p>

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
          data={CourseCategoryLabel}
          value={formValues.programCategory}
          onChange={(value) => setFormValues({ ...formValues, programCategory: value || "" })}
        />

        <TextInput
          label="Course Topic"
          placeholder="What is primarily taught in your course?"
          value={formValues.courseTopic}
          onChange={(event) => setFormValues({ ...formValues, courseTopic: event.target.value })}
        />

        <NumberInput
          label="Course Price"
          placeholder="Course Price"
          value={formValues.price}
          onChange={(value) => setFormValues({ ...formValues, price: value })}
        />


        <Select
          label="Course Level"
          placeholder="Select..."
          data={CourseLevelLabel}
          value={formValues.courseLevel}
          onChange={(value) => setFormValues({ ...formValues, courseLevel: value || "" })}
        />

        <Textarea
          label="Course Description"
          placeholder="Enter your course description"
          value={formValues.description}
          onChange={(event) =>
            setFormValues({ ...formValues, description: event.target.value })
          }
          className="mt-4"
        />

      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline">Cancel</Button>
        <Button color="orange" onClick={() => save()}>
          Save & Next
        </Button>
      </div>
    </>
  );
};
