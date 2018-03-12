var friends = require ('../data/friends.js');
// var bodyParser = require ('body-parser');

module.exports = function (app){
    app.get('/api/friends', function (req,res){
        res.json(friends);        
    });
    app.post('/api/friends', function (req,res){
        var compScore = 0;
        var compArr = [];
        friends.push(req.body);
        console.log(req.body);
        for (var i=0;i<(friends.length-1);i++){
            compScore = 0;
            for (var j=0;j<=9;j++){
                var friendScore = parseInt(friends[i].scores[j]);
                var userScore = parseInt(req.body.scores[j])
                var compat = Math.abs(friendScore-userScore);
                compScore += compat;
            }
            compArr.push(compScore);
            
        }
        console.log(compArr);
        Array.min = function(array){
            return Math.min.apply( Math, array);
        };
        var minimum = Array.min(compArr);
        console.log(minimum);
        var friendIndex = compArr.indexOf(minimum);
        console.log(friends[friendIndex].name);
        res.json(true);
        var matchName = friends[friendIndex].name;
        var matchPic = friends[friendIndex].photo;
        module.exports = matchName;
        module.exports = matchPic;
    });
}