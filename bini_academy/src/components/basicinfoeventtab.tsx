import { useState } from "react";
import { TextInput, Select, Button } from "@mantine/core";
import { createEvent } from "../api/event";

export const BasicInfoEventTab = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventSubtitle, setEventSubtitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eventCategory, setEventCategory] = useState("");

  const currentUser = localStorage.getItem('user_id') as string

  const hostEvent = async () => {

    try {
      const response = await createEvent({
        event_host: currentUser,
        event_title: eventTitle,
        event_category: eventCategory ,
        event_description: "this is a description",
        event_end_date: "aaa",
        event_start_date: "aaa",
        event_subtitle: eventTitle,
      })
      console.table(response)
    } catch (error) {

    }

  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

      <div className="space-y-4">
        {/* Event Title */}
        <TextInput
          label="Event Title"
          placeholder="Your Event Title"
          maxLength={80}
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />

        {/* Event Subtitle */}
        <TextInput
          label="Event Subtitle"
          placeholder="Your Event Subtitle"
          maxLength={120}
          value={eventSubtitle}
          onChange={(e) => setEventSubtitle(e.target.value)}
        />

        {/* Date Pickers */}
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="Start Date"
            placeholder="Select Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextInput
            label="End Date"
            placeholder="Select Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Event Category */}
        <Select
          label="Event Category"
          placeholder="Select Category"
          data={["Workshop", "Seminar", "Performance", "Meeting"]}
          value={eventCategory}
          onChange={(value) => setEventCategory(value || "")}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <Button variant="default">Cancel</Button>
        <div className="space-x-2">
          <Button color="orange" variant="light">Save</Button>
          <Button color="orange" variant="light">Save & Preview</Button>
          <Button color="orange" onClick={() => hostEvent()}>Save & Exit</Button>
        </div>
      </div>
    </div>
  );
};
