import { useState, useEffect } from "react";
import { Button } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
// import { HostMediaUpload } from "./hostmediaupload";
import "@mantine/tiptap/styles.css";
import TextAlign from "@tiptap/extension-text-align";

export const AdvancedInfoEventTab = () => {
  const [eventDescription, setEventDescription] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: {},
        italic: {},
        bulletList: {},
        orderedList: {},
      }),
      Link.configure({ openOnClick: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }), // Enable text alignment
    ],
    content: "<p>Start typing here...</p>",
    onUpdate: ({ editor }) => {
      setEventDescription(editor.getHTML());
    },
  });
  useEffect(() => {
    if (editor) {
      editor.commands.focus(); // Focus editor when ready
    }
  }, [editor]);

  const handleUpload = (uploadedFiles: { thumbnail: boolean; trailer: boolean }) => {
    console.log("Uploaded files:", uploadedFiles);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Advanced Information</h2>

      {/* <HostMediaUpload onUpload={handleUpload} /> */}

      {/* Event Description with Rich Text Editor */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-2">Event Description</h4>

        {editor ? (
        <RichTextEditor editor={editor} className="border rounded-md w-full">
        <RichTextEditor.Toolbar>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
          </RichTextEditor.ControlsGroup>
      
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>
      
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignRight />
            <RichTextEditor.AlignJustify />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
      
        {/* Ensure proper styling */}
        <RichTextEditor.Content className="min-h-[200px] w-full border border-gray-300 p-2" />
      </RichTextEditor>
      
        
        ) : (
          <p className="text-gray-500">Loading editor...</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <Button variant="default">Cancel</Button>
        <div className="space-x-2">
          <Button color="orange" variant="light">Save</Button>
          <Button color="orange" variant="light">Save & Preview</Button>
          <Button color="orange">Save & Exit</Button>
        </div>
      </div>
    </div>
  );
};
