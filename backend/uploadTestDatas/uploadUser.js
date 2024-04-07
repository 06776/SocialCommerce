const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../model/user");

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

    const userData = {
      name: "Minta Péter",
      email: "mintapeter@gmail.com",
      password: "Teszt1234",
      phoneNumber: 123456789,
      addresses: [
        {
          country: "HU",
          city: "Budapest",
          address1: "Teszt utca",
          address2: "12",
          zipCode: 1234,
          addressType: "Otthon",
        },
      ],
      role: "user",
    };

    const user = new User(userData);
    user
      .save()
      .then(() => {
        console.log("A felhasználó létre hozva és mentve az adatbázisba");
      })
      .catch((error) => {
        console.error(
          "Hiba történt a felhasználó adatainak mentése során: ",
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
