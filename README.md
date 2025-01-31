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

0. Follow the instructions in the server's readme to add your new engagement type.

1. Create a new folder under `src/engagements/`, e.g. `src/engagements/raffle`.

2. Inside this folder, create a file called `schema.ts`. This is where you will define the 5 GraphQL fragments for this engagement type's config, data, submission, and admin config data field types:

```ts
import { gql } from "@apollo/client";

gql`
  fragment RaffleAdminConfigFields on RaffleAdminConfig {
    # ...
  }
  fragment RaffleViewConfigFields on RaffleViewConfig {
    # ...
  }
  fragment RaffleAdminDataFields on RaffleAdminData {
    # ...
  }
  fragment RaffleViewDataFields on RaffleViewData {
    # ...
  }
  fragment RaffleSubmissionFields on RaffleSubmissionData {
    # ...
  }
`;
```

3. Spread the fragments into the following files accordingly:

- `AdminEngagementFragment` type in `src/gql/fragments/AdminEngagementFragment.ts`
- `FanEngagementFragment` type in `src/gql/fragments/FanEngagementFragment.ts`
- `StageEngagementFragment` type in `src/gql/fragments/StageEngagementFragment.ts`
- `AdminSubmissionFragment` type in `src/gql/fragments/AdminSubmissionFragment.ts`
- `FanSubmissionFragment` type in `src/gql/fragments/FanSubmissionFragment.ts`
- `StageSubmissionFragment` type in `src/gql/fragments/StageSubmissionFragment.ts`

4. Create a folder called `fan` inside your new engagement folder, and create a view file that will be used to render the fan-facing part of the engagement. It should accept a prop of `engagement` which will be the fan-facing data for the engagement. For example, assuming the name of your engagement is `RAFFLE`, it might be `FanRaffleEngagement.tsx`:

```tsx
export function FanRaffleEngagement({
  engagement,
}: {
  engagement: FanEngagementFragment;
}) {
  return <div>Raffle screen!</div>;
}
```

5. Create a folder called `stage` inside your new engagement folder, and create a view file that will be used to render the stage-facing part of the engagement. It should accept a prop of `engagement` which will be the stage-facing data for the engagement. For example, assuming the name of your engagement is `RAFFLE`, it might be `StageRaffleEngagement.tsx`:

```tsx
export function StageRaffleEngagement({
  engagement,
}: {
  engagement: StageEngagementFragment;
}) {
  return <div>Raffle stage screen!</div>;
}
```

6. Create a file called `definition.tsx` inside your new engagement folder. This is where you will define the engagement's definition:

```ts
import {
  EngagementType,
  RaffleAdminConfig,
  RaffleAdminData,
} from "@/gql/graphql";
import { StageRaffleEngagement } from "./stage/StageRaffleEngagement";
import { FanRaffleEngagement } from "./fan/FanRaffleEngagement";
import { EngagementDefinition } from "../base/EngagementDefinition";
import { CameraIcon } from "@radix-ui/react-icons";

export const raffleEngagementDefinition: EngagementDefinition<
  RaffleAdminConfig,
  RaffleAdminData
> = {
  title: "Raffle",
  icon: <CameraIcon />,
  type: EngagementType.Raffle,
  stageComponent: StageRaffleEngagement,
  fanComponent: FanRaffleEngagement,
  submissionsName: "Photos",
  getInitialData: () => ({
    // initial default data
  }),
  getInitialConfig: () => ({
    // initial default config
  }),
};
```

7. Add your new engagement definition to the `engagementDefinitionsArray` array in `src/engagements/index.ts`.

## Creating forms

1. Define the form schema using zod at the module level.

   ```ts
   const formSchema = z.object({
     title: z.string(),
     description: z.string().optional(),
     date: z.date(),
   });
   ```

2. Call the `useForm` hook to create the form state and handlers.

   ```tsx
   const form = useForm<z.infer<typeof formSchema>>({
     resolver: zodResolver(formSchema),
     defaultValues: {
       title: "",
       description: "",
       date: new Date(),
     },
   });
   ```

3. Define a submit handler function that will be called when the form is submitted.

   ```tsx
   function onSubmit(values: z.infer<typeof formSchema>) {
     console.log(values);
   }
   ```

4. Render the form using the `Form` component and the `form.handleSubmit` method.

   ```tsx
   <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)}>
       {/* title */}
       <FormField
         control={form.control}
         name="title"
         render={({ field }) => (
           <FormItem>
             <FormLabel htmlFor={field.name}>Name</FormLabel>
             <FormControl>
               <Input {...field} />
             </FormControl>
             <FormMessage {...field} />
           </FormItem>
         )}
       />
       {/* description: */}
       <FormField
         control={form.control}
         name="description"
         render={({ field }) => (
           <FormItem>
             <FormLabel htmlFor={field.name}>Description</FormLabel>
             <FormControl>
               <Textarea {...field} />
             </FormControl>
             <FormMessage {...field} />
           </FormItem>
         )}
       />
       {/* date: */}
       <FormField
         control={form.control}
         name="date"
         render={({ field }) => (
           <FormItem>
             <FormLabel htmlFor={field.name}>Date</FormLabel>
             <FormControl>
               <DatePicker {...field} />
             </FormControl>
             <FormMessage {...field} />
           </FormItem>
         )}
       />
     </form>
   </Form>
   ```

## Using <Select>

It's a bit tricky to use the <Select> component inside a react-hook-form.

```tsx
<FormField
  control={form.control}
  name="size"
  render={({ field }) => (
    <FormItem>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Size" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {sizes.map((size) => (
            <SelectItem key={size} value={size}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
```
