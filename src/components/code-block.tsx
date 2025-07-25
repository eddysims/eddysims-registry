"use client";

import { Check, ChevronsDownUp, ChevronsUpDown, Copy } from "lucide-react";
import React from "react";
import { Prism } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type CodeBlockProps = {
  code: string;
  language?: string;
  hideLineNumbers?: boolean;
  expandable?: boolean;
};

export function CodeBlock({
  code,
  language = "tsx",
  hideLineNumbers = false,
  expandable = false,
}: CodeBlockProps) {
  const [mounted, setMounted] = React.useState(false);
  const [expanded, setExpanded] = React.useState(!expandable);
  const { theme } = useTheme();
  const { copied, copyToClipboard } = useCopyToClipboard();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn("bg-background p-1.5 relative", {
        "h-120": !expanded,
        "h-full": expanded,
        "after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-12 after:bg-gradient-to-t after:from-background after:to-transparent":
        !expanded,
      })}
    >
      <div className="absolute top-0 right-0 p-1.5">
        {expandable && (
          <Button variant="ghost" onClick={() => setExpanded(!expanded)} >
            {expanded ? <ChevronsDownUp /> : <ChevronsUpDown />}
            {expanded ? "Collapse" : "Expand"}
          </Button>
        )}
          <Button
            type="button"
            onClick={() => copyToClipboard(code)}
            variant="ghost"
            size="icon"
        >
          {copied ? <Check /> : <Copy />}
        </Button>
      </div>
      <Prism
        language={language}
        showLineNumbers={!hideLineNumbers}
        className={cn(
          "not-prose code-preview rounded-lg h-full m-0! text-sm! leading-relaxed!",
          "[&_.linenumber]:w-12! [&_.linenumber]:pr-6! [&_.linenumber]:not-italic!"
        )}
        style={theme === "dark" ? oneDark : oneLight}
        codeTagProps={{ style: { fontFamily: "monospace" } }}
      >
        {code}
      </Prism>
      {!expanded && (
        <div className="relative z-30 flex items-center justify-center -mt-4">
          <Button variant="outline" onClick={() => setExpanded(true)}>
            Expand to view full code
          </Button>
        </div>
      )}
    </div>
  );
}
