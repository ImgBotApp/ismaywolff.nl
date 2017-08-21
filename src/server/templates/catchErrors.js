import { __ERROR_EVENTS__ } from '../../constants'

const catchErrors = `
  <script>
    addEventListener('error', window.${__ERROR_EVENTS__}=function f(e){f.q=f.q||[];f.q.push(e)});
  </script>
`

export default catchErrors
