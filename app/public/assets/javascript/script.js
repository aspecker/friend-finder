//Friend Finder Javascript

var friendScore = 0;
var compArr = [];

$(document).on('click','#submit',function (event){
    event.preventDefault();
    var scoreHold = [];
    for (var i=1;i<=10;i++){
        var score = parseInt($(`#q${i}`).val());
        scoreHold.push(score);
    }
    var newFriend = {
        name: $("#name").val().trim(),
        photo: $('#picLink').val().trim(),
        scores: scoreHold
    }
    $.post('api/friends', newFriend, function (data) {
        console.log(newFriend);
        // console.log(matchName);
        // console.log(matchPic);
        getMatch();
    })

});

var getMatch = ()=>{
    var currentURL = window.location.origin;

    $.ajax({url: currentURL + '/api/friends',method: 'GET'})
    .then(function(friends){
        var compScore = 0;
        var compArr = [];
        for (var i=0;i<(friends.length-1);i++){
            compScore = 0;
            for (var j=0;j<=9;j++){
                var friendScore = parseInt(friends[i].scores[j]);
                var userScore = parseInt(friends[(friends.length-1)].scores[j])
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
        var matchName = friends[friendIndex].name;
        var matchPic = friends[friendIndex].photo;
        createModal(matchName,matchPic);
    })
}

var createModal = (name,pic) =>{
    var modal = $('#matchModal');
    $('#modalTxt').text(name);
    $('#modalPic').attr('src',pic);
    $(document).on('click','.close',function(){
        modal.style.display = "none";
    });
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


}
