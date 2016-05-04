export default function GetPictureData (base64image) {
  return {
    filename: createName(),
    content: base64image.split(',')[1],
    content_type: extractType(base64image)
  }
}

function extractType (base64image) {
  return base64image.split(',')[0].replace(/data\:/, '')
}

function createName () {
  return Math.random().toString(36).replace(/[^a-z]+/g, '')
}
