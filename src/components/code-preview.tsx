"use client";

import { CodeBlock } from "./code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

type CodePreviewProps = {
  code: string;
};

export function CodePreview({
  code,
  children,
}: React.PropsWithChildren<CodePreviewProps>) {
  return (
    <Tabs defaultValue="preview">
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
