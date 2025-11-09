import { ConveyorApi } from '@/lib/preload/shared'

export class AppApi extends ConveyorApi {
  version = () => this.invoke('version')
  compileAndRun = (source: string) => this.invoke('compileAndRun', { source })
}
