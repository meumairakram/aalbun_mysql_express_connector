const express = require('express');
const router = express.Router();

const connection = require('../../utils/connection');

const logger = require('pino')();

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
                "application": "",
                "kind": "",
                "publication": "",
                "filing_date": "",
                "bulletin_date": "",
                "bulletin_issue": "",
                "publication_date": "",
                "first_publication_date": "",
                "intention_to_grant_date": "",
                "applicant_name": "",
                "applicant_street": "",
                "applicant_city": "",
                "applicant_country": "",
                "agent_name": "",
                "agent_street": "",
                "agent_city": "",
                "agent_country": "",
                "filing_language": "",
                "grant_file": 0
            }
        ]
    }


    var params = {...paramTemplate,...req.params}; 

    var {limit, offset, condition} = params;

    var baseQuery = 'SELECT * from grants';
 
    if(condition) {
        baseQuery += " WHERE 1=1";
    }

    for(const [key,value] of Object.entries(condition)) {

        

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


    
    logger.info(baseQuery);

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