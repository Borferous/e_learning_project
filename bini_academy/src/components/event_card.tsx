import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Badge, Text, Alert, FileInput } from '@mantine/core';
import { IconCalendar, IconVideo, IconClock, IconAlertCircle, IconUpload } from '@tabler/icons-react';
import placeholderImage from '../assets/placeholder-image.svg';
import placeholderVideo from '../assets/placeholder-video.svg';

// Add registration status type
type RegistrationStatus = 'none' | 'pending' | 'approved';

export interface EventCardProps {
  thumbnail: string;
  title: string;
  subtitle: string;
  mediaType: string;
  category: string;
  registrationDate: string;
  startDate: string;
  endDate: string;
  description: string;
  welcomeMessage: string;
  isOngoing?: boolean;
  trailerUrl?: string; // Optional YouTube trailer URL
  isRegistered?: boolean; // Add registration status
  eventId?: string; // Add unique identifier for the event
  registrationStatus?: RegistrationStatus;
}

export const EventCard = ({ 
  thumbnail = placeholderImage,
  title,
  subtitle,
  mediaType,
  category,
  registrationDate,
  startDate,
  endDate,
  description,
  welcomeMessage,
  isOngoing,
  trailerUrl = placeholderVideo,
  isRegistered = false,
  eventId,
  registrationStatus = 'none',
}: EventCardProps) => {
  const [opened, setOpened] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDeadlineWarning, setShowDeadlineWarning] = useState(false);
  const [localRegistrationStatus, setLocalRegistrationStatus] = useState<RegistrationStatus>(registrationStatus);
  const [showVideoUploadModal, setShowVideoUploadModal] = useState(false);
  const [performanceVideo, setPerformanceVideo] = useState<File | null>(null);
  const [videoSubmission, setVideoSubmission] = useState<{
    video: File | null;
    submittedAt: Date | null;
  }>({ video: null, submittedAt: null });
  const [showVideoPreview, setShowVideoPreview] = useState(false);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  const isRegistrationClosed = () => {
    const now = new Date();
    const deadline = new Date(registrationDate);
    return now > deadline;
  };

  const getVideoDeadline = () => {
    const deadline = new Date(startDate);
    deadline.setDate(deadline.getDate() - 1); // Due 1 day before event
    return deadline;
  };

  const isVideoDeadlinePassed = () => {
    const now = new Date();
    return now > getVideoDeadline();
  };

  const handleActionClick = () => {
    if (isOngoing) {
      if (!isRegistered) {
        if (isRegistrationClosed()) {
          setShowDeadlineWarning(true);
          return;
        }
        setShowWarning(true);
        return;
      }
      navigate(`/event/${eventId}`);
    } else {
      if (localRegistrationStatus === 'approved') {
        if (category === 'Performance') {
          setShowVideoUploadModal(true);
        }
        return;
      }
      setOpened(true);
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = placeholderImage;
  };

  const simulateApproval = () => {
    setTimeout(() => {
      setLocalRegistrationStatus('approved');
    }, 5000);
  };

  const handleRegistration = () => {
    setOpened(false);
    setShowConfirmation(true);
    setLocalRegistrationStatus('pending');
    simulateApproval(); // Remove this in production
  };

  const handleRegisteredClick = () => {
    if (category === 'Performance' && localRegistrationStatus === 'approved') {
      setShowVideoUploadModal(true);
    }
  };

  const getButtonContent = () => {
    if (isOngoing) {
      if (isRegistered) {
        return "Join Event";  // Changed from "Join Now" to "Join Event"
      }
      if (isRegistrationClosed()) {
        return "Registration Closed";
      }
      return "Register";
    }

    switch (localRegistrationStatus) {
      case 'pending':
        return (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Waiting for Approval</span>
          </div>
        );
      case 'approved':
        return 'Wait for the Event';
      default:
        return 'Register';
    }
  };

  const videoSizeLimit = 100; // Size limit in MB

  const handleVideoUpload = (file: File | null) => {
    if (file) {
      if (file.size > videoSizeLimit * 1024 * 1024) {
        alert(`Video size must be less than ${videoSizeLimit}MB`);
        return;
      }
      const url = URL.createObjectURL(file);
      setVideoPreviewUrl(url);
      setPerformanceVideo(file);
    } else {
      setVideoPreviewUrl(null);
      setPerformanceVideo(null);
    }
  };

  useEffect(() => {
    return () => {
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
    };
  }, [videoPreviewUrl]);

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden transition hover:shadow-lg">
      <img 
        src={thumbnail} 
        alt={title} 
        className="w-full h-48 object-cover" 
        onError={handleImageError}
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          <Badge color="blue" variant="light">{category}</Badge>
        </div>
        
        <p className="text-gray-600 text-sm mb-1">{subtitle}</p>
        
        <div className="flex gap-2 items-center text-sm text-gray-500 mb-2">
          <IconVideo size={16} /> {mediaType}
        </div>
        
        <div className="flex gap-2 items-center text-sm text-gray-500 mb-2">
          <IconClock size={16} /> Reg. by {registrationDate}
        </div>
        
        <div className="flex gap-2 items-center text-sm text-gray-500 mb-4">
          <IconCalendar size={16} /> {startDate} - {endDate}
        </div>
        
        <Button
          onClick={handleActionClick}
          variant={isOngoing && isRegistered ? "gradient" : "filled"} // Added gradient variant for registered ongoing events
          color={isOngoing 
            ? (isRegistered ? "green" : "gray")
            : (localRegistrationStatus === 'approved' ? 'green' : 'orange')
          }
          disabled={isOngoing && isRegistrationClosed() && !isRegistered}
          fullWidth
          gradient={isOngoing && isRegistered ? { from: 'teal', to: 'green', deg: 105 } : undefined}
        >
          {getButtonContent()}
        </Button>
      </div>

      {/* Warning Modal for unregistered users */}
      <Modal
        opened={showWarning}
        onClose={() => setShowWarning(false)}
        title="Registration Required"
        size="sm"
      >
        <div className="p-4">
          <p className="text-gray-700 mb-4">
            You need to register for this event before you can join.
          </p>
          <Button 
            onClick={() => {
              setShowWarning(false);
              setOpened(true); // Open registration modal
            }}
            color="orange"
            fullWidth
          >
            Register Now
          </Button>
        </div>
      </Modal>

      {/* Registration Deadline Warning Modal */}
      <Modal
        opened={showDeadlineWarning}
        onClose={() => setShowDeadlineWarning(false)}
        title="Registration Closed"
        size="sm"
      >
        <div className="p-4">
          <Alert 
            icon={<IconAlertCircle size={16} />}
            color="red"
            variant="filled"
          >
            <Text size="sm" className="font-medium">
              Registration for this event has ended on {registrationDate}.
            </Text>
          </Alert>
          <Button 
            onClick={() => setShowDeadlineWarning(false)}
            color="gray"
            fullWidth
            className="mt-4"
          >
            Close
          </Button>
        </div>
      </Modal>

      {/* Updated Registration Modal */}
      <Modal 
        opened={opened} 
        onClose={() => setOpened(false)} 
        title={title} 
        size="xl" // Made larger for better video viewing
      >
        {/* Updated video container */}
        <div className="relative w-full h-0 pb-[56.25%] mb-6">
          <iframe
            src={getYouTubeEmbedUrl(trailerUrl)}
            title={`${title} Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          />
        </div>

        <p className="font-semibold text-md mb-2">{subtitle}</p>
        <p className="text-gray-700 mb-2">{description}</p>
        <p className="text-blue-700 italic">{welcomeMessage}</p>
        
        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Media Type:</strong> {mediaType}</p>
          <p><strong>Category:</strong> {category}</p>
          <p><strong>Registration Deadline:</strong> {registrationDate}</p>
          <p><strong>Start Date:</strong> {startDate}</p>
          <p><strong>End Date:</strong> {endDate}</p>
        </div>

        {!isOngoing && (
          <div className="mt-6 space-y-4">
            <Alert 
              icon={<IconAlertCircle size={16} />} 
              title="Registration Notice" 
              color="orange"
              variant="light"
            >
              After registration, you will need to wait for admin approval. 
              A confirmation email will be sent once your registration is approved.
            </Alert>

            <Button 
              color="orange" 
              fullWidth 
              onClick={handleRegistration}
            >
              Confirm Registration
            </Button>
          </div>
        )}
      </Modal>

      {/* Updated Video Upload Modal */}
      <Modal
        opened={showVideoUploadModal}
        onClose={() => setShowVideoUploadModal(false)}
        title="Performance Video Submission"
        size="lg"
      >
        <div className="space-y-4 p-4">
          <Alert 
            icon={<IconAlertCircle size={16} />}
            color="blue"
            variant="light"
          >
            <div className="space-y-2">
              <Text size="sm" fw={500}>Video Submission Guidelines:</Text>
              <ul className="list-disc pl-4 space-y-1 text-sm">
                <li>Submit a video related to {title}</li>
                <li>Deadline: {getVideoDeadline().toLocaleDateString()}</li>
                <li>You can update your submission until the deadline</li>
              </ul>
            </div>
          </Alert>

          {videoSubmission.video && (
            <div className="border rounded-lg p-4 space-y-2">
              <Text size="sm" fw={500}>Current Submission:</Text>
              <div className="flex justify-between items-center text-sm">
                <span>{videoSubmission.video.name}</span>
                <Text size="xs" color="gray">
                  Submitted: {videoSubmission.submittedAt?.toLocaleDateString()}
                </Text>
              </div>
            </div>
          )}

          <FileInput
            label="Performance Video"
            placeholder={videoSubmission.video ? "Update video" : "Upload video"}
            accept="video/*"
            leftSection={<IconVideo size={16} />}
            value={performanceVideo}
            onChange={handleVideoUpload}
            required
          />

          {videoPreviewUrl && (
            <div className="space-y-2">
              <Text size="sm" fw={500}>Preview:</Text>
              <div className="relative w-full h-0 pb-[56.25%] bg-gray-100 rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  src={videoPreviewUrl}
                  className="absolute top-0 left-0 w-full h-full"
                  controls
                />
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button
                  variant="light"
                  color="red"
                  onClick={() => {
                    setVideoPreviewUrl(null);
                    setPerformanceVideo(null);
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
          )}

          {!isVideoDeadlinePassed() && (
            <Button
              color="orange"
              fullWidth
              leftSection={<IconUpload size={16} />}
              onClick={() => {
                if (performanceVideo) {
                  setVideoSubmission({
                    video: performanceVideo,
                    submittedAt: new Date()
                  });
                  setShowVideoUploadModal(false);
                }
              }}
              disabled={!performanceVideo}
            >
              {videoSubmission.video ? "Update Submission" : "Submit Performance"}
            </Button>
          )}

          {isVideoDeadlinePassed() && (
            <Alert 
              color="red" 
              variant="filled"
            >
              Video submission deadline has passed
            </Alert>
          )}
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        opened={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        title="Registration Submitted"
        size="md"
      >
        <div className="space-y-4 p-4">
          <Alert 
            icon={<IconAlertCircle size={16} />}
            color="blue"
            variant="light"
          >
            <Text size="sm" className="font-medium mb-1">Registration Status:</Text>
            <ul className="list-disc pl-4 space-y-1">
              <li>Your registration is pending approval</li>
              <li>You will be notified once approved</li>
              {category === 'Performance' && (
                <li>After approval, you'll need to submit a performance video</li>
              )}
            </ul>
          </Alert>

          <Button 
            fullWidth 
            color="orange" 
            onClick={() => setShowConfirmation(false)}
          >
            Got it
          </Button>
        </div>
      </Modal>
    </div>
  );
};