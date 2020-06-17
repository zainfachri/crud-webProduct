const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'arkademy'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM produk',
    (error, results) => {
      res.render('index.ejs', {produk: results});
    }
  );
});

app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM produk',
    (error, results) => {
      res.render('index.ejs', {produk: results});
    }
  );
});

app.get('/tambah', (req, res) => {
  res.render('tambah.ejs');
});


app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO produk (nama_produk, keterangan, harga, jumlah) VALUES (?, ?, ?, ?)',
    [req.body.itemName, req.body.itemDesc, req.body.itemPrice, req.body.itemAmount],
    (error, results) => {
      res.redirect('/');
    }
  );
});

app.post('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM produk WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/');
    }
  );
});

app.get('/edit/:id', (req, res) => {
  connection.query(
    'SELECT * FROM produk WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {item: results[0]});
    }
  );
});

app.post('/update/:id', (req, res) => {
  connection.query('UPDATE produk SET nama_produk = ?, keterangan = ?, harga = ?, jumlah = ? WHERE id = ?',
  [req.body.itemName, req.body.itemDesc, req.body.itemPrice, req.body.itemAmount, req.params.id],
  (error, results)=>{
    res.redirect('/');
  })
});

app.listen(3000);
