from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://sparta:test@cluster0.gcgk5vj.mongodb.net/?retryWrites=true&w=majority')
db = client.dbsparta

import requests

@app.route('/')
def home():
    return render_template('index.html')


@app.route("/mbti", methods=["POST"])
def mbti_post():
    IE = request.form['IE_give']
    NS = request.form['NS_give']
    TF = request.form['TF_give']
    PJ = request.form['PJ_give']
    
    doc = {
        'IE' : IE,
        'NS' : NS,
        'TF' : TF,
        'PJ' : PJ
    }
    
    db.mbti.insert_one(doc)
    
    return jsonify({'msg': '저장 완료'})
    
@app.route("/mbti", methods=["GET"])
def mbti_get():
    all_mbti = list(db.mbti.find({},{'_id':False}))
    return jsonify({'result': all_mbti})


if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)