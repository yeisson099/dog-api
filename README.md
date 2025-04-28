# DogFinder 🐕

A modern web application built with Angular that helps users discover and learn about different dog breeds. The application features a beautiful UI, real-time search, and the ability to save favorite dogs.

## Features ✨

- 🔍 Real-time dog breed search
- 🖼️ High-quality dog images
- ⭐ Favorite dogs functionality
- 🎨 Modern and responsive UI
- 🚀 Fast and smooth animations
- 📱 Mobile-friendly design

## Tech Stack 🛠️

- Angular 17
- Angular Material
- Tailwind CSS
- AWS Amplify (Deployment)
- GitHub Actions (CI/CD)
- Husky (Git Hooks)

## Prerequisites 📋

- Node.js (v20 or higher)
- npm (v10 or higher)
- AWS CLI (for deployment)

## Installation 🚀

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dogfinder.git
cd dogfinder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:4200`.

## Development 🛠️

### Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the application for production
- `npm run test` - Run unit tests
- `npm run lint` - Run linting
- `npm run watch` - Build and watch for changes

### Code Quality

The project uses several tools to maintain code quality:

- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks
- lint-staged for running linters on staged files

## Deployment 🚀

The application is automatically deployed to AWS Amplify when changes are pushed to the main branch. The deployment process is handled by AWS Amplify.

### Manual Deployment

To deploy manually:

1. Build the application:
```bash
npm run build
```

2. Deploy to AWS Amplify:
```bash
aws amplify start-deployment --app-id YOUR_APP_ID --branch-name main
```

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- [Dog API](https://dog.ceo/dog-api/) for providing the dog images and breed information
- [Angular](https://angular.io/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Angular Material](https://material.angular.io/) for the UI components
