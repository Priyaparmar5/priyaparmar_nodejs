const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();
//const verifyToken = require('./middlewares/authMiddleware');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())
// app.get('/api/protected', verifyToken, (req, res) => {
//   res.json({ message: 'Protected route accessed successfully' });
// });

require('dotenv').config()
const PORT=process.env.SERVER_PORT | 3001;


const user = require("./routes/user.routes");


app.use(user);


app.listen(PORT, () => {
  console.log(`server is running ${PORT}...`);
});
