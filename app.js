
const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")

const app = express()


app.use(bodyParser.urlencoded({extended: true}))



app.get("/", (req, res) => {


    const url = "https://api.openweathermap.org/data/2.5/weather?q=arequipa&appid=ce210146f8862dc94eb806926569b050&units=metric"

    https.get(url, (response) => {
        console.log('statusCode:', response.statusCode);

        response.on('data', (d) => {
             
            const weatherData = JSON.parse(d)
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const weatherIcon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"


            console.log("temp: ",temp)
            console.log("description: ",description)


            res.write("<h1>Temperature App </h1>")
            res.write(`<img src=${weatherIcon}  >`)
            res.write("<p>Temperature in Arequipa is "+ temp + " Celcius </p>")
            res.write("<p>the weather is currently  "+ description + " </p>")


            res.send()



            console.log()
        });

    })

})



app.listen(3000, () => {
    console.log("Server listening on port 3000")
})