const isProd = process.env.NODE_ENV === 'production'
/* istanbul ignore next: can't be reached because testing uses different env */
const DOMAIN = isProd ? 'cdn' : 'preview'
const BASE = `https://${DOMAIN}.contentful.com/spaces/${process.env.SPACE_ID}`

export const WORKS = `${BASE}/entries?content_type=works&order=-fields.published`
export const ARTICLES = `${BASE}/entries?content_type=writing&order=-sys.createdAt`
export const IMAGES = `${BASE}/assets?mimetype_group=image`