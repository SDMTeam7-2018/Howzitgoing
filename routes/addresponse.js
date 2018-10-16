const fs = require('fs');

module.exports = {
  addScorePage: (req, res) => {
    res.render('add-score.ejs', {
      title: "Welcome to How Is It | Record your happiness level here"
    });
},

addScore: (req, res) => {
  var level1 = document.getElementById('hlevel1').checked;
  
  alert(level1);
  
  // let message = '';
  var hlevel1 = req.body.hlevel1;
  var hlevel2 = req.body.hlevel2;
  var teamid = req.body.teamid;
    
  // send the player's details to the database
  var query = "INSERT INTO `team_members` (hlevel1, hlevel2, teamid) VALUES ('" +
  hlevel1 + "', '" + hlevel2 + "', '" + teamid + "')";

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    
    res.redirect('/');
    });
  }
}