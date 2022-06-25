console.log('hello')




$('#boggle-form').on('submit', async function(e){
    e.preventDefault()

    let word = $('#boggle-guess').val()
    // console.log(word)
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
    // console.log(score)
    const res = await axios.post('/score', {score: score})
    console.log(res.data.score, 'this is javascript')
    let sessionScore = res.data.score
    let $item = `
    <p> Current Boggle Score = ${sessionScore}
    `
    $('#boggle-score').append($item)
    
}