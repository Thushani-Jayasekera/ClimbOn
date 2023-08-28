<img width="1913" alt="climboncreateclimb" src="https://github.com/AshyLarryM/prisma-planetscale-climbing/assets/89487278/6142441f-58b5-486b-9ce7-15de7616e54c">

# ClimbOn

A Rock Climbing Workout Tracker that utilizes Next.js 13 AppRouter, TypeScipt, MySQL Database (PlanetScale), Prisma ORM, Next-Auth, and Tailwind CSS.
## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [New Features Comming Soon](#newfeatures)

## Introduction
For a background on why I chose to create this application, I will give a quick rundown of rock climbing, its unique quirks, and why it is challenging to create a workout tracker for climbers to effectively log their sessions.
- Rock Climbing has sub-disciplines.  
- Bouldering (short but powerful climbs without a rope) and Route Climbing (long endurance climbs with a rope attached to climber) are the 2 main disciplines of climbing.
- Both disciplines have 2 completely different grading systems to measure the difficulty of the climb in the United States.
- To improve, a climber must try climbs of grades outside of their ability level.
- When climbing further outside your ability level, it is very unlikely that a climber will complete that climb in a single session.

ClimbOn is a rock climbing training tracking application that aims to allow climbers the ability to record their climbing session with the various quirks and challenges associated with measuring progress within the sport.   Each climb created has the ability to select a climb type, corresponding grading system, attempts, and if they completed the climb.  Users also have the ability to view the history of their workouts, their personal records, different workout intensity levels, and additional notes. The application was created with a mobile-first design philosophy for climbers to be able to record their climbing/workout data on the go with ease.  Users may also enjoy a full desktop/tablet experience as well.

## Features
- In order to get started in ClimbOn, a user must create an account.  They can do so using various OAuth Providers.
<img width="200" alt="Screenshot 2023-08-23 at 9 10 33 PM" src="https://github.com/AshyLarryM/prisma-planetscale-climbing/assets/89487278/ad9bb8aa-f988-4533-93c7-43fce1d40071">

To create a new workout or "climbing session" navigate to "New Session".
  
https://github.com/AshyLarryM/ClimbOn/assets/89487278/823edeed-5ab1-41ea-b42d-34f63fd65228




Once the user navigates to the New Session page they may click "Start New Climbing Session" to initialize a new climbing training session.  Users will be prompted input the climbs attributes, and once submitted the climb will display for the user with the ability to increase their attempts, if they ended up completing the climb ("Sent"), or delete the climb.  The user can also see workout highlights including total climbs, and the most difficult grade for both climb types.

https://github.com/AshyLarryM/ClimbOn/assets/89487278/2f7b96ed-41f2-4663-91e6-66ec4f7a010b





Once the user has decided they are done with their climbing session they can click "Finish Workout" and review their workout, and assign the workout an intensity level, notes, and see any climbs that were flashed(climbs completed in 1 attempt).  Once the session is "Published" the user is redirected back to their WorkoutHistory Page with their all time records since their account was created.



https://github.com/AshyLarryM/ClimbOn/assets/89487278/1bd8355c-4ff1-4d68-bbb9-5f83ef3d549b




To view your climbing session history click "View Climbing Session History."


https://github.com/AshyLarryM/ClimbOn/assets/89487278/e24e2a51-4968-4a81-8d60-9cf492415864



## Technologies
- Languages/Libaries
  - TypeScript, Next.js, React
- Auth
  - Next-Auth w/OAuth Providers
- Database
  - Planetscale MySQL Database
  - Prisma ORM
- UI
  - Tailwind CSS/TailwindUI Library
  - React Hot Toast Notifications


## New Features Comming Soon
- Graph that displays the amount of climbs completed at each grade level.
- View Individual climbs for a specific climbing session.


