/*
Jquery SPA without hash example. A simple code!
Version: 0.1.0.
Written by: Sedem stickx <sedemdatsa69@gmail.com>
*/

//deprecated method but is very useful in showing type of page load action a user has taken.
//For testing purposes.
console.log(performance.navigation.type);

//when user clicks on any anchor tag with a data-link attribute fire this event.
$(document).on('click','[data-link]', function (e) {
   e.preventDefault();//prevent anchor click default behaviour.

   var page = $(this).attr('href');//get url from clicked link.
   var routes = page.substring(0,page.lastIndexOf('.'));//remove file extension that shows up in the url bar.

   var navId = $(this).attr('id')
   var id = navId.replace("nav-", "")
   
   var listPops = sessionStorage.getItem("nav-pops").split(",");
   listPops.push(id)
   sessionStorage.setItem("nav-pops", listPops.toString())

   $('#nav-top > a').each(function () { 
      $(this).removeClass("active")
   });
   $('#nav-'+id).addClass("active")

   window.history.pushState(null,null,routes);//assign new url to address bar and add page in browser history without reloading the page.

   $.get(page, function (pageContent) {//return selected page content trough ajax.
      $("#container").html(pageContent);//load content into main div
   });
});

 

//when window's history changes fire this event.
//e.g When user goes back or forward in a session browser.
 $(window).on('popstate', function (){
   var url = window.location.href;//get page url from address bar.
   var routes = url.substring(url.lastIndexOf('/')+1);//return page route from url.
   var page = routes != '' ? url+".html" : "home.html" ;//if route is empty assign home.html to page to ajax load the default content.

   var listPops = sessionStorage.getItem("nav-pops").split(",")
   listPops.pop()
   sessionStorage.setItem("nav-pops", listPops.toString())

   var id = listPops.slice(-1)
   console.log(id)
   $('#nav-top > a').each(function () { 
      $(this).removeClass("active")
   });
   $('#nav-'+id).addClass("active")

   $.get(page, function (pageContent) {//return selected page content trough ajax.
      $("#container").html(pageContent);//load content into main div
   });
});



//.htaccess for apache or any other web server edit file has to be edited 
//to ensure that index.html file loads even if url in browser has been changed to maintain SPA system. 
//e.g When user reloads the page or enters or paste a url with the same domain name but different path in the browser.
 $(window).on('load', function (){

  var url = window.location.href;//get page url from address bar.
  var routes = url.substring(url.lastIndexOf('/')+1);//return page route from url.
  var page = routes != '' ? url+".html" : "home.html" ;//if route is empty assign home.html to page to ajax load the default content.

  sessionStorage.setItem("nav-pops", ["home"].toString())

  $.get(page, function (pageContent) {//return selected page content trough ajax.
   $("#container").html(pageContent);//load content into main div
  });
});

// window.onbeforeunload = function(e) {
//    e.preventDefault()
//    return false;
// }

window.onbeforeunload = null

// $("#xxx").click(function(){
//    $("#container").load("contact.html")
//  });
