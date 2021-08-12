const express = require('express');
const router = express.Router();

const connection = require('../../utils/connection');


router.get('/', (req,res) => {



    var paramTemplate = {
        limit:0,
        offset:0,
        condition: {
            id:null,
            publication:null
        }
    };


    var returnShape = {
        totalResults:0,
        data:[
            {
                "id": 0,
                "company_name": "",
                "email": "",
                "gender": "",
                "ip_address": "",
                "patent_id": "",
                "urgency": "",
                "issue_date": ""
            }
        ]
    }


    var params = {...paramTemplate,...req.body}; 

    var {limit, offset, condition} = params;

    var baseQuery = 'SELECT * from grants';


    console.log(Object.entries(condition));    

    for(const [key,value] of Object.entries(condition)) {

        baseQuery += " WHERE 1=1";

        switch(key) {

            case "id":
                if(value) { 
                    baseQuery += ` AND id = ${value}`;
                }
                
                break;

            case "publication":
                if(value) { 
                    baseQuery += ` AND publication = ${value}`;
                }
                break;

            default:
                // do nothing
                break;


        }

    }


    

    if(limit > 0 && (offset == 0 || !offset)) {
        baseQuery += ` LIMIT ${limit}`;
    }  

    if((limit == 0 || !limit) && offset > 0) {
        baseQuery += ` LIMIT 20`;
    }  


    if(offset > 0) {
        baseQuery += ` OFFSET ${offset}`;
    }  


    console.log(baseQuery);
    
    connection.query(baseQuery, function(error,results,fields) {

        if(error) {
            res.status(400).json(returnShape);

          
            return;
        }

        if(!results || results.length < 1 ) {
            results = [...returnShape.data];
        }
        


        res.status(200).json({totalResults:results.length, data:results});

    })


})


module.exports = router;