const fs = require('fs');

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
                    return res.status(500).send(err);
                }

            });

        }

    }
