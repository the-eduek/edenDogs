## Frontend Engineer Work Sample I, edenDogs.

**Author**: Eduek Akpan-Nyah.
**Stack**: Vue.js + Vuex, SCSS,.
**Demo**: [edendogs.netlify.app](https://).

This repo contains my solution to [the Eden work sample](https://edenlife.notion.site/Frontend-Engineer-Work-Sample-1-265adac57014497288db619cab014a79). 
For this, I have built edenDogs, an SPA that consumes [https://dog.ceo/dog-api/](https://dog.ceo/dog-api/) and uses the returned data to render the app.

### Features
- Users are able to see a list of at least 100 dog images by default when they load the application.

- Users can click on a dog image and be routed to a page where there’s more information about the dog

- Users are be able to search for a dog breed with a search box and dog breeds that match the search criteria are displayed .



### Technical Requirements
- The application uses **vuex** for state management

- A loading indicator that lets users know the images are being loaded. it also reports when an error has been encountered

- Images are lazy loaded at browser level, using the `loading = 'lazy'` property on images and a custom `lazyload` directive

- Client-side caching to avoid multiple round trips to the server API.

- The application is responsive..

- The codebase is be component-based, clean, maintainable and reusable.

- The application has a very neat and decent UI.

- The application is hosted on Netlify. 

- The code is hosted on GitHub and git commits show my progress in building the application.