const path = require('path')

const banca = '?c=119&p=5463';

file = path.join(__dirname, '../data.json'),
    URLKENO = 'http://www.dtodojuego.com/virtual-play/lobby',
    URLLOGIN = 'http://www.dtodojuego.com/usuarios/iniciar-sesion',
    URLHOME = 'http://www.dtodojuego.com/',
    URLLOGOUT = 'http://www.dtodojuego.com/usuarios/cerrar-sesion',
    URLLINEA = `http://45.79.135.28/mipelota/mlb.php${banca}`,
    //URLLINEA = 'http://45.79.135.28/mipelota/loteria.php',
    icon = __dirname + '/public/assets/icon.ico'



module.exports = { file, URLHOME, URLKENO, URLLOGIN, URLLOGOUT, icon, URLLINEA }