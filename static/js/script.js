/* 송이삭, 한지훈 코드(송어진 주석) : 선택버튼 데이터 서버-클라이언트 관련 START */

/*한지훈 코드작성(송어진 주석) : */
const eBtn = document.getElementById('e-btn');
const iBtn = document.getElementById('i-btn');
const nBtn = document.getElementById('n-btn');
const sBtn = document.getElementById('s-btn');
const tBtn = document.getElementById('t-btn');
const fBtn = document.getElementById('f-btn');
const jBtn = document.getElementById('j-btn');
const pBtn = document.getElementById('p-btn');

//(송어진 주석) 아래에 있는 김희열 변수랑 충돌해서 분리함(mbtiBtns 1,2)
const mbtiBtns1 = [eBtn, iBtn, nBtn, sBtn, tBtn, fBtn, jBtn, pBtn];

// 대립되는 버튼 쌍을 배열로 정의합니다.
const conflictingPairs = [
    [eBtn, iBtn],
    [nBtn, sBtn],
    [tBtn, fBtn],
    [jBtn, pBtn]
];
const submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', () => {
    // 데이터베이스의 값을 업데이트합니다.
    const mbtiValues = {};
    mbtiBtns1.forEach(button => {
        const mbtiType = button.dataset.mbtiType;
        mbtiValues[mbtiType] = button.classList.contains('selected') ? 1 : 0;
    });

    // mbtiValues 객체를 서버로 전송하는 코드를 추가해야 합니다.
    fetch('/submit', { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(mbtiValues) }).then((res) => res.json()).then((data) => {
        alert(data['msg'])
        window.location.reload();
    })
        .catch(error => {
            console.log('데이터 전송 중에 오류가 발생했습니다:', error);
        });
});
/* 한지훈 코드(송어진 주석) : 선택버튼 데이터 서버-클라이언트 관련 END */


/* 한지훈 코드(송어진 주석) : 버튼 양자택일 여러개 동시 클릭 START*/

//(송어진 주석) 위에 있는 한지훈 변수랑 충돌해서 분리함(mbtiBtns 1,2)
const mbtiBtns2 = document.querySelectorAll('.mbti-btn');

mbtiBtns2.forEach(btn => {
    btn.addEventListener('click', () => {
        // 대립되는 버튼들의 선택 상태를 초기화합니다.

        // 현재 버튼이 선택된 상태인지 확인
        const isSelected = btn.classList.contains('selected');

        conflictingPairs.forEach(pair => {
            if (pair.includes(btn)) {
                pair.forEach(conflictingBtn => {
                    conflictingBtn.classList.remove('selected');
                });
            }
        });

        //(송어진 주석) 선택된 버튼이 아니라면 선택상태로 변경 //이건 무슨 말인지 확인 필요? 거꾸로 아님? 위에랑 중복?
        if (!isSelected) {
            btn.classList.add('selected');
        }
    });
});
/* 한지훈 코드(송어진 주석) : 버튼 양자택일 END*/

//------------------------------------------------------------------------

/*송이삭 코드작성 : */
$(document).ready(function () {
    showMbti();
});


function showMbti() {
    fetch("/mbti")
        .then((res) => res.json())
        .then((data) => {
            let teamMbti = data["result"];
            $(".team-mbti").append(`현재 저희팀의 MBTI는 ${teamMbti}입니다`);
        });
}
/*송이삭 코드작성(송어진 주석) : 최종적으로 팀 mbti 통계데이터 프론트->서버 및 전송시 메시지출력 END*/


function postMbti() {
    let formData = new FormData();
    formData.append("mbti_give", mbti_post);

    fetch("/mbti", { method: "POST", body: formData })
        .then((res) => res.json())
        .then((data) => {
            alert(data["msg"]);
            window.location.reload();
        });
}

//------------------------------------------------------------------------

/*김희열 코드(송어진 주석) : 팀 전체 mbti 통계 START*/
$(document).ready(function () {
    mbti_result()
});

var IE = -1
var NS = -2
var TF = -3
var PJ = -4

function mbti_result() {
    fetch('/mbti').then((res) => res.json()).then((data) => {
        let mbti = data['result']
        let str = '우리 팀의 mbti는 '

        total_counting(mbti).then((a) => {
            if (a['I'] > a['E']) str += 'I'
            else str += 'E'

            if (a['N'] > a['S']) str += 'N'
            else str += 'S'

            if (a['T'] > a['F']) str += 'T'
            else str += 'F'

            if (a['P'] > a['J']) str += 'P'
            else str += 'J'

            str += ' 입니다'

            $('.final-mbti').text(str)
        })
    })
}

async function total_counting(mbti_list) {
    try {
        let I = 0
        let E = 0
        let N = 0
        let S = 0
        let T = 0
        let F = 0
        let P = 0
        let J = 0

        mbti_list.forEach((a) => {
            console.log(a)
            let chk_IE = a['IE']
            let chk_NS = a['NS']
            let chk_TF = a['TF']
            let chk_PJ = a['PJ']

            if (chk_IE == 1) I++
            else E++

            if (chk_NS == 3) N++
            else S++

            if (chk_TF == 5) T++
            else F++

            if (chk_PJ == 7) P++
            else J++
        })

        total_mbti = {
            'I': I,
            'E': E,
            'N': N,
            'S': S,
            'T': T,
            'F': F,
            'P': P,
            'J': J
        }

        return total_mbti
    } catch (error) {
        console.error(error)
    }
}

function mbti_IE(n) {
    IE = n
}
function mbti_NS(n) {
    NS = n
}
function mbti_TF(n) {
    TF = n
}
function mbti_PJ(n) {
    PJ = n
}

function mbti_posting() {
    if (IE < 0 || NS < 0 || TF < 0 || PJ < 0)
        alert("mbti 성향을 모두 선택해주세요!")
    else {
        let formData = new FormData()
        formData.append("IE_give", IE)
        formData.append("NS_give", NS)
        formData.append("TF_give", TF)
        formData.append("PJ_give", PJ)

        fetch('/mbti', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
            console.log(data['msg'])
            window.location.reload()
        })
    }
}

/*김희열 코드(송어진 주석) : 팀 전체 mbti 통계 END*/
