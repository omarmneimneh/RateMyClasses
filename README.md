## Guide to Running Project 

1. Install necessary packages
    - `npm install`

2. Running
    - To run dev server:
        - `npm run dev`
        - This will give you a url that should look like `http://localhost:<###>`
    - To run prod server:
        - `npm run build ; npm run start`
        - This will give you a url that should look like `http://localhost:<###>`

## API Info

API endpoints defined in src/app/api

- #### Testing examples:

    - To retrieve all majors:
        - `http://localhost:<###>/api/majors`

    - To retreive info about a major:
        - `http://localhost:<###>/api/majors/computer science` only available major

    - To retrieve different classes:
        - Current classes in db (classCode/className):
            - CS471/Operating Systems, CS484/Data Mining, CS321/Software Engineering
        - Basic command:
            -`curl -X GET http://localhost:<###>/api/classes/<classCode OR className>`

    - Frontend (kinda) supported for same operations. open the localhost port on a browser and click around to mess with it.

