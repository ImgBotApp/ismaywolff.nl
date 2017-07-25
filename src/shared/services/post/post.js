/* global Headers */

import fetchy from '../fetchy'

const post = (endpoint, data) => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  })
  const init = {
    method: 'POST',
    body: JSON.stringify(data),
    headers
  }

  return fetchy(endpoint, init)
}

export default post
