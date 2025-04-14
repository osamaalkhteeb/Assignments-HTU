/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      type: "input",
      name: "URL",
      message: "Give me a URL?",
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    
    const qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream("qr.png"));
    console.log("QR code saved as qr.png");
    fs.writeFile("qr-input",url,(err)=>{
        if(err) throw err;
    })
    
  })
  .catch((error) => {
    console.error("Error:", error);
  });
