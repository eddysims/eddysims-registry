import { readFileSync } from "node:fs";
import { join } from "node:path";
import { CodePreview } from "./code-preview";

type CodeExampleProps = {
  component: string;
  example: string;
};

export function CodeExample({
  component,
  example,
  children,
}: React.PropsWithChildren<CodeExampleProps>) {
  const src = getExampleSource(component, example);

  if (!src) {
    return <div>Example not found</div>;
  }

  return <CodePreview code={src}>{children}</CodePreview>;
}

function getExampleSource(component: string, example: string) {
  try {
    const fullPath = join(
      process.cwd(),
      "registry",
      "new-york",
      component,
      "examples",
      `${example}.tsx`
    );
    const content = readFileSync(fullPath, "utf-8");
    return content;
  } catch (error) {
    console.error(error);
    return null;
  }
}
