/* 웹사이트 오픈 시 바로 실행할 기능 */
$(document).ready(function () {
    member_desc()
    mbti_result()
});

/* 전체 멤버 조회 기능 */
function member_desc() {
    fetch('/member').then(res => res.json()).then((data) => {
        let desc = data['result']
        
        desc.forEach((a) => {
            let name = a['name']
            let mbti = a['mbti']
            let strength = a['strength']
            let style = a['style']
            let blog = a['blog']
            let img = a['img']

            let activeClass = a === desc[0] ? 'active' : '';

            let temp_desc = `<div class="carousel-item ${activeClass}" data-bs-interval="10000">
                                <div class="d-flex align-items-center">
                                    <img src="${img}" class="img-thumbnail">
                                    <div class="myContent" >
                                        <p class="myName"><h3><b>
                                            <span style="background: linear-gradient(to top, #f8ec38 30%, transparent 50%)">${name}</span>
                                        </b></h3></p>
                                        <p class="myMBTI"><b>MBTI: </b>${mbti}</p>
                                        <p class="myStr"><b>자신만의 강점: </b>${strength}</p>
                                        <p class="myStyle"><b>자신의 스타일: </b>${style}</p>
                                        <br>
                                        <p class="myBlog"><b>블로그(Tistory): </b><a href="${blog}"</a>${blog}</p>
                                    </div>
                                </div>
                            </div>`
            $('.carousel-inner').append(temp_desc)
        })
    })
}

/* 선택버튼 데이터 서버-클라이언트 관련 */
const eBtn = document.getElementById('e-btn');
const iBtn = document.getElementById('i-btn');
const nBtn = document.getElementById('n-btn');
const sBtn = document.getElementById('s-btn');
const tBtn = document.getElementById('t-btn');
const fBtn = document.getElementById('f-btn');
const jBtn = document.getElementById('j-btn');
const pBtn = document.getElementById('p-btn');

const mbtiBtns = document.querySelectorAll('.mbti-btn');

/* 대립되는 버튼 쌍 배열 */
const conflictingPairs = [
    [eBtn, iBtn],
    [nBtn, sBtn],
    [tBtn, fBtn],
    [jBtn, pBtn]
];

/* 버튼 양자 택일 기능 */
mbtiBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 현재 버튼이 선택된 상태인지 확인
        const isSelected = btn.classList.contains('selected');

        conflictingPairs.forEach(pair => {
            if (pair.includes(btn)) {
                pair.forEach(conflictingBtn => {
                    conflictingBtn.classList.remove('selected');
                });
            }
        });

        // 선택된 버튼이 아니라면 선택상태로 변경
        if (!isSelected) {
            btn.classList.add('selected');
        }
    });
});

/* 팀 전체 mbti 통계 기능 */
var IE = -1
var NS = -2
var TF = -3
var PJ = -4

/* 전체 mbti 계산 기능 */
function mbti_result() {
    fetch('/mbti').then((res) => res.json()).then((data) => {
        let mbti = data['result']

        let total_cnt = mbti.length
        if(total_cnt == 0){
            $('.final-mbti').text('아직 아무도 제출하지 않았습니다.')
        } else {
            let str = `참여자 ${total_cnt}명의 종합 MBTI는 `
            total_count(mbti).then((a) => {
                if (a['I'] > a['E']) str += 'I'
                else if(a['I'] == a['E']) str += '?'
                else str += 'E'
    
                if (a['N'] > a['S']) str += 'N'
                else if(a['N'] == a['S']) str += '?'
                else str += 'S'
    
                if (a['T'] > a['F']) str += 'T'
                else if(a['T'] == a['F']) str += '?'
                else str += 'F'
    
                if (a['P'] > a['J']) str += 'P'
                else if(a['P'] == a['J']) str += '?'
                else str += 'J'
    
                str += ' 입니다'
    
                $('.final-mbti').text(str)
            })
        }

    })
}

async function total_count(mbti_list) {
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

function mbti_post() {
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

function mbti_init() {
    if(confirm('MBTI DB를 초기화하시겠습니까?')) {
        
        fetch('/mbti', {method: "DELETE"}).then((res) => res.json()).then((data) => {
            alert(data['msg'])
            window.location.reload()
        })
    }
}
