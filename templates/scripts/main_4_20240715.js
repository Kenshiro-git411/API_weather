// 都道府県の値と、それに対応する地域一覧を格納しておく。
const todofuken_area = {
    "hokkaido": [
        {"area": "札幌市", "roma": "sapporo"}
    ],
    "tokyo": [
        {"area": "渋谷区", "roma": "shibuya"},
        {"area": "千代田区", "roma": "chiyoda"},
        {"area": "品川区", "roma": "shinagawa"}
    ],
    "shizuoka": [
        {"area": "静岡市", "roma": "shizuoka"},
        {"area": "浜松市", "roma": "hamamatsu"}
    ],
    "kyoto": [
        {"area": "京都市", "roma": "kyoto"},
        {"area": "宇治市", "roma": "uji"}
    ]
};

// 天気情報を漢字で返す
function convert_Weather_Info(weatherInfo){
    // console.log(`convert_Weather_Infoに送られてきた引数:${weatherInfo}`);
    if (weatherInfo === 'Clouds') {
        const clouds = '曇り';
        return clouds
    } else if(weatherInfo === 'Rain'){
        console.log(weatherInfo);
        const rain = '雨';
        return rain
    } else if(weatherInfo === 'Clear'){
        console.log(weatherInfo);
        const sunny = '晴れ';
        return sunny
    } else if(weatherInfo === 'Thunderstorm'){
        console.log(weatherInfo);
        const thunder = '雷';
        return thunder
    }

}

// 天気の画像を返す
function img_Weather(img_weather){
    if (img_weather === 'Clouds') {
        const clouds = 'images/mark_tenki_kumori.png';
        return clouds
    } else if(img_weather === 'Rain'){
        console.log(img_weather);
        const rain = 'images/mark_tenki_umbrella.png';
        return rain
    } else if(img_weather === 'Clear'){
        console.log(img_weather);
        const sunny = 'images/mark_tenki_hare.png';
        return sunny
    } else if(img_weather === 'Thunderstorm')
        console.log(img_weather);
        const thunder = 'images/mark_tenki_kaminari.png';
        return thunder
}


function setMenuOptions(selectedTodofuken) {
    const selectAreaName = document.getElementById('area-name'); //2つ目のセレクトボックスを取得し、
    selectAreaName.disabled = false; //選択可能な状態にする。
    selectAreaName.innerHTML =''; //セレクトボックスの内容をクリアする

    //選択された都道府県の一覧に対して処理する
    todofuken_area[selectedTodofuken].forEach((area, index) => {
        const option = document.createElement('option'); //option要素を新しくする
        option.value = area.roma; //option要素の値に、メニューの表示としてメニュー名を指定する
        option.innerHTML = area.area; //ユーザー向けの表示としてエリア名を指定する。
        selectAreaName.appendChild(option); //セレクトボックスにoption要素を追加する
    });

    showTenkiDetail(todofuken_area[selectedTodofuken][0].roma);
}

// 【関数】天気情報を表示する
function showTenkiDetail(areaNameRoma) {
    // APIのエンドポイント
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${areaNameRoma}&appid=(YourAPIkey)`;

    let weatherDetail_result = '';

    fetch(apiUrl)
        .then(response => {
            if(!response.ok){
                throw new Error(`HTTPエラー!ステータスコード：${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const weatherDetail = data.weather[0].main; //詳細な天気情報を取得
            console.log(weatherDetail);
            let weatherDetail_result = weatherDetail;
            weatherDetail_result = convert_Weather_Info(weatherDetail_result);

            // 表示用の要素を取得
            const detailEl = document.getElementById('tenki_detail');
            console.log('weatherDetail_result', weatherDetail_result);
            detailEl.innerText = weatherDetail_result;

            //天気の画像要素の作成
            img_element.src = img_Weather(weatherDetail);
            content_area.appendChild(img_element);

        })
        .catch(error => {
            // エラーハンドリング
            console.error('データの取得中にエラーが発生しました:', error);
            tenki_detail.innerHTML = 'データの取得中にエラーが発生しました。';
        });
}


//エリアを選ぶためのセレクトボックスを指定
const todofukenSelect = document.getElementById('todofuken');

//なんらかの都道府県が選択されたら(change)、処理を行う
todofukenSelect.addEventListener('change',(e) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'notselected'){
        console.log('「4つの選択肢を表示」が選択されました。');
        const selectAreaName = document.getElementById('area-name'); //2つ目のセレクトボックスを取得し、
        selectAreaName.disabled = true; //選択可能な状態にする。
        selectAreaName.innerHTML =''; //セレクトボックスの内容をクリアする

        // 表示用の要素を取得
        const detailEl = document.getElementById('tenki_detail');
        detailEl.innerText = "";
    } else {
        setMenuOptions(e.target.value); //選択された都道府県を引数として関数に渡す
    }
});

const selectAreaNameEl = document.getElementById('area-name');
const imageWeatherTug = document.getElementById('tenkiImageArea');
let img_element = document.createElement('img');
let content_area = document.getElementById('tenkiImageArea');

// selectAreaNameEl（市区） が変更されたら実行される処理
selectAreaNameEl.addEventListener('change', (e) => {
    // どのエリアを選択したか
    const selectedAreaName = e.target.value;

    let removeObj = document.getElementById('tenkiImageArea');
    removeObj.removeChild(removeObj.childNodes.item(0));

    showTenkiDetail(selectedAreaName);
});


