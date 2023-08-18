This is a clone of popular website [airbnb](https://www.airbnb.co.in/)



## Introduction

Welcome to my Airbnb clone project! This project aims to replicate the core features of the Airbnb website, allowing users to browse and book accommodations. Users can also create and list their own hotels, manage reservations, and more.

Airbnb if of the most popular website which is known for it's beautiful UI/UX such as :
1. Carousels 
2. Hover Effects
3. Models 
4. Transitions and animations
5. Filtering UI based of users choice of hotels 
6. Icons , Calenders , beautiful buttons

## Tech Stack

### Client side
- React
- Nextjs (RSC)
- tailwindcss
### Server side
- Nodejs
- Prisma
- Postgresql
- Nextjs api routes

### Servies
- Supabase (Database provider)
- Cloudinary
- Vercel (for hosting)

## Features

### 1. Authentication

#### The project includes the following authentication options:

- Google Sign-In: Users can log in using their Google accounts.
- GitHub Sign-In: Users can log in using their GitHub accounts.
- Email Sign-Up and Sign-In: Users can sign up and log in using their email addresses.

### 2. Create Your Own Hotel

#### Logged-in users have the ability to create and list their own hotels:

1. Log in to your account.
2. Click the "Airbnb Your Home" button.
3. Follow the steps to provide details about your hotel, such as location, description, photos, and pricing.
4. Your hotel will be listed and available for other users to book.

### 3. Hotel Reservation

- Logged-in users can reserve hotels by choosing dates from a calendar. Multiple reservations on the same dates are prevented.

### 4. Image Upload

- Users can upload images for their hotels to showcase them to potential guests.

### 5. Trips

- Users can view all their upcoming reservations by clicking on My trips which can be viewed by clicking on the top right menu button

### 6. Cancel Reservations

- Hotel creators can cancel guest reservations by clicking on My reservations which can be viewed by clicking on the top right menu button

### 7. Favorites

- Users can like specific hotels and view all their liked hotels on My Favourites which is seen by clicking on My favourites which can be viewed by clicking on the top right menu button

### 8.  Filtering

- Users can filter hotels by country, Category, dates, price and based on rooms available by clickeing on .
### 9.  Logout

- Users can log out of their accounts any hotels that are created by them will be shown on home page for guest users who are not logged in


## Getting Started

Follow these steps to get the project up and running on your local machine:

### Project setup

Clone the repository:
```
git clone https://github.com/nithin-raj-9100/airbnb.git
```

 Navigate to the project directory: 
 ```
 cd airbnb
 ```
 

- Install dependencies: `npm install` or `yarn install` or `pnpm install`
- Set up environment variables for authentication (see below) 
- Run the application: `npm run dev` or `yarn dev` or `pnpm dev`
- Open your web browser and navigate to `http://localhost:3000`

## Usage

Once the application is running, you can:

- Browse available accommodations
- View accommodation details, photos, and reviews
- Log in using your Google, GitHub, or email account
- Create and list your own hotels
- Reserve hotels by choosing dates
- Upload images for your hotels
- View upcoming reservations
- Cancel guest reservations for your own hotels
- Like and view your liked hotels
- Log out of your account
- Filter hotels by various criterias


### Environment Variables 
in .env file fill the below environment variable
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_SECRET`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `DATABASE_URL=<your supabase url>` or any other posrgresql database url
- `GOOGLE_SECRET=<your google secret>`
- `GOOGLE_ID=<your google id>`
- `GITHUB_SECRET=<your github secret>`
- `GITHUB_ID=<your github id>`
- `NEXTAUTH_SECRET=<your next auth secret>`

