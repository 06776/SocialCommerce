const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Shop = require("../models/shop");

mongoose
  .connect(
    "mongodb+srv://socialcommerce:W3K3hjztCrft@socialcommerce.xuhc4r5.mongodb.net/SocialCommerce",
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
      password: "Teszt12345",
      description: "Eladó",
      address: "Teszt utca, 11",
      phoneNumber: 123456789,
      role: "Seller",
      zipCode: 2468,
      avatar: {
        public_id: "example-public-id",
        url: "example-avatar-url",
      },
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
