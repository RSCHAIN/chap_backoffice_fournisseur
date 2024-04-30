import nodemailer from "nodemailer";

export default function handler(req, res) {
  const email = process.env.EMAIL;
  const pass = process.env.EMAIL_PASS;
 
  const message = {
    from: email,
    to: req.body.email,
    subject: "Reinitialisation du mot de passe",
    text: `Code de reinitialisation du mot de passe ${req.body.codeVerif}`,
    html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
     <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> 
     
     </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff; font-size: 20px;"> 
     Bonjour cher fournisseurs, veuillez utiliser ce code : ${req.body.codeVerif} pour la reinitialisation de votre mot de passe <br/> <span style="font-size: 30px; font-weight:bold;">
   
     </span><br/>
     suivi de votre Email <span style="font-size: 30px;font-weight:bold;">${req.body.email}</span>
     <br/> pour plus de details veuillez nous joindre a l'adresse: <a href="mailto:srschain@gmail.com">srschain@gmail.com </a></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`,
  };

  //  

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass,
    },
  });

  if (req.method === "POST") {
    transporter.sendMail(message, (err, info) => {
      if (err) {
        res.status(404).json({
          error: `Connection refused at ${err}`,
        });
      } else {
        res.status(250).json({
          success: `Message delivered to ${info.accepted}`,
        });
      }
    });

  }
}
