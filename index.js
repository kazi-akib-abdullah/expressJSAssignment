// library function express JS
// import express from "express";

// const port = 3000;
// const app = express();


//2. configure the express server

// app.use(express.json());


//3. handling the routes of the server

// app.get('/', (req, res) => {
//     res.send('Hello Viewers!' + req.query.id);
// })


// app.post('/', (req, res)=> {
//     const body = req.body;
//     res.send('Hello Viewers Post method '+body.message);
// })


//1. up and running the server

// app.listen(port,() => {
//   console.log("Listening to port " + port);
// })






// Node.js Request section

// const request = require('request');
import express from "express";
import request from "request";
import hbs from "hbs";
import path from "path";
import fs from "fs";




const port = process.env.PORT || 3000;
const app = express();

const __dirname = path.resolve();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));


// let q_city = req.params['city'];
// const options = {
//   method: 'GET',
//   url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
//   qs: { q: q_city, days: '3' },
//   headers: {
//     'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
//     'x-rapidapi-key': '5b932a3469mshec1e9ec8c82192ep1973b8jsn4d46bfebf298',
//     useQueryString: true
//   }
// };


app.get('/', (req, res) => {
  res.render('index')
})


app.get('/all/:country/:city', (req, res) => {
  // console.log(req.params['country']);
  let q_country = req.params['country'];
  let q_city = req.params['city'];
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    qs: { q: q_city, days: '3' },
    headers: {
      'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
      'x-rapidapi-key': '5b932a3469mshec1e9ec8c82192ep1973b8jsn4d46bfebf298',
      useQueryString: true
    }
  };
  
  request(options, function (error, response, body) {
    // if (error) throw new Error(error);
    if (error) {

    } else if (response.statusCode == 400) {
        res.send('alert');
    }
    else {
      let data = JSON.parse(body);
      let place = data.location.name;
      let country = data.location.country;
      let data_max_0 = data.forecast.forecastday[0].day.maxtemp_c;
      let data_max_1 = data.forecast.forecastday[1].day.maxtemp_c;
      let data_max_2 = data.forecast.forecastday[2].day.maxtemp_c;
      let data_max_avg = ((data_max_0 + data_max_1 + data_max_2) / 3).toFixed(2);
      let data_max_f_0 = data.forecast.forecastday[0].day.maxtemp_f;
      let data_max_f_1 = data.forecast.forecastday[1].day.maxtemp_f;
      let data_max_f_2 = data.forecast.forecastday[2].day.maxtemp_f;
      let data_max_f_avg = ((data_max_f_0 + data_max_f_1 + data_max_f_2) / 3).toFixed(2);

      let data_min_0 = data.forecast.forecastday[0].day.mintemp_c;
      let data_min_1 = data.forecast.forecastday[1].day.mintemp_c;
      let data_min_2 = data.forecast.forecastday[2].day.mintemp_c;
      let data_min_avg = ((data_min_0 + data_min_1 + data_min_2) / 3).toFixed(2);
      let data_min_f_0 = data.forecast.forecastday[0].day.mintemp_f;
      let data_min_f_1 = data.forecast.forecastday[1].day.mintemp_f;
      let data_min_f_2 = data.forecast.forecastday[2].day.mintemp_f;
      let data_min_f_avg = ((data_min_f_0 + data_min_f_1 + data_min_f_2) / 3).toFixed(2);


      var data1 = {

        country: country,
        city: place,
        avr_maxtemp_c: data_max_avg,
        avr_maxtemp_f: data_max_f_avg,
        avr_mintemp_c: data_min_avg,
        avr_mintemp_f: data_min_f_avg,
      }
      const file = "weather_data.json"
      const dataMain = (fs.readFileSync('weather_data.json'));
      const saveData = (data, file) => {
        const finished = (error) => {
          if (error) {
            console.log(error);
            return;
          }
        }
        const newData = JSON.stringify(data, null, 2);
        fs.writeFile(file, newData, finished)
        console.log('Saved....')
      }

      saveData(data1, 'weather_data.json');
      const savenData = (data1) => {
        const newD = {
          country: data1.country,
          city: data1.city,
          avr_maxtemp_c: data1.avr_maxtemp_c,
          avr_maxtemp_f: data1.avr_maxtemp_f,
          avr_mintemp_c: data1.avr_mintemp_c,
          avr_mintemp_f: data1.avr_mintemp_f,
        }
        dataMain[data1.city] = newD;
        saveData(dataMain, 'weather_data.json');
      }
      savenData(data1);




      // console.log(data_max_avg);
      res.render('index', { high_c: data_max_avg, high_f: data_max_f_avg, low_c: data_min_avg, low_f: data_min_f_avg, place: place, country: country });
    }

  })
})

app.listen(port, () => {
  console.log("Listening to port " + port);
})






// sudo killall -9 node

