##한지훈, 송이삭, 김희열

# 송이삭
from flask import Flask, render_template, request, jsonify, url_for #(송어진) url_for는 JS,CSS 외부파일로 분리를 위해
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://sparta:test@cluster0.gcgk5vj.mongodb.net/?retryWrites=true&w=majority')

from bson.objectid import ObjectId

##한지훈
client = MongoClient('mongodb+srv://sparta:test@cluster0.oid4wb8.mongodb.net/?retryWrites=true&w=majority') ##누구꺼?
database = client['dbsparta']
collection = database['mbti_data']
db = client.dbsparta

@app.route('/')
def home():
    return render_template('index.html')


# 데이터베이스 값 초기화
mbti_values = {
       'e' : 0,
       'i' : 0,
       'n' : 0,
       's' : 0,
       't' : 0,
       'f' : 0,
       'j' : 0,
       'p' : 0
}

@app.route('/submit', methods=['POST']) # 제출 버튼을 눌렀을 때 mbti값을 저장하기 위한 post
def submit():
    # 클라이언트로부터 전송된 데이터를 받습니다.
    mbti_data = request.get_json()

    # mbti_data를 사용하여 mbti_values를 업데이트합니다.
    for mbti_type, value in mbti_data.items():
        mbti_values[mbti_type] += value

    # 업데이트된 mbti_values를 데이터베이스에 저장하는 코드를 추가해야 합니다.
    document_id = ObjectId('646361d2994e4ffc16c1cf03')
    collection.update_one({'_id':document_id}, {'$set': mbti_values})
    return jsonify({'msg': '저장완료'})

@app.route("/statistics", methods=["GET"]) # 메인화면에서 mbti 통계를 불러오기 위한 get
def movies1():
    document_id = ObjectId('646361d2994e4ffc16c1cf03')
    # mbti_values 불러오기
    mbti_statistics = list(collection.find({'_id':document_id},{'_id':False}))
    return jsonify({'result': mbti_statistics}) # 저장한 값 반환

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

def calMbti():
    mbtiCnt = list(db.mbtiCnt.find({}, {"_id": False}))
    mbtiCnt = mbtiCnt[0]
    ret = ""

    ret = ret + "E" if mbtiCnt["e"] >= mbtiCnt["i"] else ret + "I"
    ret = ret + "N" if mbtiCnt["n"] >= mbtiCnt["s"] else ret + "S"
    ret = ret + "T" if mbtiCnt["t"] >= mbtiCnt["f"] else ret + "F"
    ret = ret + "J" if mbtiCnt["j"] >= mbtiCnt["p"] else ret + "P"

    print(ret)

    return jsonify({"result": ret})

if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)
