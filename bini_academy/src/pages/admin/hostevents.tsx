import { useState } from "react";
import { Tabs, Button, Group } from "@mantine/core";
import { IconList, IconPlus, IconCalendarEvent, IconSettings } from "@tabler/icons-react";
import { HeaderAdmin } from "../../components/headeradmin";
import { Sidebar } from "../../components/sidebar";
import { EventsList } from "../../components/events/EventsList";
import { CreateEvent } from "../../components/events/CreateEvent";
import { EventSettings } from "../../components/events/EventSettings";
import { UserRole } from "../../types";
import { EventType } from "../../types/events";

export const HostEvents = () => {
  const [activeTab, setActiveTab] = useState<string>("list");
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  return (
    <div className="flex">
      <Sidebar role={UserRole.Admin} />

      <div className="flex flex-col flex-1">
        <HeaderAdmin title="Event Management" />

        <div className="p-6">
          <Tabs value={activeTab} onChange={(value) => value && setActiveTab(value)}>
            <Tabs.List>
              <Tabs.Tab 
                value="list" 
                leftSection={<IconList size={16} />}
              >
                Events List
              </Tabs.Tab>
              <Tabs.Tab 
                value="create" 
                leftSection={<IconPlus size={16} />}
              >
                Create Event
              </Tabs.Tab>
              <Tabs.Tab 
                value="settings" 
                leftSection={<IconSettings size={16} />}
              >
                Settings
              </Tabs.Tab>
            </Tabs.List>

            <div className="mt-6">
              <Tabs.Panel value="list">
                <EventsList 
                  onEdit={(event: EventType) => {
                    setSelectedEvent(event);
                    setActiveTab("create");
                  }}
                />
              </Tabs.Panel>

              <Tabs.Panel value="create">
                <CreateEvent 
                  event={selectedEvent}
                  onSubmit={() => {
                    setSelectedEvent(null);
                    setActiveTab("list");
                  }}
                  onCancel={() => {
                    setSelectedEvent(null);
                    setActiveTab("list");
                  }}
                />
              </Tabs.Panel>


              <Tabs.Panel value="settings">
                <EventSettings />
              </Tabs.Panel>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
