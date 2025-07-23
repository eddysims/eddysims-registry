"use client";

import { Check, Copy } from "lucide-react";
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
};

export function CodeBlock({
  code,
  language = "tsx",
  hideLineNumbers = false,
}: CodeBlockProps) {
  const [mounted, setMounted] = React.useState(false);
  const { theme } = useTheme();
  const { copied, copyToClipboard } = useCopyToClipboard();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-background p-1.5 h-full relative">
      <div className="absolute top-0 right-0 p-1.5">
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
    </div>
  );
}
