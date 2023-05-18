##한지훈, 송이삭, 김희열
from flask import (
    Flask,
    render_template,
    request,
    jsonify,
    url_for,
)  # (송어진) url_for는 JS,CSS 외부파일로 분리를 위해
from pymongo import MongoClient

app = Flask(__name__)

본인 = MongoClient("본인 mongodb 주소")

희열 = MongoClient(
    "mongodb+srv://sparta:test@cluster0.gcgk5vj.mongodb.net/?retryWrites=true&w=majority"
)

본인db = 본인.dbsparta
희열db = 희열.dbsparta


members = list(희열db.member.find({}, {"_id": False}))
for member in members:
    본인db.member.insert_one(member)
