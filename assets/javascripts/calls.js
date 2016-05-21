$(function(){
  var userKey = "4120685331";
  var available = 1000;
  var urlRequestCans = "http://energydrink.stage.mediadivision.ch/api/count.php?key="+userKey;
  var urlPutOrder = "http://energydrink.stage.mediadivision.ch/api/post.php?key="+userKey;
  var urlResetOrders = "http://energydrink.stage.mediadivision.ch/api/reset.php?key="+userKey;

  $('.thank-you-wrapper').hide();
 
  // Check cans already ordered       
    $.ajax({
      dataType : "json", 	
      method: "GET",
      url: urlRequestCans,
      success: function (requestCans) {
        console.log("Until now: "+requestCans);
        if (requestCans >= available ){
          $('form').hide()
          $('.thank-you-wrapper').show();
          $('.thank-you').text('Leider sind alle Probepakete vergriffen!');
          console.log("Leider sind alle Probepakete vergriffen!");
        }
      }
    })    
  

  // Put the order
  function sendData(flavor,name, lastName, eMail, street, zipCode, location, phone){
    $.ajax({
      method: "POST",
      url: urlPutOrder,
      data: { geschmacksrichtung: flavor, vorname: name, nachname: lastName, email: eMail, strasse: street, plz: zipCode, ort: location, tel: phone }
    })
    .done(function( msg ) {
      console.log( "Order put? -> " + msg );
      $('form').hide()
      $('.thank-you-wrapper').show();
      $('.thank-you').text('Vielen Dank für Ihre Bestellung!');

    });
   };   

   // Reset all the orders. Add extra button in front design to reset
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
  
  
  // If there are still cans available put the order
  $('#btn-send').click(function(e){
  	e.preventDefault();  	 
        var flavor = $('input[name=optionsRadios]:checked').val();   
        var name = $('#name').val();
        var lastName = $('#lastname').val();
        var eMail = $('#email').val();
        var street = $('#street').val();
        var zipCode = $('#zipcode').val();
        var location = $('#location').val();
        var phone = $('#phone').val();
        console.log("FLAVOR: "+flavor+" NAME: "+name+" LASTNAME: "+lastName+" EMAIL: "+eMail+" STREET: "+street+" ZIPCODE: "+zipCode +" LOCATION: "+location+" PHONE: "+phone);               
        sendData(flavor, name, lastName, eMail, street, zipCode, location, phone);        
   });


  // Reset all the orders by clicking the reset button
  $('#btn-reset').click(function(){
  	resetData();
  })

  

});

