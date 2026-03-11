# ✨ Habit Tracker
Full-stack web application for tracking habits.

Allows users to create habits, mark their completion, and track progress. The interface is minimalist and not overloaded with settings, making it quick and easy to use. The backend is built with Node.js + Express and provides an API for the frontend.


<img width="1292" height="695" alt="habit-app" src="https://github.com/user-attachments/assets/153068b2-35db-4ab7-be75-58933ed0c245" />

## Getting Started

You can use it now https://habits-tracker-dev.vercel.app 

## Using the PWA

Habit Tracker is a Progressive Web App (PWA), so you can install it on your device for quick access:
- On desktop or mobile, open the demo link in a browser.
- You may see a prompt to “Add to Home Screen” or install the app.
- Once installed, Habit Tracker can be used like a native app

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

Demo is available at the link above.
To run locally, you will need Node.js, npm/yarn, and access to the API.

## Future Improvements

- Drag & drop habit sorting
- Registration via OAuth
- Dark theme
