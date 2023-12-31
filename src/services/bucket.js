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

    return true
  } catch (error) {
    if (error.code === 'NotFound') {
      return false
    }
    throw error
  }
}
