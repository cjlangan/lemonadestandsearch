# Lemonade Stand Search

### Find any bit that you remember

## ==== WORK IN PROGRESS ====

# Development

## General

- Create a Google API Key
- Create a PostgreSQL database and store info in .env

```bash
systemctl start postgresql
```

## Backend

`cd` into backend and run:

```bash
python -m venv venv
source venv/bin/activate
python -m pip install -r requirements.txt
```

Initialise the tables:

```bash
cd scripts
python initialise_tables.py
```

You will also need to populate the database with all initial data, which
there is no script for this yet...

But you may begin by retrieving the latest video:

```bash
python process_new_video.py
```

And then run the backend server:

```bash
cd ../api
flask run --host=0.0.0.0
```

## Frontend

`cd` into frontend and run: 

```bash
npm install
npm run dev
```

## Hooking up on Oracle:

b) Separate ports internally

Keep backend running on localhost (e.g., localhost:5000) and frontend on another port (e.g., localhost:3000).
On production, use a reverse proxy like Nginx or Caddy:

    myapp.com        -> frontend
    myapp.com/api    -> reverse proxy -> localhost:5000

To the outside world, everything is under myapp.com.
Backend stays “localhost” internally, frontend is public.
The domain should point to the frontend, yes.
Backend can stay on localhost internally.
Use a reverse proxy to route /api requests to the backend.
This is the standard professional approach: backend never directly exposed to the internet by port; it’s proxied through the domain.

## TODO

- [x] Postgresql database 
- [x] Backend server script to download vtt caption files
- [x] Backend server script to convert vtt file to storable data in database tables
- [x] Pythons Flask as a backend API to interact with the database
- [x] HTML and Javascript frontend that uses the API to search for bits
- [x] Write frontend to render all components
- [x] Add date range and order options (state held in App.tsx)
- [x] Make it all look nice (UI/UX Time!)
    - [x] Header needs work
    - [x] Ensure search bar isn't too big for mobile
    - [x] Render cards in grid formation better
- [x] Fetch on every word or chunk of time, and date and order changes
- [x] Title/Icon

- [x] Hide routes using env
- [-] Setup a webhook to download new captions on video publish (not shorts)
    - [x] Check if the video is already there before adding
    - [x] Went with polling approach, much simpler
- [ ] Fix order selector submitting on previous input
- [ ] Change background to image and change font
- [ ] Get colour palette from logo

## Production TODO:

- [-] Set up Docker for simplicity (was more complex acchooally)
    - [x] Remove docker
- [ ] Set up code on Oracle Server
- [ ] Populate database with all current videos
- [ ] Set up domain with NGINX, should buy
- [ ] Secure the database by only allowing requests from the frontend, do later
- [ ] Get project working with new domains
- [ ] Rigorous testing
- [ ] Reddit Post


