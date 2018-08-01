const list =['javier.segarra.martinez@everis.com']
const res = [];
const dominio = '@everis.com';
 
function formatContacts(){
    list.forEach((element) => {
    res.push({
        name: formatName(element),
        email: element
    })
});
}

function formatName (val){
    val= String(val).replace(dominio,'').split('.');
    let el ='';
    val.forEach((element) => {
        el = el.concat(capitalizeFirstLetter(element), ' ')
    });
    console.log(val, el)
    return el;
//val = val.toCapitalize();
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
module.exports={ formatContacts}