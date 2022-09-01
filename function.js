const joyas = require('./data/joyas.js')


//Crear una ruta para la devolución de todas las joyas aplicando HATEOAS.
exports.HATEOAS = () => {
    let data = joyas.results.map((item) => {
        return {
            name: item.name,
            href: `http://localhost:3001/joyas/${item.id}`,
        };
    });
    return data;
};


//Hacer una segunda versión de la API que ofrezca los mismos datos pero con los nombres de las propiedades diferentes

exports.HATEOAS2 = () => {
    let data = joyas.results.map((item) => {
        return {
            joya: item.name,
            src: `http://localhost:3001/joyas/${item.id}`,
        };
    });
    return data;
};

exports.orderValues=(order)=>{
    if(order == 'asc') return joyas.results.sort((a,b)=>a.value - b.value)
    if(order == 'desc') return joyas.results.sort((a,b)=>b.value - a.value)
}
exports.getJoya = (id) => {
    return joyas.results.find((item) => item.id == id);
};


//La API REST debe poder ofrecer una ruta con la que se puedan filtrar las joyas por categoría
exports.filterByCategory = (category) => {
    return joyas.results.filter((item) => item.category == category);
};

//Crear una ruta que permita el filtrado por campos de una joya a consultar.
exports.fieldsSelect = (joya, fields) => {
    for (let propiedad in joya) {
        if (!fields.includes(propiedad)) {
            delete joya[propiedad];
        }
    }
    return joya;
};
