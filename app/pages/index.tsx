"use client";

import React, { useEffect, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { saveToLocalStorage, loadFromLocalStorage } from "@/lib/tiptap-utils";

import "../../styles/_keyframe-animations.scss";
import "../../styles/_variables.scss";
import "../../styles/_editor.scss";

// import "@/components/tiptap-node/code-block-node/code-block-node.scss";

const Index = () => {
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Placeholder.configure({
        emptyEditorClass: "is-editor-empty",
        placeholder: "Write something …",
      }),
    ],
    content: typeof window !== "undefined" ? loadFromLocalStorage() || "" : "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      // Debounced auto-save
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(() => {
        const content = editor.getHTML();
        saveToLocalStorage(content);
      }, 1000); // Save after 1 second of inactivity
    },
  });

  // Load content when component mounts and editor is ready
  useEffect(() => {
    if (editor && typeof window !== "undefined") {
      const savedContent = loadFromLocalStorage();
      if (savedContent && savedContent !== editor.getHTML()) {
        editor.commands.setContent(savedContent);
      }
    }
  }, [editor]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  if (!editor) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-5xl mx-auto p-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-light text-blue-900 mb-4">Notex</h1>
          <p className="text-blue-600/70 text-lg">Simple. Clean. Focused.</p>
        </div>

        {/* Note Editor Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-200 overflow-hidden">
          <div className="flex items-center gap-3 p-6 border-b border-blue-50 bg-blue-50/30 flex-wrap">
            <UndoRedoButton action="undo" editor={editor} />
            <UndoRedoButton action="redo" editor={editor} />
            <div className="h-6 w-px bg-blue-300/60"></div>
            <HeadingDropdownMenu editor={editor} levels={[1, 2, 3, 4]} />
            <MarkButton editor={editor} type="bold" />
            <MarkButton editor={editor} type="italic" />
            <MarkButton editor={editor} type="strike" />
            <div className="h-6 w-px bg-blue-300/60"></div>
            <MarkButton editor={editor} type="code" />
            <CodeBlockButton editor={editor} />
            <MarkButton editor={editor} type="underline" />
            <div className="ml-auto text-sm text-blue-400">Auto-saved</div>
          </div>

          {/* Editor */}
          <EditorContent editor={editor} className="tiptap" />

          <div className="mt-12 mb-4 text-center">
            <p className="text-blue-400 text-sm">Your notes are saved locally in your browser</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
