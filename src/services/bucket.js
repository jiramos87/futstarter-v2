import AWS from 'aws-sdk'

import { PLAYERS_IMAGES_BUCKET } from '../constants/bucket'

const REGION = process.env.AWS_REGION || ''

const s3 = new AWS.S3({ region: REGION })

export const uploadPlayerImageToS3 = async (imageBuffer, playerId) => {
  const params = {
    Bucket: PLAYERS_IMAGES_BUCKET,
    Key: `${playerId}.png`,
    Body: imageBuffer,
    ContentType: 'image/png'
  }

  const { Location } = await s3.upload(params).promise()

  return Location
}

export const checkIfImageExists = async (playerId) => {
  try {
    const response = await s3.headObject({ Bucket: PLAYERS_IMAGES_BUCKET, Key: `${playerId}.png` }).promise()
    console.log('response', response)
    return true
  } catch (error) {
    console.log('error', error.code)
    if (error.code === 'NotFound') {
      return false
    }
    throw error
  }
}
