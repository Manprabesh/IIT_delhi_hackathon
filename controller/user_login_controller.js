import jwt from 'jsonwebtoken'
import fs from 'fs'
// import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import { user_model } from '../models/user_model.js'
import { log } from 'console'
const private_key = fs.readFileSync("./private.key")

const user_login_controller = async (req, res) => {

  console.log("Incoming request")

  const { email, password } = req.body
  // const token = req.cookies.token
  // console.log(token)

  // try {
  //     var decoded = jwt.verify(token, private_key);
  //     console.log(decoded)
  //   res.json("cdouhf")
  //   } catch(err) {
  //     console.log("something went wrong")
  //   }

  const user = await user_model.findOne({
    email:email
  })

  if (user) {

    bcrypt.compare(password, user.password, function (err, result) {
      // result == true

      if (result) {

        jwt.sign({ email }, private_key, { algorithm: 'HS256' }, function (err, token) {

          if (err) {
            console.log("Jwt error in login");
          }

          console.log(token,"The token data");

          res.cookie("token", token, {
            httpOnly: true,
            sameSite: "Strict",  // You might want to adjust this based on your cross-domain requirements
          });


        });
        return res.json(user)


      }

      return res.json("wrong password")

    });
  }

  else {
    // res.json("user not found")
    return res.status(404).json({ error: "User not found" });
  }

}

export {
  user_login_controller
}