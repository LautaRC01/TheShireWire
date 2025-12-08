/* ====================  L • R • C |  2 0 2 5  ==================== */

import express from 'express';
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//////////////////////////////////////////////////////////////

let posts = [];

app.get('/', (req, res) => {
  res.render('index.ejs', { title: 'Home Page' });
});

app.post('/post', (req, res) => {
    const {title, author, content} = req.body;
    const newPost = {
      id: Date.now(),
      title,
      author,
      content
    }
    
    posts.push(newPost);
    res.redirect('/posts');                                //redirect para que no se reenvie el formulario al actualizar la pagina
});

app.get('/posts', (req, res) => {
    res.render('posts.ejs', { title: 'All Posts', posts });
});




// Endpoint DELETE para borrar un post por id
app.delete('/posts/:id', (req, res) => {
  const idParam = req.params.id;     // viene como string
  const id = Number(idParam);        // convertimos a número (si usás números)
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const originalLength = posts.length;
  posts = posts.filter(p => p.id !== id); // filter devuelve un nuevo array sin el id
  if (posts.length === originalLength) {
    // no se eliminó nada (id no encontrado)
    return res.status(404).json({ error: 'Post no encontrado' });
  }
  // éxito: respondemos 200 OK (o 204 No Content)
  return res.status(200).json({ success: true });
});




//////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});