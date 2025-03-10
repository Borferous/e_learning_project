import { useState } from "react";
import { Button } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

export const StartEventTab = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("");

  // Initialize Editor
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: "",
    onUpdate: ({ editor }) => {
      setWelcomeMessage(editor.getHTML());
    },
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-4">Start Event</h2>

      {/* Message Section */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-2">Message</h4>
        <p className="text-sm text-gray-600 mb-2">Welcome Message</p>

        {/* Rich Text Editor */}
        {editor ? (
          <RichTextEditor editor={editor} className="border rounded-md p-3 min-h-[150px]">
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
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content />
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
