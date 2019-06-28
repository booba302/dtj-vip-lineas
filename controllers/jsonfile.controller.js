const jsonfile = require('jsonfile')
const config = require('../config')
const encryptor = require('simple-encryptor')('Q1IQ1IPYm4FJnPYm4FJn');

const jsonCtrl = {}

jsonCtrl.readLoginJson = () => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile(config.file, (err, login) => {

            if (err) reject(err)
            if (login == null) reject(err)
            if (login.username == '' || login.password == '') reject({ message: 'Empty login' })
            login.password = encryptor.decrypt(login.password)
            resolve(login)

        })
    })
}

jsonCtrl.writeLoginJson = (login) => {
    return new Promise((resolve, reject) => {
        login.password = encryptor.encrypt(login.password)

        jsonfile.writeFileSync(config.file, login, (err) => {
            if (err) reject(err)
            resolve({ message: 'File write' })
        })
    })
}

module.exports = jsonCtrl