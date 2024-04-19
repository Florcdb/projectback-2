const Task = require('../models/Task')

const TaskController = {
    async create (req, res){
      try{
        const task = await Task.create({...req.body, completed: false})
        res.status(201).send(task)
      } catch(error){
        console.log(error)
     }
    },
    async getAll (req, res) {
      try{
       const task = await Task.find()
       res.json(task)
      } catch(error){
        console.log(error)
      }
    },
    async getALLSSR (req, res){
      try{ 
        const nombreImagen = {
        "camisa": "camisa",
        "collar": "collar",
        "gorra": "gorra",
        "pantalon-fiesta": "pantalon-fiesta",
        "pantalon": "pantalon",
        "tacon": "tacon",
        "vestido-largo": "vestido-largo"}
        const extension = 'jpeg'
        const task = await Task.find()
        res.send(`
        <head>         <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
        <h1 class="titulo"> Z-CLOTHES <h1>
        <form action="/createNewProduct" method="POST">
        <h2>Añade un nuevo producto</h2>
        <p>
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required>
        <br>
        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" name="descripcion" required></textarea>
        <br>
        <label for="categoria">Categoría:</label>
        <input type="text" id="categoria" name="categoria" required>
        <br>
        <label for="talla">Talla:</label>
        <input type="text" id="talla" name="talla" required>
        <br>
        <label for="precio">Precio:</label>
        <input type="number" id="precio" name="precio" step="0.01" required>
        <br>
        <p>
        <button type="submit">Crear nuevo producto</button>
      </form> </body>
            ${task.map(task => {
              return (`
               <div class="product">
               <h2>${task.nombre}<h2>
               <img src="/assets/camisa.jpeg" alt="Imagen del producto">
               <p>Descripción:${task.descripcion}<p>
               <p> Categoría: ${task.categoria}<p>
               <p> Talla:${task.talla}<p>
               <p>${task.precio}€<p>
               </div>`)
            }).join('')}
        `)
      } catch (error){
        console.log(error)
      }
    },
    async getByID (req, res){
      try{
       const id = req.params._id
       const task = await Task.findById(id)
       res.json(task)
      } catch (error){
      console.log(error)
    }
  },
   async deleteTask (req, res) {
    try{
      const id = req.params._id
      const deleteTask = await Task.findByIdAndDelete(id)
      if(!deleteTask) {
        return res.status(404).json({mensaje: "El producto no existe"})
      }
      res.json({mensaje: "Producto eliminado", deleteTask})
    } catch (error){
    console.log(error)
    }
   },
   async updateCompleted (req, res){
      try {
        const id = req.params._id;
        const udpatedTask = await Task.findByIdAndUpdate(
          id, {
            completed: true
          }, {new: true}
        )
        if(!udpatedTask) {
          return res.status(404).json({mensaje: 'Producto no encontrado'})
        } 
        res.json(udpatedTask)
      } catch (error) {
        console.log(error)
      }
  }, 
  async updateByName(req, res) {
    try {
      const id = req.params._id
      const title = req.body.title
      const updateTitleTask = await Task.findByIdAndUpdate(
        id, {
          title
        }, {new: true}
      )
      res.json(updateTitleTask)
    } catch (error) {
      console.log(error)
    }
  }, 
  async createTask (req, res) {
    try {
      const { nombre, descripcion, categoria, talla, precio } = req.body;
      const createNewProduct = await Task.create({ nombre, descripcion, categoria, talla, precio });
      res.send(`
        <body>
          <h1>Product Created Successfully</h1>
          <h2>Nombre:${createNewProduct.nombre}</h2>
          <p>Descripción:${createNewProduct.descripcion}</p>
          <p>Categoría:${createNewProduct.categoria}</p>
          <p>Talla:${createNewProduct.talla}</p>
          <p>Precio:${createNewProduct.precio}€</p>
        </body>
        </html>
      `);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating product');
    }
  
    }, async editSSR(req, res) {
     try{
    const id= req.params.id;
    const task= await Task.findById(id);
     if(!task){
      return res.status(404).send('Product not found');
    }
    res.send( `
    <h1> Editar Producto </h1>
    <form action="${task._id}/editSSR" method="POST">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" value="${task.nombre}" required>
        <br>
        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" name="descripcion" required>${task.descripcion}</textarea>
        <br>
        <label for="precio">Precio:</label>
        <input type="number" id="precio" name="precio" step="0.01" value="${task.precio}" required>
        <br>
        <button type="submit">Actualizar producto</button>
    </form>
    <form action="${task._id}/delete" method="POST">
        <button type="submit">Delete Product</button>
    </form>
`);
} catch (error) {
    console.error(error);
    res.status(500).send('Error rendering edit product page');
     }
  }
}





module.exports = TaskController