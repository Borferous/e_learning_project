import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Badge, Avatar, TextInput, Button, ScrollArea } from '@mantine/core';
import { IconSend, IconArrowLeft } from '@tabler/icons-react';
import { HomeHeader } from "../components/homeheader";
import { Footer } from "../components/footer";

interface Comment {
  avatar: string | null | undefined;
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  message: string;
  timestamp: Date;
}

export const EventLivePage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const commentsRef = useRef<HTMLDivElement>(null);
  
  // Updated mock event data with new YouTube link
  const event = {
    title: "Live Vocal Workshop",
    subtitle: "Master your voice with our experts",
    description: "Join our vocal coach in this intensive live session to boost your performance skills.",
    instructor: "Sarah Johnson",
    youtubeUrl: "https://www.youtube.com/embed/bKI7LHezJA0", // Updated YouTube URL
    startTime: "10:00 AM",
    duration: "2 hours",
    participants: 45,
  };

  // Helper function to ensure proper YouTube embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes('embed')) return url;
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  // Simulate receiving new comments
  useEffect(() => {
    const interval = setInterval(() => {
      const mockComment: Comment = {
          id: Date.now().toString(),
          user: {
              name: `User${Math.floor(Math.random() * 100)}`,
              avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
          },
          message: `Great session! Learning a lot about ${Math.random() > 0.5 ? 'vocal techniques' : 'breathing exercises'}`,
          timestamp: new Date(),
          avatar: undefined
      };
      setComments(prev => [...prev, mockComment]);
      
      // Auto-scroll to bottom
      if (commentsRef.current) {
        commentsRef.current.scrollTop = commentsRef.current.scrollHeight;
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const userComment: Comment = {
        id: Date.now().toString(),
        user: {
            name: "You",
            avatar: "https://i.pravatar.cc/150?u=you",
        },
        message: newComment,
        timestamp: new Date(),
        avatar: undefined
    };

    setComments(prev => [...prev, userComment]);
    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-white">
      <HomeHeader />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/events')}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-6 transition-colors"
        >
          <IconArrowLeft size={20} />
          <span>Back to Events</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content - Video and Details */}
          <div className="lg:col-span-3">
            {/* Updated Video Player */}
            <div className="relative w-full h-0 pb-[56.25%] bg-black rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={getYouTubeEmbedUrl(event.youtubeUrl)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>

            {/* Event Details */}
            <div className="mt-6 bg-white rounded-lg p-6 shadow-lg border">
              <h1 className="text-2xl font-bold text-gray-800">{event.title}</h1>
              <p className="text-gray-600 mt-2">{event.subtitle}</p>
              
              <div className="flex items-center gap-4 mt-4">
                <Badge color="red" variant="filled">LIVE</Badge>
                <span className="text-gray-500">{event.participants} watching</span>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-gray-800">About this Event</h3>
                <p className="text-gray-600 mt-2">{event.description}</p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-gray-500">Instructor</h4>
                  <p className="text-gray-800">{event.instructor}</p>
                </div>
                <div>
                  <h4 className="text-gray-500">Duration</h4>
                  <p className="text-gray-800">{event.duration}</p>
                </div>
                <div>
                  <h4 className="text-gray-500">Start Time</h4>
                  <p className="text-gray-800">{event.startTime}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Chat */}
          <div className="bg-white rounded-lg p-4 h-[calc(100vh-2rem)] shadow-lg border">
            <h3 className="text-gray-800 font-semibold mb-4">Live Chat</h3>
            
            {/* Comments Section */}
            <ScrollArea h={500} className="mb-4" viewportRef={commentsRef}>
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3 mb-4">
                  <Avatar src={comment.user.avatar} size="sm" radius="xl" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-800 text-sm font-medium">
                        {comment.user.name}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {comment.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{comment.message}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>

            {/* Comment Input */}
            <div className="flex gap-2">
              <TextInput
                placeholder="Type a message..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
              />
              <Button
                onClick={handleSubmitComment}
                variant="filled"
                color="orange"
                disabled={!newComment.trim()}
              >
                <IconSend size={16} />
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};