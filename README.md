# Microbe-Plant Co-evolution Research Dashboard

A modern, interactive dashboard for monitoring and analyzing microbe-plant co-evolution research data.

## Features

- 🌱 **Real-time Research Monitoring** - Track experiments, samples, and analysis progress
- 📊 **Interactive Data Visualization** - D3.js and Three.js powered charts and 3D networks
- 🧬 **Metagenome Analysis** - Interactive taxonomy trees and diversity metrics
- 🔬 **Experiment Tracking** - Monitor pipeline stages and quality control metrics
- 📚 **Learning Module** - Interactive tutorials and knowledge assessment
- 👥 **Collaboration Tools** - Team communication and data sharing
- 🌏 **Multilingual Support** - Japanese and English language options
- 🌙 **Dark Theme** - Eye-friendly interface for extended research sessions

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Data Visualization**: D3.js, Three.js, Recharts
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Internationalization**: i18next
- **Real-time Updates**: WebSocket (simulated)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/hiranotomo/momo.git
cd momo

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/          # Page components
├── store/          # Redux store and slices
├── types/          # TypeScript type definitions
├── i18n/           # Internationalization config
├── services/       # API and WebSocket services
└── hooks/          # Custom React hooks
```

## Deployment

This project is configured for automatic deployment with Vercel. Simply connect your GitHub repository to Vercel for continuous deployment.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

---

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>