declare module '*.vue' {
  import { Component } from 'vue'
  var component: Component
  export default component
}

declare module '*.json' {
  const value: unknown;
  export default value;
}