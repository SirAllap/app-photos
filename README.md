# Oxygen Academy Photo App

I built this web application using React and various related technologies. Before I dive into the implementation, I had to follow a structured set of steps and considerations to ensure a smooth and efficient development process.

[GH-PAGES-LINK](https://sirallap.github.io/app-photos/)

## Table of Contents

1. [Designing the App in Figma Before Writing Code](#1-designing-the-app-in-figma-before-writing-code)
2. [Importing Components from the Chosen Library](#2-importing-components-from-the-chosen-library)
3. [Defining Layout, Colors, Typography, etc., in Figma](#3-defining-layout-colors-typography-etc-in-figma)
4. [Creating the React Application with Essential Features](#4-creating-the-react-application-with-essential-features)
5. [Building the Search Page](#5-building-the-search-page)
6. [Developing the 'My Photos' Page](#6-developing-the-my-photos-page)
7. [Adding Extra Functionalities](#7-adding-extra-functionalities)
8. [Bonus Features](#8-bonus-features)
9. [Other Technical Requirements](#9-other-technical-requirements)

## 1. Designing the App in Figma Before Writing Code

My initial step is to visually design the application using the Figma design tool. This design phase includes defining the user interface, selecting color schemes, typography, and other crucial visual aspects.

## 2. Importing Components from the Chosen Library

To streamline the development process and maintain a consistent visual style, I'll use component libraries, particularly Material-UI (MUI) in this case.

## 3. Defining Layout, Colors, Typography, etc., in Figma

Prior to writing a single line of code, I ensure a clear vision of how the application should look and feel. This proactive approach helps avoid significant design changes later in the project.

## 4. Creating the React Application with Essential Features

To meet the project's core requirements, I'll focus on:

- Implementing a user-friendly dashboard for image management and downloads.
- Utilizing Create-React-App as the project's foundation.
- Integrating React-Router for seamless navigation.
- Harnessing Redux for efficient global state management (I may start with a Redux template).
- Incorporating Material-UI (MUI) components for styling and user interface layout.

## 5. Building the Search Page

I'll design a dedicated page where users can effortlessly search for images on Unsplash via its API. This involves utilizing the GET /search/photos route to execute these searches.

## 6. Developing the 'Collection' Page

This section involves creating a page that empowers users to review imported images, complete with detailed information like width, height, likes, and the date of addition. Users can also filter their photo collection using a description search field.

## 7. Adding Extra Functionalities

To enhance the user experience, I'll include features such as:

- Allowing users to add images to their personal collections.
- Enabling image deletion and modification of descriptions within their collection.
- Providing diverse sorting options based on import date, dimensions, and likes.
- Implementing a 'Download' feature for easy access to image downloads from the 'full' URL.

## 8. Bonus Features

To go the extra mile and elevate the user experience further, I'm planning to:

- Create a tagging system employing the Chip component to categorize images (e.g., landscape, portrait, animal, building).
- Showcase all tags alongside the search bar on the 'My Photos' page, enabling users to filter images by tags.
- Implement pagination for both the 'Search' and 'My Photos' pages using the Pagination component.

## 9. Other Technical Requirements

To ensure the project's technical soundness, I'll adhere to these guidelines:

- Installing Create-React-App with the Redux template from the outset for a Redux-integrated project.
- Developing two distinct Redux slices: 'searchSlice' to manage search functionality and 'favoritesSlice' to handle favourite images into collections.
- Employing a thunk in 'searchSlice' to interact with the Unsplash API while ensuring that 'favoritesSlice' operates synchronously.
- Implementing a feature that performs random searches when users provide no valid input ('').
- Crafting a modal for editing descriptions of favourite images, thoughtfully placed outside the image loop (photos.map()).
- Exercising discretion when making requests to the Unsplash API by selecting only the necessary data, thus optimizing application performance.
- Reusing components efficiently, wherever it's sensible and doesn't introduce complications, such as sharing the search engine component across both pages.

____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

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
