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

You will also need to populate the database with all initial data, which
there is no script for yet...

## TODO

- [x] Postgresql database stored on Oracle Server
- [x] Backend server script to download vtt caption files
- [x] Backend server script to convert vtt file to storable data in database tables
- [ ] Pythons Flask as a backend API to interact with the database
- [ ] HTML and Javascript frontend that uses the API to search for bits

