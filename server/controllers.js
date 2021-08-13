import axios from 'axios'
import buttonsJson from './buttons.json'

const hadzibrava = async (req, res, action) => {
  const psw = req.headers.psw
  if (psw !== process.env.PSW) {
    return res.status(403).end()
  }

  try {
    const api = 'http://' + process.env.API_HOST
    const path = process.env.API_ENDPOINT + '?' + action
    await axios({
      method: 'post',
      url: api + path,
    })

    return res.status(200).end()
  } catch (error) {
    console.error(error)
    return res.status(400).end()
  }
}

export const openIntercom = async (req, res) => {
  return await hadzibrava(req, res, 'i=o')
}

export const closeDoor = async (req, res) => {
  return await hadzibrava(req, res, 'd=c')
}

export const openDoor = async (req, res) => {
  return await hadzibrava(req, res, 'd=o')
}

export const authorize = async (req, res) => {
  try {
    const psw = req.headers.psw
    if (psw === process.env.PSW) {
      const buttons = buttonsJson.buttons
      return res.status(200).send({ buttons })
    } else {
      return res.status(403).end()
    }
  } catch (error) {
    console.error(error)
    return res.status(400).end()
  }
}
