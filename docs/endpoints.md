# Required API Endpoints
This document details the required API routes from `https://punkapi.com` as deatiled in https://punkapi.com/documentation/v2


## Pagination
Requests by default are defaulted to 25 results. Available queries are:
`?page` The page of which we wish to access. 
`?per_page` The amount of items we wish to fetch per page.

Example query: `https://api.punkapi.com/v2/beers?page=3&per_page=15 `


## Get Beers
Here are the relevant queries we need for this application.

### Search Query
PunkAPI has a search by beer name route already implemented, which means we do not need to handle any server-side processing of data. 

The `beer_name` search parameter also allows for partial searches.

Note: Spaces must be noted as an `_`

Example Query: `https://api.punkapi.com/v2/beers?beer_name=punk_ipa?page=1&per_page=15 `


## Get Beer by ID
To obtain all the details of a beer by ID is easy to do. This will return a single beer item in a JSON response.

Example Query: `https://api.punkapi.com/v2/beers/1`
