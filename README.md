## Currency Converter – Take Home Assessment

## Overview

This project is a currency conversion tool that converts values between two different currencies.

It fetches the available currencies from currencybeacon.com API and returns conversion result and rate.

## Features

- Select “from” and “to” currencies
- Input amount to convert
- Real-time conversion using API
- Currency list fetched from API
- Error handling for failed API requests
- Loading state for better UX via (Converting... message)

## Tech Stack

- Angular, TS
- RxJS
- PrimeNG
- SCSS (BEM)

## Assumptions & Decisions

- Conversion is triggered automatically once the form is valid (rather than only on a button click) to provide a faster calculation UX.
- Conversion input changes are debounced (500ms) to reduce API requests while typing.
- The app prevents converting “From” and “To” when they are the same currency via a custom form validator same-currency.validator.ts.
- Currency selection uses autocomplete component from PrimeNG by:
  - currency name (e.g British Pound)
  - currency short code (e.g. GBP)
- Parent component handles the business logic and passes in data to children, and children emit events for the parent to handle logic.
- Two-layer service structure (Internal and External) is used. Internal = app-facing contract, external = API + DTO mapping.
- API key is added globally through an HTTP interceptor to avoid duplicating query in each API call.
- To avoid "magic strings" and better scalability all are placed in constants/.
- BEM methodology is used for scalable and maintainable SCSS across components.
- SCSS is split by concerns (in sizes/colors/fonts, reusable mixins, global typography in texts, reset in reset-css, and isolated PrimeNG overrides in prime-ng/) for scalable css architecture.

## Optional Improvements

- Display error messages e.g. with dialog, if either API call fails.
- Spinner component for HTTP calls e.g. when calling /convert endpoint and receiving result.
- Additional date picker component for performing conversion using historical rates by optional date query param.
- Commented code (depending on the preference...)
- Unit tests for services, components etc.
- If this were a private API, the api key could be stored on the backend and never exposed to the client for better security.

## Instructions to run the project

## Clone the repo

git clone https://github.com/adamskikacper/currency-converter.git

## Navigate into project

cd currency-converter

## Install dependencies

npm install

## Start development server

ng serve
