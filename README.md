
## To install necessary packages
`npm install`


## To run dev server
`npm run dev`
This will give you a url that should look like `http://localhost:<###>`

## API Info

API endpoints defined in src/app/api

### Testing examples:

- To retrieve all majors:
    - `http://localhost:<###>/api/majors`
    - Currently only 1 major in database

- To retrieve different classes:
    - Current classes in db (classCode/className):
        - CS471/Operating Systems, CS484/Data Mining, CS321/Software Engineering
    - Basic command:
        -`curl -X GET http://localhost:<###>/api/classes/<classCode OR className>`

- Frontend (kinda) supported for same operations. open the localhost port on a browser and click around to mess with it.

