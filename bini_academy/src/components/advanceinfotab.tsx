  import { useEffect, useState } from "react";
  import { Button, TextInput } from "@mantine/core";
  import { CourseMediaUpload } from "../components/coursemediaupload";

  interface AdvanceInfoTabProps {
    setActiveTab: (tab: string) => void;
    updateProgress: (tab: "advance", completed: number, total: number) => void;
  }

  export const AdvanceInfoTab = ({ setActiveTab, updateProgress }: AdvanceInfoTabProps) => {
    const [formValues, setFormValues] = useState({
      // description: "",
      teachings: [""],
      requirements: [""],
    });

    const [uploads, setUploads] = useState<{ thumbnail: boolean; trailer: boolean }>({
      thumbnail: false,
      trailer: false,
    });

    // Function to count completed fields
    const countCompletedFields = () => {
      let completed = 0;
      let total = 7; // Description (1) + Teachings (up to 3) + Requirements (up to 3) + 2 uploads

      // if (formValues.description.trim() !== "") completed++;
      completed += formValues.teachings.filter((t) => t.trim() !== "").length;
      completed += formValues.requirements.filter((r) => r.trim() !== "").length;

      if (uploads.thumbnail) completed++;
      if (uploads.trailer) completed++;

      return { completed, total };
    };

    // Update progress when form values or uploads change
    useEffect(() => {
      const { completed, total } = countCompletedFields();
      updateProgress("advance", completed, total);
    }, [formValues, uploads]);

    return (
      <>
        <h3 className="text-xl font-semibold mb-4">Advanced Information</h3>
        <p className="text-sm text-gray-500">
          Completed fields: {countCompletedFields().completed} / 7
        </p>

        {/* Course Thumbnail & Trailer Upload */}
        <CourseMediaUpload onUpload={setUploads} />

        {/* Course Description */}
        {/* <Textarea
          label="Course Description"
          placeholder="Enter your course description"
          value={formValues.description}
          onChange={(event) =>
            setFormValues({ ...formValues, description: event.target.value })
          }
          className="mt-4"
        /> */}

        {/* What You Will Teach */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold">
            What you will teach ({formValues.teachings.length}/3)
          </h4>
          {formValues.teachings.map((teaching, index) => (
            <TextInput
              key={index}
              placeholder="What you will teach..."
              value={teaching}
              onChange={(event) => {
                const newTeachings = [...formValues.teachings];
                newTeachings[index] = event.target.value;
                setFormValues({ ...formValues, teachings: newTeachings });
              }}
            />
          ))}
          {formValues.teachings.length < 3 && (
            <Button
              variant="subtle"
              color="red"
              onClick={() =>
                setFormValues((prev) => ({
                  ...prev,
                  teachings: [...prev.teachings, ""],
                }))
              }
            >
              + Add new
            </Button>
          )}
        </div>

        {/* Course Requirements */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold">
            Course requirements ({formValues.requirements.length}/3)
          </h4>
          {formValues.requirements.map((requirement, index) => (
            <TextInput
              key={index}
              placeholder="Course requirement..."
              value={requirement}
              onChange={(event) => {
                const newRequirements = [...formValues.requirements];
                newRequirements[index] = event.target.value;
                setFormValues({ ...formValues, requirements: newRequirements });
              }}
            />
          ))}
          {formValues.requirements.length < 3 && (
            <Button
              variant="subtle"
              color="red"
              onClick={() =>
                setFormValues((prev) => ({
                  ...prev,
                  requirements: [...prev.requirements, ""],
                }))
              }
            >
              + Add new
            </Button>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setActiveTab("basic")}>
            Back
          </Button>
          <Button color="orange" onClick={() => setActiveTab("curriculum")}>
            Save & Next
          </Button>
        </div>
      </>
    );
  };
