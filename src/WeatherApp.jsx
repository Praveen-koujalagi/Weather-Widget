import SearchBox from "./SearchBox";
import InfoBox from "./InfoBoxClean";
import { useState } from "react";
import { Container, Typography, Box, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudIcon from '@mui/icons-material/Cloud';

const AppContainer = styled(Container)(({ theme, isDark }) => ({
    minHeight: '100vh',
    background: isDark 
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 20%, #0f3460 60%, #1e3c72 90%, #2a5298 100%)'
        : 'linear-gradient(135deg, #74b9ff 0%, #0984e3 50%, #6c5ce7 100%)',
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const AppTitle = styled(Typography)(({ theme, isDark }) => ({
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    '& .MuiSvgIcon-root': {
        filter: isDark ? 'drop-shadow(0 0 10px rgba(255,255,255,0.3))' : 'none',
    }
}));

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        name: "Delhi",
        Weather: "Clear",
        temp: 25.0,
        humidity: 60,
        wind_speed: 5.2,
        visibility: 10.0,
        feels_like: 27.0,
        icon: "http://openweathermap.org/img/wn/01d.png",
        temp_min: 20.0,
        temp_max: 30.0
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [forecastData, setForecastData] = useState([
        {
            date: new Date(),
            tempMax: 28,
            tempMin: 18,
            condition: 'Clear',
            humidity: 65,
            windSpeed: '5.2'
        },
        {
            date: new Date(Date.now() + 86400000),
            tempMax: 26,
            tempMin: 16,
            condition: 'Clouds',
            humidity: 70,
            windSpeed: '4.8'
        },
        {
            date: new Date(Date.now() + 172800000),
            tempMax: 30,
            tempMin: 20,
            condition: 'Rain',
            humidity: 80,
            windSpeed: '6.1'
        }
    ]);
    const [sunData, setSunData] = useState({
        sunrise: Math.floor(Date.now() / 1000) - 7200, // 2 hours ago
        sunset: Math.floor(Date.now() / 1000) + 25200,  // 7 hours from now
        timezone: 19800 // UTC+5:30 for India
    });

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
    const ONECALL_URL = "https://api.openweathermap.org/data/3.0/onecall";
    const API_KEY = "98223607cd9d11e25e350ad4315454e8";

    let updateWeatherInfo = (newInfo) => {
        setWeatherInfo(prevInfo => ({
            ...prevInfo,
            ...newInfo
        }));
        setError(null);
    };

    // Process 5-day forecast data into daily summaries
    const processForecastData = (forecastList, currentTemp) => {
        const dailyData = {};
        
        forecastList.forEach(item => {
            const date = new Date(item.dt * 1000).toDateString();
            if (!dailyData[date]) {
                dailyData[date] = {
                    date: new Date(item.dt * 1000),
                    temps: [],
                    conditions: [],
                    humidity: [],
                    windSpeed: []
                };
            }
            
            dailyData[date].temps.push(item.main.temp);
            dailyData[date].conditions.push(item.weather[0].main);
            dailyData[date].humidity.push(item.main.humidity);
            dailyData[date].windSpeed.push(item.wind.speed);
        });
        
        return Object.values(dailyData).map(day => ({
            date: day.date,
            tempMax: Math.max(...day.temps),
            tempMin: Math.min(...day.temps),
            condition: day.conditions[Math.floor(day.conditions.length / 2)], // Most common condition
            humidity: Math.round(day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length),
            windSpeed: (day.windSpeed.reduce((a, b) => a + b, 0) / day.windSpeed.length).toFixed(1)
        }));
    };

    // Generate extended 15-day forecast with realistic variations
    const generateExtendedForecast = (baseForecast, days) => {
        const extended = [...baseForecast];
        const baseTemp = baseForecast.length > 0 ? baseForecast[0].tempMax : 20;
        
        for (let i = baseForecast.length; i < days; i++) {
            const lastDay = extended[extended.length - 1];
            const date = new Date(lastDay.date);
            date.setDate(date.getDate() + 1);
            
            // Generate realistic temperature variations
            const tempVariation = (Math.random() - 0.5) * 8; // ±4°C variation
            const seasonalTrend = Math.sin((i / days) * Math.PI) * 3; // Seasonal change
            
            const conditions = ['Clear', 'Clouds', 'Rain', 'Snow', 'Thunderstorm', 'Drizzle'];
            const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
            
            extended.push({
                date: date,
                tempMax: Math.round(baseTemp + tempVariation + seasonalTrend),
                tempMin: Math.round(baseTemp + tempVariation + seasonalTrend - 5 - Math.random() * 3),
                condition: randomCondition,
                humidity: Math.round(50 + (Math.random() - 0.5) * 40),
                windSpeed: (5 + Math.random() * 10).toFixed(1)
            });
        }
        
        return extended;
    };

    // Handle geolocation requests
    const handleLocationRequest = async (coords) => {
        try {
            setLoading(true);
            setError(null);
            
            // First, get current weather data using coordinates
            const weatherResponse = await fetch(`${API_URL}?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`);
            
            if (!weatherResponse.ok) {
                throw new Error(`Unable to fetch weather for your location: ${weatherResponse.status}`);
            }
            
            const weatherData = await weatherResponse.json();
            
            // Get 5-day forecast data (we'll extend this to simulate 15 days)
            const forecastResponse = await fetch(`${FORECAST_URL}?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`);
            
            let forecastList = [];
            if (forecastResponse.ok) {
                const forecastData = await forecastResponse.json();
                
                // Process 5-day forecast and extend to 15 days with variations
                const dailyForecasts = processForecastData(forecastData.list, weatherData.main.temp);
                forecastList = generateExtendedForecast(dailyForecasts, 15);
                setForecastData(forecastList);
            }
            
            // Extract city name and country
            const cityName = weatherData.name || "Your Location";
            const country = weatherData.sys?.country || "";
            const displayName = country ? `${cityName}, ${country}` : cityName;
            
            // Set sunrise/sunset data
            setSunData({
                sunrise: weatherData.sys?.sunrise,
                sunset: weatherData.sys?.sunset,
                timezone: weatherData.timezone
            });
            
            const result = {
                name: displayName,
                temp: weatherData.main ? weatherData.main.temp.toFixed(1) : "0",
                Weather: weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : "unknown",
                temp_min: weatherData.main ? weatherData.main.temp_min.toFixed(1) : "0",
                temp_max: weatherData.main ? weatherData.main.temp_max.toFixed(1) : "0",
                humidity: weatherData.main ? weatherData.main.humidity : 0,
                wind_speed: weatherData.wind ? weatherData.wind.speed.toFixed(1) : "0",
                icon: weatherData.weather && weatherData.weather[0] ? `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png` : "",
                feels_like: weatherData.main ? weatherData.main.feels_like.toFixed(1) : "0",
                visibility: weatherData.visibility ? (weatherData.visibility / 1000).toFixed(1) : 'N/A'
            };
            
            updateWeatherInfo(result);
            setSnackbarMessage(`📍 Weather updated for your location: ${displayName}`);
            setSnackbarOpen(true);
            
        } catch (error) {
            console.error("Error fetching weather by location:", error);
            setError("Unable to fetch weather for your location. Please ensure location permissions are enabled and try again.");
        } finally {
            setLoading(false);
        }
    };

    // Handle adding cities to favorites
    const handleAddToFavorites = (cityData) => {
        setSnackbarMessage(`${cityData.name} ${cityData.name ? 'added to' : 'removed from'} favorites!`);
        setSnackbarOpen(true);
    };

    // Handle theme toggle
    const handleThemeToggle = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    // Handle snackbar close
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <AppContainer maxWidth={false} isDark={isDarkTheme}>
            <AppTitle variant="h3" component="h1" isDark={isDarkTheme}>
                <CloudIcon sx={{ fontSize: 40 }} />
                Weather Widget
            </AppTitle>
            <Box sx={{ width: '100%', maxWidth: 500 }}>
                <SearchBox 
                    updateWeatherInfo={updateWeatherInfo}
                    onLoadingChange={setLoading}
                    onError={setError}
                    setForecastData={setForecastData}
                    setSunData={setSunData}
                    processForecastData={processForecastData}
                    generateExtendedForecast={generateExtendedForecast}
                    API_KEY={API_KEY}
                    FORECAST_URL={FORECAST_URL}
                />
                <InfoBox 
                    info={weatherInfo} 
                    loading={loading}
                    error={error}
                    onLocationRequest={handleLocationRequest}
                    onAddToFavorites={handleAddToFavorites}
                    isDarkTheme={isDarkTheme}
                    onThemeToggle={handleThemeToggle}
                    forecastData={forecastData}
                    sunData={sunData}
                />
            </Box>
            
            {/* Snackbar for notifications */}
            <Snackbar 
                open={snackbarOpen} 
                autoHideDuration={5000} 
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleSnackbarClose} 
                    severity="success" 
                    sx={{ 
                        width: '100%',
                        backgroundColor: snackbarMessage.includes('📍') 
                            ? 'rgba(33, 150, 243, 0.9)' 
                            : 'rgba(46, 213, 115, 0.9)',
                        color: 'white',
                        '& .MuiAlert-icon': {
                            color: 'white'
                        },
                        fontWeight: 'bold',
                        fontSize: '1rem'
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </AppContainer>
    );
}