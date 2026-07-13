---
description: Read this file to understand how to fetch the data in the project.
applyTo: **/*.ts, **/*.tsx  
---
# Data Fetching Instructions
This file describes how to fetch data in the project. The project uses a custom data fetching library that is built on top of React Query. The library provides a set of hooks and utilities to fetch data from APIs and manage the state of the data in the application.

### Fetching Data Use server components 
IN NEXT.JS, ALWAYS using Server components for data fetching. NEVER user client components for data fetching. Server components are more efficient and allow for better performance and SEO.
### DATA fetching methods
ALWAYS user helper methods provided by the /data directory should use drizzzle ORM for database instructions. NEVER use raw SQL queries or other database libraries for data fetching. The helper methods in the /data directory are designed to work with the Drizzle ORM and provide a consistent interface for fetching data from the database.