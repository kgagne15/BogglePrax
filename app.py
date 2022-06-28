from crypt import methods
from boggle import Boggle
from flask import Flask, render_template, session, request, jsonify, flash

boggle_game = Boggle()
app = Flask(__name__)
app.config["SECRET_KEY"] = "jessicachastain"
# session['score'] = 0



@app.route('/')
def home_page():
    session['board'] = boggle_game.make_board()
    games_played = session.get('games_played', 0)
    highscore = session.get("highscore", 0)
    session['score'] = 0
    return render_template('index.html', board=session['board'], highscore=highscore, games_played= games_played)

@app.route('/check-guess')
def boggle_guess():
    word = request.args['word']
    # print(word)
    board = session['board']
    response = boggle_game.check_valid_word(board, word)
    # print(response)
    return  jsonify({'result': response})

@app.route('/score', methods=['POST'])
def score():
    # score = session['score']
    
    score = request.json['score']
    highscore = session.get("highscore", 0)
    session['score'] += score
    games_played = session.get('games_played', 0)
    session['games_played'] = games_played + 1
    games_played = session['games_played']
    if session['score'] > highscore:
        highscore = session['score']
        session['highscore'] = highscore
        return jsonify({'brokeRecord': highscore, 'games_played': games_played})
    else: 
        return jsonify({'brokeRecord': highscore, 'score': session['score'], 'games_played': games_played})
    # print(session['score'], highscore)
    # #return jsonify(brokeRecord=session['score'] > highscore)

    # if session
    # return jsonify({'score': session['score']}, brokeRecord=session['score'] > highscore)


