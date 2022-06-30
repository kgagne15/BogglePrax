from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

#used the solution for help

class FlaskTests(TestCase):

    def setUp(self):
        """Stuff to do before every test."""

        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_homepage(self):
        """Make sure information is in the session and HTML is displayed"""

        with self.client:
            response = self.client.get('/')
            html = response.get_data(as_text=True)
            self.assertEqual(response.status_code, 200)
            self.assertIn('<button id="sub-btn">Submit Guess</button>', html)
            self.assertIsNone(session.get('highscore'))

    def test_check_guess(self):
        with self.client as client:
            with client.session_transaction() as sess:
                sess['board'] = [['D', 'O', 'G', 'G', 'G'],
                                 ['D', 'O', 'G', 'G', 'G'],
                                 ['D', 'O', 'G', 'G', 'G'],
                                 ['D', 'O', 'G', 'G', 'G'],
                                 ['D', 'O', 'G', 'G', 'G']]
        response = self.client.get('/check-guess?word=dog')
        self.assertEqual(response.json['result'], 'ok')
        response2 = self.client.get('/check-guess?word=cat')
        self.assertEqual(response2.json['result'], 'not-on-board')
        response3 = self.client.get('/check-guess?word=asdfalksdjf')
        self.assertEqual(response3.json['result'], 'not-word')
    
   
            
