# Jointrix - Modern Slide Editor

Jointrix is a powerful, modern slide editor built with React that allows users to create and edit presentation slides using Markdown. It provides a clean, intuitive interface with real-time preview and multiple layout options.

## Features

- **Markdown Editing**: Write slides using Markdown syntax with real-time preview
- **Multiple Layouts**: Choose from different slide layouts:
  - Default: Standard single-column layout
  - Split: Two equal columns side by side
  - Centered: Content centered both vertically and horizontally
  - Two Column: Two columns with a full-width header
- **Live Preview**: Toggle between edit and preview modes
- **Slide Navigation**: Easy navigation between slides with keyboard shortcuts
- **Responsive Design**: Works seamlessly on both desktop and mobile devices
- **Custom Styling**: Modern and clean UI with customizable themes
- **Real-time Updates**: Changes are saved automatically
- **Keyboard Shortcuts**:
  - `Ctrl + M`: Add new slide
  - `Left Arrow`: Previous slide
  - `Right Arrow`: Next slide

## Technologies Used

- **Frontend**:
  - React 18
  - TypeScript
  - Zustand (State Management)
  - Vite (Build Tool)
  - Prism.js (Syntax Highlighting)
  - Remark (Markdown Parsing)
  - TailwindCSS (Styling)

- **Backend**:
  - Node.js
  - Express.js
  - SQLite (Database)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- SQLite (for backend)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/jointrix.git
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   ```


3. **Start the development servers**
   ```bash
   # Start frontend server (from root directory)
   npm run dev
   ```

4. **Access the application**
   Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
jointrix/
├── src/
│   ├── assets/         # Static assets and icons
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── store/         # State management
│   ├── types/         # TypeScript types
│   ├── utils/         # Utility functions
│   └── App.tsx        # Root component
└── public/           # Public assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Remark](https://github.com/remarkjs/remark)
- [Prism.js](https://prismjs.com/)

## Support

If you encounter any issues or have questions, please open an issue in the GitHub repository.

---

