const express = require('express')
const app = express()
const path = require('path')
const fetch = require("node-fetch")

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({extended : true}))

const key = "27991efe149b6f574146c6f40d28f55d"
let city = "Tartu"

app.get("/", function (req,res) {
	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
	.then((response) => {
		return response.json()
	})
	.then((data) => {
		let description = data.weather[0].description
		let city = data.name
		let temp = Math.round(parseFloat(data.main.temp)-273.15) + "°C"
		res.render("index", {
			description: description,
			city: city,
			temp: temp
		})
	})
})

app.post("/", function(req, res){
	let city = req.body.cityname
	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
	.then((response) => {
		return response.json()
	})
	.then ((data) => {
		let description = data.weather[0].description
		let city = data.name
		let temp = Math.round(parseFloat(data.main.temp)-273.15) + "°C"
		res.render("index", {
			description: description,
			city: city,
			temp: temp
		})
	})
})

app.listen(3000, () => {
	console.log("Example started at http://localhost:3000")
})