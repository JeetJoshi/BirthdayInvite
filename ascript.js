let timeSeconds = 0;

let clock = Vue.component("clock", {
  data: function() {
    return {
      time: {
        hour: 0,
        minute: 0,
        seconds: 0,
        day: "am"
      },
      date: {
        day: 0,
        month: 0,
        year: 0
      }
    };
  },

  methods: {
    setTime: function() {
      let date = new Date();
      let hour = 19;//date.getHours();
      let min = 30;//date.getMinutes();
      let sec = 0;//date.getSeconds();
      let parsedSec = 0;
      let parsedHour = 0;
      let pasredMin = 0;

      if (hour > 12) {
        parsedHour = hour - 12;
      } else if (hour < 1) {
        parsedHour = 12;
      } else {
        parsedHour = hour;
      }
      if (parsedHour < 12) {
        parsedHour = `0${parsedHour}`;
      }
      if(sec < 10){
        parsedSec = `0${sec}`
      }else{
        parsedSec = sec;
      }
      if(min < 10){
        parsedMin = `0${min}`
      }else{
        parsedMin = min;
      }

      this.time.hour = parsedHour;
      this.time.minute = parsedMin;
      // this.time.seconds = date.getSeconds();
      this.time.seconds = parsedSec;

      this.$emit("time-seconds", this.time.seconds);

    },
    parseMonth: function(month) {
      let output = "";
      switch (month) {
        case 0:
          output = "jan";
          break;
        case 1:
          output = "feb";
          break;
        case 2:
          output = "mar";
          break;
        case 3:
          output = "apr";
          break;
        case 4:
          output = "may";
          break;
        case 5:
          output = "jun";
          break;
        case 6:
          output = "jul";
          break;
        case 7:
          output = "aug";
          break;
        case 8:
          output = "sep";
          break;
        case 9:
          output = "oct";
          break;
        case 10:
          output = "nov";
          break;
        case 11:
          output = "dec";
          break;
      }
      return output.toUpperCase();
    },
    parseDay: function(day) {
      let output = "";
      switch (day) {
        case 0:
          output = "sun";
          break;
        case 1:
          output = "mon";
          break;
        case 2:
          output = "tue";
          break;
        case 3:
          output = "wed";
          break;
        case 4:
          output = "thru";
          break;
        case 5:
          output = "fri";
          break;
        case 6:
          output = "sat";
          break;
        default:
          output = "heck";
      }
      return output.toUpperCase();
    },
    setDate: function() {
      let date = new Date();
      let dte = 11;//date.getDate();
      let day = 1;//date.getDay();
      let month = 8;//date.getMonth();
      let year = 2023;//date.getFullYear();

      let parsedDay = this.parseDay(day);
      let parsedMon = this.parseMonth(month);

      this.date.day = `${parsedDay}`;
      this.date.month = `${dte} ${parsedMon}`;
      this.date.year = year;
    },
    intervalIt: function() {
      requestAnimationFrame(this.intervalIt);
      this.setTime();
      this.setDate();
    }
  },

  mounted: function() {
    this.setTime();
    this.intervalIt();
  },

  template: "#clock-template"
});

const app = new Vue({
  el: "#app",
  data: {
    backgroundColor: 0
  },
  methods: {
    setBg: function() {
      let hue = new Date().getMinutes() * 6;

      let hour = new Date().getHours();
      let color = "";
      //night theme
      if ((hour >= 0 && hour <= 5) || hour >= 18) {
        color = `hsl(${hue}, 90%, 15%)`;
      } else {
        //day theme
        color = `hsl(${hue}, 75%, 50%)`;
      }

      this.backgroundColor = color;
    }
  },
  computed: {
    intervalBgColor: function() {
      setInterval(this.setBg, 1000);
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.setBg();
      this.intervalBgColor();
    });
  }
});
