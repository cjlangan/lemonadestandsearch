# Lemonade Stand Search

### Find any bit that you remember

## ==== WORK IN PROGRESS ====

## Development

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
there is no script for yet...

But you may begin by retrieving the latest video:

```bash
python process_new_video.py
```

And then run the backend server:

```bash
cd ../api
flask run --host=0.0.0.0
```

## TODO

- [x] Postgresql database stored on Oracle Server
- [x] Backend server script to download vtt caption files
- [x] Backend server script to convert vtt file to storable data in database tables
- [x] Pythons Flask as a backend API to interact with the database
- [ ] HTML and Javascript frontend that uses the API to search for bits
- [ ] Secure the database by only allowing requests from my frontend
- [ ] Set up code on Oracle Server
- [ ] Set up domain with NGINX

