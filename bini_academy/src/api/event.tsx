import axios from "axios";
import { ProgramEvent } from "../types";

const baseUrl = 'http://localhost:8000/tables/events.php';

export const createEvent = async ({
    event_host,
    event_title,
    event_category,
    event_description,
    event_end_date,
    event_start_date,
    event_subtitle,
} : ProgramEvent) => {
    const response = await axios.post(`${baseUrl}?action=create-event`,{
        event_host,
        event_title,
        event_category,
        event_description,
        event_end_date,
        event_start_date,
        event_subtitle,
    })
    return response.data
};

export const listEvents = async() => {
    const response = await axios.get(`${baseUrl}?action=get-event`)
    return response.data as ProgramEvent[]
}
