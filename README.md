# Frontend Mentor - Product Feedback App solution

This is my solution to the [Product Feedback App challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-feedback-app-wbvUYqjR6). This app allows user to display feedbacks, show feedback details and add comments, add new feedbacks, and edit them. It is a complete CRUD application, with added functionality such as filtering feedbacks based on status and category. User is also able to go to other pages, that is handled with dynamic routing, and see that all the data are in sync with the rest of the pages. In the Feedback Details page, user with acessibility issue may use the keyboard (tab button) to guide and add a comment/reply to the feedback itself. This app uses Web Local Storage to store data and keep them in-sync.

## Screenshot

![Home page](./src/demo.gif)

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

#### Updating upvote button status and number:-

This was my first time using localStorage, but implementing it in a practical app like this was fortunately a breeze. The one thing that I had trouble when trying to create the functionality to update the upvote status and number was dealing with nested objects. The data (provided in local JSON), has an array with nested objects within it. Hence I find confusing to update the upvote status for each individual feedback without mutating the original data. The solution that I came up with can be seen below:-

```
const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!upvoteStatus) {
      const updatedData = {
        ...feedbacks,
        productRequests: feedbacks.productRequests.map((feedback) => {
          if (feedback.id === id) {
            return {
              ...feedback,
              upvotes: (feedback.upvotes += 1),
              upvoted: true,
            };
          }
          return { ...feedback };
        }),
      };
      localStorage.setItem("data", JSON.stringify(updatedData));
      dispatch(updateData(updatedData));
      setUpvoteStatus(true);
    }

    if (upvoteStatus) {
      const updatedData = {
        ...feedbacks,
        productRequests: feedbacks.productRequests.map((feedback) => {
          if (feedback.id === id) {
            delete feedback["upvoted"];
            return {
              ...feedback,
              upvotes: (feedback.upvotes -= 1),
            };
          }
          return { ...feedback };
        }),
      };
      localStorage.setItem("data", JSON.stringify(updatedData));
      dispatch(updateData(updatedData));
      setUpvoteStatus(false);
    }
  };
```

First I created a handleClick function that checks whether user has upvoted or not. Within the function itself, I created a new variable to hold the new updated data whenever user clicks on the button (to upvote or to cancel upvote). I used the spread syntax, and mapped through the array, and updated the selected feedback. Then I updated both the localStorage and redux store, so as to sync the data throughout the app.

```
useEffect(() => {
    setFeedbacks(data);

    const extractedData = JSON.parse(localStorage.getItem("data"));

    for (let i = 0; i < extractedData.productRequests.length; i++) {
      // Load number of upvotes from localStorage
      if (extractedData.productRequests[i].id === id) {
        setNumberOfVotes(extractedData.productRequests[i].upvotes);
      }
      // Load upvote status
      if (
        extractedData.productRequests[i].id === id &&
        extractedData.productRequests[i].upvoted === true
      ) {
        setUpvoteStatus(true);
      }
    }
  }, [numberOfVotes, data, id, upvoteStatus]);
```

As for the useEffect, it checks whether user has upvoted when the component initially mounts, and updated the button styling accordingly.

#### Form error handling:-

Form error handling in React is quite different compared to vanilla JS. I did consider of using external libraries such as Formik or React Hook Form, but eventually I settled with writing my own custom error handling as the amount of input elements are negligible. Refer below:-

```
const [errorStatus, setErrorStatus] = useState({
    title: false,
    category: false,
    details: false,
  });

const [formData, setFormData] = useState({
    title: "",
    category: "",
    details: "",
  });

const handleError = (e) => {
    const name = e.target.name;

    if (!formData[name]) {
      setErrorStatus((err) => ({
        ...err,
        [name]: true,
      }));
    } else {
      setErrorStatus((err) => ({
        ...err,
        [name]: false,
      }));
    }
  };

const handleSubmit = (e) => {
    e.preventDefault();

    const keys = Object.keys(formData);

    keys.forEach((key) => {
      if (!formData[key]) {
        setErrorStatus((err) => ({ ...err, [key]: true }));
      }
    });

    ..............
}
```

I first created two state hooks to contain the error status and form data, and another two custom functions to set the error status; both on elements focus out and on submit. Custom messages will appear when user have not entered in any of the input fields, and the styling changes accordingly.

#### Custom props with Styled Components

Another thing that I've learned is using props with Styled Components to render styling conditionally. I encountered a situation whereby I wanted to implement cursor styling to be "pointer" in the Home page, but render it as "default" in the FeedbackDetails page. My initial go-to solution would be adapting the CSS class names. But I wanted to get my hands dirty with custom props in SC, so I opted for the following solution:-

```
<FeedbackContainer hover={feedbackId}>
    ...........
</FeedbackContainer>



const FeedbackContainer = styled(motion.section)`
    cusor: ${props => !props.hover ? 'cursor' : 'default'}
    .............
`
```

The code snippets above shows how I am using feedbackId (generated with useParams) as a prop, to indicate that user is now in FeedbackDetails page. Meanwhile, in the styling section, it can be seen that I am implementing the "props.hover" to determine which styling should be loaded. And in this case, it would be default styling. SC uses ternary operator to conditionally render the desired effect, and that makes it easy for a lot of use cases, instead of just depending on CSS class names to render styling effect.

### Continued development

I do have some plans in the future to turn this app into a full-stack app, by adding user registration and authentication, data storage and whatnot. I might also take into consideration of adding new features such as a live chat functionality. But for now, the current app sufficiently stands as it is.

### Useful resources

- [Detect outside click in React](https://stackoverflow.com/questions/32553158/detect-click-outside-react-component) - This thread helped me to come up with the solution above (closing modal on outside). I simplified it a little bit for my use case. It's definitely a good read for those who want to more in-depth about it.

- [React - Passing props with Styled Components](https://stackoverflow.com/questions/52321539/react-passing-props-with-styled-components) - This one helped how to use props in SC to render CSS style conditionally.

- [Redux for Beginners](https://www.youtube.com/watch?v=CVpUuw9XSjY) - I ocassionally refer to this video by DevEd on how to setup redux, as I am more often than not, forgot how to do it due to the number of boilerplates. It's easy to understand and beginner friendly.

- [Framer Motion Tutorials](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iHDnQfTHEVVceOEBsOf07i) - Another great tutorials by NetNinja on how to use Framer Motion. It teaches how to setup FM, touched upon basic animations and variants, as well as page transitions. It's easy as it gets.

## Author

You may reach out to me on the following links:-

- Frontend Mentor - [@akaahl](https://www.frontendmentor.io/profile/akaahl)
- Twitter - [@akaahl1](https://twitter.com/akaahl1)

Hope to connect with you all and chat! :D

## Acknowledgments

I would like to thank to FrontEnd Mentor for creating this beautiful, challenging yet enjoyable project. I had a lot of fun and stress creating this one, but I managed to push myself to solve every other problems that come in the way. For that, I am truly grateful for it. Also, I want to thank all the awesome tech communities, whether on Stack Overflow, Twitter or FEM platform, you guys are the kindest and most helpful out there. I hope to see some of you in real life
