$(document).ready(function () {
	//grab the products from each page 
	$.when(
    $.getJSON('http://shopicruit.myshopify.com/products.json?page=1'),
    $.getJSON('http://shopicruit.myshopify.com/products.json?page=2'),
    $.getJSON('http://shopicruit.myshopify.com/products.json?page=3'),
    $.getJSON('http://shopicruit.myshopify.com/products.json?page=4'),
    $.getJSON('http://shopicruit.myshopify.com/products.json?page=5')
    ).done(function (one, two, three, four, five){
    	var money = 1000;
      	var weight = 0;
      	var kVariants = [];
      	var cVariants = [];
      	//get all possible keyboard variants from each page
      	kVariants = getKeyboardVariants(one[0], kVariants);
      	kVariants = getKeyboardVariants(two[0], kVariants);
      	kVariants = getKeyboardVariants(three[0], kVariants);
      	kVariants = getKeyboardVariants(four[0], kVariants);
      	kVariants = getKeyboardVariants(five[0], kVariants);
      	//get all possible computer variants from each page
      	cVariants = getComputerVariants(one[0], cVariants);
      	cVariants = getComputerVariants(two[0], cVariants);
      	cVariants = getComputerVariants(three[0], cVariants);
      	cVariants = getComputerVariants(four[0], cVariants);
      	cVariants = getComputerVariants(five[0], cVariants);
      	//sort from cheapest to most expensive to be able to purchase more
		kVariants.sort(function(a,b){return a[1]-b[1]});
		cVariants.sort(function(a,b){return a[1]-b[1]});
		var count  =0; 
		//keep purchasing until run out of unique types of the kind that has less options
		for (i=0;i<Math.min(kVariants.length, cVariants.length); i++){
			weight += cVariants[i][0].grams + kVariants[i][0].grams;
			money = money - cVariants[i][1] - kVariants[i][1];
			count++;

			//stop purchasing if limit is reached and add back what tipped over limit
			if (money < 0){
				money +=cVariants[i][1] + kVariants[i][1];
				break;
			}
		}
		 html = "<p>" + "$" + Math.round(money *100)/100 +" dollars left with a total weight of " + weight/1000 + " kg where " + count + " unique keyboards and computers were bought!" + "<\p>"
		 document.write("<h1> Shopicuit </h1>" + html);
    });
 });
//method to get the price and the variants of each keyboard
function getKeyboardVariants(data, kVariants){
	for (i = 0; i < data.products.length; i++) {
	   	if (data.products[i].product_type == "Keyboard"){
	   		for (j=0; j<data.products[i].variants.length;j++){
	  			kVariants.push([data.products[i].variants[j],data.products[i].variants[j].price]);
	  		}
	   	}
	}
	return kVariants;
}
//method to get the price and the variants of each computer
function getComputerVariants(data, cVariants){
	for (i = 0; i < data.products.length; i++) {
	   	if (data.products[i].product_type == "Computer"){
	   		for (j=0; j<data.products[i].variants.length;j++){
				cVariants.push([data.products[i].variants[j],data.products[i].variants[j].price]);
	   		}
		}	
   	}
	return cVariants;
}
