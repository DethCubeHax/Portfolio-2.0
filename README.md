# Portfolio Website - Technical Documentation

## Table of Contents
1. [Overview](#overview)
2. [Installation](#installation)
3. [Architecture](#architecture)
4. [Key Components](#key-components)
5. [Notable Code Implementations](#notable-code-implementations)
6. [Performance Optimizations](#performance-optimizations)
7. [Development Guidelines](#development-guidelines)

## Overview
A modern portfolio website built with Next.js 13+ and React 18+, featuring interactive particle animations, AI chatbot integration, and dynamic content management. The site showcases professional experience, projects, research work, and blog posts with responsive design and smooth animations.

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd [repository-name]
```

2. Install dependencies:
```bash
npm install
```

3. Install required packages:
```bash
npm install @vercel/analytics @vercel/speed-insights react-icons
```

4. Set up environment variables:
```bash
# Create .env.local file
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_CHATBOT_ENDPOINT=your_chatbot_endpoint
```

5. Run development server:
```bash
npm run dev
```

## Architecture

### File Structure
```
src/
├── app/
│   ├── layout.jsx          # Root layout
│   ├── page.jsx           # Home page
│   ├── work/
│   ├── projects/
│   ├── blog/
│   └── chatbot/
├── components/
│   ├── MainLayout.jsx
│   ├── Navbar.jsx
│   ├── PageLayout.jsx
│   └── subcomponents/
└── public/
    ├── work.json
    ├── projects.json
    └── blog.json
```

### Component Hierarchy
```
RootLayout
└── MainLayout
    ├── ParticleBackground
    ├── Navbar
    └── PageLayout
        └── [Page Content]
```

### Core Layout Components
1. **RootLayout**
   - Top-level wrapper
   - Manages analytics and speed insights
   - Wraps content in MainLayout

2. **MainLayout**
   - Manages particle background
   - Handles responsive layout
   - Contains Navbar component

3. **PageLayout**
   - Handles page titles with typewriter effect
   - Manages social media links
   - Provides consistent page structure

### Feature Components

1. **Home Page**
   - PhotoFrame component
   - Typewriter effect
   - Navigation icons grid

2. **Projects Page**
   - Timeline layout
   - Interactive project cards
   - Tool tags and screenshots

3. **Work Experience Page**
   - Timeline layout
   - Company details
   - Image galleries

4. **Blog Page**
   - Blog post cards
   - Dynamic icon loading
   - Markdown content support

5. **AI Chatbot**
   - Real-time chat interface
   - Command system
   - Message history

### Interactive Elements

1. **Navbar**
   - Responsive design
   - Hover effects
   - Mobile menu
   - Social media integration

2. **Particle Background**
   - Interactive particles
   - Mouse tracking
   - Responsive particle count
   - Connection lines

3. **Animations**
   - Typewriter effects
   - Fade-in animations
   - Hover transitions
   - Page transitions

## Key Features

1. **Responsive Design**
   - Mobile-first approach
   - Fluid typography
   - Adaptive layouts
   - Touch-friendly interactions

2. **Performance Optimization**
   - Vercel Analytics
   - Speed Insights
   - Lazy loading
   - Session storage

3. **Interactive Elements**
   - AI Chatbot
   - Particle effects
   - Image galleries
   - Animated navigation

4. **Content Management**
   - JSON-based content
   - Dynamic routing
   - Markdown support
   - Image optimization

## Technologies Used

- Next.js 13+
- React 18+
- Tailwind CSS
- React Icons
- Vercel Analytics
- Vercel Speed Insights


## Key Components

### 1. Particle Background System
```javascript
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cleanup = initializeParticles(canvasRef);
    return () => cleanup();
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 opacity-30" />;
};
```
- Interactive particle system
- Mouse-tracking functionality
- Dynamic connection lines
- Responsive particle count

### 2. AI Chatbot Integration
```javascript
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const validCommands = ['help', 'projects', 'work', 'publications'];

  const queryAPI = async (queryText) => {
    // API integration logic
  };
```
- Real-time chat interface
- Command system
- Message history management
- Error handling

### 3. Dynamic Navigation
```javascript
const Navbar = ({ isHovered, isTextVisible }) => {
  return (
    <nav className={`transition-all duration-300 
      ${isHovered ? 'px-12' : 'px-6'}`}>
      // Navigation items
    </nav>
  );
};
```
- Responsive design
- Animated transitions
- Mobile-optimized menu
- Social media integration

## Notable Code Implementations

### 1. Particle Physics Engine
```javascript
const updateParticles = (particles, canvas, context, mouse) => {
  particles.forEach((particle) => {
    // Calculate forces
    const dx = particle.x - mouse.x;
    const dy = particle.y - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Apply physics
    if (distance < 100) {
      particle.velocity.x += dx / distance;
      particle.velocity.y += dy / distance;
    }

    // Update position
    particle.x += particle.velocity.x;
    particle.y += particle.velocity.y;
  });
};
```

### 2. Custom Typewriter Effect
```javascript
const typewriter = (element, text, delay = 100) => {
  let currentIndex = 0;
  const typeNextCharacter = () => {
    if (currentIndex < text.length) {
      element.textContent += text.charAt(currentIndex);
      currentIndex++;
      setTimeout(typeNextCharacter, delay);
    }
  };
  typeNextCharacter();
};
```

## Performance Optimizations

1. **Image Optimization**
   - Lazy loading
   - Responsive images
   - Format optimization

2. **Code Splitting**
   - Dynamic imports
   - Route-based splitting
   - Component lazy loading

3. **State Management**
   - Local storage caching
   - Session storage for UI states
   - Efficient re-rendering

4. **Network Optimization**
   - API request batching
   - Response caching
   - Error boundary implementation

## Development Guidelines

### Code Style
```javascript
// Component Template
const Component = ({ prop1, prop2 }) => {
  // State management
  const [state, setState] = useState(initial);

  // Effects
  useEffect(() => {
    // Setup
    return () => {
      // Cleanup
    };
  }, [dependencies]);

  // Event handlers
  const handleEvent = () => {
    // Logic
  };

  return (
    <div className="component-wrapper">
      {/* JSX */}
    </div>
  );
};
```

### Best Practices
1. Use meaningful component names
2. Implement proper error boundaries
3. Follow React hooks rules
4. Maintain consistent styling
5. Write comprehensive comments
6. Test across devices

### Git Workflow
```bash
# Feature development
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Bug fixes
git checkout -b fix/bug-description
git commit -m "fix: resolve bug"
```

## Testing

```bash
# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Run specific test
npm test -- -t "test-name"
```

## Deployment

```bash
# Build production
npm run build

# Start production server
npm start
```

## Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License
[MIT License](LICENSE)