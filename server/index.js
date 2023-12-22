import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import express from 'express'

const app = express();

app.post('/2faauth',(req,res)=>{
    const email = res.body.email
    const serect = speakeasy.generateSecret({
serect: email
    })
    qrcode.toDataURL(serect.otpauth_url,(err,data)=>{
console.log(data);
    })
});
app.listen(8080)