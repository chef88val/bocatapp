var btoa =require('btoa')
var atob =require('atob')
function sendEmail(currentPedido) {
    var authEmail = JSON.parse(fs.readFileSync('./config.json', 'utf-8'))
    try {
        console.log(caller, 'try', authEmail)
        nodeoutlook.sendEmail({
            auth: {
                user: authEmail.user,
                pass: authEmail.pass
            },
            from: 'jsegarrm@everis.com',
            to: listUsersToNotify,
            subject: `Pedido del dia ${utils.returnMomentFormat()}!`,
            html: `Para el dia de hoy ${utils.returnMomentFormat()}, el encargado de llamar será
            ${caller.name}, usa este <a href='http://${utils.getIPAddress()}'>enlace</a> para llamar.
            Para el resto, este es vuestro enlace para reservar.`,
            text: 'This is text version!'
        });
    } catch (error) {
        console.log(error)
    }

}

function sendEmailRegister(email) {
    var authEmail = JSON.parse(fs.readFileSync('./config.json', 'utf-8'))
    try {
        console.log(caller, 'try', authEmail)
        nodeoutlook.sendEmail({
            auth: {
                user: authEmail.user,
                pass: authEmail.pass
            },
            from: 'jsegarrm@everis.com',
            to: listUsersToNotify,
            subject: `Bienvenido a BocatApp!`,
            html: `Utiliza este <a href='http://${utils.getIPAddress()}/new/${btoa(email)}'>link</a> para registrate en la plataforma.
            Para el resto, este es vuestro enlace para reservar.`,
            text: 'This is text version!'
        });
    } catch (error) {
        console.log(error)
    }

}

module.exports ={
    sendEmail, sendEmailRegister
}