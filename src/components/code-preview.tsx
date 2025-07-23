"use client"

import { useState } from "react"
import { Check, Copy, Code } from "lucide-react"

interface CodePreviewProps {
  children: React.ReactNode
  code: string
  title?: string
}

export function CodePreview({ children, code, title }: CodePreviewProps) {
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <div className="relative rounded-lg border bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b">
        {title && <span className="text-sm font-medium">{title}</span>}
        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={() => setShowCode(!showCode)}
            className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md hover:bg-muted transition-colors"
            title={showCode ? "Show preview" : "Show code"}
          >
            <Code className="h-3 w-3" />
            {showCode ? "Preview" : "Code"}
          </button>
          <button
            type="button"
            onClick={copyToClipboard}
            className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md hover:bg-muted transition-colors"
            title="Copy code"
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {showCode ? (
          <pre className="text-sm overflow-x-auto">
            <code className="text-foreground">{code}</code>
          </pre>
        ) : (
          <div className="flex items-center justify-center min-h-[200px]">
            {children}
          </div>
        )}
      </div>
    </div>
  )
} 