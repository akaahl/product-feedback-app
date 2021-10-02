# Frontend Mentor - Product Feedback App solution

This is my solution to the [Product Feedback App challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-feedback-app-wbvUYqjR6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Screenshot

![Home page](./src/assets/screenshots/home-ss.png)

## Demo Link

- Live Site URL: [Vercel Live Site Demo]()

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete product feedback requests
- Receive form validations when trying to create/edit feedback requests
- Sort suggestions by most/least upvotes and most/least comments
- Filter suggestions by category
- Add comments and replies to a product feedback request
- Upvote product feedback requests
- Bonus: Keep track of any changes, even after refreshing the browser (localStorage could be used for this if you're not building out a full-stack app)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- [React](https://reactjs.org/) - JS library
- [React Redux](https://react-redux.js.org/) - For global state management in React
- [Redux Thunk](https://github.com/reduxjs/redux-thunk) - To handle asynchronous logic interaction with redux store
- [React Router Dom](https://www.npmjs.com/package/react-router-dom) - To handle routing (dynamic) in React
- [Styled Components](https://styled-components.com/) - For styling and custom props hnadling
- [Framer Motion](https://www.framer.com/motion/) - For micro interaction animations throughout the app

### What I learned

This was a very challenging yet extremely fun project to build. It took me around a month and a week to complete the project in its entirety, including the mobile responsiveness and micro animations. Needless to say, that I have encountered a lot of difficulties (bugs), and I have managed to solve them. Here are some of the things that I learned from this challenge:-

#### Close modal on outside click:-

Initially, I figured that creating a function that set the modal close and attaching it to each and every elements would be an adequate solution. But that would be an arduous and repetitive task, so I set out and look for the most optimal solution and came up with this:

```
    const closeMobileNav = (e) => {
    e.preventDefault();

    ........
    setShowMobile(false);
    document.removeEventListener("click", closeMobileNav);
  };

  const handleMobileNav = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (showMobile) {
     ..........
      setShowMobile(false);
    } else {
     ..........
      setShowMobile(true);
      document.addEventListener("click", closeMobileNav);
    }
  };
```

Right after, the mobile/modal is clicked open, the handleModal attaches a new event listener with a helper function; one that is intended to close the modal on any click onto the document itself. Thus, simplifies the whole modal closing process.
