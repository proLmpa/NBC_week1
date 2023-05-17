from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

client = MongoClient(
    "mongodb+srv://sparta:test@cluster0.nqnjdih.mongodb.net/?retryWrites=true&w=majority"
)
db = client.dbsparta
app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/mbti", methods=["POST"])
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


if __name__ == "__main__":
    app.run("0.0.0.0", port=5000, debug=True)
