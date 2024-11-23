# TheCasualFunk.com UI

[![Netlify Status](https://api.netlify.com/api/v1/badges/64ddbcfc-1c80-4af5-8a6c-932f754c0228/deploy-status)](https://app.netlify.com/sites/thecasualfunk/deploys)

Front-end code for thecasualfunk.com.

## Initial Setup

### Prerequisites

- [nvm - node version manager](https://github.com/nvm-sh/nvm)

### One-time setup

1. Ensure correct node version is being used:

```bash
nvm use
```

2. Ensure you have corepack enabled. This adds `pnpm`, `yarn`, and a few other package managers to the path:

```bash
corepack enable
```

3. Install dependencies:

This project uses [pnpm](https://pnpm.io/) as the package manager. Server uses yarn.

```bash
pnpm install
```

## Running the app locally

You will first need to start the backend API locally. See the readme there for more details.

Once that is running, you can start the front-end locally with:

```bash
pnpm dev --host
```

The `--host` flag is optional, but recommended if you want to access the app from other devices on the same network, which is a common scenario for this app.

## Basic Site Structure

This app has a few basic pages:

- **Home**: landing page for thecasualfunk.com. Component located at `src/routes/root.tsx`.
- **Gigs**: for use by the band during practice and live shows.
  - component: `src/routes/SetList.tsx`
  - route: `/gigs/:gigSlug`
- **Admin**: for managing the site, but right now mostly around managing events and their engagements.
  - primary component: `src/routes/admin/events.tsx`
  - route: `/admin/events`
- **Stage**: this view is meant for a projector on the stage, showing the current engagement.
  - primary component: `src/routes/stage/EventStageScreen.tsx`
  - route: `/stage/:eventSlug`
- **Fan**: this view is meant for mobile web viewers. It is how audience members interact with the event and the active engagement. This is also what the QR code on the stage screen will show.
  - primary component: `src/routes/fan/EventFanScreen.tsx`
  - route: `/e/:eventSlug`

## Events and Engagements

The basic idea of this app is to have "Events" which contain multiple "Engagements". These engagements are what the audience will see and interact with. At any given time, there is one active engagement for an event. Which engagement is active is managed on the admin pages (e.g. `/admin/events/funksgiving`).

There are different types of engagements, and more will be added over time. The type determines what the audience will see and how they can interact with it.

One engagement type is "Photo Carousel". This is a simple engagement where the audience submits photos, which are then displayed as polaroids falling onto the stage screen.

Another is "Vote For", where the admin pre-configures a list of submissions and the audience votes for their favorite. This could also be considered a "poll" engagement.

Future ideas of engagements include:

- trivia
- reaction page (static page but people can react with emojis)
- live chat (like a twitch stream chat)
- collaborative game (like asteroids or snake)

## Submissions and Reactions

Submissions are a generic concept/model that can be used by an engagement type. For example, in the "Photo Carousel" engagement type, submissions represent the photos submitted by the audience. In the "Vote For" engagement type, submissions represent the voting options, and in this case, audience members don't create submissions; only the admin does beforehand.

Submissions have a "data" property which can contain arbitrary data. For example, in the "Photo Carousel" engagement type, the data is the photo URL and a caption. In the "Vote For" engagement type, the data is the vote option text and a photo URL.

Reactions are similar to submissions, but they are a simpler model. They are used by the "Vote For" engagement type to represent the votes themselves.

## Creating a new engagement type

_todo_
