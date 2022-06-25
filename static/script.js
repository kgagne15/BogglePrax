console.log('hello')


$('#boggle-form').on('submit', async function(e){
    e.preventDefault()
    let word = $('#boggle-guess').val()
    console.log(word)
    const res = await axios.get("/check-guess", { params: { word: word }});
})
