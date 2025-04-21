import { useState, useMemo } from "react";
import { Modal, Button, Badge, TextInput, Select, Pagination, Group } from "@mantine/core";
import { IconCalendar, IconVideo, IconClock, IconSearch } from '@tabler/icons-react';
import { HomeHeader } from "../components/homeheader";
import { Footer } from "../components/footer";
import { EventCard, EventCardProps } from '../components/event_card';
import placeholderImage from '../assets/placeholder-image.svg';
import placeholderVideo from '../assets/placeholder-video.svg';

const isEventOngoing = (event: EventCardProps) => {
  const now = new Date();
  const eventStart = new Date(event.startDate);
  const eventEnd = new Date(event.endDate);
  return now >= eventStart && now <= eventEnd;
};

const events: EventCardProps[] = [
  {
    thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Live Vocal Workshop",
    subtitle: "Master your voice with our experts",
    mediaType: "Live Streamed",
    category: "Workshop",
    registrationDate: "April 5, 2025",
    startDate: "April 20, 2025",
    endDate: "April 25, 2025",
    description:
      "Join our vocal coach in this intensive live session to boost your performance skills.",
    welcomeMessage: "Welcome to the Live Vocal Workshop! We're excited to see you!",
    trailerUrl: "https://www.youtube.com/embed/LzdvvVYPWo0",
    isRegistered: true,
    eventId: "vocal-workshop-2025",
    registrationStatus: 'none',
  },
  {
    thumbnail: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Jazz Ensemble Masterclass",
    subtitle: "Live collaboration with industry professionals",
    mediaType: "Live Streamed",
    category: "Workshop",
    registrationDate: "April 1, 2025",
    startDate: "April 5, 2025",
    endDate: "April 25, 2025",
    description:
      "Immerse yourself in the world of jazz with our intensive masterclass series featuring renowned musicians.",
    welcomeMessage: "Welcome to the Jazz Ensemble Masterclass! Let's make some incredible music together!",
    trailerUrl: "https://www.youtube.com/embed/uf6QlcwFkA8",
    isRegistered: false,
    eventId: "jazz-masterclass-2025",
    registrationStatus: 'none',
  },
  {
    thumbnail: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Contemporary Dance Intensive",
    subtitle: "Advanced techniques and choreography",
    mediaType: "Live Streamed",
    category: "Workshop",
    registrationDate: "April 2, 2025",
    startDate: "April 7, 2025",
    endDate: "April 14, 2025",
    description:
      "Push your boundaries with our intensive contemporary dance workshop led by international choreographers.",
    welcomeMessage: "Welcome to the Contemporary Dance Intensive! Get ready to move and explore!",
    trailerUrl: "https://www.youtube.com/embed/FOzP-H3r4ME",
    isRegistered: false,
    eventId: "dance-intensive-2025",
    registrationStatus: 'none',
  },
  {
    thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Seminar on Music Business",
    subtitle: "Grow your music career with industry insights",
    mediaType: "Recorded",
    category: "Seminar",
    registrationDate: "April 6, 2025",
    startDate: "April 12, 2025",
    endDate: "April 12, 2025",
    description:
      "Learn how to manage, market, and monetize your music from industry professionals.",
    welcomeMessage: "Welcome to our Seminar! We hope you learn and network effectively.",
    trailerUrl: "https://www.youtube.com/embed/j_5NL_QqnA0",
    isRegistered: false,
    eventId: "music-business-seminar-2025",
    registrationStatus: 'none',
  },
  {
    thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Student Recital Showcase",
    subtitle: "Witness our talented students perform",
    mediaType: "Live Streamed",
    category: "Performance",
    registrationDate: "April 15, 2025",
    startDate: "April 20, 2025",
    endDate: "April 20, 2025",
    description:
      "Join us for an evening of exceptional performances by our talented students across various disciplines.",
    welcomeMessage: "Welcome to our Student Recital! Get ready for an inspiring showcase.",
    trailerUrl: "https://www.youtube.com/embed/sZTpLvsYYLw",
    isRegistered: false,
    eventId: "student-recital-2025",
    registrationStatus: 'none',
  },
  {
    thumbnail: "https://mnltoday.ph/wp-content/uploads/2025/02/480101697_997307118938054_7150176731826997439_n-1.jpg",
    title: "Annual Dance Concert",
    subtitle: "A celebration of movement and artistry",
    mediaType: "Live Streamed",
    category: "Performance",
    registrationDate: "April 25, 2025",
    startDate: "May 1, 2025",
    endDate: "May 1, 2025",
    description:
      "Experience a mesmerizing evening of dance performances featuring classical, contemporary, and cultural pieces.",
    welcomeMessage: "Welcome to our Annual Dance Concert! Prepare to be amazed.",
    trailerUrl: "https://www.youtube.com/embed/5okI2pPfkjk",
    isRegistered: false,
    eventId: "annual-dance-concert-2025",
    registrationStatus: 'none',
  },
  {
    thumbnail: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Orchestra Spring Performance",
    subtitle: "Classical masterpieces come alive",
    mediaType: "Live Streamed",
    category: "Performance",
    registrationDate: "May 10, 2025",
    startDate: "May 15, 2025",
    endDate: "May 15, 2025",
    description:
      "Our student orchestra presents an evening of classical music featuring works from renowned composers.",
    welcomeMessage: "Welcome to our Spring Concert! Let the music transport you.",
    trailerUrl: "https://www.youtube.com/embed/GVjLwT0vwKw",
    isRegistered: false,
    eventId: "orchestra-spring-performance-2025",
    registrationStatus: 'none',
  }
];

const datePickerStyles = {
  wrapper: "sm:w-[280px]",
  input: "px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 w-full",
  label: "text-sm text-gray-600 mb-1"
};

export const EventsPage = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Filter and search state
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'asc' | 'desc' | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleDateChange = (type: 'start' | 'end', value: string) => {
    if (type === 'start') {
      setStartDate(value);
      // If end date is before start date, update it
      if (endDate && new Date(value) > new Date(endDate)) {
        setEndDate(value);
      }
    } else {
      setEndDate(value);
      // If start date is after end date, update it
      if (startDate && new Date(value) < new Date(startDate)) {
        setStartDate(value);
      }
    }
    setCurrentPage(1);
  };

  const clearDates = () => {
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
  };

  // Get unique categories for filter dropdown
  const categories = useMemo(() => {
    return Array.from(new Set(events.map(event => event.category)));
  }, []);

  // Filter and sort events
  const filteredAndSortedEvents = useMemo(() => {
    return events
      .filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            event.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !categoryFilter || event.category === categoryFilter;
        
        const eventDate = new Date(event.startDate);
        const filterStart = startDate ? new Date(startDate) : null;
        const filterEnd = endDate ? new Date(endDate) : null;
        const matchesDateRange = !filterStart || !filterEnd || (
          eventDate >= filterStart && eventDate <= filterEnd
        );
        
        return matchesSearch && matchesCategory && matchesDateRange;
      })
      .sort((a, b) => {
        if (!sortBy) return 0;
        return sortBy === 'asc' 
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      });
  }, [events, searchQuery, categoryFilter, sortBy, startDate, endDate]);

  // Separate ongoing and upcoming events
  const { ongoingEvents, upcomingEvents } = useMemo(() => {
    const ongoing = filteredAndSortedEvents.filter(isEventOngoing);
    const upcoming = filteredAndSortedEvents.filter(event => !isEventOngoing(event));
    return { ongoingEvents: ongoing, upcomingEvents: upcoming };
  }, [filteredAndSortedEvents]);

  // Calculate pagination for upcoming events only
  const totalPages = Math.ceil(upcomingEvents.length / itemsPerPage);
  const currentUpcomingEvents = upcomingEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen">
      <HomeHeader />
      <main className="max-w-7xl mx-auto p-4 pt-6">
        {/* Search and Filter Controls moved to top */}
        <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:gap-4 flex-wrap items-end">
          <TextInput
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="sm:w-64"
            leftSection={<IconSearch size={16} />}
          />
          
          <Select
            placeholder="Filter by category"
            value={categoryFilter}
            onChange={(value) => {
              setCategoryFilter(value);
              setCurrentPage(1);
            }}
            data={[
              { value: '', label: 'All Categories' },
              ...categories.map(cat => ({ value: cat, label: cat }))
            ]}
            className="sm:w-48"
          />

          <Select
            placeholder="Sort by title"
            value={sortBy}
            onChange={(value) => setSortBy(value as 'asc' | 'desc' | null)}
            data={[
              { value: 'asc', label: 'A to Z' },
              { value: 'desc', label: 'Z to A' }
            ]}
            className="sm:w-48"
          />

          <div className={datePickerStyles.wrapper}>
            <label className={datePickerStyles.label}>Date Range</label>
            <div className="relative">
              <div className="flex gap-2 items-center">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => handleDateChange('start', e.target.value)}
                  className={datePickerStyles.input}
                  placeholder="Start date"
                  max={endDate || undefined}
                />
                <span className="text-gray-500">-</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => handleDateChange('end', e.target.value)}
                  className={datePickerStyles.input}
                  placeholder="End date"
                  min={startDate || undefined}
                />
                {(startDate || endDate) && (
                  <Button 
                    variant="subtle" 
                    color="gray" 
                    onClick={clearDates}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    size="sm"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Events Sections */}
        <div className="space-y-12">
          {/* Ongoing Events Section */}
          {ongoingEvents.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Ongoing Events</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ongoingEvents.map((event, index) => (
                  <EventCard 
                    key={index} 
                    {...event} 
                    isOngoing={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Events Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
            
            {currentUpcomingEvents.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentUpcomingEvents.map((event, index) => (
                    <EventCard 
                      key={index} 
                      {...event} 
                      isOngoing={false}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Group justify="center" className="mt-8">
                  <Pagination
                    total={totalPages}
                    value={currentPage}
                    onChange={setCurrentPage}
                    color="orange"
                  />
                </Group>
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No upcoming events found matching your criteria
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
