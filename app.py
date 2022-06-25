from crypt import methods
from boggle import Boggle
from flask import Flask, render_template, session, request, jsonify

boggle_game = Boggle()
app = Flask(__name__)
app.config["SECRET_KEY"] = "jessicachastain"


@app.route('/')
def home_page():
    session['board'] = boggle_game.make_board()
    return render_template('index.html', board=session['board'])

@app.route('/check-guess')
def boggle_guess():
    word = request.args['word']
    # print(word)
    board = session['board']
    response = boggle_game.check_valid_word(board, word)
    # print(response)
    return  jsonify({'result': response})