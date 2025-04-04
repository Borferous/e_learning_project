import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchFiles, handleFileUpload, handleFileDelete, handleAllFileDelete } from "../api/file"; // Adjust the import path
import { FileData } from "../types";
import { Button } from "@mantine/core";

export const Test = () => {
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Fetch files using TanStack Query
  const { data: files, isLoading, error } = useQuery<FileData[]>({ queryKey: ["files"], queryFn: fetchFiles });

  // Upload file mutation
  const uploadMutation = useMutation<{ file_id: number; file_name: string; file_path: string }, Error, File>({
    mutationFn: handleFileUpload, // Mutation function
    onSuccess: () => {
      // Invalidate the files query to refetch data after successful upload
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
    onError: (error: Error) => {
      // Handle error (you can customize this as needed)
      console.error("Error uploading file:", error);
    },
  });

  // Delete file mutation
  const deleteMutation = useMutation({
    mutationFn: handleFileDelete, // Mutation function
    onSuccess: () => {
      // Invalidate the query to refetch the files list after deletion
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
  });

  const deleteAllMutation = useMutation({
    mutationFn: handleAllFileDelete,
    onSuccess: () => {
      // Invalidate the query to refetch the files list after deletion
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
  });

  // Handle file input change for upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle file upload
  const handleUploadClick = () => {
    if (selectedFile) {
      uploadMutation.mutate(selectedFile);
    }
  };

  // Handle file deletion
  const handleDeleteClick = (fileId: number) => {
    deleteMutation.mutate(fileId);
  };

  const handleDeleteAllClick = () => {
    deleteAllMutation.mutate();
  }

  if (isLoading) return <p>Loading files...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>File Management</h2>

      {/* Upload Form */}
      <div>
        <input type="file" onChange={handleFileChange} />
        <Button onClick={handleUploadClick}>Upload</Button>
        <Button color="red" onClick={handleDeleteAllClick}>Delete All</Button>
      </div>

      

      {/* Error Display */}
      {uploadMutation.isError && <p style={{ color: "red" }}>Error uploading file</p>}
      {deleteMutation.isError && <p style={{ color: "red" }}>Error deleting file</p>}

      {/* File List */}
      <div>
        <h3>Uploaded Files</h3>
        <ul>
          {files?.map((file) => (
            <li key={file.file_id}>
              <a href={`http://localhost:8000/${file.file_path}`} target="_blank" rel="noopener noreferrer">
                {file.file_name}
              </a>
              <button onClick={() => handleDeleteClick(file.file_id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
