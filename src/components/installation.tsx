"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

interface InstallationProps {
  componentName: string
  registryUrl?: string
  dependencies?: string[]
  devDependencies?: string[]
  files?: Array<{
    path: string
    content: string
  }>
}

export function Installation({ 
  componentName, 
  registryUrl = "http://localhost:3000",
  dependencies = [],
  devDependencies = [],
  files = []
}: InstallationProps) {
  const [activeTab, setActiveTab] = useState<"cli" | "manual">("cli")
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const cliCommand = `npx shadcn@latest add ${registryUrl}/r/${componentName}`

  const CopyButton = ({ text, id }: { text: string; id: string }) => (
    <button
      type="button"
      onClick={() => copyToClipboard(text, id)}
      className="absolute top-2 right-2 p-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
      title="Copy to clipboard"
    >
      {copied === id ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  )

  return (
    <div className="rounded-lg border bg-background">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          type="button"
          onClick={() => setActiveTab("cli")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "cli"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          CLI
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("manual")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "manual"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Manual
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === "cli" ? (
          <div className="space-y-4">
            <div className="relative">
              <pre className="p-4 rounded-md bg-muted text-sm overflow-x-auto">
                <code>{cliCommand}</code>
              </pre>
              <CopyButton text={cliCommand} id="cli-command" />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Dependencies */}
            {(dependencies.length > 0 || devDependencies.length > 0) && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Install the following dependencies:
                </p>
                
                {dependencies.length > 0 && (
                  <div className="relative">
                    <pre className="p-4 rounded-md bg-muted text-sm overflow-x-auto">
                      <code>npm install {dependencies.join(" ")}</code>
                    </pre>
                    <CopyButton 
                      text={`npm install ${dependencies.join(" ")}`} 
                      id="dependencies" 
                    />
                  </div>
                )}

                {devDependencies.length > 0 && (
                  <div className="relative">
                    <pre className="p-4 rounded-md bg-muted text-sm overflow-x-auto">
                      <code>npm install -D {devDependencies.join(" ")}</code>
                    </pre>
                    <CopyButton 
                      text={`npm install -D ${devDependencies.join(" ")}`} 
                      id="dev-dependencies" 
                    />
                  </div>
                )}
              </div>
            )}

            {/* Files */}
            {files.length > 0 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Copy and paste the following code into your project.
                </p>
                
                {files.map((file, index) => (
                  <div key={file.path} className="space-y-2">
                    <p className="text-sm font-medium">{file.path}</p>
                    <div className="relative">
                      <pre className="p-4 rounded-md bg-muted text-sm overflow-x-auto max-h-96">
                        <code>{file.content}</code>
                      </pre>
                      <CopyButton 
                        text={file.content} 
                        id={`file-${file.path}`} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {files.length === 0 && dependencies.length === 0 && devDependencies.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No manual installation steps required for this component.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 