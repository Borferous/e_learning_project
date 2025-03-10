import { useState, useEffect } from "react";
import { FileInput, Button } from "@mantine/core";
import placeholderImage from "../assets/placeholder-image.svg";
import placeholderVideo from "../assets/placeholder-video.svg";

interface CourseMediaUploadProps {
  onUpload: (uploadedFiles: { thumbnail: boolean; trailer: boolean }) => void;
}

export const CourseMediaUpload = ({ onUpload }: CourseMediaUploadProps) => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [trailer, setTrailer] = useState<File | null>(null);
  const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);
  const [trailerURL, setTrailerURL] = useState<string | null>(null);

  // Effect to generate and clean up object URLs
  useEffect(() => {
    if (thumbnail) {
      const url = URL.createObjectURL(thumbnail);
      setThumbnailURL(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [thumbnail]);

  useEffect(() => {
    if (trailer) {
      const url = URL.createObjectURL(trailer);
      setTrailerURL(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [trailer]);

  const handleThumbnailChange = (file: File | null) => {
    setThumbnail(file);
    onUpload({ thumbnail: !!file, trailer: !!trailer });
  };

  const handleTrailerChange = (file: File | null) => {
    setTrailer(file);
    onUpload({ thumbnail: !!thumbnail, trailer: !!file });
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Course Thumbnail Upload */}
      <div className="border p-4 rounded-lg bg-white shadow-sm">
        <h4 className="text-lg font-semibold mb-2">Course Thumbnail</h4>
        <div className="relative w-full h-48 border-dashed border-2 border-gray-300 rounded-lg flex justify-center items-center bg-gray-100">
          {thumbnailURL ? (
            <img src={thumbnailURL} alt="Course Thumbnail" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <img src={placeholderImage} alt="Placeholder Thumbnail" className="w-20 h-20" />
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Upload your course thumbnail here. <strong>Important Guidelines:</strong> 1200×800 pixels or 12:8 Ratio. Supported formats: <b>.jpg, .jpeg, .png</b>.
        </p>
        <FileInput
          className="mt-2"
          label=""
          accept="image/png,image/jpeg"
          placeholder="Upload Image"
          onChange={handleThumbnailChange}
        />
      </div>

      {/* Course Trailer Upload */}
      <div className="border p-4 rounded-lg bg-white shadow-sm">
        <h4 className="text-lg font-semibold mb-2">Course Trailer</h4>
        <div className="relative w-full h-48 border-dashed border-2 border-gray-300 rounded-lg flex justify-center items-center bg-gray-100">
          {trailerURL ? (
            <video className="w-full h-full rounded-lg" controls>
              <source src={trailerURL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={placeholderVideo} alt="Placeholder Video" className="w-20 h-20" />
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          A well-made promo video can increase enrollments. Supported formats: <b>.mp4, .mov</b>.
        </p>
        <FileInput
          className="mt-2"
          label=""
          accept="video/mp4,video/mov"
          placeholder="Upload Video"
          onChange={handleTrailerChange}
        />
      </div>
    </div>
  );
};
