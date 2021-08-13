#This is my educational frontend project on React

Test it on [Github Pages](https://vicistomin.github.io/react-burger)!

##Technology used in project
* React 17 with functional components and hooks
* CSS Modules
* Redux with Toolkit using thunk, slices and custom middleware
* Routing with React Router with 3 types of protected routes and URL params
* User authorisation with JWT and token refresh (token become stale in 20 minutes)
* Websocket connection to API for real-time orders feed update
* Unit tests for all slices with Jest and Enzyme
* Cypress functional test for drag-n-dropping of ingredients into burger constructor (with react-dnd library)
* TypeScript for all project code except tests
* Github Action for automatic code testing in PR's and commits to main branch
* Project code is automaticly deploying to Github Pages
* [React Developer Burger UI components library](https://yandex-praktikum.github.io/react-developer-burger-ui-components/docs/) (by Yandex) was used in this project
* Backend API used is this project was gracefully provided by Yandex

##Project functionality
* Interactive burger constructor with drag-n-drop for adding and reordering of ingredients
* Order placement (only for authorized users)
* Two feeds with places orders: for all users and for authorized user only (orders history)
* Orders feeds data is updating in real-time from server
* User registration, authorization, forgot/reset password functionality
* Different routes protection for authorized and guest users
* After succesful authorization user is redirecting to the last page he requested
* Modal windows for ingredients and order details
* Modals have their unique URLs an can be opened as separate page when reloaded or with direct link
* Modals can be closed with the 'X' button, click outside modal or with 'Esc' key
* 404 page

##Test user credentials
login: 123@123.t
password: 123123

This project was created during the education in Yandex.Praktikum on "React Developer" course and bootstrapped with [Create React App](https://github.com/facebook/create-react-app).