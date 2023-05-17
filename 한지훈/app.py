from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
from bson.objectid import ObjectId
client = MongoClient('mongodb+srv://sparta:test@cluster0.oid4wb8.mongodb.net/?retryWrites=true&w=majority')
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

if __name__ == '__main__':
    app.run('0.0.0.0',port=5000,debug=True)
