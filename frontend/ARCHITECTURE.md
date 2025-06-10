# Jointrix Architecture Documentation

## System Overview

Jointrix is a modern slide editor application built with React and Node.js. The application follows a client-server architecture pattern with a clear separation of concerns between frontend and backend components.

## Architecture Diagram

![Jointrix Architecture](src/assets/architecture.svg)

## Frontend Architecture

### 1. Component Structure

```
src/
├── components/     # Reusable UI components
│   ├── SlideEditor    # Markdown editor with preview
│   ├── SlideNavigator # Slide navigation controls
│   ├── SlideRender    # Markdown to HTML renderer
│   └── LayoutSelector # Slide layout management
├── store/         # State management
├── pages/         # Route-based components
├── utils/         # Helper functions
└── assets/        # Static resources
```

### 2. Key Components

#### SlideEditor
- Handles markdown input and editing
- Provides real-time preview functionality
- Manages layout switching
- Implements syntax highlighting

#### SlideNavigator
- Controls slide navigation
- Manages slide addition/deletion
- Provides keyboard shortcuts
- Shows slide progress

#### SlideRender
- Converts markdown to HTML
- Handles custom markdown extensions
- Manages slide layouts
- Renders code blocks with syntax highlighting

#### LayoutSelector
- Manages slide layout options
- Provides layout preview
- Handles layout switching

### 3. State Management

The application uses Zustand for state management, providing:
- Centralized state store
- Type-safe state updates
- Efficient re-rendering
- Easy state persistence

Key state features:
```typescript
type markdownStoreType = {
    slides: Slide[]
    activeSlideId: string
    fetchSlides: () => void
    addSlide: () => void
    setActiveSlide: (id: string) => void
    updateSlideContent: (id: string, content: string) => void
    updateSlideLayout: (id: string, layout: string) => void
    getActiveSlide: () => Slide | undefined
}
```

## Backend Architecture

### 1. API Structure

The backend provides RESTful endpoints:
- `GET /slides` - Fetch all slides
- `POST /addSlide` - Create new slide
- `PUT /slide/:id` - Update slide content
- `PUT /slide/:id/layout` - Update slide layout

### 2. Database

The application uses SQLite for data persistence, providing:
- Simple file-based storage
- ACID compliance
- Easy backup and portability
- Low resource requirements

## Data Flow

1. **User Input Flow**
   ```
   User Input → Component → State Update → API Call → Database
   ```

2. **Data Fetching Flow**
   ```
   Component Mount → State Action → API Call → Database → State Update → UI Update
   ```

3. **Real-time Preview Flow**
   ```
   Editor Input → State Update → Markdown Parser → HTML Render → Preview Update
   ```

## Technical Stack

### Frontend
- React 18
- TypeScript
- Zustand (State Management)
- Vite (Build Tool)
- Prism.js (Syntax Highlighting)
- Remark (Markdown Parsing)

### Backend
- Node.js
- Express.js
- SQLite (Database)

## Design Considerations

### 1. Component Design
- Modular and reusable components
- Clear separation of concerns
- Type-safe props and state
- Efficient rendering patterns

### 2. State Management
- Centralized state store
- Optimistic updates
- Error handling
- State persistence

### 3. Performance
- Debounced updates
- Efficient rendering
- Code splitting
- Lazy loading

### 4. Security
- Input sanitization
- XSS prevention
- API security
- Data validation

## Future Considerations

### 1. Planned Features
- Real-time collaboration
- Custom themes
- Export options
- Plugin system

### 2. Scalability
- Load balancing
- Caching strategy
- Database optimization
- API versioning

### 3. Maintenance
- Automated testing
- CI/CD pipeline
- Monitoring
- Documentation

## Development Workflow

### 1. Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Building for Production
```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## Conclusion

The Jointrix architecture is designed to be:
- Scalable
- Maintainable
- Performant
- Developer-friendly

The clear separation of concerns and modular design allows for easy extension and maintenance of the application. 