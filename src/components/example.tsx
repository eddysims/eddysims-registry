import { readFileSync } from "node:fs";
import { join } from "node:path";
import { CodePreview } from "./code-preview";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircleIcon } from "lucide-react";

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
    return (
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Example not found</AlertTitle>
        <AlertDescription>
          <div className="text-sm mt-1 leading-loose">
            Example <code className="bg-destructive/5 border-destructive/20 text-destructive">{example}</code> not found. Please check that the
            example is defined in the{" "}
            <code className="whitespace-nowrap bg-destructive/5 border-destructive/20 text-destructive">
              registry/new-york/{component}/examples/{example}
            </code>{" "}
            directory.
          </div>
        </AlertDescription>
      </Alert>
    );
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
