"use strict"
let keyfile = JSON.stringify({
  "type": "service_account",
  "project_id": "project-sirius-1510852092492",
  "private_key_id": "e85419d229faf7d7202706856f713bc44a69b699",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDOTXiyBlUXVlX2\nSwEdj462FTsqmTDaenoEGFgomX80+fFLjVsRuuAI2Y77ByrAIRJHjrXJcZ3cqTLq\nrIT6IVgdJEh9u6RN20f+1HvmFff0rXos3puz0Wykkh698bq/av8P5eduhmtCp0Co\nafh6+2dhzJ3A3iU3MBjVG7Wcaai/VeFvYOP8ijrJgKjiSor4vI1LRYXXW3+YcedY\n0Ggx+43zSUQXbJjB1FQg4MiMbsXf98+308WTDUZ7aV3sljXcQRUYaPy5NQw8V6rb\n3hYrnI85zL2qN5HHfBTfFeUoTwp9llXsDqaoDgju+Ktgywr5YZXte6BztbRSD5/f\nrXzGL+GJAgMBAAECggEADfUSFbpFsr3ftDlsFoXGPhWm4nmJg3h+jY0flsSWxXzk\n+Stztjn+Sv78FEnud5/tKovyStIN3/ZPCG86Umlj2pngMSh7I9zSbMBPrxf8pfBA\nKC2520Mvjl1H6OokLCvnHHpdi13a/yANaO99dQWR/5z+LcShwC93+KAGrBG+bc5Y\no66srAC0slwn24DcozpYjZWSEBWRb9ccy8ZDwnem3uLACiIsHsyL+EVJP6qBgpSG\nW+x97OWN1tlzJNW82zxuDSTMMv6zgo0to+PSlVi28Xj+bfhHz1FlzhSFEnlYh65V\nxAXZ4aOQ/Yit1eezlsJcdamBbukx0pjTUTONzsAFkQKBgQDuTeA7PA7J0GeB9kya\nE+CuuSzjfCgLpXDTXP9i0RL19RjbBAuEGZIuxp7xl3VxmbZvVpGwYhv9oTQtsbi4\nOHtP0zodH4JdVCbIrKj0mL4GZiCQIHR/baHoMJbSLlCau8HZeUkxWoeLvOffz3Ad\nzfoweJHA8Ag9mBCaIRwv/S4zkQKBgQDdn0AwgPMIWWfHFyNPf6OcHnwMom1EtgJV\nTF0eXYsTay7Vjm8eK892zw1c0QDajylAxY5y9ocqCmiwwiaKARafT5lV7jd6j42m\nK3Tusoc4DHuEqJpuHI1XOmO6Ci/NPVD2r7iCSX50wpgNZ7XDEvgufyRtexTv7AYz\nhXVY69xieQKBgQCE/GafB9QE4c1xpF55OZCQUPxw8s9yOGAvQ92tapmXMrEtQCOh\nE5gVjHgUwH4k6C/8ECZ7dTTDpJt2yJAaFkMSeAEdUYExzg1avagH39ljvsh7RfFd\nT3QkHEF+h6QpxY/XaizjYu7zl3ca2itqJpFxTUehkRI4NU1GhiWxzitjUQKBgA5+\nYbZKWJqNLkpI6xhB4rNNExPIc5jwxkpJyjU4LOZCNjflLsMsXk8Iz3joekPQ5QPF\nZ8GA+en38EzPBbI0zAPzMrX59ErhpIPfh7AsoMc7mcBdPmxBFcVEnk0GaYXkoqzf\nZROwNsLwDv2hcLOnQ+/WhM1cJUxjhSxNaBU+p5URAoGAIXR2et3Oi5s39ythrNl5\nSKMcUje4AlgGpm+B6QBOQtkU+IEMeo6DCcnN4HU0bi+A1x4fP0DZzr3GJkjTNhUD\nQ+8z1avFpNyr/3XMVhWS/Z5VvG5Q5xhwwEjsHpV/awSXJQYI+F4fHZdGY/mBjMc9\nGEvXBLFPw88gTozxXRhDI7c=\n-----END PRIVATE KEY-----\n",
  "client_email": "keyfilename@project-sirius-1510852092492.iam.gserviceaccount.com",
  "client_id": "104359742754978365552",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/keyfilename%40project-sirius-1510852092492.iam.gserviceaccount.com"
})



const path = require('path')
const functions = require('firebase-functions')

const Storage = require('@google-cloud/storage')
const bucketName = 'jualrumahku'

const storage = Storage({
    projectId : functions.config().project.id,
    keyFilename : JSON.parse(keyfile)
})

const bucket = storage.bucket(bucketName)

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${bucketName}/${filename}`
}


const sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    return next()
  }
  const gcsname = Date.now() + req.file.originalname
  const file = bucket.file(gcsname)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
      console.log(req.file, 'stream on')
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
      next()
    })

  })

  stream.end(req.file.buffer)
  return
}

const Multer = require("multer"),
  multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 10 * 1024 * 1024
    },
    fileFilter: function (req, file, cb) {
      var filetypes = /jpeg|jpg|png/;
      var mimetype = filetypes.test(file.mimetype);
      var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

      if (mimetype && extname) {
        return cb(null, true);
      }

      cb("Error: File type not supported");
    }
  })


module.exports = {
  multer,
  getPublicUrl,
  sendUploadToGCS
}