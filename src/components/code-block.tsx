"use client";

import { Check, Copy } from "lucide-react";
import React from "react";
import { Prism } from "react-syntax-highlighter";
import * as themes from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeBlockProps = {
  code: string;
  language?: string;
};

export function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="bg-background p-1 h-full relative">
      <div className="absolute top-0 right-0 p-1">
        <button type="button" onClick={copyToClipboard} className="p-1 bg-white">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <Prism
        language={language}
        showLineNumbers
        className="not-prose code-preview rounded-lg"
        style={themes.oneLight}
        customStyle={{
          background: "transparent",
          margin: 0,
          fontSize: "0.875rem",
          padding: "1rem",
        }}
        codeTagProps={{ style: { fontFamily: "monospace" } }}
      >
        {code}
      </Prism>
    </div>
  );
}
