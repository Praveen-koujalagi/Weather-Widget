# 🌤️ Weather Widget App

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge)](https://weather-widget-neon-six.vercel.app/)

A modern, responsive weather application built with React that provides comprehensive weather information including current conditions, 15-day forecasts, and sunrise/sunset data.

## ✨ Features

- 🌤️ **Current Weather** - Real-time weather conditions with detailed metrics
- 📅 **15-Day Forecast** - Extended weather predictions for planning ahead
- 🌅 **Sunrise/Sunset** - Interactive progress bar showing daylight hours
- 📍 **Location-Based** - Automatic location detection with manual search
- 🔍 **City Search** - Search for weather in any city worldwide
- 🌙 **Theme Toggle** - Dark/light mode for comfortable viewing
- 📱 **Mobile Responsive** - Optimized for all device sizes
- ⚡ **Fast Performance** - Built with Vite for lightning-fast loading

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- OpenWeatherMap API key (free)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get your API key**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Get your free API key from the dashboard

4. **Configure environment**
   - Open `src/WeatherApp.jsx`
   - Replace the API_KEY with your key:
   ```jsx
   const API_KEY = "your_api_key_here";
   ```
   
   > 💡 **Pro tip**: For production, use environment variables instead of hardcoding the API key

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Start exploring the weather!

## 📦 Build for Production

Create an optimized production build:

```bash
npm run build
```

## 🛠️ Tech Stack

- **Frontend**: React 19 with Hooks
- **Build Tool**: Vite (fast builds & HMR)
- **UI Framework**: Material-UI (MUI)
- **Weather API**: OpenWeatherMap API
- **Styling**: CSS3 with responsive design
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
src/
├── WeatherApp.jsx       # Main application component
├── InfoBoxClean.jsx     # Clean weather display component
├── SearchBox.jsx        # City search functionality
├── main.jsx            # Application entry point
├── App.jsx             # Root component
├── *.css               # Component styling
└── assets/             # Static assets
```

## 🎯 Key Components

- **WeatherApp.jsx** - Main application logic and state management
- **InfoBoxClean.jsx** - Displays current weather and forecast data
- **SearchBox.jsx** - Handles city search with autocomplete
- **Responsive Design** - Mobile-first approach with breakpoints

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- 🐛 **Bug reports**: [Create an issue](https://github.com/Praveen-koujalagi/Weather-Widget/issues)
- 💡 **Feature requests**: [Create an issue](https://github.com/Praveen-koujalagi/Weather-Widget/issues)
- 📧 **Questions**: [Start a discussion](https://github.com/Praveen-koujalagi/Weather-Widget/discussions)

---

**Made with ❤️ and React** • [Live Demo](https://weather-widget-neon-six.vercel.app) • [Repository](https://github.com/Praveen-koujalagi/Weather-Widget)

