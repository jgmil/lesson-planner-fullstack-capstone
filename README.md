# Lesson Planner

This Lesson Planner allows users to plan units and lessons using a simple interface.

## Screenshots
![Landing page](https://github.com/jgmil/lesson-planner-fullstack-capstone/blob/master/public/img/screenshots/screencapture-jgmil-lesson-planner-landing.png?raw=true)
![User dashboard](https://github.com/jgmil/lesson-planner-fullstack-capstone/blob/master/public/img/screenshots/lesson-planner-user-dashboard.png?raw=true)
![Lesson detail](https://github.com/jgmil/lesson-planner-fullstack-capstone/blob/master/public/img/screenshots/lesson-planner-lesson-detail.png?raw=true)

## Use Case
The Lesson Planner is for educators interested in creating cohesive unit and lesson plans. The Lesson Planner allows teachers to create subjects, units, and detailed lessons quickly.

## Initial UX

### User Flow Diagram

![User Flow Diagram Handwritten draft](https://github.com/jgmil/lesson-planner-fullstack-capstone/blob/master/public/img/user-flow.jpg?raw=true)

### User Stories

#### As a visitor, not logged in:

* As an initial visitor, I want to land on the web page and see what it is about so I can decide whether I want to create an account.

![Wireframe design draft](https://github.com/jgmil/lesson-planner-fullstack-capstone/blob/master/public/img/landing-page.png?raw=true)

#### As a logged in user:

* As a user, I should be able to view my classes, units and lesson plans.

* As a user, I should be able to create a new class, unit and lesson plan.

* As a user, I should be able to update or delete a class, unit or lesson plan.

* As a user, I should be able to print my lesson plans.

* As a logged in user, I should be able to log out.
![Wireframe design handwritten draft](https://github.com/jgmil/lesson-planner-fullstack-capstone/blob/master/public/img/user-dashboard.png?raw=true)

![Wireframe design handwritten draft](https://github.com/jgmil/lesson-planner-fullstack-capstone/blob/master/public/img/create-subject.png?raw=true)

![Wireframe design handwritten draft](https://github.com/jgmil/lesson-planner-fullstack-capstone/blob/master/public/img/create-unit.png?raw=true)

![Wireframe design handwritten draft](https://github.com/jgmil/lesson-planner-fullstack-capstone/blob/master/public/img/create-lesson.png?raw=true)

![Wireframe design handwritten draft](https://github.com/jgmil/lesson-planner-fullstack-capstone/blob/master/public/img/lesson-details.png?raw=true)

## Working Prototype
Find a working prototype with Node at https://jgmil-lesson-planner.herokuapp.com/ and with React at https://jgmil.github.io/lesson-planner-fullstack-capstone-react/build

## Functionality
* When they first set up their account, users will be prompted to create their first class.
* Logged in users can create, update and delete classes, units and lesson plans.
* Logged in users can print their lesson plans.

## Technical
The Lesson planner was built as two separate parts.

### Front End
* HTML5
* CSS3
* JavaScript
* React

### Back End
* Node.js
* Express.js
* MongoDB
* Mongoose
* mLab database
* [Mocha](https://mochajs.org) and [Chai](http://chaijs.com/) for testing


### Responsive
The app is responsive and optimized for both desktop and mobile viewing and use.

### Security
User passwords are encrypted using [bcrypt.js](https://github.com/dcodeIO/bcrypt.js)

## API Documentation
API endpoints for the back end include:
* POST to '/users/create' for creating a new user
* POST to '/users/login' to log in an existing user

* GET to '/subjects/:user' to access all of a user's existing subjects
* GET to '/units/:user' to access all of a user's existing units
* GET to '/lessons/:user' to access all of a user's existing lessons

* POST to '/subject/create' to add a new class
* PUT to '/subject/:id' to update an existing class
* GET to '/subject/:id' to access a single class by ID
* DELETE to '/subject/:id' to delete a single class by ID

* POST to 'unit/create' to add a new unit
* PUT to 'unit/:id' to update an existing unit
* GET to 'unit/:id' to access a single unit by ID
* DELETE to 'unit/:id' to delete a single unit by ID
* DELETE to 'units/:subject-id' to delete all units with a specific subject ID

* POST to 'lesson/create' to add a new unit
* PUT to 'lesson/:id' to update an existing unit
* GET to 'lesson/:id' to access a single unit by ID
* DELETE to 'lesson/:id' to delete a single unit by ID
* DELETE to 'lessons/:id' to delete all lessons with a specific unit ID

## Development Roadmap
Planned additional features and improvements will allow users to:
* Ability to rearrange units and lessons
* Ability to insert a lesson in a unit and bump the rest to the next day
* Add dates and a calendar view
* Change password
* Update email address

#  The typical command lines for capstone projects

## Node command lines
* npm install ==> install all node modules
* nodemon server.js ==> run node server
* npm test ==> run the tests

## React command lines
* npm install ==> install all node modules
* npm run build ==> build the react files in the "build" folder
* npm start ==> run react server on http://127.0.0.1:8080
* npm test ==> run the tests
