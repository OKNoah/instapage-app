# Instapage tool

This tool lets you create pages, list pages and proxy pages on Instapage.

## Setup

Create a `.env` file per [`sample.env`](sample.env), or edit and run this command:

```bash
printf EMAIL=[ACCOUNT EMAIL]\nPASSWORD=[ACCOUNT PASSWORD] | tee .env
```

Then...

```bash
yarn install
# OR
npm install
```

Optionally, you can provide a `PORT`, the default is `3000`.

## Usage

Simply run **one** of these commands.

```bash
yarn run start
#OR
npm start
```

## Notes

This is a PHP app that uses cookies. The necessary cookie is `PHPSESSID` which is sent back in the `headers['set-cookie']` field.

Additionally, the forms are protested with CSRF. So before using either the login form or the new page form, you must do an HTTP request and get the value of the hidden `csrf-token` field on the page.

I've created utilities for extracting both these things in the [`src/utils.js`](src/utils.js) file.

Being that it's a PHP app, it's not a standard REST API, so all data is sent as form data. Even when you save changes, it's not proper JSON, it's JSON sent as the value of a form field.

Oddity: Also, sign in and go to [`https://app.instapage.com/api/1/builder2`](https://app.instapage.com/api/1/builder2) and you'll get the message `In feature will be doc.`. I think this is a programming leaving themselves a note to write docs, or maybe they are planning an API and this route will have documentation?
