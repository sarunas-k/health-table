import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    createUser: (data) => void
  }
}