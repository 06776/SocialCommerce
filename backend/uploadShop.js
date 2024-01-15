const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Shop = require("./model/shop");

mongoose
  .connect(
    "",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Sikeresen csatlakozva a MongoDB-hez");

    const shopData = {
      name: "Minta János",
      email: "mintajanos@gmail.com",
      password: "Teszt1234",
      description: "Teszt eladó",
      address: "Teszt utca, 11",
      phoneNumber: 123456789,
      role: "Seller",
      avatar: {
        public_id: "example-public-id",
        url: "example-avatar-url",
      },
      zipCode: 1234,
      availableBalance: 0,
    };

    const shop = new Shop(shopData);
    shop
      .save()
      .then(() => {
        console.log("Az eladó létre hozva és mentve az adatbázisba");
      })
      .catch((error) => {
        console.error(
          "Hiba történt az eladó adatainak mentése során: ",
          error.message
        );
      })
      .finally(() => {
        mongoose.connection.close();
      });
  })
  .catch((error) => {
    console.error(
      "Hiba történt a MongoDB-hez való csatlakozás során: ",
      error.message
    );
  });
