# 🎓 RMP Core Frontend

> A comprehensive, interactive platform for rating and managing universities, professors, courses, and departments

---

## 📋 Project Status & Badges

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)](https://react.dev/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.14.5-007FFF?style=flat&logo=materialui)](https://mui.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-7952B3?style=flat&logo=bootstrap)](https://getbootstrap.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat&logo=nodedotjs)](https://nodejs.org/)
[![Status](https://img.shields.io/badge/Status-In%20Development-yellow?style=flat)]()

---

## 📖 About This Project

**RMP Core Frontend** is a sophisticated React-based web application designed for academic institutions to manage, rate, and review universities, professors, courses, and departments. Built with modern web technologies, it provides an intuitive interface for students, administrators, and institutional staff to collaborate and share educational experiences.

### Key Highlights
- 🎯 **Multi-role Authentication** - Support for students, admins, and institutional users
- 📊 **Interactive Dashboards** - Real-time analytics and data visualization
- ⭐ **Rating System** - Comprehensive rating and review functionality for professors and universities
- 📚 **Course Management** - Browse and manage courses across departments
- 👥 **User Management** - Admin panel for managing users and institutional data
- 📰 **News Feed** - Stay updated with institutional announcements and news
- 🎨 **Modern UI/UX** - Professional design with Material-UI and Bootstrap
- 📱 **Responsive Design** - Seamless experience across devices

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | React 18.2.0 | Component-based UI development |
| **UI Libraries** | Material-UI 5.14.5, Bootstrap 5.3.0 | Pre-built components & styling |
| **Icons & Graphics** | FontAwesome, Iconify, ApexCharts | Icons and data visualization |
| **HTTP Client** | Axios 1.4.0 | API communication |
| **Routing** | React Router 6.14.2 | Client-side navigation |
| **Forms** | React Hook Form 7.45.2 | Form management & validation |
| **Date Management** | Date-fns, Day.js | Date manipulation utilities |
| **State & UI** | Emotion, Framer Motion | Styling & animations |
| **Testing** | Jest, React Testing Library | Unit and component testing |
| **Build Tool** | React Scripts 5.0.1 | Bundling and optimization |

---

## 📁 Project Structure

```
src/
├── components/              # Reusable React components
│   ├── admin/              # Admin-specific components
│   ├── Universities/       # University management components
│   ├── Professors/         # Professor management & rating
│   ├── Courses/            # Course management
│   ├── Departaments/       # Department management
│   ├── News/               # News & announcements
│   ├── Users/              # User management
│   ├── Log in & Sign up/   # Authentication
│   ├── RateProfessor/      # Rating functionality
│   ├── RateUniversity/     # University rating
│   └── [other utilities]   # Charts, icons, color pickers, etc.
├── pages/                   # Page-level components
│   ├── LoginPage.js
│   ├── DashboardAppPage.js
│   ├── BlogPage.js
│   └── ...
├── layouts/                 # Layout components
│   ├── dashboard/          # Dashboard layout
│   └── simple/             # Simple layout
├── hooks/                   # Custom React hooks
│   └── useResponsive.js    # Responsive design hook
├── theme/                   # Material-UI theme configuration
│   ├── palette.js          # Color scheme
│   ├── typography.js       # Font settings
│   ├── shadows.js          # Shadow effects
│   └── customShadows.js
├── utils/                   # Utility functions
│   ├── cssStyles.js        # CSS helper functions
│   ├── formatNumber.js     # Number formatting
│   └── formatTime.js       # Time formatting
├── sections/                # Page sections & layouts
├── _mock/                   # Mock data for development
│   ├── products.js
│   ├── blog.js
│   ├── user.js
│   └── account.js
├── App.js                   # Main App component
├── routes.js               # Route definitions
└── index.js                # Entry point

public/
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest
└── assets/                 # Static assets (icons, illustrations)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn**
- A modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/RMP-Core-Frontend.git
   cd RMP-Core-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Update `.env.local` with your API endpoints and configuration

4. **Start the development server**
   ```bash
   npm start
   ```
   The application will open at [http://localhost:3000](http://localhost:3000)

---

## 📝 Available Scripts

### Development
```bash
npm start
```
Runs the app in development mode with hot-reload enabled.

### Production Build
```bash
npm run build
```
Creates an optimized production build in the `build/` directory.

### Testing
```bash
npm test
```
Launches the test runner in interactive watch mode.

---

## 🎯 Core Features

### 🔐 Authentication & Authorization
- Multi-role support (Student, Admin, Professor, Institutional User)
- Secure JWT-based authentication
- Session management

### 📊 Dashboard & Analytics
- Role-based dashboards
- Interactive charts and graphs
- Real-time data visualization

### 🏫 University Management
- Browse universities by region/country
- Detailed university profiles
- Rating and review system

### 👨‍🏫 Professor Management
- Search and filter professors
- Detailed professor profiles
- Rating and feedback system

### 📚 Course Management
- Browse courses by department
- Course details and prerequisites
- Department-wise organization

### 📰 News & Updates
- Latest institutional news
- Announcement system
- Category-based filtering

### 👥 User Management (Admin)
- User account management
- Role assignment
- Activity monitoring

---

## 🎨 Design System

The project uses a custom Material-UI theme with:
- **Color Palette**: Professional, accessible color scheme
- **Typography**: Clean, readable font hierarchy
- **Shadows & Depth**: Modern elevation system
- **Responsive Grid**: Mobile-first design approach
- **Component Library**: Reusable UI components

### Theming
Theme configuration is centralized in `src/theme/`:
```javascript
// Access theme in components
import { useTheme } from '@mui/material/styles';

function MyComponent() {
  const theme = useTheme();
  return <div style={{ color: theme.palette.primary.main }} />;
}
```

---

## 🔌 API Integration

The project uses **Axios** for HTTP requests:

```javascript
import axios from 'axios';

// API calls example
const fetchUniversities = async () => {
  try {
    const response = await axios.get('/api/universities');
    return response.data;
  } catch (error) {
    console.error('Error fetching universities:', error);
  }
};
```

Ensure your `.env.local` includes:
```
REACT_APP_API_URL=https://your-api-endpoint.com
```

---

## 📦 Dependencies Overview

| Package | Purpose |
|---------|---------|
| `@mui/material` | Material Design UI components |
| `react-router-dom` | Client-side routing |
| `axios` | HTTP client for API calls |
| `react-hook-form` | Form state management |
| `apexcharts` | Data visualization |
| `framer-motion` | Animation library |
| `date-fns` | Date utilities |
| `jwt-decode` | JWT token decoding |

See [package.json](package.json) for the complete dependency list.

---

## 🔧 Configuration

### Environment Variables
Create `.env.local` in the root directory:

```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_JWT_SECRET=your_secret_key
REACT_APP_ENVIRONMENT=development
```

### Theme Customization
Modify `src/theme/palette.js` and `src/theme/typography.js` to customize colors and fonts.

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in CI mode
npm test -- --ci --coverage

# Run specific test file
npm test -- --testPathPattern=ComponentName
```

---

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Material-UI Guide](https://mui.com/material-ui/getting-started/)
- [React Router Guide](https://reactrouter.com)
- [React Hook Form Docs](https://react-hook-form.com)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit with clear messages (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Code Standards
- Follow React best practices
- Use functional components and hooks
- Maintain consistent code style
- Write meaningful commit messages
- Add JSDoc comments for complex functions

---

## 📋 Code Style & Linting

This project follows standard React and JavaScript conventions:
- ESLint configuration for code quality
- Prettier for code formatting
- Consistent naming conventions

```bash
# Fix linting issues
npm run lint -- --fix
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 already in use | Run `npm start -- --port 3001` |
| Dependencies not installing | Clear npm cache: `npm cache clean --force` then `npm install` |
| API connection errors | Verify `.env.local` configuration and API availability |
| Build fails | Delete `node_modules/` and `.cache/`, reinstall dependencies |

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team & Support

For questions, issues, or suggestions, please:
- Open an issue on GitHub
- Contact the development team
- Check existing documentation

---

## 🎓 Academic Context

Developed as part of **Semester 3** coursework at [Your University Name].

**Course:** [Course Name/Code]  
**Project:** University Rating & Management Platform (RPM Core)  
**Status:** In Active Development

---

## 🙏 Acknowledgments

- Material-UI team for the excellent component library
- React community for best practices and resources
- Contributors and beta testers

---

**Last Updated:** January 2026  
**Version:** 0.1.0

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
