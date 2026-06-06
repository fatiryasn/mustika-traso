"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { HiOutlineCode, HiOutlineLink } from "react-icons/hi";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  className?: string;
}

export default function RichTextEditor({
  content,
  onChange,
  className = "", 
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none min-h-[200px] px-4 py-2.5 border border-gray-200 rounded-sm bg-white text-sm font-inter",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border border-gray-200 rounded-sm bg-gray-50">
        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded hover:bg-gray-200 text-sm font-bold ${
            editor.isActive("bold") ? "bg-gray-300" : ""
          }`}
          title="Tebal (Ctrl+B)"
        >
          B
        </button>
        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded hover:bg-gray-200 text-sm italic ${
            editor.isActive("italic") ? "bg-gray-300" : ""
          }`}
          title="Miring (Ctrl+I)"
        >
          I
        </button>
        {/* Underline */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1.5 rounded hover:bg-gray-200 text-sm underline ${
            editor.isActive("underline") ? "bg-gray-300" : ""
          }`}
          title="Garis Bawah (Ctrl+U)"
        >
          U
        </button>
        {/* Strikethrough */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1.5 rounded hover:bg-gray-200 text-sm line-through ${
            editor.isActive("strike") ? "bg-gray-300" : ""
          }`}
          title="Coret"
        >
          S
        </button>

        <span className="w-px h-5 bg-gray-300 mx-1" />

        {/* Headings */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`p-1.5 rounded hover:bg-gray-200 text-xs font-bold ${
            editor.isActive("heading", { level: 1 }) ? "bg-gray-300" : ""
          }`}
          title="Judul 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-1.5 rounded hover:bg-gray-200 text-xs font-bold ${
            editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : ""
          }`}
          title="Judul 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`p-1.5 rounded hover:bg-gray-200 text-xs font-bold ${
            editor.isActive("heading", { level: 3 }) ? "bg-gray-300" : ""
          }`}
          title="Judul 3"
        >
          H3
        </button>

        <span className="w-px h-5 bg-gray-300 mx-1" />

        {/* Bullet List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${
            editor.isActive("bulletList") ? "bg-gray-300" : ""
          }`}
          title="Daftar Poin"
        >
          <HiOutlineCode className="w-4 h-4" />
        </button>
        {/* Ordered List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${
            editor.isActive("orderedList") ? "bg-gray-300" : ""
          }`}
          title="Daftar Bernomor"
        >
          <span className="text-xs font-bold">1.</span>
        </button>
        {/* Blockquote */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${
            editor.isActive("blockquote") ? "bg-gray-300" : ""
          }`}
          title="Kutipan"
        >
          <HiOutlineCode className="w-4 h-4" />
        </button>

        <span className="w-px h-5 bg-gray-300 mx-1" />

        {/* Code */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${
            editor.isActive("code") ? "bg-gray-300" : ""
          }`}
          title="Kode"
        >
          <HiOutlineCode className="w-4 h-4" />
        </button>

        {/* Link */}
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Masukkan URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={`p-1.5 rounded hover:bg-gray-200 ${
            editor.isActive("link") ? "bg-gray-300" : ""
          }`}
          title="Tautan"
        >
          <HiOutlineLink className="w-4 h-4" />
        </button>

        <span className="w-px h-5 bg-gray-300 mx-1" />

        {/* Text Alignment */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${
            editor.isActive({ textAlign: "left" }) ? "bg-gray-300" : ""
          }`}
          title="Rata Kiri"
        >
          <span className="text-xs">⬅</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${
            editor.isActive({ textAlign: "center" }) ? "bg-gray-300" : ""
          }`}
          title="Rata Tengah"
        >
          <span className="text-xs">↔</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${
            editor.isActive({ textAlign: "right" }) ? "bg-gray-300" : ""
          }`}
          title="Rata Kanan"
        >
          <span className="text-xs">➡</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${
            editor.isActive({ textAlign: "justify" }) ? "bg-gray-300" : ""
          }`}
          title="Rata Penuh"
        >
          <span className="text-xs">◼</span>
        </button>
      </div>
      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}
