# Sudoku Sandbox

A flexible web-based environment for creating, playing and sharing Sudoku puzzles and variants.

## Usage

The application can be found at https://sudoku-sandbox.firebaseapp.com/

There are two modes - Edit and Play - which can be toggled using the control in the top-right of the playing area.

### Edit mode

In Edit mode, you are able to change the shape and layout of the grid, including editing the regions, adding decorations to the grid, and adding clues. Instructions and controls for each feature will appear in the edit panel on the right of the screen.

You will also find the option of saving a puzzle as a file, loading a previously-saved puzzle, or sharing the puzzle, which generates a link that others can visit to see your puzzle.

### Play mode

In Play mode, the clues and decorations added to the grid during Edit mode become fixed, and the edit panel is replaced with a panel containing instructions and controls for solving the puzzle.

If you exit Play mode midway through a puzzle, your progress will, sadly, be lost.

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
