# Lemonade Stand Search

### Find any bit that you remember

## ==== WORK IN PROGRESS ====

# Development

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

- [ ] Fetch on every word or chunk of time, and date and order changes
- [ ] Secure the database by only allowing requests from the frontend
- [ ] Title/Icon
- [ ] Setup a webhook to download new captions on video publish (not shorts)
    - [ ] Check if the video is already there before adding
- [ ] Set up code on Oracle Server
- [ ] Populate database with all current videos
- [ ] Set up domain with NGINX, should buy
- [ ] Get project working with new domains
- [ ] Rigorous testing
- [ ] Reddit Post




