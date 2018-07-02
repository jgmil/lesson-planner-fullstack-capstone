# Lesson Planner

This Lesson Planner allows users to plan units and lessons using a simple interface.

## Screenshots
![Landing page screen shot](https://github.com/jgmil/mindfulness-journal-node-capstone/blob/master/public/img/tpm-landing.png?raw=true)

![Account setup screen shot](https://github.com/jgmil/mindfulness-journal-node-capstone/blob/master/public/img/tpm-create-account.png?raw=true)

![User homepage screen shot](https://github.com/jgmil/mindfulness-journal-node-capstone/blob/master/public/img/tpm-dashboard.png?raw=true)

![Journal entry screen shot](https://github.com/jgmil/mindfulness-journal-node-capstone/blob/master/public/img/tpm-journal-entry.png?raw=true)

![Update entry screen shot](https://github.com/jgmil/mindfulness-journal-node-capstone/blob/master/public/img/tpm-dashboard.png?raw=true)

![More info screen shot](https://github.com/jgmil/mindfulness-journal-node-capstone/blob/master/public/img/tpm-info.png?raw=true)

## Use Case
The Lesson Planner is for educators interested in creating cohesive unit and lesson plans. The Lesson Planner allows teachers to create subjects, units, and detailed lessons.

## Initial UX

### User Flow Diagram

![User Flow Diagram Handwritten draft](https://github.com/jgmil/mindfulness-journal-node-capstone/blob/master/public/img/IMG_20180425_165402.jpg?raw=true)

### User Stories

#### As a visitor, not logged in:

* As an initial visitor, I want to land on the web page and see what it is about so I can decide whether I want to create an account.

![Wireframe design draft](https://github.com/jgmil/mindfulness-journal-node-capstone/blob/master/public/img/IMG_20180425_163423.jpg?raw=true)

![Wireframe design draft](https://github.com/jgmil/mindfulness-journal-node-capstone/blob/master/public/img/IMG_20180425_163427.jpg?raw=true)

#### As a logged in user:

* As a user, I should be able to view my classes, units and lesson plans.

* As a user, I should be able to create a new class, unit and lesson plan.

* As a user, I should be able to update or delete a class, unit or lesson plan.

* As a user, I should be able to print my lesson plans.

* As a logged in user, I should be able to log out.
![Wireframe design handwritten draft](https://github.com/jgmil/mindfulness-journal-node-capstone/blob/master/public/img/IMG_20180425_163445.jpg?raw=true)


## Working Prototype
Find a working prototype with Node at https://jgmil-lesson-planner.herokuapp.com/.

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

* GET to '/class/:user' to access all of a user's existing plans

* POST to '/class/create' to add a new class
* PUT to '/class/:id' to update an existing class
* GET to '/class/:id' to access a single class by ID
* DELETE to '/class/:id' to delete a single class by ID

* POST to 'class/unit/create' to add a new unit
* PUT to 'class/unit/:id' to update an existing unit
* GET to 'class/unit/:id' to access a single unit by ID
* DELETE to 'class/unit/:id' to delete a single unit by ID

* POST to 'class/unit/lesson/create' to add a new unit
* PUT to 'class/unit/lesson/:id' to update an existing unit
* GET to 'class/unit/lesson/:id' to access a single unit by ID
* DELETE to 'class/unit/lesson/:id' to delete a single unit by ID

## Development Roadmap
Planned additional features and improvements will allow users to:
* Ability to rearrange units and lessons
* Add dates and a calendar view
* Change password
* Update email address
