const fs = require('fs');
const util = require('util');

module.exports = {

    recordScorePage: (req, res) => {
        res.render('recordHappinessScore.ejs', {
            title: "Record your happiness level here"
        });
    },

    recordScore: (req, res) => {

        let individual_happiness = req.body.individual_happiness;
        let team_happiness = req.body.team_happiness;
        let timestamp = '';

            // send the team members response to the database
            let query = "INSERT INTO `team_members` (individual_happiness, team_happiness, timestamp) VALUES ('" +
            individual_happiness + "', '" + team_happiness + "', NOW())";

            db.query(query, (err, result) => {
                if (err) {
                    //connection.end();
                    return res.status(500).send(err);
                }

                res.render('recordHappinessScore.ejs', {
                    title: "Record your happiness level here"
                });
                //connection.release();
            })

           /* let query1 = "SELECT * FROM `team_members`"; 
            db.query(query1, function (error, results, fields) {
            // When done with the connection, release it.
                db.release();
            
             // Handle error after the release.
                if (error) throw error;
                
            // Don't use the connection here, it has been returned to the pool.

            }); */
            // Promisify for Node.js async/await.
            db.query = util.promisify(db.query)

    }
}