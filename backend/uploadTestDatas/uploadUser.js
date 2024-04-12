const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");

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
      name: "Kiss Zoltán",
      email: "admin",
      password: "admin123",
      phoneNumber: 132453678,
      addresses: [
        {
          country: "Hungary",
          city: "Szeged",
          address1: "Dézsa utca",
          address2: "4",
          zipCode: 1182,
          addressType: "Home",
        },
      ],
      role: "Admin",
      avatar: {
        public_id: "example-public-id",
        url: "example-avatar-url",
      },
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
