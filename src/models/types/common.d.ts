import 'pinia'
import 'vue'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    createUser: (data) => void
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    rootPath?: string;
    assetsPath?: string;
    iconsPath?: string;
  }
}