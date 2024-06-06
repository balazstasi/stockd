## Stocked - Search for stocks and get the latest information

This app is a trial of shadcdn and is not intended for production use. It is a simple app that allows you to search for stocks and get the latest information about them. It uses the [Polygon API](https://polygon.io/docs/stocks/get_v2_aggs_ticker__stocksticker__range__multiplier___timespan___from___to) to get the stock information. There's a limitation of 5 requests per minute, so there may be some errors, but error handling is added for these cases.

## Stack used

- React - For the frontend
- Next.js - For server-side rendering
- Vercel - For deployment
- Shadcdn - For Tailwind-based reusable UI elements
- Tailwind CSS - For styling
- ky - For making API requests
