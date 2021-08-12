

const express = require('express');
const app = express();

const pino = require('pino-http')();
const logger = require('pino')();

const { PORT } = require('./utils/config');
const apiServer = require('./routes/api');
const connect = require('./utils/connection');



// console.log(connect);
app.use(express.json());
app.use(pino);
app.use('/api',apiServer);


app.all('/', (req,res) => {
    logger.info({class:'KINGS'});
    
    // console.log(req.body);

    // connect.query('SELECT * FROM patents LIMIT 10',function(error, results,fields) {

    //     console.log('Total REsults',results[0].company_name);

    //     // id: 1,
    //     // company_name: 'Hatity',
    //     // email: 'ddobrowolny0@i2i.jp',
    //     // gender: 'Agender',
    //     // ip_address: '112.85.6.90',
    //     // patent_id: '19XFB2F57DE107692',
    //     // urgency: 'normal',
    //     // issue_date: '0000-00-00'
      

    // })

    res.send({success:false,access:'Block'});
    

})

app.listen(PORT, () => {

    console.log('Server Running');

} )


