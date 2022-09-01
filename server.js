const express = require('express')
const joyas = require('./data/joyas.js')
const { HATEOAS, HATEOAS2, getJoya, filterByCategory } = require('./function.js')
const app = express()
app.listen(3001, () => console.log('SERVER Up on 3001'))


app.get("/api/v1/joyas", (req, res) => {
    res.send({ joyas: HATEOAS() });
  });
  
  app.get("/api/v2/joyas", (req, res) => {
    if (req.query.value == "asc")
      return res.send({ joyas: orderValues(req.query.value) });
    if (req.query.value == "desc")
      return res.send({ joyas: orderValues(req.query.value) });
    
      if (req.query.page)
      return res.send({
        paginas: HATEOAS2().length / 2,
        joyas: HATEOAS2().slice(req.query.page * 2 - 2, req.query.page * 2),
      });
  
    res.send({ joyas: HATEOAS2() });
  });

// Permitir hacer paginación de las joyas usando Query Strings 

//   app.get("/api/v2/joyas", (req, res) => {
//       if (req.query.page)
//       const {page} = req.query;
//       return res.send({
//         paginas: HATEOAS2() / 2,
//         joyas: HATEOAS2().slice(page * 2 - 2, page * 2),
//       });
//     }
//     res.send({ joyas: HATEOAS2() });
//   });


//   Crear una ruta que devuelva como payload un JSON con un mensaje de error cuando
//   el usuario consulte el id de una joya que no exista  
 app.get("/api/v2/joyas/:id", async (req, res) => {
    const { id } = req.params;
    let joya = getJoya(id);
    if (joya) {
      if (req.query.fields) {
        return res
          .status(200)
          .send({ joya: fieldsSelect(joya, req.query.fields.split(",")) });
      }
      res.status(200).send(joya);
    } else {
      res
        .status(404)
        .send({ status: 404, error: `No existe la joya con el id: ${id}` });
    }
  });

//La API REST debe poder ofrecer una ruta con la que se puedan filtrar las joyas por categoría
app.get("/api/v2/joyas/categorias/:category", async (req, res) => {
    const { category } = req.params;
    res.status(200).send({
        cant: filterByCategory(category).length,
        joyas: filterByCategory(category),
    });
});
