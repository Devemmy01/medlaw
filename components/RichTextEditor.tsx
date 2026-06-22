"use client";

import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Pilcrow,
  Quote,
  Redo2,
  RemoveFormatting,
  Undo2
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type RichTextEditorProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

type EditorCommand =
  | "bold"
  | "italic"
  | "insertUnorderedList"
  | "insertOrderedList"
  | "formatBlock"
  | "removeFormat"
  | "undo"
  | "redo";

export function RichTextEditor({ label, value, onChange, placeholder = "Write your article…" }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const contentInputRef = useRef<HTMLInputElement>(null);
  const changeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastEmittedValue = useRef<string | null>(null);
  const onChangeRef = useRef(onChange);
  const [isEmpty, setIsEmpty] = useState(!value.trim());

  onChangeRef.current = onChange;

  useEffect(() => {
    const editor = editorRef.current;

    if (!editor || value === lastEmittedValue.current) {
      return;
    }

    clearChangeTimer();
    editor.innerHTML = markdownToHtml(value);
    if (contentInputRef.current) {
      contentInputRef.current.value = value;
    }
    lastEmittedValue.current = value;
    setIsEmpty(!value.trim());
  }, [value]);

  useEffect(() => () => clearChangeTimer(), []);

  function scheduleChange() {
    const editor = editorRef.current;

    setIsEmpty(!editor?.textContent?.trim());
    clearChangeTimer();
    changeTimerRef.current = setTimeout(commitEditorValue, 250);
  }

  function commitEditorValue() {
    const editor = editorRef.current;

    if (!editor) {
      return;
    }

    const markdown = htmlToMarkdown(editor);
    if (contentInputRef.current) {
      contentInputRef.current.value = markdown;
    }

    if (markdown === lastEmittedValue.current) {
      return;
    }

    lastEmittedValue.current = markdown;
    setIsEmpty(!markdown.trim());
    onChangeRef.current(markdown);
  }

  function flushEditorValue() {
    clearChangeTimer();
    commitEditorValue();
  }

  function clearChangeTimer() {
    if (changeTimerRef.current) {
      clearTimeout(changeTimerRef.current);
      changeTimerRef.current = null;
    }
  }

  function runCommand(command: EditorCommand, commandValue?: string) {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    flushEditorValue();
  }

  function addLink() {
    const selection = window.getSelection();

    if (!selection?.toString().trim()) {
      editorRef.current?.focus();
      return;
    }

    const range = selection.getRangeAt(0).cloneRange();
    const input = window.prompt("Enter the link URL");

    if (!input?.trim()) {
      return;
    }

    const href = normalizeEditorHref(input);
    editorRef.current?.focus();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("createLink", false, href);
    flushEditorValue();
  }

  function handlePaste(event: React.ClipboardEvent<HTMLDivElement>) {
    event.preventDefault();
    document.execCommand("insertText", false, event.clipboardData.getData("text/plain"));
    scheduleChange();
  }

  return (
    <div className="grid gap-2">
      <p className="text-sm font-semibold text-navy-900">{label}</p>
      <div className="overflow-hidden border border-navy-200 bg-paper-50 focus-within:border-navy-700">
        <div className="flex flex-wrap gap-1 border-b border-navy-200 bg-paper-100 p-2" role="toolbar" aria-label="Text formatting">
          <ToolbarButton label="Paragraph" icon={Pilcrow} onClick={() => runCommand("formatBlock", "p")} />
          <ToolbarButton label="Heading 2" icon={Heading2} onClick={() => runCommand("formatBlock", "h2")} />
          <ToolbarButton label="Heading 3" icon={Heading3} onClick={() => runCommand("formatBlock", "h3")} />
          <ToolbarDivider />
          <ToolbarButton label="Bold" icon={Bold} onClick={() => runCommand("bold")} />
          <ToolbarButton label="Italic" icon={Italic} onClick={() => runCommand("italic")} />
          <ToolbarButton label="Add link (select text first)" icon={LinkIcon} onClick={addLink} />
          <ToolbarDivider />
          <ToolbarButton label="Bulleted list" icon={List} onClick={() => runCommand("insertUnorderedList")} />
          <ToolbarButton label="Numbered list" icon={ListOrdered} onClick={() => runCommand("insertOrderedList")} />
          <ToolbarButton label="Quote" icon={Quote} onClick={() => runCommand("formatBlock", "blockquote")} />
          <ToolbarDivider />
          <ToolbarButton label="Clear formatting" icon={RemoveFormatting} onClick={() => runCommand("removeFormat")} />
          <ToolbarButton label="Undo" icon={Undo2} onClick={() => runCommand("undo")} />
          <ToolbarButton label="Redo" icon={Redo2} onClick={() => runCommand("redo")} />
        </div>

        <div className="relative">
          {isEmpty ? <span className="pointer-events-none absolute left-5 top-4 text-sm text-navy-500/60">{placeholder}</span> : null}
          <div
            ref={editorRef}
            className="rich-text-editor markdown-body min-h-80 px-5 py-4 outline-none sm:min-h-96 sm:px-6 sm:py-5"
            contentEditable
            suppressContentEditableWarning
            role="textbox"
            aria-label={label}
            aria-multiline="true"
            onInput={scheduleChange}
            onBlur={flushEditorValue}
            onPaste={handlePaste}
          />
        </div>
      </div>
      <input ref={contentInputRef} type="hidden" name="content" defaultValue={value} />
    </div>
  );
}

function ToolbarButton({ label, icon: Icon, onClick }: { label: string; icon: typeof Bold; onClick: () => void }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className="focus-ring inline-flex size-9 items-center justify-center border border-transparent text-navy-700 transition hover:border-navy-200 hover:bg-paper-50 hover:text-navy-950"
    >
      <Icon aria-hidden="true" className="size-4" />
    </button>
  );
}

function ToolbarDivider() {
  return <span aria-hidden="true" className="mx-1 w-px self-stretch bg-navy-200" />;
}

function markdownToHtml(markdown: string) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: string[] = [];
  let index = 0;

  while (index < lines.length) {
    const trimmed = (lines[index] ?? "").trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    const heading = /^(#{1,4})\s+(.+)$/.exec(trimmed);
    if (heading) {
      const level = Math.min(4, heading[1].length);
      blocks.push(`<h${level}>${renderInlineMarkdown(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (trimmed.startsWith(">")) {
      const quote: string[] = [];
      while (index < lines.length && (lines[index] ?? "").trim().startsWith(">")) {
        quote.push((lines[index] ?? "").trim().replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push(`<blockquote>${renderInlineMarkdown(quote.join(" "))}</blockquote>`);
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s+/.test((lines[index] ?? "").trim())) {
        items.push(`<li>${renderInlineMarkdown((lines[index] ?? "").trim().replace(/^[-*]\s+/, ""))}</li>`);
        index += 1;
      }
      blocks.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test((lines[index] ?? "").trim())) {
        items.push(`<li>${renderInlineMarkdown((lines[index] ?? "").trim().replace(/^\d+\.\s+/, ""))}</li>`);
        index += 1;
      }
      blocks.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length && isMarkdownParagraphLine(lines[index] ?? "")) {
      paragraph.push((lines[index] ?? "").trim());
      index += 1;
    }
    blocks.push(`<p>${renderInlineMarkdown(paragraph.join(" "))}</p>`);
  }

  return blocks.join("");
}

function renderInlineMarkdown(value: string) {
  const escaped = escapeHtml(value);

  return escaped
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, text: string, href: string) => `<a href="${escapeAttribute(normalizeEditorHref(href))}">${text}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function htmlToMarkdown(root: HTMLElement) {
  const markdown = Array.from(root.childNodes).map(serializeNode).join("");

  return markdown
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function serializeNode(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent ?? "";
  }

  if (!(node instanceof HTMLElement)) {
    return "";
  }

  const tag = node.tagName.toLowerCase();
  const children = () => Array.from(node.childNodes).map(serializeNode).join("");

  if (/^h[1-4]$/.test(tag)) {
    return `${"#".repeat(Number(tag[1]))} ${children().trim()}\n\n`;
  }

  if (tag === "p" || tag === "div") {
    return `${children().trim()}\n\n`;
  }

  if (tag === "br") {
    return "\n";
  }

  if (tag === "strong" || tag === "b") {
    return `**${children()}**`;
  }

  if (tag === "em" || tag === "i") {
    return `*${children()}*`;
  }

  if (tag === "code") {
    return `\`${children()}\``;
  }

  if (tag === "a") {
    const text = children();
    const href = node.getAttribute("href") ?? "";
    return href ? `[${text}](${href})` : text;
  }

  if (tag === "blockquote") {
    return `${children().trim().split("\n").map((line) => `> ${line}`).join("\n")}\n\n`;
  }

  if (tag === "ul" || tag === "ol") {
    const items = Array.from(node.children)
      .filter((child) => child.tagName.toLowerCase() === "li")
      .map((child, itemIndex) => {
        const marker = tag === "ol" ? `${itemIndex + 1}.` : "-";
        return `${marker} ${Array.from(child.childNodes).map(serializeNode).join("").trim()}`;
      });
    return `${items.join("\n")}\n\n`;
  }

  return children();
}

function isMarkdownParagraphLine(line: string) {
  const trimmed = line.trim();
  return Boolean(trimmed) && !trimmed.startsWith("#") && !trimmed.startsWith(">") && !/^[-*]\s+/.test(trimmed) && !/^\d+\.\s+/.test(trimmed);
}

function normalizeEditorHref(value: string) {
  const trimmed = value.trim();

  if (/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function escapeAttribute(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
