import { getConnection, querys, sql } from "./database";
const express =require('express');
const app =express();

app.use(express.json());

const users = [
    {
        id: 1,
        email: 'usuario1',
        password: 'password1'
    },
    {
        id: 2,
        email: 'usuario2',
        password: 'password2'
    }
]
export const getusuarios = async (req,res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query(querys.getUsuarios);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

app.get('/',(req,res) => {
    res.send('nuestra api');
});

app.get('/api/users',(req,res) => {
    getUsuarios(req,res);
});
app.get('/api/users/:id', (reg,res) => {
    const user=users.find(c => c.id === parseInt(reg.params.id));
    if(!user) return res.status(404).send('usuario no encontrado');
    else res.send(user);
})
app.post('/api/users',(req,res) => {
    const user = {
        id: users.length + 1,
        email: req.body.email,
        password: req.body.password
    };
    users.push(user);
    res.send(user);
});




app.delete('/api/users/:id', (req,res)=>{
    const user = users.find(c => c.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('usuario no encontrado');

    const index = users.indexOf(user);
    users.splice(index, 1);
    res.send(user);
});

const port = process.env.port || 80;
app.listen(port,()=>console.log(`Escuchando en puerto ${port}...`));


