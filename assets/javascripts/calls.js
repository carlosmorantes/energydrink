$(function(){
  var userKey = "4120685331";
  var available = 1000;
  var urlRequestCans = "http://energydrink.stage.mediadivision.ch/api/count.php?key="+userKey;
  var urlPutOrder = "http://energydrink.stage.mediadivision.ch/api/post.php?key="+userKey;
  var urlResetOrders = "http://energydrink.stage.mediadivision.ch/api/reset.php?key="+userKey;

  /* 
     1) Compare first how many packets are available (GET)
     2) If pakets available -> continue
        If not -> Leider sind alle Probepakete vergriffen and form is away
     3) Read inputs from form and send them (POST)
     4) If success -> Vielen Dank für Ihre Bestellung!
        if not -> And error is occurred! Try again.    

  */

  // Check cans already ordered 
  function getData(handleRequestCans){      
    $.ajax({
      dataType : "json", 	
      method: "GET",
      url: urlRequestCans,
      success: function (requestCans) {
        handleRequestCans(requestCans);      	
      }
    })    
   }

  // Put the order
  function sendData(flavor,name, lastName, eMail, street, zipCode, location, phone){
    $.ajax({
      method: "POST",
      url: urlPutOrder,
      data: { geschmacksrichtung: flavor, vorname: name, nachname: lastName, email: eMail, strasse: street, plz: zipCode, ort: location, tel: phone }
    })
    .done(function( msg ) {
      console.log( "Order put? -> " + msg );
      $('.thank-you').text('Vielen Dank für Ihre Bestellung!');

    });
   };   

   // Reset all the orders
   function resetData(){
    $.ajax({
      dataType : "json",
      method: "DELETE",
      url: urlResetOrders,
      crossDomain: true,
    })
    .done(function( msg ) {
      console.log( "Orders reset?: " + msg );
    });
   };
  
  // Compare first if there are cans available.
  // If there are put the order
  $('#btn-send').click(function(e){
  	e.preventDefault();
  	getData(function(order){  	  
  	  var remaining = available - order;
  	  console.log("Ordered cans: "+order+" - Remaining: "+remaining); 
      if (remaining > 0){
        var flavor = $('input[name=optionsRadios]').val();   
        var name = $('#name').val();
        var lastName = $('#lastname').val();
        var eMail = $('#email').val();
        var street = $('#street').val();
        var zipCode = $('#zipcode').val();
        var location = $('#location').val();
        var phone = $('#phone').val();
        console.log("FLAVOR: "+flavor+" NAME: "+name+" LASTNAME: "+lastName+" EMAIL: "+eMail+" STREET: "+street+" ZIPCODE: "+zipCode +" LOCATION: "+location+" PHONE: "+phone);               
        sendData(flavor, name, lastName, eMail, street, zipCode, location, phone);        
      }
      else {
        console.log("Leider sind alle Probepakete vergriffen!");   
      } 
  	});
  	 
  });


  // Check the can already ordered by clicking the get button
  $('#btn-get').click(function(){
  	getData(function(order){
  	  console.log("Cans ordered: "+order);
  	});
  })

  // Reset all the orders by clicking the reset button
  $('#btn-reset').click(function(){
  	resetData();
  })

  

});

