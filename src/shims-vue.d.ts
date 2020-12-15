declare module '*.json' {
  const value: unknown;
  export default value;
}

declare module '*.vue' {
  import { Component } from 'vue'
  var component: Component
  export default component
}
