console.log('hello');

let $score = $('#current-score');


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
    let highscore = 0; 
    // console.log(score)
    const res = await axios.post('/score', {score: score})
    console.log(res.data.score, res.data.brokeRecord)
    if (res.data.score !== undefined) {
        let sessionScore = res.data.score

        let $item = `
            ${sessionScore}
        `
        $score.text($item)
    } else {
        console.log('you have reached the else')
        let brokenRecord = res.data.brokeRecord
        console.log('brokenRecord', brokenRecord)
        // let $item = `
        //     ${brokenRecord}
        // `
        // console.log($item)
        $score.text(brokenRecord)
        // $('#current-score').append($item)

        // let $newRecord = `
        // <h2>You broke the highest record!</h2>
        // `
        $('body').append('<h2>You broke the highest record!</h2>')
        $('#high-score').text(res.data.brokeRecord)
    }
    // console.log(res.data.score, 'this is javascript')
    // let sessionScore = res.data.score

    // let $item = `
    //     ${sessionScore}
    // `
    // $score.text($item)
    // let $item = `
    // <p> Current Boggle Score = ${sessionScore}
    // `
    // $('#boggle-score').append($item)
    
}