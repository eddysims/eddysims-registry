import React from "react";
import { Button, type ButtonProps } from "./ui/button";
import { CodeBlock } from "./code-block";
import { getClientSideUrl } from "@/utils/get-urls";

type InstallCliBoxProps = {
  component: string;
};

type Shell = "pnpm" | "npm" | "yarn" | "bun";

export function InstallCliBox({ component }: InstallCliBoxProps) {
  const [tab, setTab] = React.useState<Shell>("pnpm");

  const registryUrl = getClientSideUrl();
  const componentUrl = `${registryUrl}/r/${component}`;
  const commandMap = {
    pnpm: `pnpm dlx shadcn@latest add ${componentUrl}`,
    npm: `npx shadcn@latest add ${componentUrl}`,
    yarn: `yarn shadcn@latest add ${componentUrl}`,
    bun: `bunx --bun shadcn@latest add ${componentUrl}`,
  };

  const buttonProps: ButtonProps = {
    size: "sm",
    variant: "ghost",
  };

  return (
    <div>
      <div className="border rounded-lg overflow-hidden">
        <div className="px-2 pt-1 rounded-lg flex gap-1 items-center">
          <Button
            {...buttonProps}
            onClick={() => setTab("pnpm")}
            disabled={tab === "pnpm"}
          >
            pnpm
          </Button>
          <Button
            {...buttonProps}
            onClick={() => setTab("npm")}
            disabled={tab === "npm"}
          >
            npm
          </Button>
          <Button
            {...buttonProps}
            onClick={() => setTab("yarn")}
            disabled={tab === "yarn"}
          >
            yarn
          </Button>
          <Button
            {...buttonProps}
            onClick={() => setTab("bun")}
            disabled={tab === "bun"}
          >
            bun
          </Button>
        </div>

        <CodeBlock code={commandMap[tab]} hideLineNumbers language="sh" />
      </div>
    </div>
  );
}
