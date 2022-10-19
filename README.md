# Pizza App

This is React and TypeScript app for pizzeria 

## Features
- React (+hooks)
- TypeScript
- Redux (Toolkit) 
- React Router (v6)
- Axios
*used preconfigured in my IDE prettier and linter*

## Gh-Pages
https://voronovichdev.github.io/pizza-app/
*in gh-pages there is 2 cases, when 404-page occurs: 1) when you reload app being on the FullPizza-page 2)...or being on the Cart-page*
***...so to fully explore the application, it is recommended to install the project locally***

____

### Interaction
- add and remove pizzas in cart, clear cart
- navigation between pages
- total price and pizza amount counter on the cart-button
- click on each and info about it
- pizzas are stored in local storage
- while request is pending - user see skeletons and loaders
- search, sort, filtration, pagination

### Fetching pizzas (asynchronous actions)
Pizzas are fetching from backend (to emulate this I used MockApi) with axios and createAsyncThunk
*due to the specifics of mockapi, search correctly works only on the "all" tab and first page*

### Pagination
pagination implemented with react-paginate

### Sort and filtration
- To parse and stringify params I used qs.
- To get rid of a lot of requests when searching, I used lodash.debounce

### Redux and store
All redux logic was implemented via redux-toolkit

### TypeScript 
- components, reedux, actions, props, events are typified
