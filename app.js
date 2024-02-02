require('express-async-errors');
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const { WarehouseItem } = require("./db/models")

app.get("/items", async (req, res) => {
  const unusedItems = await WarehouseItem.findAll({
    where: {
      isUsed: false
    }
  })
  return res.json(unusedItems)
})

app.put("/items/:id", async (req, res) => {
  const { id } = req.params
  const { name, price, quantity, isUsed} = req.body

  const item = await WarehouseItem.findByPk(id)
  console.log("THE ITEM IS: ", item)
  if(!item){
    return res.status(404).json({
      message: "Warehouse Item not found"
    })
  }

  if(name) item.name = name
  if(price) item.price = price
  if(quantity) item.quantity = quantity
  if(isUsed) item.isUsed = isUsed

  await item.save()

  return res.json(item)
})

if (require.main === module) {
  const port = 8003;
  app.listen(port, () => console.log('Server-3 is listening on port', port));
} else {
  module.exports = app;
}
