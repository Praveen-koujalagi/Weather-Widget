import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

const SearchContainer = styled(Paper)(({ theme }) => ({
    padding: '20px',
    margin: '20px auto',
    maxWidth: 400,
    borderRadius: 16,
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
}));

export default function SearchBox({ 
    updateWeatherInfo, 
    onLoadingChange, 
    onError, 
    setForecastData, 
    setSunData, 
    processForecastData, 
    generateExtendedForecast, 
    API_KEY, 
    FORECAST_URL 
}) {
    let [city, setCity] = useState("");
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState("");

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const INTERNAL_API_KEY = "98223607cd9d11e25e350ad4315454e8"; // Fallback if not provided
    const api_key = API_KEY || INTERNAL_API_KEY;

    // Update loading state and notify parent
    const updateLoadingState = (isLoading) => {
        setLoading(isLoading);
        if (onLoadingChange) {
            onLoadingChange(isLoading);
        }
    };

    // Update error state and notify parent
    const updateErrorState = (errorMessage) => {
        setError(errorMessage);
        if (onError) {
            onError(errorMessage);
        }
    };

    let getWeatherInfo = async () => {
        try {
            updateLoadingState(true);
            updateErrorState("");
            let response = await fetch(`${API_URL}?q=${city}&appid=${api_key}&units=metric`);
            if (!response.ok) {
                throw new Error(`City not found: ${response.status}`);
            }
            let data = await response.json();

            // Fetch forecast data if functions are available
            if (setForecastData && processForecastData && generateExtendedForecast && FORECAST_URL) {
                try {
                    const forecastResponse = await fetch(`${FORECAST_URL}?q=${city}&appid=${api_key}&units=metric`);
                    if (forecastResponse.ok) {
                        const forecastData = await forecastResponse.json();
                        
                        // Process 5-day forecast and extend to 15 days with variations
                        const dailyForecasts = processForecastData(forecastData.list, data.main.temp);
                        const forecastList = generateExtendedForecast(dailyForecasts, 15);
                        setForecastData(forecastList);
                    }
                } catch (forecastError) {
                    console.warn("Could not fetch forecast data:", forecastError);
                }
            }

            // Set sunrise/sunset data if function is available
            if (setSunData) {
                setSunData({
                    sunrise: data.sys?.sunrise,
                    sunset: data.sys?.sunset,
                    timezone: data.timezone
                });
            }

            let result = {
                name: data.name || "Unknown",
                temp: data.main ? data.main.temp.toFixed(1) : "0",
                Weather: data.weather && data.weather[0] ? data.weather[0].description : "unknown",
                temp_min: data.main ? data.main.temp_min.toFixed(1) : "0",
                temp_max: data.main ? data.main.temp_max.toFixed(1) : "0",
                humidity: data.main ? data.main.humidity : 0,
                wind_speed: data.wind ? data.wind.speed.toFixed(1) : "0",
                icon: data.weather && data.weather[0] ? `http://openweathermap.org/img/wn/${data.weather[0].icon}.png` : "",
                feels_like: data.main ? data.main.feels_like.toFixed(1) : "0",
                visibility: data.visibility ? (data.visibility / 1000).toFixed(1) : 'N/A'
            };
            return result;
            
        } catch (error) {
            console.error("Error fetching weather data:", error);
            const errorMessage = "Unable to fetch weather data. Please check the city name and try again.";
            updateErrorState(errorMessage);
            throw error;
        } finally {
            updateLoadingState(false);
        }
    }

    let handleChange = (e) => {
        setCity(e.target.value);
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        if (!city.trim()) {
            updateErrorState("Please enter a city name");
            return;
        }
        try {
            let weatherData = await getWeatherInfo();
            updateWeatherInfo(weatherData);
            setCity(""); 
            updateErrorState("");
        } catch (error) {
            // Error is already set in getWeatherInfo
        }
    }

    return (
        <SearchContainer elevation={3}>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField 
                    id="city-name" 
                    label="Enter City Name" 
                    variant="outlined" 
                    required 
                    value={city} 
                    onChange={handleChange}
                    fullWidth
                    disabled={loading}
                    error={!!error}
                    helperText={error}
                    InputProps={{
                        style: { borderRadius: 12 }
                    }}
                />
                <Button 
                    variant="contained" 
                    type="submit"
                    disabled={loading || !city.trim()}
                    startIcon={<SearchIcon />}
                    sx={{ 
                        borderRadius: 12,
                        padding: '12px 24px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                        },
                        '&:disabled': {
                            background: '#ccc',
                        }
                    }}
                >
                    {loading ? 'Searching...' : 'Search Weather'}
                </Button>
            </Box>
        </SearchContainer>
    );
}
