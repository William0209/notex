"use client";

import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
// import "../../app/styles/_keyframe-animatuions.scss";
// import "../../app/styles/_variables.scss";

const Index = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        emptyEditorClass: "is-editor-empty",
        placeholder: "Write something …",
      }),
    ],
    immediatelyRender: false,
  });

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
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
          <div className="flex items-center gap-3 p-6 border-b border-blue-50 bg-blue-50/30 flex-wrap">
            <MarkButton type="bold" />
            <MarkButton type="italic" />
            <MarkButton type="strike" />
            <MarkButton type="code" />
            <MarkButton type="underline" />
            <div className="ml-auto text-sm text-blue-400">Auto-saved</div>
          </div>

          {/* Editor */}
          <EditorContent editor={editor} className="tiptap" />

          <div className="mt-12 text-center">
            <p className="text-blue-400 text-sm">Your notes are saved locally in your browser</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
