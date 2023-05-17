/* 송이삭, 한지훈 코드(송어진 주석) : 선택버튼 데이터 서버-클라이언트 관련 START */


/*송이삭 코드작성(송어진 주석) : 제출버튼 클릭시 프론트 -> 서버 데이터 전송*/
window.onload = function () {
    statistics();
};

function statistics() {
    fetch('/statistics').then(res => res.json()).then(data => {
        let rows = data['result']
        rows.forEach((a) => {
            let mbti_e = a['e']
            let mbti_i = a['i']
            let mbti_n = a['n']
            let mbti_s = a['s']
            let mbti_t = a['t']
            let mbti_f = a['f']
            let mbti_j = a['j']
            let mbti_p = a['p']
        })
    })
}

/*한지훈 코드작성(송어진 주석) : mbti 선택버튼 중복제거 및 4가지 선택지 모두 선택하도록 강요*/
$(document).ready(function () {
    showMbti();
});

let mbti_post = [-1, -1, -1, -1]; // [ (e,i), (n,s), (t,f), (j,p) ]
function check(mbti) {
    if (mbti == "e" || mbti == "i") {
        mbti_post[0] = mbti;
    } else if (mbti == "n" || mbti == "s") {
        mbti_post[1] = mbti;
    } else if (mbti == "t" || mbti == "f") {
        mbti_post[2] = mbti;
    } else {
        mbti_post[3] = mbti;
    }
    console.log(mbti_post);
}

function postMbti() {

    /*한지훈 코드작성(송어진 주석) : M, B, T, I 4가지 선택지 중 하나라도 선택하지 않은 것이 있을 경우 알림창 띄우기*/
    for (let i = 0; i < 4; i++) {
        if (mbti_post[i] == -1) {
            alert("Please check all elements in each of the 4");
            return;
        }
    }

    /*한지훈 코드작성(송어진 주석) : 위에서 M, B, T, I 선택지 담은 배열(mbti_post) 서버->클라이언트 전송 및 전송시 메시지출력&리로딩 기능*/
    let formData = new FormData();
    formData.append("mbti_give", mbti_post);

    fetch("/mbti", { method: "POST", body: formData })
        .then((res) => res.json())
        .then((data) => {
            alert(data["msg"]);
            window.location.reload();
        });
}

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

//------------------------------------------------------------------------

/* 김희열 코드(송어진 주석) : MBTI 버튼 시각적 활성화를 위한 기능 START */

//(송어진 주석) 위에 있는 한지훈 변수랑 충돌해서 분리함(mbtiBtns 1,2)
const mbtiBtns2 = document.querySelectorAll('.mbti-btn');

mbtiBtns2.forEach(btn => {
    btn.addEventListener('click', () => {
        // 대립되는 버튼들의 선택 상태를 초기화합니다.
        conflictingPairs.forEach(pair => {
            if (pair.includes(btn)) {
                pair.forEach(conflictingBtn => {
                    conflictingBtn.classList.remove('selected');
                });
            }
        });

        //(송어진 주석) 모든 버튼의 선택 상태를 초기화 //이거 왜 있는지 이해안됨 아래 코드(if문)랑 중복?
        mbtiBtns2.forEach(btn => {
            btn.classList.remove('selected');
        });

        // 현재 버튼이 선택된 상태인지 확인 //? 아래가 이상하므로 이거 필요업?
        const isSelected = btn.classList.contains('selected');

        //(송어진 주석) 선택된 버튼이 아니라면 선택상태로 변경 //이건 무슨 말인지 확인 필요? 거꾸로 아님? 위에랑 중복?
        if (!isSelected) {
            btn.classList.add('selected');
        }
    });
});


/*송이삭 코드작성(송어진 주석) : 최종적으로 팀 mbti 통계데이터 프론트->서버 및 전송시 메시지출력 START*/
function showMbti() {
    fetch("/mbti")
        .then((res) => res.json())
        .then((data) => {
            let teamMbti = data["result"];
            $(".team-mbti").append(`현재 저희팀의 MBTI는 ${teamMbti}입니다`);
        });
}
/*송이삭 코드작성(송어진 주석) : 최종적으로 팀 mbti 통계데이터 프론트->서버 및 전송시 메시지출력 END*/

/*김희열 코드(송어진 주석) : 시각적 활성화를 위한 기능 END*/

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