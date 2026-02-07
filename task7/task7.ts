const input = document.getElementById("cityInput");
const button = document.getElementById("getWeatherBtn");
const result = document.getElementById("result");

if (!input || !button || !result) {
  throw new Error("HTML elements not found");
}

const cityInput = input as HTMLInputElement;
const getWeatherBtn = button as HTMLButtonElement;
const resultDiv = result as HTMLDivElement;

const API_KEY = "54d732aae3775320fc5cc741b35baa3d";

/* ---------------- TYPES ---------------- */

interface WeatherSuccess {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
}

interface WeatherError {
  cod: number;
  message: string;
}

/* ---------------- LOGIC ---------------- */

getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (!city) {
    showError("Please enter a city name");
    return;
  }

  getWeather(city);
});

async function getWeather(city: string): Promise<void> {
  resultDiv.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      const errorData = (await response.json()) as WeatherError;
      showError(errorData.message);
      return;
    }

    const data = (await response.json()) as WeatherSuccess;
    showWeather(data);

  } catch {
    showError("Network error. Please try again.");
  }
}

/* ---------------- UI FUNCTIONS ---------------- */

function showWeather(data: WeatherSuccess): void {
  resultDiv.innerHTML = `
    <h3>${data.name}</h3>
    <p>🌡 Temperature: ${data.main.temp} °C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>☁ Condition: ${data.weather[0].description}</p>
  `;
}

function showError(message: string): void {
  resultDiv.innerHTML = `<p style="color:red">${message}</p>`;
}
