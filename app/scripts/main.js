var icons = {
  '01n': 'images/moon-1.png',
  '01d': 'images/sunny.png',
  '02d': 'images/clouds-1.png',
  '02n': 'images/cloudy-night.png',
  '03d': 'images/clouds.png',
  '03n': 'images/clouds.png',
  '04d': 'images/clouds.png',
  '04n': 'images/clouds.png',
  '09d': 'images/raining.png',
  '09n': 'images/night-rain.png',
  '10d': 'images/summer-rain.png',
  '10n': 'images/stars.png',
  '11d': 'images/bolt.png',
  '11n': 'images/bolt.png',
  '13d': 'images/snowflake.png',
  '13n': 'images/snowflake.png',
  'noCode': 'images/stars-2.png'
}

var vm = new Vue({
  el: '#weather',
  data: {
    lat: '',
    lon: '',
    isFahrenheit: true,
    tempKelvin: '',
    description: '',
    iconCode: ''
  },
  computed: {
    tempFahrenheit: function() {
      if (this.tempKelvin) {
        return Math.round(this.tempKelvin * 9.0 / 5 - 459.67);
      }
      return '';
    },
    tempCelcius: function() {
      if (this.tempKelvin) {
        return Math.round(this.tempKelvin - 273.15);
      }
      return '';
    },
    iconUrl: function() {
      if (this.iconCode && icons.hasOwnProperty(this.iconCode)) {
        return icons[this.iconCode];
      }
      return icons.noCode;
    },
    fahrenheitClasses: function() {
      return {
        'btn-default': !this.isFahrenheit,
        'btn-success': this.isFahrenheit
      };
    },
    celciusClasses: function() {
      return {
        'btn-default': this.isFahrenheit,
        'btn-success': !this.isFahrenheit
      };
    }
  },
  created: function() {
    this.getWeather();
  },
  methods: {
    getWeather: function() {
      this.$http.get('http://freegeoip.net/json/').then(this.callWeatherApi, this.handleError);
    },
    callWeatherApi: function(response) {
      this.lat = response.body.latitude;
      this.lon = response.body.longitude;
      var key = 'd20c1eb3064a44aa39bc1a78bb8ff139',
          url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + this.lat + '&lon=' + this.lon + '&appid=' + key;
      this.$http.get(url).then(this.setTempAndDescription, this.handleError);      
    },    
    setTempAndDescription: function(weather) {
      this.tempKelvin = weather.body.main.temp;
      this.description = weather.body.weather[0].description;
      this.iconCode = weather.body.weather[0].icon;
    },
    handleError: function(error) {
      console.log('Something went wrong', error)
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return '';
      value = value.toString().split(' ');
      value = value.map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
      return value.join(' ');
    }
  }
});
