console.log('hello ello');

let $score = $('#current-score');


setTimeout(function(){
    $('#sub-btn').prop('disabled', true)
    let $item = `
    <h2>I'm sorry, your time is up</h2>
    `
    $('body').append($item)
    
}, 3000)



$('#boggle-form').on('submit', async function(e){
    e.preventDefault()

    let word = $('#boggle-guess').val()
    const res = await axios.get("/check-guess", { params: { word: word }});
    console.log(res.data.result)
    let serverResponse = res.data.result
    let $msg = `
    <div id='responseMessage'>
        ${word}: ${serverResponse}
    </div>
    `
    $('body').append($msg)
    if (serverResponse === 'ok') {
        submitScore(word)
    }
})

async function submitScore(word) {
    let score = word.length;
    let highscore = 0; 
    const res = await axios.post('/score', {score: score})
    console.log(res.data.score, res.data.brokeRecord, res)
    if (res.data.score <= res.data.brokeRecord) {
        let sessionScore = res.data.score
        let $item = `
            ${sessionScore}
        `
        $score.text($item)
        $('#games-played').text(res.data.games_played)
    } else {
        console.log('you have reached the else')
        let brokenRecord = res.data.brokeRecord
        console.log('brokenRecord', brokenRecord)
        $score.text(brokenRecord)
        $('body').append('<h2>You broke the highest record!</h2>')
        $('#high-score').text(res.data.brokeRecord)
        
    }
    
}