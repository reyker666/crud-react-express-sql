import nodemailer from 'nodemailer'
    
//Send email
const sendEmail = (dataUser)=> {
    let url = "http://localhost:3000/resetPassword/";

    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "a56fd82389c53b",
            pass: "dcc14921baa9a7"
        }
    });

    // defined transport object
    transporter.sendMail({
    from: '<foo@example.com>',
    to: `${dataUser.email}`, // list of receivers
    subject: "Reset Password",
    html: `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
        </head>
        <body>
            <style>
                *{
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: Arial, Helvetica, sans-serif;
                }
                
                a {
                    color: red;
                }
                
                .wrapper {
                    width: 100%;
                    height: 100vh;
                    background-color: #F6F6F6;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                .wrapper-content {
                    width: 70%;
                    height: 70%;
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: space-around;
                    align-items: flex-start;
                    background-color: white;
                    padding: 1rem 2rem;
                }
                
                .btn-email {
                    width: 10rem;
                    height: 3rem;
                    border-radius: .2rem;
                    background-color: #B18572;
                    color: white;
                    border: none;
                    cursor: pointer;
                    font-size: .9rem;
                }
                
            </style>
            <section class="wrapper">
                <div class="wrapper-content">
                    <b>Hi ${dataUser.username},</b>
                    <p>You have requested a password reset. Link valid for 10 minutes.</p>
                    <a href="${url + dataUser.resetPasswordToken}">
                        <button class="btn-email">Change Password</button>
                    </a>
                    <div>
                        <p>If you can't click the above button, please copy and paste this link into your browser.</p>
                        <a href='${url + dataUser.resetPasswordToken}'>${url + dataUser.resetPasswordToken}</a>
                    </div>
                </div>
            </section>
        </body>
    </html>
    `
    });

    dataUser.successResponseObject.auth = true
}

export default sendEmail