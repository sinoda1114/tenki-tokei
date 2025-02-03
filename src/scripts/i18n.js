const messages = {
  ja: {
    greeting: "こんにちは",
    date: {
      long: "YYYY年MM月DD日(ddd)",
      short: "YYYY/MM/DD",
    },
    weather: {
      sunny: "晴れ",
      cloudy: "曇り",
      rainy: "雨",
    },
  },
  en: {
    greeting: "Hello",
    date: {
      long: "MMMM D, YYYY (ddd)",
      short: "MM/DD/YYYY",
    },
    weather: {
      sunny: "Sunny",
      cloudy: "Cloudy",
      rainy: "Rainy",
    },
  },
};

const formatDate = (date, locale = "ja", format = "long") => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  };

  if (locale === "ja") {
    options.weekday = "short";
    options.month = "numeric";
  }

  const formattedDate = new Intl.DateTimeFormat(locale, options).format(date);

  let dayOfWeek = "";
  if (locale === "ja") {
    const days = ["日", "月", "火", "水", "木", "金", "土"];
    dayOfWeek = days[date.getDay()];
  } else {
    dayOfWeek = new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);
  }


  let formattedString = messages[locale].date[format];
  formattedString = formattedString.replace("YYYY", date.getFullYear());
  formattedString = formattedString.replace("MM", String(date.getMonth() + 1).padStart(2, '0'));
  formattedString = formattedString.replace("DD", String(date.getDate()).padStart(2, '0'));
  formattedString = formattedString.replace("MMMM", new Intl.DateTimeFormat(locale, { month: 'long' }).format(date));
  formattedString = formattedString.replace("D", date.getDate());
  formattedString = formattedString.replace("ddd", dayOfWeek);


  return formattedString;
};


const getWeatherMessage = (weatherCode, locale = "ja") => {
  switch (weatherCode) {
    case "clear sky":
      return messages[locale].weather.sunny;
    case "few clouds":
    case "scattered clouds":
    case "broken clouds":
    case "overcast clouds":
      return messages[locale].weather.cloudy;
    case "light rain":
    case "moderate rain":
    case "heavy intensity rain":
    case "very heavy rain":
    case "extreme rain":
      return messages[locale].weather.rainy;
    default:
      return weatherCode; 
  }
};


export { messages, formatDate, getWeatherMessage };