const { carsModel } = require("../model/carSchma");
const express = require("express");
const router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
  const data = await carsModel.find();
  res.send(data);
});

router.get("/:id", async (req, res) => {
  try {
    const data = await carsModel.findById(req.params.id);
    if (!data) {
      return res.status(404).send("this id dont have a data");
    }
    res.send(data);
  } catch (err) {
    res.status(404).send("your id length most be 24");
  }
});

router.post("/", async (req, res) => {
  // use try catch cuz send error message, because using shcma valid not joi
  try {
    let newCars = new carsModel({
      name: req.body.name,
      typeCar: req.body.typeCar,
      fuel: req.body.fuel,
      capacity: req.body.capacity,
      price: req.body.price,
      fav: req.body.fav,
      img: req.body.img,
      caption: req.body.caption,
      reviewer: req.body.reviewer,
      views: req.body.views,
      reviews: req.body.reviews,
    });
    const data = await carsModel.find();
    const findName = data.find(
      (items) => items.name === req.body.name
    );
    if (findName) {
      res.status(404).send("we have this name chose other name");
      return null;
    }
    newCars = await newCars.save();
    res.send(newCars);
  } catch (err) {
    res.send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  const data = await carsModel.findByIdAndDelete(req.params.id);
  if (!data) {
    return res.status(404).send("this id is worng");
  }
  res.send(data);
});

router.put("/:id", async (req, res) => {
  // console.log(req.body);

  try {
    const data = await carsModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        typeCar: req.body.typeCar,
        fav: req.body.fav,
        price: req.body.price,
        caption: req.body.caption,
      },
      {
        new: true,
      }
    );
    if (
      !req.body.name ||
      !req.body.typeCar ||
      !req.body.fav ||
      !req.body.price ||
      !req.body.caption
    ) {
      return res.status(400).send(`you need set body: "name:String" , 
      "typeCar":String , "fav:Boolean" , "price:Number" , "caption:String"`);
    }

    if (!data) {
      return res
        .status(404)
        .send("someting worng check id and key-values");
    }

    res.send(data);
  } catch (err) {
    res.send(err.reason.message);
  }
});

module.exports = router;
