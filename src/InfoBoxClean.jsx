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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

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
        if (!sunData || !sunData.sunrise || !sunData.sunset) return { progress: 0, timeToSunset: '', timeToSunrise: '', sunrise: '', sunset: '' };
        
        const now = new Date();
        const sunrise = new Date(sunData.sunrise * 1000);
        const sunset = new Date(sunData.sunset * 1000);
        
        const dayLength = sunset.getTime() - sunrise.getTime();
        const timeSinceSunrise = now.getTime() - sunrise.getTime();
        
        let progress = 0;
        
        if (now < sunrise) {
            progress = 0;
        } else if (now > sunset) {
            progress = 100;
        } else {
            progress = (timeSinceSunrise / dayLength) * 100;
        }
        
        return { 
            progress: Math.max(0, Math.min(100, progress)), 
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
        <>
            <WeatherCard hasData={hasWeatherData} isDark={isDarkTheme}>
                {/* Theme Toggle Button */}
                <Box sx={{ 
                    position: 'absolute', 
                    top: 16, 
                    right: 16, 
                    zIndex: 10 
                }}>
                    <Tooltip title={`Switch to ${isDarkTheme ? 'Light' : 'Dark'} Mode`}>
                        <IconButton
                            onClick={onThemeToggle}
                            sx={{
                                backgroundColor: isDarkTheme 
                                    ? 'rgba(255, 255, 255, 0.1)' 
                                    : 'rgba(0, 0, 0, 0.1)',
                                backdropFilter: 'blur(10px)',
                                border: isDarkTheme 
                                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                                    : '1px solid rgba(0, 0, 0, 0.2)',
                                '&:hover': {
                                    backgroundColor: isDarkTheme 
                                        ? 'rgba(255, 255, 255, 0.2)' 
                                        : 'rgba(0, 0, 0, 0.2)',
                                    transform: 'scale(1.05)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            {isDarkTheme ? (
                                <LightModeIcon sx={{ color: '#FFD700', fontSize: 24 }} />
                            ) : (
                                <DarkModeIcon sx={{ color: '#4A5568', fontSize: 24 }} />
                            )}
                        </IconButton>
                    </Tooltip>
                </Box>
                
                <CardActionArea>
                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                        {/* Main Weather Info */}
                        <Typography variant="h4" sx={{ 
                            color: isDarkTheme ? 'white' : 'black', 
                            fontWeight: 'bold', 
                            mb: 1 
                        }}>
                            {weatherInfo.name || 'Unknown Location'}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                            {getWeatherIcon(weatherInfo.Weather, weatherInfo.temp, 60)}
                            <Typography variant="h2" sx={{ 
                                color: isDarkTheme ? 'white' : 'black', 
                                fontWeight: 'bold', 
                                ml: 2 
                            }}>
                                {weatherInfo.temp}°C
                            </Typography>
                        </Box>
                        
                        <Typography variant="h6" sx={{ 
                            color: isDarkTheme ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)', 
                            mb: 3,
                            textTransform: 'capitalize'
                        }}>
                            {weatherInfo.Weather}
                        </Typography>

                        {/* Weather Details Grid */}
                        <Box sx={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(2, 1fr)', 
                            gap: 2, 
                            mt: 3 
                        }}>
                            <Box sx={{ 
                                p: 2, 
                                borderRadius: 2, 
                                backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' 
                            }}>
                                <OpacityIcon sx={{ color: isDarkTheme ? 'white' : 'black', mb: 1 }} />
                                <Typography variant="body2" sx={{ color: isDarkTheme ? 'white' : 'black' }}>
                                    Humidity
                                </Typography>
                                <Typography variant="h6" sx={{ color: isDarkTheme ? 'white' : 'black' }}>
                                    {weatherInfo.humidity}%
                                </Typography>
                            </Box>
                            
                            <Box sx={{ 
                                p: 2, 
                                borderRadius: 2, 
                                backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' 
                            }}>
                                <AirIcon sx={{ color: isDarkTheme ? 'white' : 'black', mb: 1 }} />
                                <Typography variant="body2" sx={{ color: isDarkTheme ? 'white' : 'black' }}>
                                    Wind Speed
                                </Typography>
                                <Typography variant="h6" sx={{ color: isDarkTheme ? 'white' : 'black' }}>
                                    {weatherInfo.wind_speed} km/h
                                </Typography>
                            </Box>
                            
                            <Box sx={{ 
                                p: 2, 
                                borderRadius: 2, 
                                backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' 
                            }}>
                                <ThermostatIcon sx={{ color: isDarkTheme ? 'white' : 'black', mb: 1 }} />
                                <Typography variant="body2" sx={{ color: isDarkTheme ? 'white' : 'black' }}>
                                    Feels Like
                                </Typography>
                                <Typography variant="h6" sx={{ color: isDarkTheme ? 'white' : 'black' }}>
                                    {weatherInfo.feels_like}°C
                                </Typography>
                            </Box>
                            
                            <Box sx={{ 
                                p: 2, 
                                borderRadius: 2, 
                                backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' 
                            }}>
                                <VisibilityIcon sx={{ color: isDarkTheme ? 'white' : 'black', mb: 1 }} />
                                <Typography variant="body2" sx={{ color: isDarkTheme ? 'white' : 'black' }}>
                                    Visibility
                                </Typography>
                                <Typography variant="h6" sx={{ color: isDarkTheme ? 'white' : 'black' }}>
                                    {weatherInfo.visibility} km
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </CardActionArea>

                {/* 15-Day Weather Forecast */}
                {forecastData && forecastData.length > 0 && (
                    <Box sx={{ mt: 3, mb: 2, px: 2 }}>
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
                                        fontSize: '0.75rem'
                                    }}>
                                        {day.date.toLocaleDateString('en-US', { 
                                            month: 'short', 
                                            day: 'numeric' 
                                        })}
                                    </Typography>
                                    
                                    <Box sx={{ mb: 1 }}>
                                        {getWeatherIconForForecast(day.condition)}
                                    </Box>
                                    
                                    <Typography variant="body2" sx={{
                                        color: isDarkTheme ? 'white' : 'black',
                                        fontWeight: 'bold',
                                        mb: 0.5
                                    }}>
                                        {Math.round(day.tempMax)}°
                                    </Typography>
                                    
                                    <Typography variant="body2" sx={{
                                        color: isDarkTheme 
                                            ? 'rgba(255,255,255,0.6)' 
                                            : 'rgba(0,0,0,0.6)',
                                        fontSize: '0.75rem'
                                    }}>
                                        {Math.round(day.tempMin)}°
                                    </Typography>
                                </ForecastCard>
                            ))}
                        </ForecastContainer>
                    </Box>
                )}

                {/* Sunrise to Sunset Progress Bar */}
                {sunData && (
                    <Box sx={{ px: 2, pb: 2 }}>
                        <SunProgressContainer>
                            <Typography variant="h6" sx={{
                                color: isDarkTheme ? 'white' : 'rgba(0,0,0,0.9)',
                                mb: 2,
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}>
                                Daylight Progress
                            </Typography>
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" sx={{
                                    color: isDarkTheme 
                                        ? 'rgba(255,255,255,0.8)' 
                                        : 'rgba(0,0,0,0.7)'
                                }}>
                                    🌅 {sunProgress.sunrise}
                                </Typography>
                                <Typography variant="body2" sx={{
                                    color: isDarkTheme 
                                        ? 'rgba(255,255,255,0.8)' 
                                        : 'rgba(0,0,0,0.7)'
                                }}>
                                    🌇 {sunProgress.sunset}
                                </Typography>
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
                    </Box>
                )}
            </WeatherCard>
        </>
    );
}
