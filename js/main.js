var map_101;
var thisAddress;
var thisLatitude,thisLongitude;

var data = [
  {"loc":[35.167188, 136.947688], "title":"池下"},
  {"loc":[35.181524, 136.948154], "title":"名古屋市立大学 北千種キャンパス"}
];


function init() {
    map_101 = L.map('map_101',{
    center:[35.15,136.9],
    zoom: 12,
    zoomControl:false,
	});

    mapLink = '<a href="https://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; ' + mapLink,
        maxZoom: 20,
    }).addTo(map_101);

    var noiseName = ["car_noise","human_noise","crowds_noise","animal_noise","construction_noise","rain_noise"];
    for(var i = 0; i < noiseName.length; i++){
    	takeOutData(noiseName[i]);
    }
    // takeOutData(noiseName);

    var searchboxControl = createSearchboxControl();
    var control = new searchboxControl({
        // sidebarTitleText: 'Header Title Hoge',
        // sidebarMenuItems: {
        //     Items: [
        //         { type: "link", name: "google", href: "http://google.com", icon: "icon-cloudy" },
        //         { type: "link", name: "leafletjs", href: "http://leafletjs.com", icon: "icon-local-carwash" },
        //         { type: "button", name: "call alert button", onclick: "alert('alert button')", icon: "icon-potrait" },
        //         { type: "button", name: "call function button", onclick: "func_btn_click();", icon: "icon-local-dining" }
        //     ]
        // }
    });
    // 検索ボタンが押された時のコールバック
    control._searchfunctionCallBack = function (srhkeywords)
    {
        if (!srhkeywords) {
            alert("検索ワードを入力してください");
            return;
        } 
       // 表示データのタイトルに検索ワードが含まれているかチェック（前方一致）
        for(i in data) {
            if(data[i].title.indexOf(srhkeywords) === 0){
                // 地図の座標を移動
                map_101.setView(data[i].loc, 15);
                return;
            }
        }
        alert("検索ワードに該当するデータはありません。");
    }
    map_101.addControl(control);


}
function takeOutData(noiseName){
  	var database = firebase.database();
  	var dataRef = database.ref("/noise/"+ noiseName);
  	dataRef.once("value", function(snapshot) {
	    // console.log(snapshot.val());
	    var markCol;
	    if(noiseName == 'car_noise'){
	    	markCol = 'blue';
	    }else if(noiseName == 'human_noise'){
	    	markCol = 'red';
	    }else if(noiseName == 'crowds_noise'){
	    	markCol = 'orange';
	    }else if(noiseName == 'animal_noise'){
	    	markCol = 'green';
	    }else if(noiseName == 'construction_noise'){
	    	markCol = 'purple';
	    }else if(noiseName == 'rain_noise'){
	    	markCol = 'violet';
	    }
	    snapshot.forEach(function(children) {
	        //children.val().userIdとかで必要な値を取ればOK
	        L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.3.1/dist/images/';
	        var marker = L.marker([children.val().thisLatitude, children.val().thisLongitude], {icon: L.spriteIcon(markCol)}).addTo(map_101);
	        marker.bindPopup(noiseName);
	    });
	});
}

function setMarkerHere(noiseTag){



	navigator.geolocation.getCurrentPosition(getThisAddress);

	// マーカーを作成する
	var marker = L.marker([thisLatitude, thisLongitude]).addTo(map_101);
	 
	// クリックした際にポップアップメッセージを表示する
	marker.bindPopup(noiseTag);

	//-----------------------upload_firebase------------------------
	var db = firebase.database();
	var noiseLabel = db.ref("/noise/" + noiseTag);

	// var text = Math.random();

	noiseLabel.once("value", function(snapshot) {
		noiseLabel.push({thisLatitude:thisLatitude,thisLongitude:thisLongitude});

		snapshot.forEach(function(children) {
	        //children.val().userIdとかで必要な値を取ればOK
	        if(children.val().thisLatitude == thisLatitude && children.val().thisLongitude == thisLongitude){
	        	marker.setMap(null);
	        }
	    });
	    // noiseLabel.set({});
	});
}

function getThisAddress(position){
	thisLatitude = position.coords.latitude;
	thisLongitude = position.coords.longitude;
}