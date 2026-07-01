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
import { type ChangeEvent, type KeyboardEvent, useEffect, useRef, useState } from "react";

type RichTextEditorProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

type SelectionRange = {
  start: number;
  end: number;
};

type HistoryState = {
  past: string[];
  future: string[];
};

export function RichTextEditor({ label, value, onChange, placeholder = "Write your article…" }: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pendingSelectionRef = useRef<SelectionRange | null>(null);
  const lastEmittedValueRef = useRef(value);
  const historyRef = useRef<HistoryState>({ past: [value], future: [] });
  const [isEmpty, setIsEmpty] = useState(!value.trim());

  useEffect(() => {
    setIsEmpty(!value.trim());

    if (value !== lastEmittedValueRef.current) {
      historyRef.current = { past: [value], future: [] };
      lastEmittedValueRef.current = value;
    }
  }, [value]);

  useEffect(() => {
    const pendingSelection = pendingSelectionRef.current;

    if (!pendingSelection) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const textarea = textareaRef.current;

      if (!textarea) {
        return;
      }

      textarea.focus();
      textarea.setSelectionRange(pendingSelection.start, pendingSelection.end);
      pendingSelectionRef.current = null;
    });

    return () => window.cancelAnimationFrame(frame);
  }, [value]);

  function emitValue(nextValue: string, selection?: SelectionRange) {
    if (nextValue === value) {
      return;
    }

    historyRef.current.past.push(value);
    historyRef.current.future = [];
    lastEmittedValueRef.current = nextValue;
    pendingSelectionRef.current = selection ?? null;
    setIsEmpty(!nextValue.trim());
    onChange(nextValue);
  }

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    emitValue(event.target.value);
  }

  function applyInlineWrap(prefix: string, suffix = prefix) {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? start;
    const selected = value.slice(start, end);
    const nextValue = `${value.slice(0, start)}${prefix}${selected}${suffix}${value.slice(end)}`;

    emitValue(nextValue, {
      start: start + prefix.length,
      end: start + prefix.length + selected.length
    });
  }

  function applyLinePrefix(prefix: string) {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? start;
    const { lineStart, lineEnd, text } = getSelectedLines(value, start, end);
    const nextSegment = text
      .split("\n")
      .map((line) => `${prefix}${line}`)
      .join("\n");
    const nextValue = `${value.slice(0, lineStart)}${nextSegment}${value.slice(lineEnd)}`;

    emitValue(nextValue, {
      start: lineStart,
      end: lineStart + nextSegment.length
    });
  }

  function handleHeading(level: 2 | 3) {
    applyLinePrefix("#".repeat(level) + " ");
  }

  function handleParagraph() {
    applyLinePrefix("");
  }

  function handleBold() {
    applyInlineWrap("**");
  }

  function handleItalic() {
    applyInlineWrap("*");
  }

  function handleList(ordered: boolean) {
    applyLinePrefix(ordered ? "1. " : "- ");
  }

  function handleQuote() {
    applyLinePrefix("> ");
  }

  function handleRemoveFormatting() {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? start;
    const selection = start === end ? getCurrentLine(value, start) : { start, end };
    const selected = value.slice(selection.start, selection.end);
    const cleaned = stripMarkdownFormatting(selected);
    const nextValue = `${value.slice(0, selection.start)}${cleaned}${value.slice(selection.end)}`;

    emitValue(nextValue, {
      start: selection.start,
      end: selection.start + cleaned.length
    });
  }

  function handleLink() {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? start;
    const selected = value.slice(start, end).trim();
    const input = window.prompt("Enter the link URL");

    if (!input?.trim()) {
      return;
    }

    const href = normalizeEditorHref(input);
    const text = selected || "link text";
    const nextValue = `${value.slice(0, start)}[${text}](${href})${value.slice(end)}`;

    emitValue(nextValue, {
      start: start + 1,
      end: start + 1 + text.length
    });
  }

  function handleUndo() {
    const history = historyRef.current;

    if (history.past.length < 2) {
      return;
    }

    const current = history.past.pop();

    if (typeof current === "undefined") {
      return;
    }

    history.future.push(current);
    const previous = history.past[history.past.length - 1] ?? "";
    lastEmittedValueRef.current = previous;
    pendingSelectionRef.current = null;
    setIsEmpty(!previous.trim());
    onChange(previous);
  }

  function handleRedo() {
    const history = historyRef.current;
    const next = history.future.pop();

    if (typeof next === "undefined") {
      return;
    }

    history.past.push(next);
    lastEmittedValueRef.current = next;
    pendingSelectionRef.current = null;
    setIsEmpty(!next.trim());
    onChange(next);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      handleLink();
    }
  }

  return (
    <div className="grid gap-2">
      <p className="text-sm font-semibold text-navy-900">{label}</p>
      <div className="overflow-hidden border border-navy-200 bg-paper-50 focus-within:border-navy-700">
        <div className="flex flex-wrap gap-1 border-b border-navy-200 bg-paper-100 p-2" role="toolbar" aria-label="Text formatting">
          <ToolbarButton label="Paragraph" icon={Pilcrow} onClick={handleParagraph} />
          <ToolbarButton label="Heading 2" icon={Heading2} onClick={() => handleHeading(2)} />
          <ToolbarButton label="Heading 3" icon={Heading3} onClick={() => handleHeading(3)} />
          <ToolbarDivider />
          <ToolbarButton label="Bold" icon={Bold} onClick={handleBold} />
          <ToolbarButton label="Italic" icon={Italic} onClick={handleItalic} />
          <ToolbarButton label="Add link (Cmd/Ctrl+K)" icon={LinkIcon} onClick={handleLink} />
          <ToolbarDivider />
          <ToolbarButton label="Bulleted list" icon={List} onClick={() => handleList(false)} />
          <ToolbarButton label="Numbered list" icon={ListOrdered} onClick={() => handleList(true)} />
          <ToolbarButton label="Quote" icon={Quote} onClick={handleQuote} />
          <ToolbarDivider />
          <ToolbarButton label="Clear formatting" icon={RemoveFormatting} onClick={handleRemoveFormatting} />
          <ToolbarButton label="Undo" icon={Undo2} onClick={handleUndo} />
          <ToolbarButton label="Redo" icon={Redo2} onClick={handleRedo} />
        </div>

        <div className="relative">
          {isEmpty ? <span className="pointer-events-none absolute left-5 top-4 text-sm text-navy-500/60">{placeholder}</span> : null}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            rows={16}
            className="min-h-80 w-full resize-y border-0 bg-transparent px-5 py-4 text-sm leading-7 text-navy-950 outline-none placeholder:text-navy-500/60 sm:min-h-96 sm:px-6 sm:py-5"
            aria-label={label}
            aria-multiline="true"
            placeholder={placeholder}
          />
        </div>
      </div>
      <input type="hidden" name="content" value={value} readOnly />
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

function getSelectedLines(value: string, start: number, end: number) {
  const lineStart = value.lastIndexOf("\n", Math.max(0, start - 1)) + 1;
  const nextNewline = value.indexOf("\n", end);
  const lineEnd = nextNewline === -1 ? value.length : nextNewline;

  return {
    lineStart,
    lineEnd,
    text: value.slice(lineStart, lineEnd)
  };
}

function getCurrentLine(value: string, position: number) {
  const lineStart = value.lastIndexOf("\n", Math.max(0, position - 1)) + 1;
  const nextNewline = value.indexOf("\n", position);
  const lineEnd = nextNewline === -1 ? value.length : nextNewline;

  return { start: lineStart, end: lineEnd };
}

function stripMarkdownFormatting(value: string) {
  return value
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^\s{0,3}(#{1,6})\s+/gm, "")
    .replace(/^\s{0,3}>\s?/gm, "")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "");
}

function normalizeEditorHref(value: string) {
  const trimmed = value.trim();

  if (/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}
