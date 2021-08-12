# End Points

## /api/get_data
<!-- https://albun-data-service.herokuapp.com/api/get_data -->

**Accepts params:**
Used to get data from the database.


    {
        limit:Numder of records,    
        offset: number of records to start from .
        condition:{
            id: To get from a specific ID,
            publication: Search by a specific publication number
        }
    }