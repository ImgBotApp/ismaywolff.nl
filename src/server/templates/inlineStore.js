const inlineStore = preloadedState => `
  <script>
    window.__PRELOADEDSTATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
  </script>
`

export default inlineStore
