# ✨ Habit Tracker
Web application for tracking habits.

### Motivation

The project was created with the goal of building a habit tracker that is simple and quick to use. The idea was to avoid unnecessary settings and complex configuration so that creating a new habit takes only a few seconds.

Habit Tracker focuses on a minimal interface where users can open the app and start using it immediately. It allows users to create habits, mark their completion by day, and track progress through weekly streaks.

<img width="1292" height="695" alt="habit-app" src="https://github.com/user-attachments/assets/153068b2-35db-4ab7-be75-58933ed0c245" />

## Getting Started

You can use it now https://habits-tracker-dev.vercel.app 

## Using the PWA

Habit Tracker is a Progressive Web App (PWA), so you can install it on your device for quick access:
- On desktop or mobile, open the demo link in a browser.
- On desktop, click the install icon in the address bar (usually appears on the right side in Chrome)
- On mobile, tap the Share button or open the browser menu and select “Add to Home Screen” or “Install app”
- After installation, Habit Tracker will appear on your home screen and can be used like a native app.

## Features

- User registration and authentication
- Email verification via OTP code
- Create, edit, and delete habits
- Progress statistics
- Multilingual interface
- PWA support (installable as an app)

<!-- panvimdoc-ignore-end -->

## Tech Stack

**Frontend:** React, TypeScript, Redux Toolkit, React Hook Form, i18next

**Backend:** Node.js, Express ([repo](https://github.com/small-lizard/habits-tracker-server)) 

**Deployment:** Vercel

## Project Structure

```text
src
 ├── components   # reusable UI components
 ├── i18n         # translations for 2 languages
 ├── hooks        # custom React hooks
 ├── pages        # application pages
 ├── services     # API requests
 ├── store        # all Redux store logic
 └── utils        # helper functions
```
Styles are stored next to their components, which makes maintaining and reusing the UI easier.

## Run Locally

### Requirements
- Node.js ≥ 18
- npm
- Running the backend server ([repo](https://github.com/small-lizard/habits-tracker-server)) 
  
To run the frontend locally, follow these steps.

1. Clone the repository

```bash
git clone https://github.com/small-lizard/habits-tracker.git
cd habits-tracker
```

2. Install dependencies

```bash
npm install
```

3. Create a .env file

```bash
NODE_ENV=development
```

When NODE_ENV=development, the frontend automatically connects to the local backend API at:

```bash
http://localhost:5000
```

4. Run the backend server

The frontend requires the backend API to be running.
You can find the backend repository here: ([repo](https://github.com/small-lizard/habits-tracker-server)).

Follow the setup instructions in that repository to start the backend locally.

5. Start the application

```bash
npm run start
```


## Future Improvements

- Drag & drop habit sorting
- Registration via OAuth
- Dark theme
