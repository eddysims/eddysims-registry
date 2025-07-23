"use client";

import { CodeBlock } from "./code-block";
import { InstallCliBox } from "./install-cli-box";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function InstallClient({code}: {code: string}) {
  return (
    <Tabs defaultValue="cli">
      <TabsList>
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>
      <TabsContent value="cli">
        <div className="mt-2">
          <InstallCliBox component="star-rating" />
        </div>
      </TabsContent>
      <TabsContent value="manual">
        <CodeBlock code={code} expandable />
      </TabsContent>
    </Tabs>
  );
}
