var basket = getCart() || {};
showItemToList();

function addToCart(itemId){
  var itemBox = $("#"+itemId).parent().parent(),
      itemName = itemBox.find(".name").html(),
      itemPrice = itemBox.find('.price span').html();
  if (basket[itemId] != undefined) { 
    alert("Уже есть в корзине!");
  } else {
    basket[itemId] = [itemName, itemPrice];
    setCart(basket);
    showItemToList();
  }
}

function getCart(){
  return JSON.parse(localStorage.getItem('cart'));
}

function setCart(o){
  localStorage.setItem('cart', JSON.stringify(o));
  return false;
}

function showItemToList() {
  var out = ''; 
  var itog = 0; 
  for (var i in basket) {
    out += '<tr><td onclick="removeItem('+ i +'); return false;" class="cross"><img src="img/cross.png"></td><td class="bskt-name">' + basket[i][0] + '</td><td class="bskt-price">' + basket[i][1] + ' руб.</td></tr>';
    $(".in_basket").html(out); 
    itog += +basket[i][1]; 
  }
  $(".sum").html(itog);
}

function removeItem(key) { 
  delete basket[key]; 
  setCart(basket);
  if (localStorage.cart != "{}") 
    showItemToList(); 
  else
    clearCart();
}

function clearCart() {
  localStorage.clear();
  $(".in_basket").html(''); 
  $(".sum").html(0.0);
}

$(".order").click( function() {
  var list = '';
  var itog = 0; 
  for (var i in basket) {
    list += " - " + basket[i][0] + "\n";
    itog += +basket[i][1]; 
  }
  alert("Вы добавили в корзину:\n" + list + "на сумму " + itog + " руб.");
});