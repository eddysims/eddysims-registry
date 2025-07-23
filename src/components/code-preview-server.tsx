import { CodePreview } from './code-preview'
import { getExampleSource, createExampleCode } from '@/lib/get-example-source'

interface CodePreviewServerProps {
  title: string
  children: React.ReactNode
  filePath: string
  functionName: string
  imports?: string[]
  componentName?: string
}

export function CodePreviewServer({ 
  title,
  children,
  filePath,
  functionName,
  imports = [],
  componentName
}: CodePreviewServerProps) {
  const functionContent = getExampleSource(filePath, functionName)
  const code = createExampleCode(imports, functionContent, componentName)
  
  return (
    <CodePreview title={title} code={code}>
      {children}
    </CodePreview>
  )
} 