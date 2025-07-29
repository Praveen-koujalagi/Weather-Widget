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
import { styled } from '@mui/material/styles';
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
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import Badge from '@mui/material/Badge';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import LinearProgress from '@mui/material/LinearProgress';
import { linearProgressClasses } from '@mui/material/LinearProgress';

const WeatherCard = styled(Card)(({ theme, hasData, isDark }) => ({
  maxWidth: '95%',
  width: '100%',
  minHeight: 'calc(100vh - 200px)',
  margin: '20px auto',
  borderRadius: 30,
  boxShadow: hasData 
    ? '0 30px 100px rgba(0, 0, 0, 0.5), 0 20px 60px rgba(0, 0, 0, 0.4)'
    : '0 20px 60px rgba(0, 0, 0, 0.3), 0 10px 30px rgba(0, 0, 0, 0.2)',
  background: hasData 
    ? (isDark 
        ? 'linear-gradient(145deg, #1a1a2e 0%, #16213e 20%, #0f3460 60%, #1e3c72 90%, #2a5298 100%)'
        : 'linear-gradient(145deg, #667eea 0%, #764ba2 20%, #f093fb 60%, #f5576c 90%, #4facfe 100%)')
    : (isDark
        ? 'linear-gradient(145deg, #2c2c54 0%, #40407a 30%, #706fd3 70%, #8395a7 100%)'
        : 'linear-gradient(145deg, #a8edea 0%, #fed6e3 30%, #d299c2 70%, #fef9d7 100%)'),
  color: 'white',
  overflow: 'hidden',
  position: 'relative',
  border: `1px solid rgba(255, 255, 255, ${isDark ? '0.15' : '0.25'})`,
  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  flexDirection: 'column',
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '300px',
  gap: '20px',
}));

const ControlsContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '20px',
  right: '20px',
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  zIndex: 10,
  flexWrap: 'nowrap',
  alignItems: 'center',
  '@media (max-width: 768px)': {
    top: '15px',
    right: '15px',
    gap: '6px',
    flexDirection: 'column',
  },
  '@media (max-width: 480px)': {
    top: '10px',
    right: '10px',
    gap: '4px',
  },
}));

const ControlButton = styled(IconButton)(({ theme, isDark }) => ({
  backgroundColor: isDark 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
  border: isDark 
    ? '1px solid rgba(255, 255, 255, 0.2)'
    : '1px solid rgba(0, 0, 0, 0.2)',
  color: isDark ? 'white' : 'rgba(0, 0, 0, 0.8)',
  width: '44px',
  height: '44px',
  minWidth: '44px',
  minHeight: '44px',
  padding: '8px',
  transition: 'all 0.3s ease',
  '& .MuiSvgIcon-root': {
    fontSize: '20px',
  },
  '@media (max-width: 768px)': {
    width: '40px',
    height: '40px',
    minWidth: '40px',
    minHeight: '40px',
    padding: '6px',
    '& .MuiSvgIcon-root': {
      fontSize: '18px',
    },
  },
  '@media (max-width: 480px)': {
    width: '36px',
    height: '36px',
    minWidth: '36px',
    minHeight: '36px',
    padding: '4px',
    '& .MuiSvgIcon-root': {
      fontSize: '16px',
    },
  },
  '&:hover': {
    backgroundColor: isDark 
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(0, 0, 0, 0.2)',
    transform: 'scale(1.1)',
    boxShadow: isDark 
      ? '0 4px 20px rgba(255, 255, 255, 0.2)'
      : '0 4px 20px rgba(0, 0, 0, 0.2)',
  },
}));

const ForecastContainer = styled(Box)(({ theme }) => ({
  marginTop: '20px',
  padding: '20px',
  borderRadius: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}));

const ForecastCard = styled(Paper)(({ theme, isDark }) => ({
  padding: '12px 8px',
  borderRadius: '16px',
  backgroundColor: isDark 
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(0, 0, 0, 0.08)',
  backdropFilter: 'blur(15px)',
  border: isDark 
    ? '1px solid rgba(255, 255, 255, 0.12)'
    : '1px solid rgba(0, 0, 0, 0.12)',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  minWidth: '100px',
  '&:hover': {
    backgroundColor: isDark 
      ? 'rgba(255, 255, 255, 0.15)'
      : 'rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-3px) scale(1.02)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
  }
}));

const SunProgressContainer = styled(Box)(({ theme }) => ({
  marginTop: '20px',
  padding: '20px',
  borderRadius: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  textAlign: 'center',
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme, isDark }) => ({
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: isDark 
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(0, 0, 0, 0.2)',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    background: 'linear-gradient(90deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
    boxShadow: '0 2px 10px rgba(255, 154, 158, 0.5)',
  },
}));

export default function InfoBox({ info, loading = false, error = null, onLocationRequest, onAddToFavorites, isDarkTheme, onThemeToggle, forecastData = [], sunData = null }) {
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

    // Handle geolocation
    const handleLocationRequest = () => {
        if (!navigator.geolocation) {
            alert('🚫 Geolocation is not supported by this browser. Please search for your city manually.');
            return;
        }

        if (!onLocationRequest) {
            alert('🚫 Location service is not available. Please try again later.');
            return;
        }

        // Show immediate feedback
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10000;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        `;
        notification.textContent = '📍 Getting your location...';
        document.body.appendChild(notification);

        const removeNotification = () => {
            if (notification && notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                removeNotification();
                onLocationRequest({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            },
            (error) => {
                removeNotification();
                console.error('Geolocation error:', error);
                
                let errorMessage = '🚫 Unable to get your location. ';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage += 'Please enable location permissions for this website in your browser settings.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage += 'Location information is unavailable. Please try again.';
                        break;
                    case error.TIMEOUT:
                        errorMessage += 'Location request timed out. Please try again.';
                        break;
                    default:
                        errorMessage += 'An unknown error occurred. Please try searching manually.';
                        break;
                }
                alert(errorMessage);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes
            }
        );
    };

    // Check if weather data is available
    const hasWeatherData = weatherInfo.name && weatherInfo.temp !== null;

    // Calculate sun progress
    const calculateSunProgress = () => {
        if (!sunData || !sunData.sunrise || !sunData.sunset) return { progress: 0, timeToSunset: '', timeToSunrise: '' };
        
        const now = new Date();
        const sunrise = new Date(sunData.sunrise * 1000);
        const sunset = new Date(sunData.sunset * 1000);
        
        const dayLength = sunset.getTime() - sunrise.getTime();
        const timeSinceSunrise = now.getTime() - sunrise.getTime();
        
        let progress = 0;
        let timeToSunset = '';
        let timeToSunrise = '';
        
        if (now < sunrise) {
            // Before sunrise
            progress = 0;
            const timeToRise = sunrise.getTime() - now.getTime();
            const hours = Math.floor(timeToRise / (1000 * 60 * 60));
            const minutes = Math.floor((timeToRise % (1000 * 60 * 60)) / (1000 * 60));
            timeToSunrise = `${hours}h ${minutes}m until sunrise`;
        } else if (now > sunset) {
            // After sunset
            progress = 100;
            const nextSunrise = new Date(sunrise);
            nextSunrise.setDate(nextSunrise.getDate() + 1);
            const timeToRise = nextSunrise.getTime() - now.getTime();
            const hours = Math.floor(timeToRise / (1000 * 60 * 60));
            const minutes = Math.floor((timeToRise % (1000 * 60 * 60)) / (1000 * 60));
            timeToSunrise = `${hours}h ${minutes}m until sunrise`;
        } else {
            // During daytime
            progress = (timeSinceSunrise / dayLength) * 100;
            const timeToSet = sunset.getTime() - now.getTime();
            const hours = Math.floor(timeToSet / (1000 * 60 * 60));
            const minutes = Math.floor((timeToSet % (1000 * 60 * 60)) / (1000 * 60));
            timeToSunset = `${hours}h ${minutes}m until sunset`;
        }
        
        return { 
            progress: Math.max(0, Math.min(100, progress)), 
            timeToSunset, 
            timeToSunrise,
            sunrise: sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sunset: sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
    };

    // Calculate sun progress once and store result
    const sunProgress = calculateSunProgress();

    // Get weather icon based on weather condition
    const getWeatherIcon = (weather, temp, size = 40) => {
        if (!weather) return <CloudIcon sx={{ fontSize: size, color: 'white' }} />;
        
        const weatherLower = weather.toLowerCase();
        const iconSize = { fontSize: size, color: 'white' };
        
        if (weatherLower.includes('rain') || weatherLower.includes('drizzle')) {
            return <UmbrellaIcon sx={iconSize} />;
        }
        if (weatherLower.includes('snow')) {
            return <AcUnitIcon sx={iconSize} />;
        }
        if (weatherLower.includes('thunder') || weatherLower.includes('storm')) {
            return <ThunderstormIcon sx={iconSize} />;
        }
        if (weatherLower.includes('cloud')) {
            return <CloudIcon sx={iconSize} />;
        }
        if (weatherLower.includes('fog') || weatherLower.includes('mist')) {
            return <FoggyIcon sx={iconSize} />;
        }
        if (weatherLower.includes('clear') || weatherLower.includes('sunny')) {
            return <WbSunnyIcon sx={iconSize} />;
        }
        
        return <CloudIcon sx={iconSize} />;
    };

    return (
        <>
            <WeatherCard hasData={hasWeatherData} isDark={isDarkTheme}>
                <CardActionArea>
                    {/* Control buttons */}
                    <ControlsContainer>
                        <Tooltip title={`Switch to ${isCelsius ? 'Fahrenheit' : 'Celsius'}`}>
                            <ControlButton onClick={handleTemperatureToggle} isDark={isDarkTheme}>
                                <ThermostatIcon />
                            </ControlButton>
                        </Tooltip>
                        
                        {onThemeToggle && (
                            <Tooltip title={`Switch to ${isDarkTheme ? 'Light' : 'Dark'} theme`}>
                                <ControlButton onClick={onThemeToggle} isDark={isDarkTheme}>
                                    {isDarkTheme ? <BrightnessHighIcon /> : <NightsStayIcon />}
                                </ControlButton>
                            </Tooltip>
                        )}
                        
                        <Tooltip title="📍 Get weather for my current location" arrow>
                            <ControlButton 
                                onClick={handleLocationRequest} 
                                isDark={isDarkTheme}
                                sx={{
                                    '&:hover': {
                                        transform: 'scale(1.1) rotate(10deg)',
                                        '& .MuiSvgIcon-root': {
                                            animation: 'pulse 1s infinite'
                                        }
                                    },
                                    '@keyframes pulse': {
                                        '0%': { transform: 'scale(1)' },
                                        '50%': { transform: 'scale(1.1)' },
                                        '100%': { transform: 'scale(1)' }
                                    }
                                }}
                            >
                                <GpsFixedIcon />
                            </ControlButton>
                        </Tooltip>
                    </ControlsContainer>

                    {/* Loading State */}
                    {loading ? (
                        <LoadingContainer>
                            <CircularProgress size={60} thickness={4} sx={{ color: 'white' }} />
                            <Typography variant="h6" sx={{ color: 'white', textAlign: 'center' }}>
                                Getting weather data...
                            </Typography>
                        </LoadingContainer>
                    ) : error ? (
                        /* Error State */
                        <LoadingContainer>
                            <CloudIcon sx={{ fontSize: 80, color: 'rgba(255,255,255,0.7)', mb: 2 }} />
                            <Typography variant="h5" sx={{ color: 'white', textAlign: 'center', mb: 2 }}>
                                Oops! Something went wrong
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>
                                {error}
                            </Typography>
                        </LoadingContainer>
                    ) : !hasWeatherData ? (
                        /* Welcome State */
                        <Box sx={{
                            minHeight: '60vh',
                            background: isDarkTheme 
                                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                : 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'background 0.6s ease',
                        }}>
                            <Box sx={{ textAlign: 'center', zIndex: 2, position: 'relative' }}>
                                <CloudIcon sx={{ fontSize: 80, color: 'rgba(255,255,255,0.9)', mb: 2 }} />
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
                            </Box>
                        </Box>
                    ) : (
                        /* Weather Data Display */
                        <CardContent sx={{ p: 4, pt: 6 }}>
                            {/* City Name and Temperature */}
                            <Box sx={{ textAlign: 'center', mb: 4, mt: 2 }}>
                                <Typography variant="h3" sx={{ 
                                    color: 'white', 
                                    fontWeight: 'bold',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                                    mb: 1,
                                    pr: { xs: 8, sm: 12 }, // Add right padding to avoid button overlap
                                    wordBreak: 'break-word'
                                }}>
                                    {weatherInfo.name}
                                </Typography>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
                                    {getWeatherIcon(weatherInfo.Weather, weatherInfo.temp, 60)}
                                    <Typography variant="h2" sx={{ 
                                        color: 'white',
                                        fontWeight: '300',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                                    }}>
                                        {formatTemperature(weatherInfo.temp)}
                                    </Typography>
                                </Box>
                                
                                <Chip 
                                    label={weatherInfo.Weather}
                                    sx={{
                                        backgroundColor: isDarkTheme 
                                            ? 'rgba(255, 255, 255, 0.2)'
                                            : 'rgba(0, 0, 0, 0.2)',
                                        color: isDarkTheme ? 'white' : 'rgba(0,0,0,0.9)',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        height: '40px',
                                        borderRadius: '20px',
                                        border: isDarkTheme 
                                            ? '1px solid rgba(255, 255, 255, 0.3)'
                                            : '1px solid rgba(0, 0, 0, 0.3)',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            </Box>

                            {/* Weather Details */}
                            <Grid container spacing={2}>
                                <Grid item xs={6} sm={3}>
                                    <Paper sx={{
                                        p: 2,
                                        backgroundColor: isDarkTheme 
                                            ? 'rgba(255, 255, 255, 0.1)'
                                            : 'rgba(0, 0, 0, 0.1)',
                                        backdropFilter: 'blur(10px)',
                                        border: isDarkTheme 
                                            ? '1px solid rgba(255, 255, 255, 0.2)'
                                            : '1px solid rgba(0, 0, 0, 0.2)',
                                        borderRadius: 2,
                                        textAlign: 'center',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <OpacityIcon sx={{ 
                                            color: isDarkTheme ? 'white' : 'rgba(0,0,0,0.8)', 
                                            mb: 1 
                                        }} />
                                        <Typography variant="body2" sx={{ 
                                            color: isDarkTheme 
                                                ? 'rgba(255,255,255,0.8)' 
                                                : 'rgba(0,0,0,0.7)' 
                                        }}>
                                            Humidity
                                        </Typography>
                                        <Typography variant="h6" sx={{ 
                                            color: isDarkTheme ? 'white' : 'rgba(0,0,0,0.9)', 
                                            fontWeight: 'bold' 
                                        }}>
                                            {weatherInfo.humidity}%
                                        </Typography>
                                    </Paper>
                                </Grid>
                                
                                <Grid item xs={6} sm={3}>
                                    <Paper sx={{
                                        p: 2,
                                        backgroundColor: isDarkTheme 
                                            ? 'rgba(255, 255, 255, 0.1)'
                                            : 'rgba(0, 0, 0, 0.1)',
                                        backdropFilter: 'blur(10px)',
                                        border: isDarkTheme 
                                            ? '1px solid rgba(255, 255, 255, 0.2)'
                                            : '1px solid rgba(0, 0, 0, 0.2)',
                                        borderRadius: 2,
                                        textAlign: 'center',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <AirIcon sx={{ 
                                            color: isDarkTheme ? 'white' : 'rgba(0,0,0,0.8)', 
                                            mb: 1 
                                        }} />
                                        <Typography variant="body2" sx={{ 
                                            color: isDarkTheme 
                                                ? 'rgba(255,255,255,0.8)' 
                                                : 'rgba(0,0,0,0.7)' 
                                        }}>
                                            Wind Speed
                                        </Typography>
                                        <Typography variant="h6" sx={{ 
                                            color: isDarkTheme ? 'white' : 'rgba(0,0,0,0.9)', 
                                            fontWeight: 'bold' 
                                        }}>
                                            {weatherInfo.wind_speed} km/h
                                        </Typography>
                                    </Paper>
                                </Grid>
                                
                                <Grid item xs={6} sm={3}>
                                    <Paper sx={{
                                        p: 2,
                                        backgroundColor: isDarkTheme 
                                            ? 'rgba(255, 255, 255, 0.1)'
                                            : 'rgba(0, 0, 0, 0.1)',
                                        backdropFilter: 'blur(10px)',
                                        border: isDarkTheme 
                                            ? '1px solid rgba(255, 255, 255, 0.2)'
                                            : '1px solid rgba(0, 0, 0, 0.2)',
                                        borderRadius: 2,
                                        textAlign: 'center',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <ThermostatIcon sx={{ 
                                            color: isDarkTheme ? 'white' : 'rgba(0,0,0,0.8)', 
                                            mb: 1 
                                        }} />
                                        <Typography variant="body2" sx={{ 
                                            color: isDarkTheme 
                                                ? 'rgba(255,255,255,0.8)' 
                                                : 'rgba(0,0,0,0.7)' 
                                        }}>
                                            Feels Like
                                        </Typography>
                                        <Typography variant="h6" sx={{ 
                                            color: isDarkTheme ? 'white' : 'rgba(0,0,0,0.9)', 
                                            fontWeight: 'bold' 
                                        }}>
                                            {formatTemperature(weatherInfo.feels_like)}
                                        </Typography>
                                    </Paper>
                                </Grid>
                                
                                <Grid item xs={6} sm={3}>
                                    <Paper sx={{
                                        p: 2,
                                        backgroundColor: isDarkTheme 
                                            ? 'rgba(255, 255, 255, 0.1)'
                                            : 'rgba(0, 0, 0, 0.1)',
                                        backdropFilter: 'blur(10px)',
                                        border: isDarkTheme 
                                            ? '1px solid rgba(255, 255, 255, 0.2)'
                                            : '1px solid rgba(0, 0, 0, 0.2)',
                                        borderRadius: 2,
                                        textAlign: 'center',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <VisibilityIcon sx={{ 
                                            color: isDarkTheme ? 'white' : 'rgba(0,0,0,0.8)', 
                                            mb: 1 
                                        }} />
                                        <Typography variant="body2" sx={{ 
                                            color: isDarkTheme 
                                                ? 'rgba(255,255,255,0.8)' 
                                                : 'rgba(0,0,0,0.7)' 
                                        }}>
                                            Visibility
                                        </Typography>
                                        <Typography variant="h6" sx={{ 
                                            color: isDarkTheme ? 'white' : 'rgba(0,0,0,0.9)', 
                                            fontWeight: 'bold' 
                                        }}>
                                            {weatherInfo.visibility || 'N/A'} km
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </CardContent>
                    )}
                </CardActionArea>

                {/* 15-Day Weather Forecast */}
                {forecastData && forecastData.length > 0 && (
                    <Box sx={{ mt: 3, mb: 2 }}>
                        <Typography variant="h6" sx={{
                            color: isDarkTheme ? 'white' : 'rgba(0,0,0,0.9)',
                            mb: 2,
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>
                            15-Day Weather Forecast
                        </Typography>
                        <ForecastContainer>
                            {forecastData.map((day, index) => (
                                <ForecastCard key={index} isDark={isDarkTheme}>
                                    <Typography variant="body2" sx={{
                                        color: isDarkTheme 
                                            ? 'rgba(255,255,255,0.8)' 
                                            : 'rgba(0,0,0,0.7)',
                                        mb: 1,
                                        fontWeight: 'bold'
                                    }}>
                                        {day.date}
                                    </Typography>
                                    <Box sx={{ 
                                        fontSize: '2rem', 
                                        mb: 1,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        {getWeatherIcon(day.condition)}
                                    </Box>
                                    <Typography variant="body2" sx={{
                                        color: isDarkTheme ? 'white' : 'rgba(0,0,0,0.9)',
                                        fontWeight: 'bold',
                                        mb: 0.5
                                    }}>
                                        {isMetric 
                                            ? `${Math.round(day.temp.max)}°C / ${Math.round(day.temp.min)}°C`
                                            : `${Math.round(day.temp.max * 9/5 + 32)}°F / ${Math.round(day.temp.min * 9/5 + 32)}°F`
                                        }
                                    </Typography>
                                    <Typography variant="caption" sx={{
                                        color: isDarkTheme 
                                            ? 'rgba(255,255,255,0.7)' 
                                            : 'rgba(0,0,0,0.6)',
                                        textAlign: 'center',
                                        lineHeight: 1.2
                                    }}>
                                        {day.condition}
                                    </Typography>
                                </ForecastCard>
                            ))}
                        </ForecastContainer>
                    </Box>
                )}

                {/* Sunrise to Sunset Progress Bar */}
                {sunData && (
                    <SunProgressContainer>
                        <Typography variant="h6" sx={{
                            color: isDarkTheme ? 'white' : 'rgba(0,0,0,0.9)',
                            mb: 2,
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>
                            Daylight Progress
                        </Typography>
                        
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            mb: 1
                        }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <WbSunnyIcon sx={{ 
                                    color: '#FFA726',
                                    fontSize: '1.5rem',
                                    mb: 0.5
                                }} />
                                <Typography variant="caption" sx={{
                                    color: isDarkTheme 
                                        ? 'rgba(255,255,255,0.8)' 
                                        : 'rgba(0,0,0,0.7)',
                                    display: 'block'
                                }}>
                                    Sunrise
                                </Typography>
                                <Typography variant="body2" sx={{
                                    color: isDarkTheme ? 'white' : 'rgba(0,0,0,0.9)',
                                    fontWeight: 'bold'
                                }}>
                                    {sunData.sunrise}
                                </Typography>
                            </Box>
                            
                            <Box sx={{ textAlign: 'center' }}>
                                <NightsStayIcon sx={{ 
                                    color: '#5C6BC0',
                                    fontSize: '1.5rem',
                                    mb: 0.5
                                }} />
                                <Typography variant="caption" sx={{
                                    color: isDarkTheme 
                                        ? 'rgba(255,255,255,0.8)' 
                                        : 'rgba(0,0,0,0.7)',
                                    display: 'block'
                                }}>
                                    Sunset
                                </Typography>
                                <Typography variant="body2" sx={{
                                    color: isDarkTheme ? 'white' : 'rgba(0,0,0,0.9)',
                                    fontWeight: 'bold'
                                }}>
                                    {sunData.sunset}
                                </Typography>
                            </Box>
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                            <StyledLinearProgress 
                                variant="determinate" 
                                value={sunProgress.progress}
                                isDark={isDarkTheme}
                            />
                        </Box>
                        
                        <Typography variant="body2" sx={{
                            color: isDarkTheme 
                                ? 'rgba(255,255,255,0.8)' 
                                : 'rgba(0,0,0,0.7)',
                            textAlign: 'center'
                        }}>
                            {sunProgress.progress < 100 
                                ? `${Math.round(sunProgress.progress)}% of daylight passed`
                                : 'Nighttime'
                            }
                        </Typography>
                    </SunProgressContainer>
                )}
            </WeatherCard>
        </>
    );
}
