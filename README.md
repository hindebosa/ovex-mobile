# Ovex Currency Converter

A modern, user-friendly currency converter application built with React Native.

![Ovex Currency Converter](screenshots/app-screenshot.png)

## Features

- **Intuitive Currency Conversion**: Easily convert between different currencies with a clean, modern interface
- **Comprehensive Currency Support**: Access a wide range of fiat and cryptocurrency options
- **Real-time Exchange Rates**: Get up-to-date conversion rates for accurate calculations
- **Smart Currency Filtering**: Automatically filters available destination currencies based on your source selection
- **Search Functionality**: Quickly find specific currencies with the built-in search feature
- **Responsive Design**: Works seamlessly across different device sizes and orientations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- React Native development environment set up

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/ovex-app.git
   cd ovex-app
   ```

2. Install dependencies:

   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```
   npm start
   # or
   yarn start
   ```

4. Run on your device or emulator:
   ```
   npm run ios
   # or
   npm run android
   ```

## Project Structure

```
ovex-app/
├── app/                  # Main application screens
│   └── index.tsx         # Home screen with currency converter
├── components/           # Reusable UI components
│   ├── CurrencyItem.tsx  # Individual currency option
│   ├── CurrencySelector.tsx # Currency selection modal
│   ├── Modal.tsx         # Reusable modal component
│   ├── TextField.tsx     # Custom text input
│   └── ...
├── providers/            # Context providers
│   └── HomeProvider.tsx  # State management for home screen
├── services/             # API services
│   └── convertor.service.ts # Currency conversion API
├── types/                # TypeScript type definitions
│   └── currency.ts       # Currency-related types
└── ...
```

## Architecture

The application follows a component-based architecture with React Context for state management:

- **Context API**: Uses React Context to manage application state
- **Custom Hooks**: Implements custom hooks for accessing context and managing state
- **Performance Optimization**: Utilizes useMemo and useCallback for better performance
- **Separation of Concerns**: UI components are separated from business logic

## Key Components

### HomeProvider

The `HomeProvider` manages the application state and business logic, including:

- Currency data fetching
- Currency selection handling
- Conversion calculations
- Error handling

### CurrencySelector

A modal component that allows users to:

- Browse available currencies
- Filter between fiat and crypto currencies
- Search for specific currencies
- Select source and destination currencies

### CurrencyConverter

The main UI component that:

- Displays the conversion interface
- Handles user input
- Shows conversion results
- Provides error feedback

## API Integration

The application integrates with external APIs to:

- Fetch available currencies
- Get current exchange rates
- Perform currency conversions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
