# React Application

## Project Overview
This project is a simple React-based frontend application that displays a JSON dataset as interactive cards. 

### Features
Dynamic Card Display: Displays 5 document cards, arranged dynamically (3 in the first row and 2 in the second).
Thumbnails: Each card has a unique thumbnail based on its document type.
Loading Spinner: Shows a spinner placeholder while thumbnails are loading.
Drag-and-Drop: Allows users to reorder cards via drag-and-drop.
Image Overlay: Clicking on a card displays the image in an overlay.
Keyboard Accessibility: Pressing ESC closes the image overlay.

### Tech Stack
Frontend: React (with Hooks for state and lifecycle management), React DnD (for drag n drop)
Styling: CSS 
Development Server: Vite

### Prerequisites
- **Node.js** (v14 or later)
- **npm** (comes with Node.js)

### How to Run
1. Install dependencies:
   npm install
2. Start the application:
   npm run dev
3. Open in Browser:
   http://localhost:5173

### Folder Structure
/src
  /containers     # Stateful components managing logic and state
  /components     # Stateless components focusing solely on UI rendering
  /hooks          # Custom hooks for shared logic across components
  /utils          # Helper functions and utilities
  /mocks          # Mock Service Worker (MSW) handlers for simulating APIs

### Additional Notes
This implementation focuses solely on frontend functionality as specified in Part 2 of the assignment.
A mock server is integrated using msw to simulate API responses.
Data persistence is handled via local storage for simplicity during development.
The "last saved" message is displayed only if there is a previous save; otherwise, it remains hidden for a cleaner UI.
Error messages for API failure or image loading issues are intentionally avoided in favor of simplicity.
The alt text is used as a lightweight fallback for failed images.

### Thought Process
At the end of this project, my design and implementation decisions revolved around creating a modular, reusable, and maintainable codebase. Here's how I approached it:

Separation of Concerns: I divided components into two categories:
Stateless Components: These components focused solely on presentation, ensuring simplicity and reusability.
Stateful Containers: These handled business logic, state management, and API interactions, keeping concerns distinct and improving readability.

Reusability: To reduce redundancy and follow the DRY (Don't Repeat Yourself) principle:
I created small, reusable components such as an Overlay and Spinner to handle repeated functionality across the project.
A separate Card component was developed to ensure consistent display and easy reuse when presenting different types of data. This component also encapsulated logic for image fetching, further promoting reusability.

Custom Hooks and Utilities:
I organized custom hooks in a dedicated folder for handling recurring patterns like API calls. This approach simplifies testing, debugging, and scaling while avoiding repeated implementations of similar logic.
Utility functions were placed in a utils folder to centralize helper functions and maintain cleaner code in components.

Drag and Drop Functionality:
I utilized React DnD for implementing drag-and-drop features. Its flexibility and compatibility with React made it an ideal choice, allowing me to enhance the user experience without adding unnecessary complexity.

Styling Approach:
Given the small scope of the project, I opted for modular CSS for styling instead of an external library or framework. This choice kept the project lightweight and avoided unnecessary dependencies while still providing scoped, maintainable styles.

Project Scalability:
Each component, hook, and utility was designed with scalability in mind, ensuring that additional features could be added seamlessly in the future.
By maintaining a clean folder structure and adhering to the principles of separation of concerns and modularity, the codebase is both scalable and easy to understand for future contributors.

API Handling:
A custom hook was created specifically for managing API calls. This ensured consistent error handling, loading state management, and code reuse across components that interacted with APIs.

Avoiding Overengineering:
Recognizing the project's small scope, I consciously avoided using external styling frameworks to prevent unnecessary complexity. Instead, I focused on leveraging React's strengths and keeping the setup minimal yet functional.

