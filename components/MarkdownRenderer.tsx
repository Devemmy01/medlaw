import type { ReactNode } from "react";

type MarkdownRendererProps = {
  content: string;
  className?: string;
};

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return <div className={["markdown-body", className].join(" ")}>{renderBlocks(content)}</div>;
}

function renderBlocks(markdown: string) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index] ?? "";
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const code: string[] = [];
      index += 1;

      while (index < lines.length && !(lines[index] ?? "").trim().startsWith("```")) {
        code.push(lines[index] ?? "");
        index += 1;
      }

      blocks.push(
        <pre key={`code-${index}`}>
          <code>{code.join("\n")}</code>
        </pre>
      );
      index += 1;
      continue;
    }

    const heading = /^(#{1,4})\s+(.+)$/.exec(trimmed);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2];
      const key = `heading-${index}`;

      if (level === 1) {
        blocks.push(<h1 key={key}>{renderInline(text)}</h1>);
      } else if (level === 2) {
        blocks.push(<h2 key={key}>{renderInline(text)}</h2>);
      } else if (level === 3) {
        blocks.push(<h3 key={key}>{renderInline(text)}</h3>);
      } else {
        blocks.push(<h4 key={key}>{renderInline(text)}</h4>);
      }

      index += 1;
      continue;
    }

    if (trimmed.startsWith(">")) {
      const quote: string[] = [];

      while (index < lines.length && (lines[index] ?? "").trim().startsWith(">")) {
        quote.push((lines[index] ?? "").trim().replace(/^>\s?/, ""));
        index += 1;
      }

      blocks.push(<blockquote key={`quote-${index}`}>{renderInline(quote.join(" "))}</blockquote>);
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];

      while (index < lines.length && /^[-*]\s+/.test((lines[index] ?? "").trim())) {
        items.push((lines[index] ?? "").trim().replace(/^[-*]\s+/, ""));
        index += 1;
      }

      blocks.push(
        <ul key={`list-${index}`}>
          {items.map((item, itemIndex) => (
            <li key={`${item}-${itemIndex}`}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];

      while (index < lines.length && /^\d+\.\s+/.test((lines[index] ?? "").trim())) {
        items.push((lines[index] ?? "").trim().replace(/^\d+\.\s+/, ""));
        index += 1;
      }

      blocks.push(
        <ol key={`ordered-${index}`}>
          {items.map((item, itemIndex) => (
            <li key={`${item}-${itemIndex}`}>{renderInline(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    const paragraph: string[] = [];

    while (index < lines.length && isParagraphLine(lines[index] ?? "")) {
      paragraph.push((lines[index] ?? "").trim());
      index += 1;
    }

    blocks.push(<p key={`paragraph-${index}`}>{renderInline(paragraph.join(" "))}</p>);
  }

  return blocks;
}

function isParagraphLine(line: string) {
  const trimmed = line.trim();

  return (
    Boolean(trimmed) &&
    !trimmed.startsWith("```") &&
    !trimmed.startsWith("#") &&
    !trimmed.startsWith(">") &&
    !/^[-*]\s+/.test(trimmed) &&
    !/^\d+\.\s+/.test(trimmed)
  );
}

function renderInline(value: string) {
  const parts = value.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);

  return parts.map((part, index) => {
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      const href = normalizeHref(link[2]);

      return (
        <a key={`${part}-${index}`} href={href} target={isExternalHref(href) ? "_blank" : undefined} rel={isExternalHref(href) ? "noreferrer" : undefined}>
          {link[1]}
        </a>
      );
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={`${part}-${index}`}>{part.slice(1, -1)}</em>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={`${part}-${index}`}>{part.slice(1, -1)}</code>;
    }

    return part;
  });
}

function normalizeHref(value: string) {
  const trimmed = value.trim();

  if (/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(trimmed)) {
    return trimmed;
  }

  return "#";
}

function isExternalHref(value: string) {
  return /^https?:\/\//i.test(value);
}
