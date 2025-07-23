"use client";

import { useState } from "react";
import { Check, Copy, Code } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import "./code-preview.css";
import { CodeBlock } from "./code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface CodePreviewProps {
  children: React.ReactNode;
  code: string;
  title?: string;
}

export function CodePreview({ children, code, title }: CodePreviewProps) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

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
    <Tabs defaultValue="code">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="code">
        <TabsContentWrapper>
          <CodeBlock code={code} />
        </TabsContentWrapper>
      </TabsContent>
      <TabsContent value="preview">
        <TabsContentWrapper>{children}</TabsContentWrapper>
      </TabsContent>
    </Tabs>
  );
}

function TabsContentWrapper({ children }: { children: React.ReactNode }) {
  return <div className="h-96 border rounded-lg border-border overflow-y-auto">{children}</div>;
}
