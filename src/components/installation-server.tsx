import { Installation } from './installation'
import { getComponentSource } from '@/lib/get-component-source'

interface InstallationServerProps {
  componentName: string
  registryUrl?: string
}

export function InstallationServer({ 
  componentName, 
  registryUrl = "http://localhost:3000" 
}: InstallationServerProps) {
  const { dependencies, files } = getComponentSource(componentName)
  
  return (
    <Installation
      componentName={componentName}
      registryUrl={registryUrl}
      dependencies={dependencies}
      files={files}
    />
  )
} 