##한지훈, 송이삭, 김희열
from flask import Flask, render_template, request, jsonify, url_for #(송어진) url_for는 JS,CSS 외부파일로 분리를 위해
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://sparta:test@cluster0.gcgk5vj.mongodb.net/?retryWrites=true&w=majority')
db = client.dbsparta

@app.route('/')
def home():
    return render_template('index.html')

##김희열
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
    
def postMbti():
    mbti_receive = request.form["mbti_give"]
    mbti_receive = mbti_receive.replace(",", "")  # ,가 섞인 문자열로 받아와지기 때문에 이를 제거
    doc = {"mbti": mbti_receive}
    db.mbti.insert_one(doc)
    print(mbti_receive, len(mbti_receive), type(mbti_receive))

    mbtiCnt = list(db.mbtiCnt.find({}))
    if len(mbtiCnt) == 0:
        mbtiCnt = {
            "id": 0,
            "e": 0,
            "i": 0,
            "n": 0,
            "s": 0,
            "t": 0,
            "f": 0,
            "j": 0,
            "p": 0,
        }
    else:
        mbtiCnt = mbtiCnt[0]
        del mbtiCnt["_id"]

    for a in mbti_receive:
        mbtiCnt[a] = mbtiCnt[a] + 1
    db.mbtiCnt.delete_one({"id": 0})
    doc = mbtiCnt
    db.mbtiCnt.insert_one(doc)

    return jsonify({"msg": "저장완료!"})

@app.route("/mbti", methods=["GET"])
def mbti_get():
    all_mbti = list(db.mbti.find({},{'_id':False}))
    return jsonify({'result': all_mbti})

@app.route("/member", methods=["GET"])
def member_get():
    member_desc = list(db.member.find({},{'_id':False}))
    return jsonify({'result': member_desc})

if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)