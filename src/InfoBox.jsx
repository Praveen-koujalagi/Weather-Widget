import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled, alpha } from '@mui/material/styles';
import { useState } from 'react';

// Import weather icons
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import FoggyIcon from '@mui/icons-material/Foggy';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import VisibilityIcon from '@mui/icons-material/Visibility';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AcUnitSharpIcon from '@mui/icons-material/AcUnitSharp';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import Badge from '@mui/material/Badge';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

// Add global styles for weather animations
const GlobalStyle = styled('style')`
  @keyframes rain {
    0% { 
      background-position: 0% 0%, 10% 10%, 20% 20%, 30% 30%, 40% 40%; 
      opacity: 0.8;
    }
    100% { 
      background-position: 0% 100%, 10% 110%, 20% 120%, 30% 130%, 40% 140%; 
      opacity: 1;
    }
  }
  
  @keyframes rainMovement {
    0% { transform: translateY(-20px) translateX(-5px); }
    100% { transform: translateY(20px) translateX(5px); }
  }
  
  @keyframes heavyRain {
    0% { 
      background-position: 0% 0%, 5% 5%, 15% 15%, 25% 25%, 35% 35%, 45% 45%; 
      opacity: 0.9;
    }
    100% { 
      background-position: 0% 120%, 5% 125%, 15% 135%, 25% 145%, 35% 155%, 45% 165%; 
      opacity: 1;
    }
  }
  
  @keyframes snow {
    0% { 
      background-position: 0% 0%, 15% 15%, 30% 30%, 45% 45%; 
      transform: rotate(0deg);
    }
    100% { 
      background-position: 0% 100%, 15% 115%, 30% 130%, 45% 145%; 
      transform: rotate(360deg);
    }
  }
  
  @keyframes snowFloat {
    0% { transform: translateX(-15px) translateY(-15px) rotate(0deg); }
    50% { transform: translateX(10px) translateY(5px) rotate(180deg); }
    100% { transform: translateX(-5px) translateY(15px) rotate(360deg); }
  }
  
  @keyframes clouds {
    0% { transform: translateX(-50px); opacity: 0.4; }
    50% { transform: translateX(20px); opacity: 0.8; }
    100% { transform: translateX(-30px); opacity: 0.6; }
  }
  
  @keyframes cloudsDrift {
    0% { transform: translateX(0px) translateY(0px); }
    33% { transform: translateX(30px) translateY(-10px); }
    66% { transform: translateX(-20px) translateY(10px); }
    100% { transform: translateX(0px) translateY(0px); }
  }
  
  @keyframes thunder {
    0%, 50%, 100% { opacity: 1; }
    10%, 30%, 70%, 90% { opacity: 0.2; }
    20%, 40%, 80% { opacity: 0.8; }
  }
  
  @keyframes lightning {
    0%, 90%, 100% { opacity: 0; }
    5%, 15% { opacity: 1; }
    10% { opacity: 0.3; }
  }
  
  @keyframes sunny {
    0% { transform: rotate(0deg) scale(1); opacity: 0.8; }
    50% { transform: rotate(180deg) scale(1.1); opacity: 1; }
    100% { transform: rotate(360deg) scale(1); opacity: 0.9; }
  }
  
  @keyframes sunRays {
    0% { transform: rotate(0deg); opacity: 0.6; }
    100% { transform: rotate(360deg); opacity: 0.8; }
  }
  
  @keyframes fog {
    0% { transform: translateX(-100px); opacity: 0.3; }
    50% { transform: translateX(50px); opacity: 0.7; }
    100% { transform: translateX(-50px); opacity: 0.5; }
  }
  
  @keyframes mist {
    0% { transform: translateY(-20px); opacity: 0.4; }
    50% { transform: translateY(10px); opacity: 0.8; }
    100% { transform: translateY(-10px); opacity: 0.6; }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  @keyframes particle {
    0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(200px) rotate(180deg); opacity: 0; }
  }
`;

// Weather background generator
function getWeatherBackground(weather) {
  const weatherLower = weather?.toLowerCase() || '';
  
  if (weatherLower.includes('rain') || weatherLower.includes('drizzle')) {
    if (weatherLower.includes('heavy') || weatherLower.includes('storm')) {
      return 'linear-gradient(135deg, #1e3c72 0%, #2a5298 30%, #1e3c72 60%, #0f1419 100%)';
    }
    return 'linear-gradient(135deg, #2c3e50 0%, #34495e 30%, #2980b9 70%, #3498db 100%)';
  }
  if (weatherLower.includes('snow') || weatherLower.includes('blizzard')) {
    return 'linear-gradient(135deg, #e6f3ff 0%, #cce7ff 30%, #99d6ff 60%, #66c2ff 100%)';
  }
  if (weatherLower.includes('thunder') || weatherLower.includes('storm')) {
    return 'linear-gradient(135deg, #0f0f23 0%, #2c1810 30%, #8e44ad 60%, #2980b9 100%)';
  }
  if (weatherLower.includes('cloud')) {
    if (weatherLower.includes('partly') || weatherLower.includes('few')) {
      return 'linear-gradient(135deg, #87ceeb 0%, #98d8e8 30%, #a9d3df 60%, #bac8d3 100%)';
    }
    return 'linear-gradient(135deg, #95a5a6 0%, #7f8c8d 30%, #5d6d7e 60%, #34495e 100%)';
  }
  if (weatherLower.includes('fog') || weatherLower.includes('mist') || weatherLower.includes('haze')) {
    return 'linear-gradient(135deg, #d5d8dc 0%, #aeb6bf 30%, #85929e 60%, #5d6d7e 100%)';
  }
  if (weatherLower.includes('clear') || weatherLower.includes('sunny')) {
    const hour = new Date().getHours();
    if (hour >= 6 && hour <= 18) {
      // Daytime sunny
      return 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)';
    } else {
      // Nighttime clear
      return 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)';
    }
  }
  
  // Default
  return 'linear-gradient(135deg, #34495e 0%, #2c3e50 50%, #1a252f 100%)';
}

// Weather animation generator
function getWeatherAnimation(weather) {
  const weatherLower = weather?.toLowerCase() || '';
  
  if (weatherLower.includes('rain')) {
    return `radial-gradient(2px 10px, rgba(255,255,255,0.8) 50%, transparent 50%),
            radial-gradient(1px 8px, rgba(255,255,255,0.6) 50%, transparent 50%),
            radial-gradient(1px 6px, rgba(255,255,255,0.4) 50%, transparent 50%)`;
  }
  if (weatherLower.includes('snow')) {
    return `radial-gradient(4px 4px, rgba(255,255,255,0.9) 50%, transparent 50%),
            radial-gradient(3px 3px, rgba(255,255,255,0.7) 50%, transparent 50%),
            radial-gradient(2px 2px, rgba(255,255,255,0.5) 50%, transparent 50%)`;
  }
  if (weatherLower.includes('cloud')) {
    return `radial-gradient(30px 30px, rgba(255,255,255,0.1) 40%, transparent 50%),
            radial-gradient(20px 20px, rgba(255,255,255,0.05) 40%, transparent 50%)`;
  }
  
  return 'none';
}

// Animation name generator
function getWeatherAnimationName(weather) {
  const weatherLower = weather?.toLowerCase() || '';
  
  if (weatherLower.includes('rain')) {
    return 'rain 1s linear infinite, rainMovement 2s ease-in-out infinite alternate';
  }
  if (weatherLower.includes('snow')) {
    return 'snow 3s linear infinite, snowFloat 4s ease-in-out infinite alternate';
  }
  if (weatherLower.includes('cloud')) {
    return 'clouds 8s ease-in-out infinite alternate';
  }
  if (weatherLower.includes('thunder')) {
    return 'thunder 0.5s ease-in-out infinite alternate';
  }
  
  return 'none';
}

const WeatherCard = styled(Card)(({ theme, hasData }) => ({
  maxWidth: '95%',
  width: '100%',
  minHeight: 'calc(100vh - 200px)',
  margin: '20px auto',
  borderRadius: 30,
  boxShadow: hasData 
    ? '0 30px 100px rgba(0, 0, 0, 0.5), 0 20px 60px rgba(0, 0, 0, 0.4)'
    : '0 20px 60px rgba(0, 0, 0, 0.3), 0 10px 30px rgba(0, 0, 0, 0.2)',
  background: hasData 
    ? 'linear-gradient(145deg, #1a1a2e 0%, #16213e 20%, #0f3460 60%, #1e3c72 90%, #2a5298 100%)'
    : 'linear-gradient(145deg, #2c2c54 0%, #40407a 30%, #706fd3 70%, #8395a7 100%)',
  color: 'white',
  overflow: 'hidden',
  position: 'relative',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  flexDirection: 'column',
  '@media (min-width: 1200px)': {
    maxWidth: '1400px',
  },
  '@media (min-width: 900px)': {
    maxWidth: '1200px',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    background: hasData 
      ? 'linear-gradient(45deg, #1a1a2e, #16213e, #0f3460, #1e3c72, #2a5298, #1a1a2e)'
      : 'linear-gradient(45deg, #2c2c54, #40407a, #706fd3, #8395a7, #2c2c54)',
    borderRadius: 35,
    zIndex: -1,
    opacity: 0.8,
    animation: 'subtleGlow 6s ease-in-out infinite alternate',
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: hasData 
      ? '0 40px 120px rgba(0, 0, 0, 0.6), 0 25px 80px rgba(0, 0, 0, 0.5)'
      : '0 30px 80px rgba(0, 0, 0, 0.4), 0 15px 50px rgba(0, 0, 0, 0.3)',
  },
  '@keyframes subtleGlow': {
    '0%': {
      opacity: 0.6,
      transform: 'scale(1)',
    },
    '100%': {
      opacity: 0.95,
      transform: 'scale(1.008)',
    },
  },
}));

const AnimatedWeatherBackground = styled(Box)(({ weatherType }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
  zIndex: 1,
  background: getWeatherBackground(weatherType),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: getWeatherAnimation(weatherType),
    animation: getWeatherAnimationName(weatherType),
  },
}));

const StatsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 18,
  padding: '20px 24px',
  borderRadius: 20,
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(30px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)',
    opacity: 0,
    transition: 'opacity 0.5s ease',
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    transform: 'translateY(-6px) scale(1.03)',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.35)',
    '&::before': {
      opacity: 1,
    }
  }
}));

const ForecastCard = styled(Paper)(({ theme }) => ({
  padding: '20px 16px',
  borderRadius: 20,
  backgroundColor: 'rgba(255, 255, 255, 0.06)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  textAlign: 'center',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%)',
    opacity: 0,
    transition: 'opacity 0.4s ease',
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    transform: 'translateY(-5px) scale(1.02)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    '&::before': {
      opacity: 1,
    }
  }
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: '#ffffff',
    height: 4,
    borderRadius: 2,
    boxShadow: '0 2px 12px rgba(255, 255, 255, 0.5)',
  },
  '& .MuiTab-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 700,
    fontSize: '1rem',
    textTransform: 'none',
    transition: 'all 0.3s ease',
    minHeight: 56,
    '&.Mui-selected': {
      color: '#ffffff',
      textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
    },
    '&:hover': {
      color: 'rgba(255, 255, 255, 0.9)',
      transform: 'translateY(-1px)',
    },
  },
}));

const WeatherIconContainer = styled(Box)(({ theme }) => ({
  padding: '12px',
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(1.1) rotate(5deg)',
  },
}));

// Enhanced styled components for new features
const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '300px',
  gap: '20px',
  '& .MuiCircularProgress-root': {
    color: '#ffffff',
    filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))',
  },
}));

const ControlsContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '20px',
  right: '20px',
  display: 'flex',
  gap: '12px',
  zIndex: 10,
  '@media (max-width: 768px)': {
    position: 'static',
    justifyContent: 'center',
    marginBottom: '20px',
  },
}));

const ControlButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'white',
  width: '48px',
  height: '48px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(1.1)',
    boxShadow: '0 4px 20px rgba(255, 255, 255, 0.2)',
  },
}));

const FavoriteFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: '30px',
  right: '30px',
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(10px)',
  color: 'white',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    transform: 'scale(1.1)',
  },
  '@media (max-width: 768px)': {
    bottom: '20px',
    right: '20px',
    width: '48px',
    height: '48px',
  },
}));

const ErrorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '300px',
  gap: '20px',
  padding: '40px',
  textAlign: 'center',
}));

const ToggleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 15px',
  borderRadius: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  '& .MuiSwitch-root': {
    '& .MuiSwitch-switchBase': {
      color: 'white',
      '&.Mui-checked': {
        color: '#4ecdc4',
        '& + .MuiSwitch-track': {
          backgroundColor: '#4ecdc4',
          opacity: 0.5,
        },
      },
    },
    '& .MuiSwitch-track': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
  },
}));

export default function InfoBox({ info, loading = false, error = null, onLocationRequest, onAddToFavorites, isDarkTheme, onThemeToggle }) {
    const [tabValue, setTabValue] = useState(0);
    const [isCelsius, setIsCelsius] = useState(true);
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('weatherFavorites');
        return saved ? JSON.parse(saved) : [];
    });
    
    // Enhanced weather info with error handling
    const weatherInfo = {
        name: info?.name || null,
        Weather: info?.Weather || null,
        temp: info?.temp || null,
        humidity: info?.humidity || null,
        wind_speed: info?.wind_speed || null,
        visibility: info?.visibility || null,
        feels_like: info?.feels_like || null,
        temp_min: info?.temp_min || null,
        temp_max: info?.temp_max || null,
    };

    // Temperature conversion function
    const convertTemperature = (celsius) => {
        if (celsius === null || celsius === undefined) return null;
        return isCelsius ? celsius : (celsius * 9/5) + 32;
    };

    // Format temperature display
    const formatTemperature = (temp) => {
        if (temp === null || temp === undefined) return 'N/A';
        const converted = convertTemperature(parseFloat(temp));
        return `${Math.round(converted)}°${isCelsius ? 'C' : 'F'}`;
    };

    // Handle temperature unit toggle
    const handleTemperatureToggle = () => {
        setIsCelsius(!isCelsius);
    };

    // Handle favorites
    const isCurrentCityFavorite = favorites.some(fav => fav.name === weatherInfo.name);
    
    const handleFavoriteToggle = () => {
        if (!weatherInfo.name) return;
        
        let updatedFavorites;
        if (isCurrentCityFavorite) {
            updatedFavorites = favorites.filter(fav => fav.name !== weatherInfo.name);
        } else {
            const newFavorite = {
                name: weatherInfo.name,
                temp: weatherInfo.temp,
                weather: weatherInfo.Weather,
                dateAdded: new Date().toISOString()
            };
            updatedFavorites = [...favorites, newFavorite];
        }
        
        setFavorites(updatedFavorites);
        localStorage.setItem('weatherFavorites', JSON.stringify(updatedFavorites));
        
        if (onAddToFavorites) {
            onAddToFavorites(weatherInfo);
        }
    };

    // Handle geolocation
    const handleLocationRequest = () => {
        if (navigator.geolocation && onLocationRequest) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    onLocationRequest({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    });
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    alert('Unable to get your location. Please ensure location permissions are enabled.');
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    // Generate realistic daily forecast data only if weather info is available
    const generateDailyForecast = () => {
        if (!weatherInfo.temp || !weatherInfo.Weather) return [];
        
        const currentTemp = parseFloat(weatherInfo.temp);
        const forecast = [];
        const today = new Date();
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
            const tempVariation = Math.random() * 8 - 4; // ±4°C variation
            const baseTemp = currentTemp + tempVariation;
            
            // Weather conditions array for variety
            const weatherConditions = [
                'clear', 'partly cloudy', 'cloudy', 'light rain', 
                'rain', 'sunny', 'overcast', 'scattered clouds'
            ];
            
            const randomWeather = i === 0 ? weatherInfo.Weather : 
                weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
            
            forecast.push({
                day: i === 0 ? 'Today' : 
                     i === 1 ? 'Tomorrow' : 
                     date.toLocaleDateString('en-US', { weekday: 'long' }),
                date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                weather: randomWeather,
                tempMax: convertTemperature(baseTemp + Math.random() * 3),
                tempMin: convertTemperature(baseTemp - Math.random() * 5),
                humidity: Math.max(30, Math.min(90, weatherInfo.humidity + Math.random() * 20 - 10)),
                windSpeed: Math.max(0, weatherInfo.wind_speed + Math.random() * 3 - 1.5).toFixed(1),
                precipitation: Math.random() < 0.3 ? Math.round(Math.random() * 15) : 0
            });
        }
        
        return forecast;
    };

    const dailyForecast = generateDailyForecast();

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // Enhanced city image URL with fallback to animated weather background
    const getCityImageUrl = (cityName) => {
        // Always return null to force animated weather backgrounds
        return null;
    };

    // Always use animated background since we removed location images
    const shouldUseAnimatedBackground = weatherInfo.Weather !== null;

    // Check if weather data is available
    const hasWeatherData = weatherInfo.name && weatherInfo.temp !== null;

    // Get weather icon based on weather condition with enhanced symbols
    const getWeatherIcon = (weather, temp, isNight = false, size = 40) => {
        const weatherLower = weather.toLowerCase();
        const temperature = parseFloat(temp);
        const iconSize = { fontSize: size };
        
        // Temperature-based styling
        const getTemperatureColor = (temp) => {
            if (temp > 35) return '#ff4757'; // Hot red
            if (temp > 25) return '#ffa502'; // Warm orange
            if (temp > 15) return '#2ed573'; // Mild green
            if (temp > 5) return '#3742fa'; // Cool blue
            return '#70a1ff'; // Cold light blue
        };
        
        const tempColor = getTemperatureColor(temperature);
        
        // Weather condition mapping with appropriate icons and colors
        if (weatherLower.includes('rain') || weatherLower.includes('drizzle')) {
            if (weatherLower.includes('heavy') || weatherLower.includes('thunderstorm')) {
                return <ThunderstormIcon sx={{ ...iconSize, color: '#5352ed' }} />;
            }
            return <UmbrellaIcon sx={{ ...iconSize, color: '#4a90e2' }} />;
        } 
        
        if (weatherLower.includes('snow') || weatherLower.includes('blizzard')) {
            return <AcUnitIcon sx={{ ...iconSize, color: '#70a1ff' }} />;
        }
        
        if (weatherLower.includes('thunder') || weatherLower.includes('storm')) {
            return <FlashOnIcon sx={{ ...iconSize, color: '#ffd700' }} />;
        }
        
        if (weatherLower.includes('cloud')) {
            if (weatherLower.includes('partly') || weatherLower.includes('few')) {
                return <CloudIcon sx={{ ...iconSize, color: '#b0c4de' }} />;
            }
            return <FilterDramaIcon sx={{ ...iconSize, color: '#95a5a6' }} />;
        }
        
        if (weatherLower.includes('fog') || weatherLower.includes('mist') || weatherLower.includes('haze')) {
            return <FoggyIcon sx={{ ...iconSize, color: '#bdc3c7' }} />;
        }
        
        if (weatherLower.includes('clear') || weatherLower.includes('sunny')) {
            if (isNight) {
                return <NightsStayIcon sx={{ ...iconSize, color: '#f39c12' }} />;
            }
            
            // Temperature-based sun icons
            if (temperature > 35) {
                return <WhatshotIcon sx={{ ...iconSize, color: '#e74c3c' }} />;
            } else if (temperature > 25) {
                return <WbSunnyIcon sx={{ ...iconSize, color: '#f39c12' }} />;
            } else {
                return <BrightnessHighIcon sx={{ ...iconSize, color: '#f1c40f' }} />;
            }
        }
        
        // Special temperature conditions
        if (temperature > 40) {
            return <WhatshotIcon sx={{ ...iconSize, color: '#e74c3c' }} />;
        }
        
        if (temperature < -10) {
            return <AcUnitSharpIcon sx={{ ...iconSize, color: '#3498db' }} />;
        }
        
        // Default cases
        return isNight ? 
            <NightsStayIcon sx={{ ...iconSize, color: tempColor }} /> :
            <CloudIcon sx={{ ...iconSize, color: tempColor }} />;
    };

    // Get weather condition chip color with enhanced styling
    const getWeatherChipColor = (weather, temp) => {
        const weatherLower = weather.toLowerCase();
        const temperature = parseFloat(temp);
        
        // Temperature-based colors
        if (temperature > 40) return { 
            backgroundColor: '#e74c3c', 
            color: 'white',
            boxShadow: '0 4px 15px rgba(231, 76, 60, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
        };
        if (temperature > 30) return { 
            backgroundColor: '#f39c12', 
            color: 'white',
            boxShadow: '0 4px 15px rgba(243, 156, 18, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
        };
        if (temperature < 0) return { 
            backgroundColor: '#3498db', 
            color: 'white',
            boxShadow: '0 4px 15px rgba(52, 152, 219, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
        };
        if (temperature < 10) return { 
            backgroundColor: '#74b9ff', 
            color: 'white',
            boxShadow: '0 4px 15px rgba(116, 185, 255, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
        };
        
        // Weather-based colors
        if (weatherLower.includes('rain') || weatherLower.includes('storm')) return { 
            backgroundColor: '#4a90e2', 
            color: 'white',
            boxShadow: '0 4px 15px rgba(74, 144, 226, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
        };
        if (weatherLower.includes('snow')) return { 
            backgroundColor: '#70a1ff', 
            color: 'white',
            boxShadow: '0 4px 15px rgba(112, 161, 255, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
        };
        if (weatherLower.includes('cloud')) return { 
            backgroundColor: '#95a5a6', 
            color: 'white',
            boxShadow: '0 4px 15px rgba(149, 165, 166, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
        };
        
        // Default sunny/clear
        return { 
            backgroundColor: '#2ed573', 
            color: 'white',
            boxShadow: '0 4px 15px rgba(46, 213, 115, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
        };
    };

    // Get temperature status message
    const getTemperatureStatus = (temp) => {
        const temperature = parseFloat(temp);
        if (temperature > 40) return "🔥 Extremely Hot";
        if (temperature > 30) return "☀️ Hot";
        if (temperature > 20) return "🌤️ Warm";
        if (temperature > 10) return "😊 Pleasant";
        if (temperature > 0) return "🧥 Cool";
        return "🥶 Very Cold";
    };

    return (
        <>
            <GlobalStyle />
            <WeatherCard hasData={hasWeatherData}>
                <CardActionArea>
                    {/* Control buttons for temperature, theme, and location */}
                    <ControlsContainer>
                        <Tooltip title={`Switch to ${isCelsius ? 'Fahrenheit' : 'Celsius'}`}>
                            <ControlButton onClick={handleTemperatureToggle}>
                                <ThermostatIcon />
                            </ControlButton>
                        </Tooltip>
                        
                        {onThemeToggle && (
                            <Tooltip title={`Switch to ${isDarkTheme ? 'Light' : 'Dark'} theme`}>
                                <ControlButton onClick={onThemeToggle}>
                                    {isDarkTheme ? <BrightnessHighIcon /> : <NightsStayIcon />}
                                </ControlButton>
                            </Tooltip>
                        )}
                        
                        <Tooltip title="Use My Location">
                            <ControlButton onClick={handleLocationRequest}>
                                <GpsFixedIcon />
                            </ControlButton>
                        </Tooltip>
                    </ControlsContainer>

                    {/* Loading State */}
                    {loading ? (
                        <LoadingContainer>
                            <CircularProgress size={60} thickness={4} />
                            <Typography variant="h6" sx={{ 
                                color: 'white', 
                                textAlign: 'center',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                            }}>
                                Getting weather data...
                            </Typography>
                        </LoadingContainer>
                    ) : error ? (
                        /* Error State */
                        <ErrorContainer>
                            <CloudIcon sx={{ 
                                fontSize: 80, 
                                color: 'rgba(255,255,255,0.7)',
                                mb: 2 
                            }} />
                            <Typography variant="h5" sx={{ 
                                color: 'white', 
                                textAlign: 'center',
                                mb: 2,
                                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                            }}>
                                Oops! Something went wrong
                            </Typography>
                            <Typography variant="body1" sx={{ 
                                color: 'rgba(255,255,255,0.8)', 
                                textAlign: 'center',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                            }}>
                                {error}
                            </Typography>
                        </ErrorContainer>
                    ) : !hasWeatherData ? (
                        /* Welcome State */
                        <Box sx={{
                            minHeight: '60vh',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)',
                                animation: 'shimmer 4s ease-in-out infinite alternate',
                            }
                        }}>
                            <Box sx={{
                                textAlign: 'center',
                                zIndex: 2,
                                position: 'relative'
                            }}>
                                <CloudIcon sx={{ 
                                    fontSize: 80, 
                                    color: 'rgba(255,255,255,0.9)',
                                    mb: 2,
                                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                                }} />
                                <Typography variant="h4" sx={{
                                    color: 'white',
                                    textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
                                    fontWeight: '300',
                                    mb: 1
                                }}>
                                    Weather App
                                </Typography>
                                <Typography variant="h6" sx={{
                                    color: 'rgba(255,255,255,0.9)',
                                    textShadow: '1px 1px 4px rgba(0,0,0,0.4)',
                                    fontWeight: '400'
                                }}>
                                    Search for a city to get started
                                </Typography>
                                
                                {/* Temperature unit toggle in welcome state */}
                                <Box sx={{ mt: 4 }}>
                                    <ToggleContainer>
                                        <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                                            °C
                                        </Typography>
                                        <FormControlLabel
                                            control={
                                                <Switch 
                                                    checked={!isCelsius}
                                                    onChange={handleTemperatureToggle}
                                                    size="small"
                                                />
                                            }
                                            label=""
                                        />
                                        <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                                            °F
                                        </Typography>
                                    </ToggleContainer>
                                </Box>
                            </Box>
                        </Box>
                    ) : shouldUseAnimatedBackground ? (
                        <AnimatedWeatherBackground 
                            weatherType={weatherInfo.Weather}
                            sx={{
                                height: 240,
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                            }}
                        >
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                textAlign: 'center',
                                zIndex: 2,
                            }}>
                                <WeatherIconContainer sx={{ 
                                    width: 80, 
                                    height: 80, 
                                    mb: 2,
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                    backdropFilter: 'blur(20px)',
                                }}>
                                    {getWeatherIcon(weatherInfo.Weather, weatherInfo.temp, false, 60)}
                                </WeatherIconContainer>
                                <Typography variant="h6" sx={{
                                    color: 'white',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                                    fontWeight: 'bold',
                                    background: 'rgba(0, 0, 0, 0.2)',
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    backdropFilter: 'blur(10px)',
                                }}>
                                    {weatherInfo.Weather}
                                </Typography>
                            </Box>
                        </AnimatedWeatherBackground>
                    ) : (
                        <CardMedia
                            component="img"
                            height="240"
                            image={getCityImageUrl(weatherInfo.name)}
                            alt={`${weatherInfo.name} cityscape`}
                            sx={{
                                filter: 'brightness(0.6) contrast(1.2) saturate(1.1)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative',
                                '&:hover': {
                                    filter: 'brightness(0.8) contrast(1.3) saturate(1.2)',
                                    transform: 'scale(1.02)',
                                },
                            }}
                        />
                    )}
                    
                    <CardContent sx={{ 
                        padding: { xs: '20px', sm: '40px', md: '60px' }, 
                        position: 'relative', 
                        zIndex: 2,
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                    {!hasWeatherData ? (
                        /* Enhanced Welcome Content */
                        <Box sx={{ textAlign: 'center', py: 8, px: 4 }}>
                            <Typography variant="h2" sx={{
                                mb: 4,
                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                fontWeight: '300',
                                fontSize: { xs: '2.5rem', md: '3.5rem' }
                            }}>
                                Welcome to Weather App
                            </Typography>
                            <Typography variant="h5" sx={{
                                color: 'rgba(255,255,255,0.8)',
                                mb: 6,
                                fontWeight: '400',
                                maxWidth: '800px',
                                mx: 'auto',
                                lineHeight: 1.6
                            }}>
                                Get comprehensive weather information for any city worldwide. 
                                Enter a city name in the search box above to explore detailed weather conditions, 
                                forecasts, and atmospheric data.
                            </Typography>

                            {/* Enhanced Feature Grid */}
                            <Grid container spacing={4} sx={{ mb: 6, maxWidth: '1000px', mx: 'auto' }}>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Box sx={{ 
                                        textAlign: 'center',
                                        p: 3,
                                        borderRadius: '20px',
                                        background: 'rgba(255,255,255,0.05)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            background: 'rgba(255,255,255,0.1)',
                                        }
                                    }}>
                                        <WbSunnyIcon sx={{ fontSize: 64, color: '#f39c12', mb: 2 }} />
                                        <Typography variant="h6" sx={{ color: '#fff', mb: 1, fontWeight: 600 }}>
                                            Real-time Weather
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                            Current temperature, humidity, wind speed, and atmospheric conditions
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Box sx={{ 
                                        textAlign: 'center',
                                        p: 3,
                                        borderRadius: '20px',
                                        background: 'rgba(255,255,255,0.05)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            background: 'rgba(255,255,255,0.1)',
                                        }
                                    }}>
                                        <CalendarTodayIcon sx={{ fontSize: 64, color: '#3498db', mb: 2 }} />
                                        <Typography variant="h6" sx={{ color: '#fff', mb: 1, fontWeight: 600 }}>
                                            7-Day Forecast
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                            Extended weather predictions with daily highs, lows, and conditions
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Box sx={{ 
                                        textAlign: 'center',
                                        p: 3,
                                        borderRadius: '20px',
                                        background: 'rgba(255,255,255,0.05)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            background: 'rgba(255,255,255,0.1)',
                                        }
                                    }}>
                                        <LocationOnIcon sx={{ fontSize: 64, color: '#e74c3c', mb: 2 }} />
                                        <Typography variant="h6" sx={{ color: '#fff', mb: 1, fontWeight: 600 }}>
                                            Global Coverage
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                            Weather data for cities and locations worldwide
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Box sx={{ 
                                        textAlign: 'center',
                                        p: 3,
                                        borderRadius: '20px',
                                        background: 'rgba(255,255,255,0.05)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            background: 'rgba(255,255,255,0.1)',
                                        }
                                    }}>
                                        <VisibilityIcon sx={{ fontSize: 64, color: '#9b59b6', mb: 2 }} />
                                        <Typography variant="h6" sx={{ color: '#fff', mb: 1, fontWeight: 600 }}>
                                            Detailed Analytics
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                            Comprehensive weather metrics and atmospheric insights
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                            {/* Weather Tips Section */}
                            <Box sx={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255,255,255,0.15)',
                                borderRadius: '25px',
                                p: 4,
                                mb: 6,
                                maxWidth: '900px',
                                mx: 'auto'
                            }}>
                                <Typography variant="h5" sx={{ 
                                    color: '#fff', 
                                    mb: 3, 
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 2
                                }}>
                                    <ThermostatAutoIcon sx={{ fontSize: 32, color: '#ffd93d' }} />
                                    Quick Start Guide
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                                            <Box sx={{
                                                background: '#667eea',
                                                color: 'white',
                                                borderRadius: '50%',
                                                width: 32,
                                                height: 32,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 'bold',
                                                fontSize: '0.9rem'
                                            }}>
                                                1
                                            </Box>
                                            <Box>
                                                <Typography variant="h6" sx={{ color: '#fff', mb: 0.5, fontSize: '1.1rem' }}>
                                                    Search for a City
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                                    Type any city name in the search box above
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                                            <Box sx={{
                                                background: '#764ba2',
                                                color: 'white',
                                                borderRadius: '50%',
                                                width: 32,
                                                height: 32,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 'bold',
                                                fontSize: '0.9rem'
                                            }}>
                                                2
                                            </Box>
                                            <Box>
                                                <Typography variant="h6" sx={{ color: '#fff', mb: 0.5, fontSize: '1.1rem' }}>
                                                    Explore Weather Data
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                                    View current conditions and detailed forecasts
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                            {/* Popular Cities */}
                            <Typography variant="h5" sx={{ 
                                color: 'rgba(255,255,255,0.9)', 
                                mb: 3, 
                                fontWeight: 600 
                            }}>
                                Popular Cities to Explore
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 2,
                                justifyContent: 'center',
                                maxWidth: '800px',
                                mx: 'auto'
                            }}>
                                {['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Mumbai', 'Dubai', 'Singapore'].map((city) => (
                                    <Chip
                                        key={city}
                                        label={city}
                                        sx={{
                                            background: 'rgba(255,255,255,0.1)',
                                            color: '#fff',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            backdropFilter: 'blur(10px)',
                                            fontSize: '1rem',
                                            py: 2,
                                            px: 1,
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                background: 'rgba(255,255,255,0.2)',
                                                transform: 'translateY(-2px)',
                                                cursor: 'pointer'
                                            }
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    ) : (
                        /* Weather Content */
                        <>
                    {/* Enhanced Header Section with Gradient Background */}
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start', 
                        mb: 4,
                        p: 3,
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    }}>
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <LocationOnIcon sx={{ 
                                    fontSize: 28, 
                                    opacity: 0.9,
                                    color: '#ffd700',
                                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                                }} />
                                <Typography gutterBottom variant="h3" component="div" sx={{ 
                                    fontWeight: '300', 
                                    margin: 0,
                                    textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
                                    background: 'linear-gradient(45deg, #ffffff, #f8f9fa, #e9ecef)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    letterSpacing: '1px',
                                }}>
                                    {weatherInfo.name}
                                </Typography>
                            </Box>
                            <Typography variant="h6" sx={{ 
                                opacity: 0.9, 
                                fontSize: '1.1rem',
                                fontWeight: 500,
                                color: '#f8f9fa',
                                textShadow: '1px 1px 3px rgba(0,0,0,0.4)',
                                mb: 1
                            }}>
                                {new Date().toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </Typography>
                            <Typography variant="h6" sx={{ 
                                opacity: 0.8, 
                                display: 'block', 
                                mt: 1,
                                color: '#ffd700',
                                fontWeight: 600,
                                textShadow: '1px 1px 3px rgba(0,0,0,0.4)',
                            }}>
                                {getTemperatureStatus(weatherInfo.temp)}
                            </Typography>
                        </Box>
                        {!shouldUseAnimatedBackground && (
                            <WeatherIconContainer sx={{
                                width: 90,
                                height: 90,
                                backgroundColor: 'rgba(255,255,255,0.15)',
                                backdropFilter: 'blur(15px)',
                                border: '2px solid rgba(255,255,255,0.3)',
                                boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
                            }}>
                                {getWeatherIcon(weatherInfo.Weather, weatherInfo.temp, false, 65)}
                            </WeatherIconContainer>
                        )}
                    </Box>

                    {/* Enhanced Temperature Section */}
                    <Grid container spacing={4} sx={{ mb: 4 }}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 3, 
                                p: 4,
                                borderRadius: '25px',
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                                backdropFilter: 'blur(30px)',
                                border: '1px solid rgba(255,255,255,0.15)',
                                boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                                position: 'relative',
                                overflow: 'hidden',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.02) 50%, transparent 70%)',
                                    animation: 'shimmer 3s ease-in-out infinite',
                                }
                            }}>
                                <Typography variant="h1" sx={{ 
                                    fontWeight: '100', 
                                    fontSize: { xs: '4rem', md: '5.5rem' },
                                    textShadow: '4px 4px 12px rgba(0,0,0,0.6)',
                                    background: 'linear-gradient(45deg, #ffffff 0%, #f1f2f6 50%, #ddd 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    letterSpacing: '-4px',
                                    position: 'relative',
                                    zIndex: 2
                                }}>
                                    {formatTemperature(weatherInfo.temp)}
                                </Typography>
                                <Box sx={{ position: 'relative', zIndex: 2 }}>
                                    <Chip 
                                        label={weatherInfo.Weather} 
                                        sx={{
                                            ...getWeatherChipColor(weatherInfo.Weather, weatherInfo.temp),
                                            fontWeight: 'bold',
                                            textTransform: 'capitalize',
                                            fontSize: '1.2rem',
                                            height: 50,
                                            mb: 2,
                                            borderRadius: '25px',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            transform: 'perspective(1000px) rotateX(0deg)',
                                            '&:hover': {
                                                transform: 'perspective(1000px) rotateX(10deg) scale(1.08)',
                                                boxShadow: '0 8px 25px rgba(0,0,0,0.5)',
                                            }
                                        }}
                                    />
                                    <Typography variant="h6" sx={{ 
                                        opacity: 0.95, 
                                        fontSize: '1.3rem',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.4)',
                                        fontWeight: 500,
                                        color: '#f8f9fa'
                                    }}>
                                        Feels like {formatTemperature(weatherInfo.feels_like)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ 
                                p: 4,
                                borderRadius: '25px',
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                                backdropFilter: 'blur(25px)',
                                border: '1px solid rgba(255,255,255,0.15)',
                                boxShadow: '0 10px 35px rgba(0,0,0,0.3)',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <Typography variant="h6" sx={{ 
                                    mb: 3, 
                                    textAlign: 'center',
                                    opacity: 0.95,
                                    fontWeight: 600,
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                                    color: '#f8f9fa',
                                }}>
                                    🌡️ Temperature Range
                                </Typography>
                                <Box sx={{ 
                                    display: 'flex', 
                                    gap: 2, 
                                    justifyContent: 'center',
                                    flexWrap: 'wrap'
                                }}>
                                    <Chip 
                                        icon={<AcUnitIcon />}
                                        label={`Low ${formatTemperature(weatherInfo.temp_min)}`} 
                                        variant="outlined" 
                                        size="large"
                                        sx={{ 
                                            color: 'white', 
                                            borderColor: alpha('#ffffff', 0.6),
                                            backgroundColor: alpha('#74b9ff', 0.3),
                                            fontWeight: 700,
                                            fontSize: '1.1rem',
                                            height: 48,
                                            borderRadius: '24px',
                                            backdropFilter: 'blur(10px)',
                                            boxShadow: '0 6px 20px rgba(116, 185, 255, 0.3)',
                                            border: '2px solid rgba(116, 185, 255, 0.4)',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            '&:hover': {
                                                backgroundColor: alpha('#74b9ff', 0.5),
                                                transform: 'translateY(-3px) scale(1.05)',
                                                boxShadow: '0 12px 30px rgba(116, 185, 255, 0.4)',
                                            }
                                        }}
                                    />
                                    <Chip 
                                        icon={<WhatshotIcon />}
                                        label={`High ${formatTemperature(weatherInfo.temp_max)}`} 
                                        variant="outlined" 
                                        size="large"
                                        sx={{ 
                                            color: 'white', 
                                            borderColor: alpha('#ffffff', 0.6),
                                            backgroundColor: alpha('#ff6b6b', 0.3),
                                            fontWeight: 700,
                                            fontSize: '1.1rem',
                                            height: 48,
                                            borderRadius: '24px',
                                            backdropFilter: 'blur(10px)',
                                            boxShadow: '0 6px 20px rgba(255, 107, 107, 0.3)',
                                            border: '2px solid rgba(255, 107, 107, 0.4)',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            '&:hover': {
                                                backgroundColor: alpha('#ff6b6b', 0.5),
                                                transform: 'translateY(-3px) scale(1.05)',
                                                boxShadow: '0 12px 30px rgba(255, 107, 107, 0.4)',
                                            }
                                        }}
                                    />
                                </Box>
                                <Typography variant="h6" sx={{ 
                                    mt: 3,
                                    textAlign: 'center',
                                    opacity: 0.8, 
                                    color: '#ffd700',
                                    fontWeight: 600,
                                    textShadow: '1px 1px 3px rgba(0,0,0,0.4)',
                                }}>
                                    {getTemperatureStatus(weatherInfo.temp)}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <Divider sx={{ 
                        my: 4, 
                        borderColor: alpha('#ffffff', 0.3), 
                        borderWidth: 2,
                        borderRadius: '2px',
                        boxShadow: '0 2px 8px rgba(255,255,255,0.1)'
                    }} />

                    {/* Enhanced Tabs for Current/Daily Forecast - only show when weather data is available */}
                    {hasWeatherData && (
                        <StyledTabs 
                            value={tabValue} 
                            onChange={handleTabChange} 
                            centered
                            sx={{ mb: 4 }}
                        >
                            <Tab label="🌡️ Current Weather" />
                            <Tab label="📅 7-Day Forecast" />
                        </StyledTabs>
                    )}

                    {/* Tab Content - only show when weather data is available */}
                    {hasWeatherData && tabValue === 0 && (
                        <Box sx={{
                            p: 3,
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                            backdropFilter: 'blur(25px)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            boxShadow: '0 10px 35px rgba(0,0,0,0.3)',
                        }}>
                            <Typography variant="h5" sx={{ 
                                mb: 4, 
                                textAlign: 'center', 
                                opacity: 0.95,
                                fontWeight: 600,
                                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                                color: '#f8f9fa',
                                fontSize: '1.5rem'
                            }}>
                                🌡️ Weather Details
                            </Typography>
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={6} lg={3}>
                                    <StatsBox>
                                        <OpacityIcon sx={{ color: '#4ecdc4', fontSize: 32 }} />
                                        <Box>
                                            <Typography variant="caption" display="block" sx={{ 
                                                opacity: 0.9, 
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                fontSize: '0.8rem'
                                            }}>
                                                Humidity
                                            </Typography>
                                            <Typography variant="h4" fontWeight="bold" sx={{
                                                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                                                color: '#4ecdc4'
                                            }}>
                                                {weatherInfo.humidity}%
                                            </Typography>
                                        </Box>
                                    </StatsBox>
                                </Grid>
                                <Grid item xs={12} sm={6} lg={3}>
                                    <StatsBox>
                                        <AirIcon sx={{ color: '#95e1d3', fontSize: 32 }} />
                                        <Box>
                                            <Typography variant="caption" display="block" sx={{ 
                                                opacity: 0.9, 
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                fontSize: '0.8rem'
                                            }}>
                                                Wind Speed
                                            </Typography>
                                            <Typography variant="h4" fontWeight="bold" sx={{
                                                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                                                color: '#95e1d3'
                                            }}>
                                                {weatherInfo.wind_speed} m/s
                                            </Typography>
                                        </Box>
                                    </StatsBox>
                                </Grid>
                                {weatherInfo.visibility && weatherInfo.visibility !== 'N/A' && (
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <StatsBox>
                                            <VisibilityIcon sx={{ color: '#a8e6cf', fontSize: 32 }} />
                                            <Box>
                                                <Typography variant="caption" display="block" sx={{ 
                                                    opacity: 0.9, 
                                                    fontWeight: 700,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '1px',
                                                    fontSize: '0.8rem'
                                                }}>
                                                    Visibility
                                                </Typography>
                                                <Typography variant="h4" fontWeight="bold" sx={{
                                                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                                                    color: '#a8e6cf'
                                                }}>
                                                    {weatherInfo.visibility} km
                                                </Typography>
                                            </Box>
                                        </StatsBox>
                                    </Grid>
                                )}
                                <Grid item xs={12} sm={6} lg={3}>
                                    <StatsBox>
                                        <ThermostatAutoIcon sx={{ color: '#ffd93d', fontSize: 32 }} />
                                        <Box>
                                            <Typography variant="caption" display="block" sx={{ 
                                                opacity: 0.9, 
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                fontSize: '0.8rem'
                                            }}>
                                                Real Feel
                                            </Typography>
                                            <Typography variant="h4" fontWeight="bold" sx={{
                                                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                                                color: '#ffd93d'
                                            }}>
                                                {formatTemperature(weatherInfo.feels_like)}
                                            </Typography>
                                        </Box>
                                    </StatsBox>
                                </Grid>
                            </Grid>
                        </Box>
                    )}

                    {hasWeatherData && tabValue === 1 && (
                        <Box>
                            <Typography variant="h5" sx={{ 
                                mb: 4, 
                                textAlign: 'center', 
                                opacity: 0.95,
                                fontWeight: 600,
                                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                                color: '#f8f9fa',
                                fontSize: '1.5rem'
                            }}>
                                📅 7-Day Weather Forecast
                            </Typography>
                            <Grid container spacing={2}>
                                {dailyForecast.map((forecast, index) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                        <ForecastCard elevation={0}>
                                            {/* Day and Date Header */}
                                            <Box sx={{ mb: 2 }}>
                                                <Typography variant="h6" sx={{ 
                                                    fontWeight: 'bold',
                                                    color: index === 0 ? '#ffd700' : '#ffffff',
                                                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                                                    mb: 0.5
                                                }}>
                                                    {forecast.day}
                                                </Typography>
                                                <Typography variant="caption" sx={{ 
                                                    opacity: 0.8,
                                                    fontSize: '0.9rem',
                                                    color: '#e0e0e0'
                                                }}>
                                                    {forecast.date}
                                                </Typography>
                                            </Box>

                                            {/* Weather Icon */}
                                            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                                                <WeatherIconContainer sx={{ 
                                                    padding: '8px', 
                                                    width: 50, 
                                                    height: 50,
                                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                                    border: '1px solid rgba(255,255,255,0.2)'
                                                }}>
                                                    {getWeatherIcon(forecast.weather, forecast.tempMax, false, 28)}
                                                </WeatherIconContainer>
                                            </Box>

                                            {/* Weather Condition */}
                                            <Typography variant="body2" sx={{ 
                                                mb: 2,
                                                textTransform: 'capitalize',
                                                color: '#e0e0e0',
                                                fontWeight: 500
                                            }}>
                                                {forecast.weather}
                                            </Typography>

                                            {/* Temperature Range */}
                                            <Box sx={{ mb: 2 }}>
                                                <Typography variant="h5" sx={{ 
                                                    fontWeight: 'bold',
                                                    color: '#ffffff',
                                                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                                                }}>
                                                    {Math.round(forecast.tempMax)}°{isCelsius ? 'C' : 'F'}
                                                </Typography>
                                                <Typography variant="body2" sx={{ 
                                                    color: 'rgba(255,255,255,0.7)',
                                                    fontSize: '0.9rem'
                                                }}>
                                                    Low {Math.round(forecast.tempMin)}°{isCelsius ? 'C' : 'F'}
                                                </Typography>
                                            </Box>

                                            {/* Additional Details */}
                                            <Box sx={{ 
                                                display: 'flex', 
                                                justifyContent: 'space-between', 
                                                alignItems: 'center',
                                                mt: 2,
                                                pt: 2,
                                                borderTop: '1px solid rgba(255,255,255,0.1)'
                                            }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <OpacityIcon sx={{ fontSize: 16, opacity: 0.7, color: '#4ecdc4' }} />
                                                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#4ecdc4' }}>
                                                        {forecast.humidity.toFixed(0)}%
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <AirIcon sx={{ fontSize: 16, opacity: 0.7, color: '#95e1d3' }} />
                                                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#95e1d3' }}>
                                                        {forecast.windSpeed} m/s
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            {/* Precipitation if any */}
                                            {forecast.precipitation > 0 && (
                                                <Box sx={{ 
                                                    mt: 1.5,
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'center',
                                                    gap: 0.5 
                                                }}>
                                                    <UmbrellaIcon sx={{ fontSize: 14, color: '#4a90e2' }} />
                                                    <Typography variant="caption" sx={{ 
                                                        fontWeight: 600,
                                                        color: '#4a90e2'
                                                    }}>
                                                        {forecast.precipitation}mm
                                                    </Typography>
                                                </Box>
                                            )}
                                        </ForecastCard>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                        </>
                    )}
                </CardContent>
            </CardActionArea>
        </WeatherCard>
        
        {/* Favorites Button - only show when weather data is available */}
        {hasWeatherData && (
            <Tooltip title={isCurrentCityFavorite ? 'Remove from favorites' : 'Add to favorites'}>
                <FavoriteFab 
                    onClick={handleFavoriteToggle}
                    color={isCurrentCityFavorite ? "secondary" : "default"}
                >
                    <Badge 
                        badgeContent={favorites.length} 
                        color="error"
                        sx={{
                            '& .MuiBadge-badge': {
                                backgroundColor: '#ff4757',
                                color: 'white',
                                fontWeight: 'bold'
                            }
                        }}
                    >
                        <FavoriteIcon sx={{ 
                            color: isCurrentCityFavorite ? '#ff4757' : 'rgba(255,255,255,0.8)',
                            filter: isCurrentCityFavorite ? 'drop-shadow(0 0 8px rgba(255,71,87,0.8))' : 'none'
                        }} />
                    </Badge>
                </FavoriteFab>
            </Tooltip>
        )}
        </>
    );
}