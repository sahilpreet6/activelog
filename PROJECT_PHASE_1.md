# Web Development 2 - Project Phase 1

## Course Information
- Instructor: Olusola Akinbode
- Course: CPRG 306
- Date: 19 March 2026

## Team Information
- Group: 6
- Members: 3

### Team Members and Roles
- Paolo Manalastas - Frontend and UI/UX Lead
- Sahil Nagpal - Backend and Database Lead
- Sahilpreet Singh - Authentication, External APIs, and Deployment Lead

### GitHub Usernames
- Paolo: paolodeloyola
- Sahil Nagpal: Nagpal-sahil
- Sahilpreet Singh: sahilpreet6

## Project Overview
- Project Name: ActiveLog
- Selected Option: Option E - Health and Fitness Tracker
- Repository: https://github.com/sahilpreet6/activelog
- Live URL: https://activelog-neon.vercel.app/

## Description

### Problem Being Solved
Many people want to stay consistent with workouts and diet, but tracking everything in one place is difficult. Some fitness apps are overly complex, while others lack useful features. ActiveLog aims to provide a simple and clean platform where users can log workouts, track meals, set goals, and monitor progress over time without feeling overwhelmed.

### Target Audience
ActiveLog is primarily designed for:
- Students balancing fitness with busy schedules
- People working part-time or full-time who need a simple tracker
- Beginners who prefer straightforward tools
- Users seeking basic progress tracking and motivation

### Technologies Used
- Next.js (App Router)
- Tailwind CSS and shadcn/ui
- Supabase (Authentication and Database)
- Nutritionix API
- ExerciseDB API
- Vercel

## Core Features
- Sign up, login, and logout
- Personal dashboard
- Workout logging
- Nutrition tracking
- Goal tracking
- Basic achievements and progress tracking
- Charts for progress visualization
- Responsive design for mobile and desktop

## Development Plan

### Sprint 1 - Core Features
- Set up Next.js project and GitHub repository
- Deploy initial version on Vercel
- Create main pages (dashboard, workouts, nutrition, goals)
- Design database schema in Supabase
- Build basic workout logging feature
- Create reusable UI components

### Sprint 2 - Authentication and Backend
- Implement login and signup with Supabase
- Add protected routes for authenticated access
- Build API routes for workouts, meals, and goals
- Connect frontend forms to the database
- Integrate ExerciseDB API for exercise search
- Add basic error handling and loading states

### Sprint 3 - UI and Final Features
- Integrate Nutritionix API for food tracking
- Add charts to visualize progress
- Implement goal tracking and achievements
- Improve UI design and responsiveness
- Finalize deployment and environment configuration

## Architecture

### Pages
- /
- /login
- /signup
- /dashboard
- /workouts
- /workouts/new
- /nutrition
- /nutrition/search
- /goals
- /achievements
- /profile

### Components
- Navbar
- Sidebar
- WorkoutCard
- MealCard
- GoalCard
- AchievementBadge
- ProgressChart
- Form components
- Loader, Error, and EmptyState components

### API Routes
- /api/workouts
- /api/workouts/[id]
- /api/nutrition
- /api/goals
- /api/achievements
- /api/exercises
- /api/foods

### Data Models

#### User
- id
- name
- email

#### Workout
- id
- user_id
- exercise
- sets
- reps
- duration

#### Meal
- id
- user_id
- calories
- protein
- carbs
- fat

#### Goal
- id
- user_id
- target_value
- current_value

## Team Responsibilities

### Paolo (Frontend)
- Builds UI and layout
- Creates reusable components
- Ensures responsive design

### Sahil Nagpal (Backend)
- Designs database structure
- Implements CRUD operations
- Handles data integration

### Sahilpreet (Auth and Deployment)
- Sets up authentication
- Integrates external APIs
- Manages deployment and environment variables

## Conclusion
ActiveLog is designed to be a simple but useful fitness tracking app that helps users stay consistent with their health goals. It combines workout logging, nutrition tracking, and progress visualization into one platform while demonstrating the required technical skills for this course.
