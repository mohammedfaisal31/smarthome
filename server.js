const express = require('express')
const port = process.env.PORT || 8080
let urlencodedParser = express.urlencoded({ extended: false })
let crypto = require('crypto');

const app = express()

app.use(express.static('content'))
app.use('/css', express.static(__dirname + 'content/css'))
app.use('/js', express.static(__dirname + 'content/js'))
app.use('/images', express.static(__dirname + 'content/images'))
app.use(express.json({limit:'50kb'}))

app.set('views', './views')
app.set('view engine', 'ejs')

let authorizeToken = false
let turn_on = {'id':1,'switch_on':false,'block':false}
let ifNodeClient = false

app.get("/",(req,res)=>{
    if(authorizeToken) res.render('control')
    else res.render('login')
})

app.post("/",urlencodedParser,(req,res)=>{
    let loginObj = Object.assign({},req.body)
    console.log(loginObj)
    if((loginObj['email'] == 'mohammedfaisal3366@gmail.com' || 'adnan@gmail.com') && loginObj['password'] == '12345'){
        authorizeToken = true
        res.redirect('/control')
    }
    else res.render('login',{error:true})
})

app.get('/control',(req,res)=>{
    if(authorizeToken)
        res.render('control',{turn_on})
    else{
        res.redirect('/')
    }
})

app.post('/control',urlencodedParser,(req,res)=>{
   turn_on["switch_on"] = req.body["btn_checked"]
   console.log(turn_on) 
   res.sendStatus(200)
})

app.get('/api/switch',(req,res)=>{
    res.send(turn_on)    
})

app.post('/api/switch',urlencodedParser,(req,res)=>{
    res.sendStatus(404)
    
})

app.listen(port,()=>console.log("Listen on "+port))
