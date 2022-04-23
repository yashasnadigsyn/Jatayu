from distutils.log import debug
from flask import Flask, render_template, request
import os, time

from sqlalchemy import true

app = Flask(__name__)


@app.route('/')
def mainpage():
    return render_template('index.html')

@app.route('/wion')
def wionlinks():
    os.system('node /static/wionnewsscrape.js')
    time.sleep(5)
    return render_template('WionNewsHtml.html')

@app.route('/opindia')
def opindialinks():
    os.system('node /static/opindianewsscrape.js')
    time.sleep(5)
    return render_template('OpIndiaHtml.html')

@app.route('/thehindu')
def thehindulinks():
    os.system('node /static/thehindunewsscrape.js')
    time.sleep(5)
    return render_template('TheHinduHtml.html')

@app.route('/cricket')
def cricketaddictorlinks():
    os.system('node /static/cricketaddictor.js')
    time.sleep(5)
    return render_template('CricketAddictorHtml.html')

@app.route('/tech')
def thehackerlinks():
    os.system('node /static/thehackernews.js')
    time.sleep(5)
    return render_template('thehackerHtml.html')

if __name__ == '__main__':
    # from waitress import serve
    app.run(host='192.168.0.2',port='5000', debug=true)

