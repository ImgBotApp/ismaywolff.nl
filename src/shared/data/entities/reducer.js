const initialState = {
  images: {},
  works: {}
}

// Checks whether the action payload has entities of a specific type
const hasEntities = (action, entityKey) =>
  action.payload && action.payload.entities && action.payload.entities[entityKey]

// Returns a clone of the state with merged entities of a specific type
const mergeEntities = (action, entityKey, state) => {
  const entities = Object.assign({}, state[entityKey], action.payload.entities[entityKey])
  return Object.assign({}, state, { [entityKey]: entities })
}

const entities = (state = initialState, action) => {
  if (hasEntities(action, 'images')) {
    return mergeEntities(action, 'images', state)
  }

  if (hasEntities(action, 'works')) {
    return mergeEntities(action, 'works', state)
  }

  return state
}

export default entities
