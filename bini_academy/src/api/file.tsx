import axios from "axios";

const baseUrl = "http://localhost:8000/tables/files.php";

// Fetch list of files
export const fetchFiles = async (): Promise<{ file_id: number; file_name: string; file_path: string }[]> => {
    const response = await axios.get(`${baseUrl}?action=list`);
    if (!Array.isArray(response.data)) {
        throw new Error("Invalid response: Expected an array.");
    }
    return response.data;
};

// Upload file
export const handleFileUpload = async (file: File): Promise<{ file_id: number; file_name: string; file_path: string }> => {
    const formData = new FormData();
    formData.append("fileToUpload", file); // ✅ Match backend key

    const response = await axios.post(`${baseUrl}?action=upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

// Delete file
export const handleFileDelete = async (fileId: number): Promise<{ message: string }> => {
    const response = await axios.delete(`${baseUrl}?action=delete&file_id=${fileId}`);
    return response.data;
};


export const handleAllFileDelete = async() =>{
    const response = await axios.delete(`${baseUrl}?action=delete-all`);
    return response.data;
}