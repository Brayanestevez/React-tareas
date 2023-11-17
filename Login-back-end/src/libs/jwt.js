import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export function CreateAccessToken(payload) {
    return new Promise((resolve, reject) =>{//resolve, que todo bien y reject que todo esta bien

        jwt.sign(
            payload,
            TOKEN_SECRET,
            // {
            //   id: userSaved._id, //payload
            // },
            //secret
            {
              expiresIn: "1d", //expirar en un dia, las opciones
            },
            (err, token) => {
              if (err) reject(err);
              resolve(token)
              });
            }
          );


    }