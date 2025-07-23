import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export interface ComponentFile {
  path: string
  content: string
}

export function getComponentSource(componentName: string): {
  dependencies: string[]
  files: ComponentFile[]
} {
  const registryPath = join(process.cwd(), 'registry', 'default', componentName)
  const utilsPath = join(process.cwd(), 'src', 'lib', 'utils.ts')
  
  try {
    // Read the main component file
    const componentContent = readFileSync(
      join(registryPath, `${componentName}.tsx`), 
      'utf-8'
    )
    
    // Read utils file
    const utilsContent = readFileSync(utilsPath, 'utf-8')
    
    // Extract dependencies from the component content
    const dependencies: string[] = []
    
    // Check for common dependencies based on imports
    if (componentContent.includes('clsx') || utilsContent.includes('clsx')) {
      dependencies.push('clsx')
    }
    if (componentContent.includes('tailwind-merge') || utilsContent.includes('tailwind-merge')) {
      dependencies.push('tailwind-merge')
    }
    
    return {
      dependencies,
      files: [
        
        {
          path: `components/ui/${componentName}.tsx`,
          content: componentContent
        }
      ]
    }
  } catch (error) {
    console.error(`Error reading component source for ${componentName}:`, error)
    return {
      dependencies: [],
      files: []
    }
  }
} 