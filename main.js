//名前空間の設定
const config = {
  initialForm : document.getElementById("initialForm"),
  mainPage: document.getElementById("mainPage")
}
// eleを受け取って非表示にする
function displayNone(ele){
  ele.classList.remove("d-block");
  ele.classList.add("d-none");
}
// eleを受け取って表示する
function displayBlock(ele){
  ele.classList.remove("d-none");
  ele.classList.add("d-block");
}
//アイテムのデータ
const items = [
  {
    "itemImgUrl":"https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png",
    "itemName":"Flip machine",
    "price":15000,
    "reward":25,
    "maxPurchases" : 500,
    "isStandardClick" : true,
  },
  {
    "itemImgUrl":"https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png",
    "itemName":"ETF Stock",
    "price":300000,
    "reward":0.1,
    "maxPurchases" : "∞",
    "isStandardClick" : false,
  },
  {
    "itemImgUrl":"https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png",
    "itemName":"ETF Bonds",
    "price":300000,
    "reward":0.07,
    "maxPurchases" : "∞",
    "isStandardClick" : false,
  },
  {
    "itemImgUrl":"https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png",
    "itemName":"Lemonade Stand",
    "price":30000,
    "reward":30,
    "maxPurchases" : 1000,
    "isStandardClick" : false,
  },
  {
    "itemImgUrl":"https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png",
    "itemName":"Ice Cream Truck",
    "price":100000,
    "reward":120,
    "maxPurchases" : 500,
    "isStandardClick" : false,
  },
  {
    "itemImgUrl":"https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png",
    "itemName":"House",
    "price":20000000,
    "reward":32000,
    "maxPurchases" : 100,
    "isStandardClick" : false,
  },
  {
    "itemImgUrl":"https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png",
    "itemName":"TownHouse",
    "price":40000000,
    "reward":64000,
    "maxPurchases" : 100,
    "isStandardClick" : false,
  },
  {
    "itemImgUrl":"https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png",
    "itemName":"Mansion",
    "price":250000000,
    "reward":500000,
    "maxPurchases" : 20,
    "isStandardClick" : false,
  },
  {
    "itemImgUrl":"https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png",
    "itemName":"Industrial Space",
    "price":1000000000,
    "reward":2200000,
    "maxPurchases" : 10,
    "isStandardClick" : false,
  },
  {
    "itemImgUrl":"https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png",
    "itemName":"Hotel Skyscraper",
    "price":10000000000,
    "reward":25000000,
    "maxPurchases" : 5,
    "isStandardClick" : false,
  },
  {
    "itemImgUrl":"https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png",
    "itemName":"Bullet-Speed Sky Railway",
    "price":10000000000000,
    "reward":30000000000,
    "maxPurchases" : 1,
    "isStandardClick" : false,
  },
];
//ユーザーのデータを管理するオブジェクト
class User{
  constructor(name,age,daysGone,possession,hamburgerAmount,rewardPerClick,rewardPerSecond,rewardByStocks,rewardByBonds,totalStocks,totalBonds){
    this.name = name;
    this.age = age;
    this.daysGone = daysGone;
    this.possession = possession;
    this.hamburgerAmount = hamburgerAmount;
    this.rewardPerClick = rewardPerClick;
    this.rewardPerSecond = rewardPerSecond;
    this.rewardByStocks = rewardByStocks;
    this.rewardByBonds = rewardByBonds;
    this.totalStocks = totalStocks;
    this.totalBonds = totalBonds;
  }
  //リセットする
  resetData(){
    this.age = 20;
    this.daysGone = 0;
    this.possession = 30300000;
    this.hamburgerAmount = 0;
    this.rewardPerClick = 25;
    this.rewardPerSecond = 0;
    this.rewardByStocks = 0;
    this.rewardByBonds = 0;
    this.totalStocks = 0;
    this.totalBonds = 0;
  }
  //Flip Machineを買うと1clickあたりの報酬が25増える。
  addRewardPerClick(addition){
    return this.rewardPerClick += addition;
  }
  //ハンバーガーをクリックすると所持金が増える
  addRewardPerClickToPossession(){
    return this.possession += this.rewardPerClick;
  }
  //アイテムを購入すると毎秒定額増加する
  addRewardPerSecond(addition){
    return this.rewardPerSecond += addition;
  }
  //毎秒、所持金を増加させる
  addRewardPerSecondToPossession(){
    return this.possession += this.rewardPerSecond;
  }
  //Stocksを保有すると配当がもらえる。
  addRewardPerSecondByStocks(addition){
    return this.rewardByStocks += addition;
  }
  //bondsを保有すると配当がもらえる
  addRewardPerSecondByBonds(addition){
    return this.rewardByBonds += addition;
  }
  //Stocksから受け取った配当によって所持金が増える
  addRewardPerSecondByStocksToPossession(){
    return this.possession += this.rewardByStocks;
  }
  //Bondsから受け取った配当によって所持金が増える
  addRewardPerSecondByBondsToPossession(){
    return this.possession += this.rewardByBonds;
  }
  //購入すると所得から購入額が減る。所持金を超える購入はできない。
  purchase(price){
    if(this.possession - price < 0){
      alert("You don't have enough money.");
      return;
    }
    return this.possession -= price;
  }

}
//購入アイテムのオブジェクト
class ItemObj{
  constructor(itemImgUrl,itemName,price,reward,maxPurchases,isStandardClick){
    this.itemImgUrl = itemImgUrl;
    this.itemName = itemName;
    this.price = price;
    this.amount = 0;
    this.reward = reward;
    this.maxPurchases = maxPurchases;
    this.isStandardClick = isStandardClick;
  }

  //itemのカードを作成
  createItemCard(){
    let itemCard = document.createElement("div");
    itemCard.classList.add("item","d-sm-flex","bg-blue","p-1","align-items-center","hover","m-1");
    let displayReward = "";
    if(this.isStandardClick){
      displayReward = `<p class="text-yellow mb-0">¥${this.reward} /click</p>`;
    }else{
      displayReward = `<p class="text-yellow mb-0">¥${this.reward} /sec</p>`;
    }

    itemCard.innerHTML =
    `
      <div class="col-sm-3 p-sm-1 d-none d-sm-block">
        <img src="${this.itemImgUrl}" width="100%">
      </div>
      <div class="col-12 col-sm-9">
        <div class="d-flex justify-content-between">
          <h4>${this.itemName}</h4>
          <h4 class="purchaseAmount">${this.amount}</h4>
        </div>
        <div class="d-sm-flex justify-content-between">
          <p class="price-display">¥${this.price}</p>
          ${displayReward}
        </div>
      </div>
    `;
    return itemCard;
  }
}
//購入アイテムのオブジェクトを生成
let itemObjects = [];
items.forEach((item) => {
  itemObjects.push(new ItemObj(item["itemImgUrl"],item["itemName"],item["price"],item["reward"],item["maxPurchases"],item["isStandardClick"]));
});
//initialPageのボタンの挙動
let nameInput = document.getElementById("name-input");
let newBtn = document.getElementById("newBtn");
let loginBtn = document.getElementById("loginBtn");
newBtn.addEventListener("click",function(){
  if(nameInput.value === ""){
    alert("Please put your name.");
  }else{
    //インプットした文字列をデータに登録
    initializeUserAccount(new User(nameInput.value,20,0,30300000,0,25,0,0,0,0,0),itemObjects);
  }
});
loginBtn.addEventListener("click",function(){
  if(nameInput.value === ""){
    alert("There is no data.");
  }
  // localStorageに記録されていない名前ならばアラート
  // そうでないなら保存してあるデータを使ってメインページを開く
  let saveData = JSON.parse(localStorage.getItem("saveData"));
  if(localStorage.getItem("saveData") === "" || saveData.name !== nameInput.value){
    alert("There is no data");
  }else{
    config.initialForm.classList.remove("d-block");
    displayBlock(config.mainPage);
    initializeUserAccount(
      new User(
        saveData.name,
        saveData.age,
        saveData.daysGone,
        saveData.possession,
        saveData.hamburgerAmount,
        saveData.rewardPerClick,
        saveData.rewardPerSecond,
        saveData.rewardByStocks,
        saveData.rewardByBonds,
        saveData.totalStocks,
        saveData.totalBonds
      ),
      itemObjects);
  }
});
//登録したユーザーネームを元にメインページへ遷移
function initializeUserAccount(userAccount,itemObjs){
  //mainPageを表示する。
  config.initialForm.classList.add("d-none");
  config.mainPage.append(createMainPage(userAccount,itemObjs));
}
//メインページからログインページに戻る
function backToLogin(){
  displayNone(config.mainPage);
  displayBlock(config.initialForm);
  config.mainPage.innerHTML = "";
}
//メインページを作る
function createMainPage(userAccount,itemObjs){
  let container = document.createElement("div");
  let itemList = document.createElement("div");
  itemList.classList.add("items-list", "p-1", "bg-main","overflow-auto","item-list-height");
  itemList.id = "itemList";
  //アイテム一覧を作る
  itemObjs.forEach((item)=> {
    let itemContent = item.createItemCard();
    itemList.append(itemContent);
  });
  //各アイテムをクリックすると詳細ページに遷移する。各アイテムにitemObjectのindexを、アイテムのidとして割り付けることで同期する。
  let itemWrappers = itemList.querySelectorAll(".item");
  itemWrappers.forEach((itemWrapper,index) => {
    itemWrapper.id = index;
    itemWrapper.addEventListener("click",function(){
      itemList.innerHTML = "";
      itemList.append(createItemDetailPage(itemObjects[itemWrapper.id],userAccount));
    });
  });

  container.innerHTML = `
  <div class="vh-100 d-flex justify-content-center align-items-center text-white p-sm-5">
    <div class="col-12 col-md-11 col-lg-10 d-flex bg-blue p-2" style="height: 100%">
      <div class="left-section bg-main p-2 col-4">
        <div class="hamburger">
          <div class="hamburger-info bg-blue text-center">
            <h5 id="hamburgerAmount">${userAccount.hamburgerAmount} Burgers</h5>
            <p id="rewardPerClick">one click ¥${userAccount.rewardPerClick}</p>
          </div>
          <div class="d-flex justify-content-center pt-5 p-2">
            <img id="hamburger" class="hover py-2" src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" alt="ハンバーガー" width="80%">
          </div>
        </div>
      </div>
      <div id="right-section" class="bg-blue col-8 py-2 px-3">
        <div class="data-display d-sm-flex flex-wrap text-center bg-main mx-2 mb-3">
          <div class="col-12 col-sm-6 p-1">
            <div id="username" class="bg-blue pb1em">${userAccount.name}</div>
          </div>
          <div class="col-12 col-sm-6 p-1">
            <div id="age" class="bg-blue pb1em">${userAccount.age} years old</div>
          </div>
          <div class="col-12 col-sm-6 p-1">
            <div id="daysGone" class="bg-blue pb1em">${userAccount.daysGone} days</div>
          </div>
          <div class="col-12 col-sm-6 p-1">
            <div id="possession" class="bg-blue pb1em">¥${userAccount.possession}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  let rightSection = container.querySelectorAll("#right-section").item(0);
  rightSection.append(itemList);
  let saveAndReset = document.createElement("div");
  saveAndReset.classList.add("d-flex", "justify-content-end","mt-2");
  saveAndReset.innerHTML =
  `
    <div id="undo" class="p-2 mr-2 border hover">
      <i class="fas fa-undo fa-2x"></i>
    </div>
    <div id="save" class="p-2 border hover">
      <i class="far fa-save fa-2x"></i>
    </div>
  `;
  rightSection.append(saveAndReset);
  let daysGoneEle = container.querySelectorAll("#daysGone").item(0);
  let ageEle = container.querySelectorAll("#age").item(0);
  let possessionEle = container.querySelectorAll("#possession").item(0);
  let hamburgerAmountEle = container.querySelectorAll("#hamburgerAmount").item(0);
  let rewardPerClickEle = container.querySelectorAll("#rewardPerClick").item(0);
  let undo = container.querySelectorAll("#undo").item(0);
  let save = container.querySelectorAll("#save").item(0);

  //1秒ごとの状態を更新
  setInterval(function(){
    //1日経過
    userAccount.daysGone++;
    daysGoneEle.innerHTML = `${userAccount.daysGone} days`;
    //365日経過するとageが一つ増える。
    if(userAccount.daysGone % 365 === 0 && userAccount.daysGone > 0){
      userAccount.age++;
      ageEle.innerHTML = `${userAccount.age} years old`;
    }
    //Stocksの毎秒の配当を所持金に加える
    if(userAccount.totalStocks !== 0){
      userAccount.addRewardPerSecondByStocks(Math.floor(userAccount.totalStocks * 0.001));
      userAccount.addRewardPerSecondByStocksToPossession();
      userAccount.totalStocks += Math.floor(userAccount.totalStocks * 0.001);
    }
    //Bondsの毎秒の配当を所持金に加える
    if(userAccount.totalBonds !== 0){
      userAccount.addRewardPerSecondByBonds(Math.floor(userAccount.totalBonds * 0.0007));
      userAccount.addRewardPerSecondByBondsToPossession();
      userAccount.totalBonds += Math.floor(userAccount.totalBonds * 0.0007);
    }
    //その他のアイテムを購入した時の毎秒の報酬を加える
    if(userAccount.rewardPerSecond !== 0){
      userAccount.addRewardPerSecondToPossession();
    }
    // HTMLに反映する
    possessionEle.innerHTML = `¥${userAccount.possession}`;
  },1000);

  //ハンバーガーをクリックすると
  let hamburgerImg = container.querySelectorAll("#hamburger").item(0);
  hamburgerImg.addEventListener("click",function(){
    // ①possessionが増える。
    userAccount.addRewardPerClickToPossession();
    possessionEle.innerHTML = `¥${userAccount.possession}`;
    // ②ハンバーガーのカウントが増える
    userAccount.hamburgerAmount++;
    hamburgerAmountEle.innerHTML = `${userAccount.hamburgerAmount} Burgers`;
  });

  //リセットと保存
  //データをリセット
  undo.addEventListener("click",function(){
    alert("Reset all data?");
    if(localStorage.getItem("saveData") !== ""){
      localStorage.removeItem("saveData");
    }
    //ユーザーのデータをリセット
    userAccount.resetData();
    // 購入数のデータをリセット
    itemObjs.forEach(itemObj => {
      if(itemObj.amount !== 0){
        itemObj.amount = 0;
      }
    });
    itemList.innerHTML = "";
    createItemList(itemList,userAccount);
    //リセットをHTMLに反映
    daysGoneEle.innerHTML = `${userAccount.daysGone} days`;
    ageEle.innerHTML = `${userAccount.age} years old`;
    possessionEle.innerHTML = `¥${userAccount.possession}`;
    hamburgerAmountEle.innerHTML = `${userAccount.hamburgerAmount} Burgers`;
    rewardPerClickEle.innerHTML = `one click ¥${userAccount.rewardPerClick}`;
  });
  //データを保存
  save.addEventListener("click",function(){
    let currentUserData = JSON.stringify(userAccount);
    alert("Saved your data. Please put the same name when you login.");
    localStorage.setItem("saveData",currentUserData);
    backToLogin();
    nameInput.value = "";
  });
  return container;
}
//アイテム一覧を描画する
function createItemList(ele,userAccount){
  //アイテム一覧を作る
  itemObjects.forEach((item)=> {
    let itemContent = item.createItemCard();
    ele.append(itemContent);
  });
  //各アイテムをクリックすると詳細ページに遷移する。各アイテムにitemObjectのindexを、アイテムのidとして割り付けることで同期する。
  let itemWrappers = ele.querySelectorAll(".item");
  itemWrappers.forEach((itemWrapper,index) => {
    itemWrapper.id = index;
    itemWrapper.addEventListener("click",function(){
      ele.innerHTML = "";
      ele.append(createItemDetailPage(itemObjects[itemWrapper.id],userAccount));
    });
  });
  return ele;
}
//アイテム詳細ページを作る
function createItemDetailPage(itemObj,userAccount){
  let total = 0;
  let itemDetail = document.createElement("div");
  itemDetail.classList.add("item-detail", "m-1","bg-blue","p-2");
  let displayReward = "";
  if(itemObj.isStandardClick){
    displayReward = `<p>Get ¥${itemObj.reward} /click</p>`;
  }else{
    displayReward = `<p>Get ¥${itemObj.reward} /sec</p>`;
  }
  itemDetail.innerHTML =
  `
  <div class="info d-flex justify-content-between align-items-center">
    <div class="col-7 p-0">
      <h4>${itemObj.itemName}</h4>
      <p>Max purchases: ${itemObj.maxPurchases}</p>
      <p class="price-display-detail">Price: ¥${itemObj.price}</p>
      ${displayReward}
    </div>
    <div class="col-5 p-2">
      <img src="${itemObj.itemImgUrl}" alt="">
    </div>
  </div>
  <form>
    <p>How many would you like to buy?</p>
    <div class="form-group mb-0">
      <input id="purchaseInput" type="number" class="form-control" placeholder="0">
    </div>
    <p id="pTotal" class="text-right">total: ¥${total}</p>
  </form>
  <div class="item-detail-btn-wrapper d-flex justify-content-between p-3">
    <button class="btn btn-outline-primary col-5 pl-0 back-btn">Go Back</button>
    <button class="btn btn-primary col-5 pr-0 purchase-btn">Purchase</button>
  </div>
  `;
  let purchaseInput = itemDetail.querySelectorAll("#purchaseInput").item(0);
  let backBtn = itemDetail.querySelectorAll(".back-btn").item(0);
  let purchaseBtn = itemDetail.querySelectorAll(".purchase-btn").item(0);
  let pTotal = itemDetail.querySelectorAll("#pTotal").item(0);
  backBtn.addEventListener("click",function(){
    let itemList = document.getElementById("itemList");
    itemList.innerHTML = "";
    createItemList(itemList,userAccount);
  });

  //フォームに購入個数を入力
  //合計金額の計算
  purchaseInput.addEventListener("change",function(){
    if(parseInt(purchaseInput.value) >= 0){
      total = parseInt(purchaseInput.value) * itemObj.price;
      pTotal.innerHTML = `total: ¥${total}`;
    }
  });

  purchaseBtn.addEventListener("click",function(){
    //購入に伴う計算処理
    //所持金から購入金額を引いて表示に反映(負ならばアラートを表示)
    let possessionEle = config.mainPage.querySelectorAll("#possession").item(0);
    let rewardPerClickEle = config.mainPage.querySelectorAll("#rewardPerClick").item(0);
    userAccount.purchase(total);
    possessionEle.innerHTML = `¥${userAccount.possession}`;
    let itemList = document.getElementById("itemList");
    let priceDisplayDetail = itemList.getElementsByClassName("price-display-detail").item(0);
    //購入した個数を更新する
    itemObj.amount += parseInt(purchaseInput.value);
    //購入したアイテムによってその後の挙動を変化させる
    switch(itemObjects.indexOf(itemObj)){
      case 0:
        //ハンバーガーをクリックした回数*25だけ、ワンクリックあたりの報酬が増える。
        userAccount.addRewardPerClick(25 * parseInt(purchaseInput.value));
        rewardPerClickEle.innerHTML = `one click ¥${userAccount.rewardPerClick}`;
        break;
      case 1:
        //保持しているStocksの総額を更新
        itemObj.price *= 1.1;
        priceDisplayDetail.innerHTML = `Price: ¥${itemObj.price}`;
        userAccount.totalStocks += total;
        break;
      case 2:
        //保持しているBondsの総額を更新
        userAccount.totalBonds += total;
        break;
      default:
        //毎秒の報酬を更新
        userAccount.addRewardPerSecond(itemObj.reward);
    }
    itemList.innerHTML = ``;
    createItemList(itemList,userAccount);
  });
  return itemDetail;
}
