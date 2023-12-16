import express from 'express';
import Task from './models/Task.js';

const app = express();
app.use(express.urlencoded({ extended: true }));


app.post("/add", async function (req, res) {
  const task = new Task();
  task.task = req.body.task
  await task.save();
  res.redirect('/');
});

app.get("/acheter/:idtv", async function (req, res) {
  const tv = await Task.load({ idtv: req.params.idtv});
  tv.bought = 1;
  await tv.save();
  res.redirect('/');
});

app.get("/delete/:idtv", async function (req, res) {
  await Task.delete({ idtv : req.params.idtv });
  res.redirect('/');
});

app.get("/", async function (req, res) {
  const tasks = await Task.loadMany({bought : 0});
  const owned = await Task.loadMany({bought : 1});
  res.render('listTasks.ejs', { tasks, owned});
});

app.listen(4000);
