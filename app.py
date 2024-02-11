"""Flask app for Boggle: The Game"""

from boggle import Boggle
from flask import Flask, render_template, session, request, redirect, jsonify

boggle_game = Boggle()

app = Flask(__name__)
app.config['SECRET_KEY'] = "abc123"



@app.route('/')
def index():
    """Show Homepage."""

    print("Home")
    return render_template("index.html")


@app.route('/play')
def play_game():
    """Builds the board and provides game functionality"""

    board = boggle_game.make_board()
    session['board'] = board

    return render_template("play.html", board=board)


@app.route('/guess')
def check_guess():
    """Receives the guessed word and checks if it works"""

    word = request.args['word']
    board = session['board']
    
    result = boggle_game.check_valid_word(board, word)
    print("One")
    return jsonify({ "result" : result})


@app.route('/end')
def end_game():
    """Displays the end of the game screen"""
    