import { Button, FileButton } from '@mantine/core';
import { useState } from 'react';

export function SubmissionBox() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md">
      <h3 className="text-lg font-semibold mb-2">Your Submission</h3>
      <div className="flex items-center gap-4 mb-4">
        <FileButton onChange={setFile} accept="application/pdf,image/*">
          {(props) => <Button variant="light" {...props}>Attach File</Button>}
        </FileButton>
        {file && <span className="text-sm text-gray-700">{file.name}</span>}
      </div>
      <Button disabled={!file} color="blue">Submit</Button>
    </div>
  );
}