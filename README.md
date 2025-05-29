# Rick and Morty Character Explorer

A React-based web application for exploring characters from the Rick and Morty universe. Built with TypeScript, Vite, and Material-UI.

## Features

- **Character Search**: Search through all Rick and Morty characters with real-time filtering
- **Advanced Filtering**: Filter characters by:
  - Status (Alive, Dead, Unknown)
  - Species
  - Gender
  - Origin
  - Episode appearances
- **Infinite Scroll**: Dynamically load more characters as you scroll
- **Character Profiles**: View detailed information about each character
- **Episode List**: See all episodes a character has appeared in
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technologies Used

- [React](https://reactjs.org/) - Frontend library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [React Query](https://tanstack.com/query/latest) - Data fetching and caching
- [Material-UI](https://mui.com/) - Styling and components
- [React Router](https://reactrouter.com/) - Navigation
- [Axios](https://axios-http.com/) - HTTP client
- [Rick and Morty API](https://rickandmortyapi.com/) - Data source

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn or bun*

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Kr-dev1/Rick-morty.git
cd rick-n-morty
```

2. Install dependencies:
```bash
npm install
# or
yarn install
#or
bun install*
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
#or
bun dev*
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── api/          # API integration and data fetching
├── components/   # Reusable React components
├── pages/        # Page components
└── assets/       # Static assets
```
