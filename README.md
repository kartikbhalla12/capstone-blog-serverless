# SERVERLESS BLOG API

## General guidelines for RESTFUL URLs

* An Authorization token should be provided alongside all endpoints

## REST API

* Base API URL: https://blog-api.kartikbhalla.dev
* React-Editor-Content-Object used in following API examples is dependent upon [draftjs.org](https://draftjs.org/docs/api-reference-data-conversion/#internaldocs-banner)


### Get all blogs from all the users
#### `GET /blogs`

#### RESPONSE

        {
        "items": [
            {
                "blogId": "957a2350-0546-4167-a8c5-2401998964f3",
                "heading": "Ted Cruz’s Cancun Joke Gets A Cool Reaction From Twitter Users",
                "authorName": "David Moye",
                "imageUrl": "https://blogs-kartik-images-dev.s3.amazonaws.com/957a2350-0546-4167-a8c5-2401998964f3",
                "timeToRead": "4",
                "description": "People on Twitter noted that many Texans suffered record cold while their senator was in sunny, warm Cancun."
            },
            {
                "blogId": "053e40f7-4eb5-4b6d-9eed-56a6547719dc",
                "heading": "Eric Trump Tried To Steal His Father’s Favorite Line And It Didn’t Go Well!",
                "authorName": "Ed Mazza",
                "imageUrl": "https://blogs-kartik-images-dev.s3.amazonaws.com/053e40f7-4eb5-4b6d-9eed-56a6547719dc",
                "timeToRead": "2",
                "description": "The former president’s son received the treatment on Twitter over a recycled line from his dad.\n"
            },
            {
                "blogId": "c7efedfa-e6fc-4d7a-a6a7-ff587617f798",
                "heading": "Chuck Schumer Dares GOP To Oppose Bill Forming Capitol Riot Commission",
                "authorName": "Igor Bobic and Arthur Delaney",
                "imageUrl": "https://blogs-kartik-images-dev.s3.amazonaws.com/c7efedfa-e6fc-4d7a-a6a7-ff587617f798",
                "timeToRead": "5",
                "description": "Republicans seem split on whether the commission should also look at violence-related Black Lives Matter protests."
            },
            {
                "blogId": "12feb846-f679-4134-8523-8a612e1bde78",
                "heading": "Trump Organization Now Under Criminal Investigation, New York Attorney General Says",
                "authorName": "Nick Visser",
                "imageUrl": "https://blogs-kartik-images-dev.s3.amazonaws.com/12feb846-f679-4134-8523-8a612e1bde78",
                "timeToRead": "5",
                "description": "“We are now actively investigating the Trump Organization in a criminal capacity,” the office of New York Attorney General Letitia James said."
            }
        ]
    }
    
    

### Get all blogs of the logged in user
#### `GET /blogs?self=true`

#### RESPONSE

        {
            "items": [
                {
                    "blogId": "85e6d6ac-0589-4040-a46c-be120393ebf6",
                    "heading": "BBC Reporter Martin Bashir Used ‘Deceit’ To Get Princess Diana Interview, Report Finds",
                    "authorName": "By Sara Boboltz",
                    "imageUrl": "https://blogs-kartik-images-dev.s3.amazonaws.com/85e6d6ac-0589-4040-a46c-be120393ebf6",
                    "timeToRead": "9",
                    "description": "A months long investigation into how the journalist secured a shocking interview with the royal concluded that he acted unethically, and that the BBC helped cover it up."
                }
            ]
        }
        


### Get blog with blog id
#### `GET /blogs/id`

#### RESPONSE

       {
            "item": {
                "content": React-Editor-Content-Object,
                "authorName": "Ed Mazza",
                "timeToRead": "2",
                "imageUrl": "https://blogs-kartik-images-dev.s3.amazonaws.com/053e40f7-4eb5-4b6d-9eed-56a6547719dc",
                "updatedAt": "2021-05-19T17:41:54.557Z",
                "userId": "auth0|60a156bfcbe6c1006b6f1936",
                "blogId": "053e40f7-4eb5-4b6d-9eed-56a6547719dc",
                "createdAt": "2021-05-19T12:04:26.512Z",
                "heading": "Eric Trump Tried To Steal His Father’s Favorite Line And It Didn’t Go Well!",
                "description": "The former president’s son received the treatment on Twitter over a recycled line from his dad.\n"
            }
        }
        
        

### Get user's blog with blog id
#### `GET /blogs/id?self=true`

#### RESPONSE

       {
            "item": {
                "content": React-Editor-Content-Object,
                "authorName": "By Sara Boboltz",
                "imageUrl": "https://blogs-kartik-images-dev.s3.amazonaws.com/85e6d6ac-0589-4040-a46c-be120393ebf6",
                "timeToRead": "9",
                "updatedAt": "2021-05-21T08:06:09.899Z",
                "userId": "google-oauth2|101100898299268181081",
                "createdAt": "2021-05-20T20:08:14.853Z",
                "heading": "BBC Reporter Martin Bashir Used ‘Deceit’ To Get Princess Diana Interview, Report Finds",
                "blogId": "85e6d6ac-0589-4040-a46c-be120393ebf6",
                "description": "A months long investigation into how the journalist secured a shocking interview with the royal concluded that he acted unethically, and that the BBC helped cover it up."
            }
        }
       

### Create a new blog
#### `POST /blogs`

#### REQUEST

    {
        "heading": "Trump Bashes 2020 Presidential Election As ‘Crime Of The Century’",
        "description": "Trump once again claimed the election was stolen from him and argued that political polling was rigged as well",
        "content": React-Editor-Content-Object,
        "timeToRead": "6",
        "authorName": "Kartik Bhalla"
    }


#### RESPONSE

    {
        "item": {
            "blogItem": {
                "blogId": "a88e4d3c-8d39-4960-a002-e1f2ac9575ce",
                "userId": "google-oauth2|101100898299268181081",
                "createdAt": "2021-05-21T20:11:40.344Z",
                "updatedAt": "2021-05-21T20:11:40.344Z",
                "imageUrl": "https://blogs-kartik-images-dev.s3.amazonaws.com/a88e4d3c-8d39-4960-a002-e1f2ac9575ce",
                "heading": "Trump Bashes 2020 Presidential Election As ‘Crime Of The Century’",
                "description": "Trump once again claimed the election was stolen from him and argued that political polling was rigged as well",
                "content": React-Editor-Content-Object,
                "timeToRead": 6,
                "authorName": "Kartik Bhalla"
            },
            "blogImageUploadUrl": "https://blogs-kartik-images-dev.s3.ap-south-1.amazonaws.com/a88e4d3c-8d39-4960-a002-e1f2ac9575ce?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAWXK7BWKCGBZEH5PF%2F20210521%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20210521T201140Z&X-Amz-Expires=3000&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCmFwLXNvdXRoLTEiRzBFAiEA08AFlZ%2FgAG6kX2a2KYqmXQd6ItdPPlsOIbKrC%2Fy0TywCIBrQpqxagkmYbSJ6T6OYJ4JYIBxIZB6wherBmDmQxmxSKtsBCK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNDYyNDQ1MTk1OTA4IgzibDmItOMgXLgWydMqrwHlXVCt8ln6R4nSEEVQjQS2kgkCTmgi%2FU6FEvtz%2FRQbCtAszsoa18DWRnsKxcP96tqBkbKJpBzWQRQv3QkeWGAuZu%2F1ereIakVUyKHzra7RDgU5ujUEWXOoHh6AibkxJu8dh6jdsIN2yu%2FfL7SRKEj%2FWBW7wlqXoWc5WtCaJ876eMZ8NWSqgcIkbxou9P8039E%2BBKIfZNHmlmmL71jjoHBT2TbdqDx0QXZjzPDTtJJRMPunoIUGOuABJ489y3FqKj9LNzmkOAMPkHFVozAEE%2FFVsxW8MsaPhDwIW87khE%2Ffd6lP1S3caaR7rnMGMQtPCwl58G78ltLMzkIcDK9rafR0tBZgO3ua7Op6LPj8kCKpSiwnWtcCUFE1wK1f12LcAssSUdYFkKPRK9UVk4GjP37wYSYs61OrYseNJlHfJX0iVuRYnj3mHH8tSy2IzwEGT4UMsYXIQtegQ%2Fr7mUMGqOpwfGdWHx%2FeQLbXw5yTkh6QVDomgY3oVfrWuw0VxVKLe6zANC194p7GxsMgak330QpPJH67%2F3WW7sc%3D&X-Amz-Signature=086fe722e12fa2f8b180da3bcf445b4fd356c251d32db9b18ba0c47ad57edd9b&X-Amz-SignedHeaders=host"
        }
    }
      

### Update user's blog with blog id
#### `PATCH /blogs/id`

#### REQUEST

    {
        "heading": "Trump Bashes 2021 Presidential Election As ‘Crime Of The Century’",
        "description": "Trump once again claimed the election was stolen from him and argued that political polling was rigged as well",
        "content": React-Editor-Content-Object,
        "timeToRead": "6",
        "authorName": "Kartik Bhalla"
    }


#### RESPONSE

    {
        "item": {
            "blogItem": {
                "blogId": "a88e4d3c-8d39-4960-a002-e1f2ac9575ce",
                "userId": "google-oauth2|101100898299268181081",
                "createdAt": "2021-05-21T20:11:40.344Z",
                "updatedAt": "2021-05-21T20:11:40.344Z",
                "imageUrl": "https://blogs-kartik-images-dev.s3.amazonaws.com/a88e4d3c-8d39-4960-a002-e1f2ac9575ce",
                "heading": "Trump Bashes 2021 Presidential Election As ‘Crime Of The Century’",
                "description": "Trump once again claimed the election was stolen from him and argued that political polling was rigged as well",
                "content": React-Editor-Content-Object,
                "timeToRead": 6,
                "authorName": "Kartik Bhalla"
            },
        }
    }
   

### Delete user's blog with blog id
#### `DELETE /blogs/id`


#### RESPONSE

    {
        "item": {
            "blogItem": {
                "blogId": "a88e4d3c-8d39-4960-a002-e1f2ac9575ce",
                "userId": "google-oauth2|101100898299268181081",
                "createdAt": "2021-05-21T20:11:40.344Z",
                "updatedAt": "2021-05-21T20:11:40.344Z",
                "imageUrl": "https://blogs-kartik-images-dev.s3.amazonaws.com/a88e4d3c-8d39-4960-a002-e1f2ac9575ce",
                "heading": "Trump Bashes 2021 Presidential Election As ‘Crime Of The Century’",
                "description": "Trump once again claimed the election was stolen from him and argued that political polling was rigged as well",
                "content": React-Editor-Content-Object,
                "timeToRead": 6,
                "authorName": "Kartik Bhalla"
            },
        }
    }
   
### Get new image upload url for updating the image using blog id
#### `GET blogs/updateImageUrl/id`


#### RESPONSE

    {
        "url": "https://blogs-kartik-images-dev.s3.ap-south-1.amazonaws.com/f90e266b-7fab-4105-b22e-d2acf94d5a6a?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAWXK7BWKCJXEFAEZU%2F20210521%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20210521T202637Z&X-Amz-Expires=3000&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCmFwLXNvdXRoLTEiRzBFAiAjLx3WXAxLc4p7x%2FCjZBIitogBW7nKt8kZDX0zZuyxbQIhANsJ1K75cPNaDh7%2Fkzx7RHlsCbHMsBDWUIV9YgXZe7kuKuIBCK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNDYyNDQ1MTk1OTA4Igy1hmQeZIxGFPJA3acqtgEChYwP1sCExXRq8sp%2B1vl8tXGLgHBFM1IPJ136Bfjs9DehwNl3zc4gjC5G5YeUc7a2%2FQ8saqcToHyUS%2BhEHYLWtvFE77ProHTyNIuRU%2FuwLmsrnAdsuhERvIlTuEcQEi9B7Ao9DuMxvz4%2FXLAJw56VX9s7jZX4SUjcJCm0wS96S1H5Jx9BuZu7zhLHpMAfwa5OUrzwT0sc0kgzCAAw8wlK03NaRvOtwI6D1gxJyC0Ivg72X9Bi%2FjD8rqCFBjrgAemQEHpAyprEofZm%2FV3un6ZL3BMuZllDRTNzJN0fgCULv%2FK5TSrV1uxQ8AZrxO14mA5s43DJxTpXZ8fFz3s81vGIVs3in3uUEOf9OoqkSQ2KGxY%2BeBVE3xSNlPDzliMZqKrdblSPh3br7yk3DxMlpFtHSqGbZJFk9jpnWQtVqRrZUYkaOt%2BMPWi5I1R4EVCGkgMq7uHdR6Z1y6V0tcTqYEnvax0LFS7CbugFZmiyPZQ4QPdLrMEJaytKk0Go0FRB41kAuKQtWx7cPoy%2FOLu6zAmoMrokKhAdb0Vg%2BxUVM4g2&X-Amz-Signature=f4c3120b92c20f3099678f01f91c25453bc0d36ebc11f97a71da369a2f9ce940&X-Amz-SignedHeaders=host"
    }
       
 
