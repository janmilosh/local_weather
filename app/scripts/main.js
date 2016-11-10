var icons = {
  '01n': 'http://res.cloudinary.com/imagine393/image/upload/v1478396096/moon-1_xdudv4.png',
  '01d': 'http://res.cloudinary.com/imagine393/image/upload/v1478396100/sunny_mnl6fl.png',
  '02d': 'http://res.cloudinary.com/imagine393/image/upload/v1478396095/clouds-1_pim37v.png',
  '02n': 'http://res.cloudinary.com/imagine393/image/upload/v1478396096/cloudy-night_lmrh4p.png',
  '03d': 'http://res.cloudinary.com/imagine393/image/upload/v1478396095/clouds_en8axb.png',
  '03n': 'http://res.cloudinary.com/imagine393/image/upload/v1478396095/clouds_en8axb.png',
  '04d': 'http://res.cloudinary.com/imagine393/image/upload/v1478396095/clouds_en8axb.png',
  '04n': 'http://res.cloudinary.com/imagine393/image/upload/v1478396095/clouds_en8axb.png',
  '09d': 'http://res.cloudinary.com/imagine393/image/upload/v1478396099/raining_o7s9kl.png',
  '09n': 'http://res.cloudinary.com/imagine393/image/upload/v1478396098/night-rain_tuxr2f.png',
  '10d': 'http://res.cloudinary.com/imagine393/image/upload/v1478396101/summer-rain_uj570x.png',
  '10n': 'http://res.cloudinary.com/imagine393/image/upload/v1478396100/stars_qwbwlq.png',
  '11d': 'http://res.cloudinary.com/imagine393/image/upload/v1478396095/bolt_fmcify.png',
  '11n': 'http://res.cloudinary.com/imagine393/image/upload/v1478396095/bolt_fmcify.png',
  '13d': 'http://res.cloudinary.com/imagine393/image/upload/v1478396099/snowflake_pmdb0d.png',
  '13n': 'http://res.cloudinary.com/imagine393/image/upload/v1478396099/snowflake_pmdb0d.png',
  'noCode': 'http://res.cloudinary.com/imagine393/image/upload/v1478396099/stars-2_nulyic.png'
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
      var this = this;
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          this.callWeatherApi(position);
        });
      } else {
        console.log("Geolocation is unavailable in this browser.")
      }
    },
    callWeatherApi: function(position) {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
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
