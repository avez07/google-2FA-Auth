import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors())
app.get('/',(req,res)=>{
    res.status(200).send('this is working')
})

app.get('/2faauth',(req,res)=>{
    const email = 'ansariaavez1234@gmail.com'
    const serect = speakeasy.generateSecret({
        name:'seeetdelight',
    
    })
    console.log(serect)
    
    qrcode.toDataURL(serect.otpauth_url,(err,data)=>{
if (err) {
    console.log(err)
}else{
    res.status(200).send(data)
}
    })
});
app.post('/verify',(req,res)=>{
    const token = req.body.token;
    const verify = speakeasy.totp.verify({
        secret: 'G;MuiLVFM9E9L:;qm%Rr@dbHT.DvM$Jn',
        encoding: 'ascii',
        token: token
    })
    if (verify) {
        res.status(200).send('user is verifed')
    }else{
        res.status(200).send('user is not verifed')

    }
})
app.listen(8080,(req,res)=>{console.log('server is running on 8080 port')})