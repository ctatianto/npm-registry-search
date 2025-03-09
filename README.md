# NPM Package Search UI

A simple search interface for the NPM registry built with **React**, **TypeScript**, and **Material-UI**. This application allows users to search for NPM packages, view search results in a paginated grid, and see detailed information about a package in a modal popup.

---

## Features
- Search for NPM packages by name.
- Display search results in a paginated grid layout.
- View package details (name, author, version, description, license, README, etc.) in a modal popup.
- Responsive and user-friendly design.
- Error handling and loading states for a smooth user experience.

---

## Technologies Used
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: Adds static typing to JavaScript for better code quality.
- **Material-UI**: A React UI framework for pre-built, customizable components.
- **Axios**: A promise-based HTTP client for making API requests.
- **React Query**: A library for fetching, caching, and updating data in React applications.
- **React Testing Library**: For writing unit and integration tests.

---

## Setup and Installation

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Steps to Run the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/ctatianto/npm-registry-search.git
   cd npm-package-search-ui
   ```
   
2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

4. Open the application in your browser:
    ```
    http://localhost:3000
    ```

    
## Project Structure
The project is organized into the following directories and files:

src/

├── services/               
├── components/        
├── pages/             
├── hooks/             
├── utils/             
├── types/             
├── App.tsx            
└── index.tsx         

## Usage
1. #### **Search for Packages**：
   - Enter a package name in the search bar (e.g., "react").
   -  The results will be displayed in a paginated grid layout.
2. #### **View Package Details**：
   - Click on a package card to open a modal with detailed information about the package.
3. #### **Pagination**：
   - Use the pagination controls at the bottom of the grid to navigate through the search results.

## Testing
To run the test suite, use the following command:

   ```bash
     npm test
  ```
### Test Coverage
- Unit tests for components and utility functions.
- Integration tests for API calls and user interactions.

## API Documentation
This project uses the [NPM Registry API](https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md) to fetch package data.
### Endpoints Used
1. #### **Search for Packages**：
     ```bash
     GET https://registry.npmjs.org/-/v1/search?text=<query>&size=<pageSize>&from=<offset>
     ```
2. #### **Fetch Package Details**：
    ```bash
    GET https://registry.npmjs.org/<package-name>
     ```
## UX Choices
1. #### **Debounced Search**：
   - Prevents excessive API calls while typing.
2. #### **Loading States**：
   - Displays a loading spinner during data fetching.
3. #### **Error Handling**：
   - Shows user-friendly error messages if the API call fails.
4. #### **Modal Popup**：
   - Displays package details in a modal for a seamless user experience.
5. #### **Responsive Design**：
   - Ensures the application works well on all devices.

## Contacts
For questions or feedback, please reach out to:
- #### **Chandra Agus Tatianto**
- Email: [Chandra.tatianto@gmail.com](mailto:Chandra.tatianto@gmail.com)