import { useState, useEffect } from "react";
import { Textarea, TextInput, Button } from "@mantine/core";

interface PublishTabProps {
  setActiveTab: (tab: string) => void;
  updateProgress: (tab: "publish", completed: number, total: number) => void;
}

export const PublishTab = ({ setActiveTab, updateProgress }: PublishTabProps) => {
  const [formValues, setFormValues] = useState({
    welcomeMessage: "",
    congratulationsMessage: "",
    instructors: [] as { name: string; role: string; avatar: string }[],
  });

  const totalFields = 2 + formValues.instructors.length; // 2 text fields + instructor count
  const completedFields =
    (formValues.welcomeMessage.trim() ? 1 : 0) +
    (formValues.congratulationsMessage.trim() ? 1 : 0) +
    formValues.instructors.length;

  // ✅ Correct way: Use useEffect to update progress only when state changes
  useEffect(() => {
    updateProgress("publish", completedFields, totalFields);
  }, [formValues]);

  return (
    <>
      <h3 className="text-xl font-semibold mb-4">Publish Course</h3>
      <p className="text-sm text-gray-500">Completed fields: {completedFields} / {totalFields}</p>

      {/* Messages */}
      <div className="mt-4">
        <h4 className="font-semibold">Message</h4>
        <Textarea
          placeholder="Enter course starting message here..."
          value={formValues.welcomeMessage}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, welcomeMessage: e.target.value }))
          }
        />
        <Textarea
          className="mt-4"
          placeholder="Enter your course completed message here..."
          value={formValues.congratulationsMessage}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, congratulationsMessage: e.target.value }))
          }
        />
      </div>

      {/* Instructor Search & List */}
      <div className="mt-6">
        <h4 className="font-semibold">Add Instructor ({formValues.instructors.length})</h4>
        <TextInput
          placeholder="Search by username"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value.trim()) {
              const newInstructor = {
                name: e.currentTarget.value.trim(),
                role: "Instructor",
                avatar: "https://via.placeholder.com/40", // Placeholder avatar
              };
              setFormValues((prev) => ({
                ...prev,
                instructors: [...prev.instructors, newInstructor],
              }));
              e.currentTarget.value = ""; // Clear input
            }
          }}
        />
        {/* Instructor List */}
        <div className="flex flex-wrap gap-4 mt-4">
          {formValues.instructors.map((instructor, index) => (
            <div key={index} className="flex items-center p-2 border rounded-lg">
              <img src={instructor.avatar} alt={instructor.name} className="w-10 h-10 rounded-full" />
              <div className="ml-2">
                <p className="font-semibold">{instructor.name}</p>
                <p className="text-sm text-gray-500">{instructor.role}</p>
              </div>
              <button
                className="ml-2 text-red-500"
                onClick={() =>
                  setFormValues((prev) => ({
                    ...prev,
                    instructors: prev.instructors.filter((_, i) => i !== index),
                  }))
                }
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => setActiveTab("curriculum")}>
          Prev Step
        </Button>
        <Button color="orange">Submit for Review</Button>
      </div>
    </>
  );
};
