const { ipcRenderer } = require('electron')

let button = document.getElementById('login')

button.addEventListener('click', () => {

    let username = document.getElementById('username').value,
        password = document.getElementById('password').value,
        textError = document.getElementById('loginError')


    if (validate(username, password)) {

        let login = { username: username, password: password }
        ipcRenderer.send('onLogin', login)
        window.close()
    }
    else textError.innerText = 'Datos de acceso vacios'

})


let validate = (username, password) => {

    if (username == '' || password == '') return false

    else return true

}

document.addEventListener('keydown', (evt) => {
    if(evt.keyCode==13){
        button.click()
    }
})