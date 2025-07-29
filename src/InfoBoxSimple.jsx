import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { linearProgressClasses } from '@mui/material/LinearProgress';

// Import weather icons
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import VisibilityIcon from '@mui/icons-material/Visibility';

const WeatherCard = styled(Card)(({ theme, hasData, isDark }) => ({
    maxWidth: '95%',
    width: '100%',
    minHeight: 'calc(100vh - 200px)',
    margin: '20px auto',
    borderRadius: 24,
    background: isDark 
        ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.9) 100%)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
    backdropFilter: 'blur(20px)',
    border: isDark 
        ? '1px solid rgba(255, 255, 255, 0.1)'
        : '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: isDark 
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    transition: 'all 0.3s ease',
    overflow: 'visible',
}));

const ForecastContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '12px',
    overflowX: 'auto',
    padding: '16px 0',
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent',
    '&::-webkit-scrollbar': {
        height: '6px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb': {
        background: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '3px',
    },
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
    },
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
        background: 'linear-gradient(90deg, #FFD700 0%, #FFA500 50%, #FF6347 100%)',
    },
}));

export default function InfoBox({ 
    info, 
    loading = false, 
    error = null, 
    onLocationRequest, 
    onAddToFavorites, 
    isDarkTheme, 
    onThemeToggle, 
    forecastData = [], 
    sunData = null 
}) {
    const weatherInfo = info || {};
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
        
        if (weatherLower.includes('clear') || weatherLower.includes('sunny')) {
            return <WbSunnyIcon sx={iconSize} />;
        } else if (weatherLower.includes('cloud')) {
            return <CloudIcon sx={iconSize} />;
        } else if (weatherLower.includes('rain') || weatherLower.includes('drizzle')) {
            return <UmbrellaIcon sx={iconSize} />;
        } else if (weatherLower.includes('snow')) {
            return <AcUnitIcon sx={iconSize} />;
        } else if (weatherLower.includes('thunder')) {
            return <ThunderstormIcon sx={iconSize} />;
        }
        
        return <CloudIcon sx={iconSize} />;
    };

    const getWeatherIconForForecast = (condition) => {
        const conditionLower = condition.toLowerCase();
        const iconSize = { fontSize: 24, color: isDarkTheme ? 'white' : '#333' };
        
        if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
            return <WbSunnyIcon sx={iconSize} />;
        } else if (conditionLower.includes('cloud')) {
            return <CloudIcon sx={iconSize} />;
        } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
            return <UmbrellaIcon sx={iconSize} />;
        } else if (conditionLower.includes('snow')) {
            return <AcUnitIcon sx={iconSize} />;
        } else if (conditionLower.includes('thunder')) {
            return <ThunderstormIcon sx={iconSize} />;
        }
        
        return <CloudIcon sx={iconSize} />;
    };

    if (loading) {
        return (
            <WeatherCard hasData={false} isDark={isDarkTheme}>
                <CardContent sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" sx={{ color: isDarkTheme ? 'white' : 'black' }}>
                        Loading...
                    </Typography>
                </CardContent>
            </WeatherCard>
        );
    }

    if (error) {
        return (
            <WeatherCard hasData={false} isDark={isDarkTheme}>
                <CardContent sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" sx={{ color: 'red', mb: 2 }}>
                        Error
                    </Typography>
                    <Typography variant="body2" sx={{ color: isDarkTheme ? 'white' : 'black' }}>
                        {error}
                    </Typography>
                </CardContent>
            </WeatherCard>
        );
    }

    return (
        <Card sx={{ 
            maxWidth: 400, 
            margin: '20px auto', 
            borderRadius: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
        }}>
            <CardContent sx={{ padding: 3 }}>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
                    {weatherInfo.name}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Typography variant="h2" sx={{ fontWeight: '300' }}>
                        {weatherInfo.temp}°C
                    </Typography>
                    <Chip 
                        label={weatherInfo.Weather} 
                        sx={{
                            backgroundColor: '#95e1d3',
                            color: 'black',
                            fontWeight: 'bold',
                            textTransform: 'capitalize'
                        }}
                    />
                </Box>

                <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                    Feels like {weatherInfo.feels_like}°C
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="body2">
                        Min: {weatherInfo.temp_min}°C | Max: {weatherInfo.temp_max}°C
                    </Typography>
                    <Typography variant="body2">
                        Humidity: {weatherInfo.humidity}%
                    </Typography>
                    <Typography variant="body2">
                        Wind Speed: {weatherInfo.wind_speed} m/s
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
