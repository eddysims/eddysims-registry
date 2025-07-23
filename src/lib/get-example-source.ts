import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export function getExampleSource(filePath: string, functionName?: string): string {
  try {
    const fullPath = join(process.cwd(), 'src', filePath)
    const content = readFileSync(fullPath, 'utf-8')
    
    if (!functionName) {
      return content
    }
    
    // Extract specific function from the file
    const functionRegex = new RegExp(
      `export function ${functionName}[^{]*{[\\s\\S]*?^}`,
      'gm'
    )
    
    const match = content.match(functionRegex)
    if (match) {
      return match[0].trim()
    }
    
    // Fallback: try to find the function with different patterns
    const altRegex = new RegExp(
      `function ${functionName}[^{]*{[\\s\\S]*?^}`,
      'gm'
    )
    
    const altMatch = content.match(altRegex)
    if (altMatch) {
      return `export ${altMatch[0].trim()}`
    }
    
    console.warn(`Function ${functionName} not found in ${filePath}`)
    return content
    
  } catch (error) {
    console.error(`Error reading example source from ${filePath}:`, error)
    return `// Error loading example code from ${filePath}`
  }
}

export function createExampleCode(
  imports: string[],
  functionContent: string,
  componentName?: string
): string {
  const importLines = imports.join('\n')
  
  if (componentName) {
    // Add the component import
    const componentImport = `import { ${componentName} } from "@/components/ui/${componentName.toLowerCase()}"`
    return `${componentImport}\n${importLines}\n\n${functionContent}`
  }
  
  return `${importLines}\n\n${functionContent}`
} 