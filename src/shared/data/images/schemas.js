import { schema } from 'normalizr'

export const images = new schema.Entity(
  'images',
  {},
  {
    processStrategy: value => ({
      title: value.fields.title,
      url: value.fields.file.url,
      width: value.fields.file.details.image.width,
      height: value.fields.file.details.image.height
    }),
    idAttribute: value => value.sys.id
  }
)
