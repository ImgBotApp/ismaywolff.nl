export const getImageEntities = state => state.entities.images
export const getImageState = state => state.images
export const checkHasImages = state => state.images.result.length > 0

/**
 * Checks whether images should be fetched based on the current state
 */

export const shouldFetchImages = state => {
  const hasImages = checkHasImages(state)
  const imageState = getImageState(state)

  if (imageState.isFetching) {
    return false
  } else if (!hasImages) {
    return true
  }

  return false
}
