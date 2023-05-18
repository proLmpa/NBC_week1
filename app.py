##한지훈, 송이삭, 김희열
from flask import Flask, render_template, request, jsonify, url_for #(송어진) url_for는 JS,CSS 외부파일로 분리를 위해
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://sparta:test@cluster0.gcgk5vj.mongodb.net/?retryWrites=true&w=majority')
db = client.dbsparta

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

@app.route("/member", methods=["GET"])
def member_get():
    all_members = list(db.member.find({}, {'_id': False}))
    return jsonify({'result': all_members})

if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)