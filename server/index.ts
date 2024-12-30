import express from 'express'

const app = express();

app.get('/', (req: any, res: any) => {
  return res.send("ok");
})

app.listen(7000, () => {
  console.log('The server is running locally on 7000 port: http://localhost:7000');
})