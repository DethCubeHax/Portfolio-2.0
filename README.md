![alt text](src/assets/UI_Latest.png "Title")

## Project Description

Deployment: [NafisUI](https://www.nafisui.com)

Welcome to my personal portfolio website, **Portfolio-2.0**! This project is built using React and Vite and serves as a showcase for my various projects, work experiences, research publications, and blog posts. The website features interactive elements such as particle animations, typewriter text effects, and a simulated terminal interface, providing a dynamic and engaging user experience. It's designed to be fully responsive, ensuring it looks great on both desktop and mobile devices.

You can view the live deployment of my portfolio here.


## Installation and Deployment

### Prerequisites
- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/DethCubeHax/Portfolio-2.0.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd Portfolio-2.0
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the Development Server
To start the development server and view the project locally:
```bash
npm run dev
```
This will start the Vite development server, and you can view the website by navigating to http://localhost:3000 in your web browser.

### Building the Project for Production
To build the project for production:
```bash
npm run build
```
This will create an optimized build of the project in the `dist` directory.

### Deployment
The project is configured to be deployed on Vercel. To deploy the project:
1. **Install the Vercel CLI** (if you haven't already):
   ```bash
   npm install -g vercel
   ```
2. **Deploy the project**:
   ```bash
   vercel
   ```
   Follow the prompts to complete the deployment. The `vercel.json` file contains the necessary configuration for deploying the project on Vercel.



## File Structure

```
Portfolio-2.0/
|-- index.html
|-- package.json
|-- package-lock.json
|-- vercel.json
|-- vite.config.js
|-- src/
|   |-- index.jsx
|   |-- App.jsx
|   |-- PageRoutes.jsx
|   |-- components/
|   |   |-- Particles.js
|   |   |-- PhotoFrame.jsx
|   |   |-- Terminal.jsx
|   |   |-- typewriter.js
|   |-- pages/
|   |   |-- Home.jsx
|   |   |-- Projects.jsx
|   |   |-- Work.jsx
|   |   |-- Research.jsx
|   |   |-- Blog.jsx
|   |-- assets/
|   |   |-- Nafis.jpg
|   |   |-- HamburgerMenu.png
|   |   |-- Research.png
|   |   |-- Art.png
|   |   |-- Project.png
|   |   |-- Work.png
|   |   |-- Calendar.png
|   |   |-- Tools.png
|   |   |-- Description.png
|   |   |-- GitHub.png
|   |   |-- LinkedIn.png
|   |   |-- Instagram.png
|   |   |-- WhatsApp.png
|   |   |-- GPAid.jpg
|   |   |-- Fish.jpg
|   |   |-- Sudoku.png
|   |   |-- SmartDisplay.jpeg
|   |   |-- Portfolio.png
|   |   |-- UnderwaterComms.png
|   |   |-- RA.jpg
|   |   |-- Webviz.jpg
|   |   |-- RA_Robotics.jpg
|   |   |-- SCB.jpg
|   |-- data/
|   |   |-- projects.json
|   |   |-- work.json
|   |   |-- research.json
|   |   |-- blog.json
|   |-- styles.css
```

## Comprehensive Description

### Root Directory
- **index.html**: The main HTML file that serves as the entry point for the application. It includes the root div where the React application will be mounted.
- **package.json**: Contains metadata about the project, including dependencies (like React and Vite) and scripts for running and building the project.
- **package-lock.json**: Automatically generated file that locks the versions of the dependencies to ensure consistent installs.
- **vercel.json**: Configuration file for deploying the project on Vercel, specifying settings and build commands.
- **vite.config.js**: Configuration file for Vite, specifying how the project should be built and served, including plugins and other build options.

### src Directory
- **index.jsx**: The entry point of the React application. It renders the `App` component into the DOM element with the id `root`.
- **App.jsx**: The root component of the application. It sets up the main structure and routing using `BrowserRouter` and includes Vercel Analytics.
- **PageRoutes.jsx**: Defines the routing for the application, mapping paths to specific components (`Home`, `Projects`, `Work`, `Research`, `Blog`).

### components Directory
- **Particles.js**: Handles the creation and animation of particles on a canvas element. It includes functions to create particles, update their positions, and connect them with lines.
- **PhotoFrame.jsx**: Displays an image with an animated frame effect. It uses refs to manage the image and line elements and animates the frame by reducing the height of the line element.
- **Terminal.jsx**: Simulates a terminal interface for user interaction. It allows users to input commands and receive responses, including querying an external API.
- **typewriter.js**: Simulates a typewriter effect by gradually displaying text within a specified HTML element. It uses `requestAnimationFrame` for smooth animation.

### pages Directory
- **Home.jsx**: The homepage component that includes various interactive elements and animations. It uses `PhotoFrame` to display an image, `Particles` for particle effects, and `Typewriter` for text animation. It also includes `NavPanel`, `Sidebar`, and `Terminal` components.
- **Projects.jsx**: Displays a list of projects with titles, images, dates, tools, descriptions, and GitHub links. It uses `Particles` for particle effects, `Typewriter` for text animation, and includes `NavPanel`, `Sidebar`, and `Terminal` components. It loads project data from `projects.json`.
- **Work.jsx**: Displays a list of work experiences with titles, images, dates, tools, descriptions, and company links. It uses `Particles` for particle effects, `Typewriter` for text animation, and includes `NavPanel`, `Sidebar`, and `Terminal` components. It loads work experience data from `work.json`.
- **Research.jsx**: Displays a list of research publications with titles, images, dates, links, and descriptions. It uses `Particles` for particle effects, `Typewriter` for text animation, and includes `NavPanel`, `Sidebar`, and `Terminal` components. It loads research data from `research.json`.
- **Blog.jsx**: Displays a list of blog posts with titles, dates, and expandable content. It uses `Particles` for particle effects, `Typewriter` for text animation, and includes `NavPanel`, `Sidebar`, and `Terminal` components. It loads blog data from `blog.json`.

### assets Directory
Contains static assets like images and styles used throughout the application. Examples include:
- **Nafis.jpg**: User's photo.
- **HamburgerMenu.png**: Icon for the hamburger menu.
- **Research.png**, **Art.png**, **Project.png**, **Work.png**: Icons for different sections.
- **Calendar.png**, **Tools.png**, **Description.png**, **GitHub.png**, **LinkedIn.png**, **Instagram.png**, **WhatsApp.png**: Various icons used in the application.
- **GPAid.jpg**, **Fish.jpg**, **Sudoku.png**, **SmartDisplay.jpeg**, **Portfolio.png**, **UnderwaterComms.png**, **RA.jpg**, **Webviz.jpg**, **RA_Robotics.jpg**, **SCB.jpg**: Images for projects and work experiences.

### data Directory
Contains JSON files with data for projects, work experiences, research publications, and blog posts:
- **projects.json**: Data for projects.
- **work.json**: Data for work experiences.
- **research.json**: Data for research publications.
- **blog.json**: Data for blog posts.

### styles.css
Main stylesheet for the application, defining global styles and specific styles for various components.

## How the App is Encapsulated in JSX
The app is structured using React components, each encapsulating specific functionality and UI elements. The `App.jsx` component serves as the root, setting up the main structure and routing. The `PageRoutes.jsx` component defines the routes, mapping paths to specific page components (`Home`, `Projects`, `Work`, `Research`, `Blog`).

Each page component (`Home.jsx`, `Projects.jsx`, `Work.jsx`, `Research.jsx`, `Blog.jsx`) is responsible for displaying specific content and includes various interactive elements and animations. These pages use reusable components from the `components` directory, such as `Particles`, `PhotoFrame`, `Terminal`, and `typewriter`.

The `assets` directory contains images and styles used throughout the application, while the `data` directory contains JSON files with data for projects, work experiences, research publications, and blog posts.

## General Overview of How Each Page and Component Works
### Home.jsx
- **Functionality**: Displays the homepage with an introduction, skills section, and interactive elements like particles and typewriter text.
- **Components Used**: `PhotoFrame`, `Particles`, `Typewriter`, `NavPanel`, `Sidebar`, `Terminal`.

### Projects.jsx
- **Functionality**: Displays a list of projects with titles, images, dates, tools, descriptions, and GitHub links.
- **Components Used**: `Particles`, `Typewriter`, `NavPanel`, `Sidebar`, `Terminal`.

### Work.jsx
- **Functionality**: Displays a list of work experiences with titles, images, dates, tools, descriptions, and company links.
- **Components Used**: `Particles`, `Typewriter`, `NavPanel`, `Sidebar`, `Terminal`.

### Research.jsx
- **Functionality**: Displays a list of research publications with titles, images, dates, links, and descriptions.
- **Components Used**: `Particles`, `Typewriter`, `NavPanel`, `Sidebar`, `Terminal`.

### Blog.jsx
- **Functionality**: Displays a list of blog posts with titles, dates, and expandable content.
- **Components Used**: `Particles`, `Typewriter`, `NavPanel`, `Sidebar`, `Terminal`.

### Components
#### Particles.js
- **Functionality**: Creates and animates particles on a canvas element, adding a dynamic visual effect.
- **Usage**: Initialized and updated in various page components to enhance visual appeal.

#### PhotoFrame.jsx
- **Functionality**: Displays an image with an animated frame effect, gradually revealing the image.
- **Usage**: Used in the `Home` component to display the user's photo.

#### Terminal.jsx
- **Functionality**: Simulates a terminal interface, allowing users to input commands and receive responses.
- **Usage**: Provides an interactive element for user engagement in various page components.

#### typewriter.js
- **Functionality**: Simulated a typewriter effect by gradually displaying text within a specified HTML element.
- **Usage**: Adds a dynamic text animation to various page components.

## Detailed Description of How the App is Structured and How Each Component Works

### App.jsx
- **Purpose**: The root component that sets up the main structure and routing for the application.
- **Functionality**:
  - Uses `BrowserRouter` from `react-router-dom` to enable client-side routing.
  - Renders the `PageRoutes` component, which defines the routes for different pages.
  - Integrates Vercel Analytics to track user interactions and performance metrics.
- **Connections**:
  - Encapsulates the entire application within the `BrowserRouter`.
  - Includes the `PageRoutes` component to manage navigation.

### PageRoutes.jsx
- **Purpose**: Defines the routing for the application.
- **Functionality**:
  - Uses `Routes` and `Route` from `react-router-dom` to map paths to specific components.
  - Handles navigation between different pages of the portfolio.
- **Connections**:
  - Maps the root path (`/`) to the `Home` component.
  - Maps other paths (`/projects`, `/work`, `/research`, `/blog`) to their respective components (`Projects`, `Work`, `Research`, `Blog`).

### Home.jsx
- **Purpose**: The homepage component that includes various interactive elements and animations.
- **Functionality**:
  - Displays an introduction with a typewriter effect.
  - Shows a skills section with links to projects, research, and work.
  - Includes interactive elements like particles and a terminal interface.
- **Components Used**:
  - `PhotoFrame`: Displays the user's photo with an animated frame effect.
  - `Particles`: Adds dynamic particle effects to the background.
  - `Typewriter`: Animates the introduction text with a typewriter effect.
  - `NavPanel`: Provides navigation links to different sections of the portfolio.
  - `Sidebar`: Displays a sidebar navigation menu.
  - `Terminal`: Simulates a terminal interface for user interaction.

### Projects.jsx
- **Purpose**: Displays a list of projects with interactive elements and animations.
- **Functionality**:
  - Lists projects with titles, images, dates, tools, descriptions, and GitHub links.
  - Uses a typewriter effect for the section title.
  - Includes particle effects in the background.
- **Components Used**:
  - `Particles`: Adds dynamic particle effects to the background.
  - `Typewriter`: Animates the section title with a typewriter effect.
  - `NavPanel`: Provides navigation links to different sections of the portfolio.
  - `Sidebar`: Displays a sidebar navigation menu.
  - `Terminal`: Simulates a terminal interface for user interaction.
- **Data Source**:
  - Loads project data from `projects.json`.

### Work.jsx
- **Purpose**: Displays a list of work experiences with interactive elements and animations.
- **Functionality**:
  - Lists work experiences with titles, images, dates, tools, descriptions, and company links.
  - Uses a typewriter effect for the section title.
  - Includes particle effects in the background.
- **Components Used**:
  - `Particles`: Adds dynamic particle effects to the background.
  - `Typewriter`: Animates the section title with a typewriter effect.
  - `NavPanel`: Provides navigation links to different sections of the portfolio.
  - `Sidebar`: Displays a sidebar navigation menu.
  - `Terminal`: Simulates a terminal interface for user interaction.
- **Data Source**:
  - Loads work experience data from `work.json`.

### Research.jsx
- **Purpose**: Displays a list of research publications with interactive elements and animations.
- **Functionality**:
  - Lists research publications with titles, images, dates, links, and descriptions.
  - Uses a typewriter effect for the section title.
  - Includes particle effects in the background.
- **Components Used**:
  - `Particles`: Adds dynamic particle effects to the background.
  - `Typewriter`: Animates the section title with a typewriter effect.
  - `NavPanel`: Provides navigation links to different sections of the portfolio.
  - `Sidebar`: Displays a sidebar navigation menu.
  - `Terminal`: Simulates a terminal interface for user interaction.
- **Data Source**:
  - Loads research data from `research.json`.

### Blog.jsx
- **Purpose**: Displays a list of blog posts with interactive elements and animations.
- **Functionality**:
  - Lists blog posts with titles, dates, and expandable content.
  - Uses a typewriter effect for the section title.
  - Includes particle effects in the background.
- **Components Used**:
  - `Particles`: Adds dynamic particle effects to the background.
  - `Typewriter`: Animates the section title with a typewriter effect.
  - `NavPanel`: Provides navigation links to different sections of the portfolio.
  - `Sidebar`: Displays a sidebar navigation menu.
  - `Terminal`: Simulates a terminal interface for user interaction.
- **Data Source**:
  - Loads blog data from `blog.json`.

### Components
#### Particles.js
- **Purpose**: Handles the creation and animation of particles on a canvas element.
- **Functionality**:
  - Creates particles with random positions, velocities, and sizes.
  - Updates particle positions and velocities, applying friction and handling collisions.
  - Draws lines between particles that are close to each other, creating a connected network effect.
  - Adjusts the number of particles and their positions when the window is resized.
- **Usage**: Initialized and updated in various page components to enhance visual appeal.

#### PhotoFrame.jsx
- **Purpose**: Displays an image with an animated frame effect.
- **Functionality**:
  - Uses refs to manage the image and line elements.
  - Animates the frame by reducing the height of the line element and gradually revealing the image.
- **Usage**: Used in the `Home` component to display the user's photo.

#### Terminal.jsx
- **Purpose**: Simulates a terminal interface for user interaction.
- **Functionality**:
  - Allows users to input commands and receive responses.
  - Processes user commands and provides appropriate responses.
  - Sends queries to an external API and displays the response.
  - Continuously updates and displays the user's age.
- **Usage**: Provides an interactive element for user engagement in various page components.

#### typewriter.js
- **Purpose**: Simulates a typewriter effect by gradually displaying text within a specified HTML element.
- **Functionality**:
  - Gradually displays text within an HTML element, simulating a typewriter effect.
  - Allows customization of the delay between characters and the initial delay before starting the animation.
  - Uses `requestAnimationFrame` to ensure a smooth and efficient animation.
- **Usage**: Adds a dynamic text animation to various page components.

This comprehensive description should give you a clear understanding of how your portfolio project is structured and how each component and page works together. If you have any more questions or need further details, feel free to email me at [nafisulislam2k2@gmail.com](nafisulislam2k2@gmail.com)!