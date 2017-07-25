import { combineReducers } from 'redux'
import newsletter from './components/newsletter'
import entities from './data/entities'
import images from './data/images'
import works from './data/works'

export default combineReducers({
  entities,
  images,
  newsletter,
  works
})
