const express = require('express');
const morgan = require('morgan');
const apps = require('./playstore');

const app = express();

app.use(morgan('common'));



app.get('/apps', (req, res) => {

  const {sort, genres} = req.query;

  let newApps = [...apps];


  if (sort && !['Rating', 'App'].includes(sort)) {
    return res.status(400).json({error: 'sort must include \'Rating\' or \'App\''});
  }

  if (sort){
    newApps.sort((a, b) => a[sort] < b[sort] ? -1 : 1);
  }

  if (genres && !['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
    return res.status(400).json({error: 'genre must include \'Action\', \'Puzzle\', \'Strategy\', \'Casual\', \'Arcade\' or \'Card\''});
  }

  if (genres){
    newApps = newApps.filter(app => app.Genres.includes(genres));
  }

  res.json(newApps);

});


app.listen(8080, () => {
  console.log('Server started on PORT 8080');
});