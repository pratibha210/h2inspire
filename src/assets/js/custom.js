var swiper = new Swiper(".testimonial", {
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

// step form
var current_fs, next_fs, previous_fs;
var opacity;
var current = 1;
var steps = $(".steps").length;

setProgressBar(current);

$(".next").click(function(){

current_fs = $(this).parent();
next_fs = $(this).parent().next();

//Add Class Active
$(".step-tabs li").eq($(".steps").index(next_fs)).addClass("active");

//show the next steps
next_fs.show();
//hide the current steps with style
current_fs.animate({opacity: 0}, {
step: function(now) {
// for making fielset appear animation
opacity = 1 - now;

current_fs.css({
'display': 'none',
'position': 'relative'
});
next_fs.css({'opacity': opacity});
},
duration: 500
});
setProgressBar(++current);
});

// $(".previous2").click(function(){

// current_fs = $(this).parent();
// previous_fs = $(this).parent().prev();

// //Remove class active
// $(".step-tabs li").eq($(".steps").index(current_fs)).removeClass("active");

// //show the previous fieldset
// previous_fs.show();

// //hide the current fieldset with style
// current_fs.animate({opacity: 0}, {
// step: function(now) {
// // for making fielset appear animation
// opacity = 1 - now;

// current_fs.css({
// 'display': 'none',
// 'position': 'relative'
// });
// previous_fs.css({'opacity': opacity});
// },
// duration: 500
// });
// setProgressBar(--current);
// });

function setProgressBar(curStep){
var percent = parseFloat(100 / steps) * curStep;
percent = percent.toFixed();
$(".progress-bar2")
.css("width",percent+"%")
}

$(".submit").click(function(){
return false;
})


// step form 2
var current_ff, next, previous;
var opacity;
var current = 1;
var steps = $(".tab-pannel").length;

setProgressBar(current);

$(".next-form").click(function(){

current_ff = $(this).parent().parent().parent();
next = $(this).parent().parent().parent().next();

//Add Class Active
$(".step-list li").eq($(".tab-pannel").index(next)).addClass("active");

//show the next steps
next.show();
//hide the current steps with style
current_ff.animate({opacity: 0}, {
step: function(now) {
// for making fielset appear animation
opacity = 1 - now;

current_ff.css({
'display': 'none',
'position': 'relative'
});
next.css({'opacity': opacity});
},
duration: 500
});

setProgressBar(++current);
});

$(".previous").click(function(){

current_ff = $(this).parent().parent().parent();
previous = $(this).parent().parent().parent().prev();

//Remove class active
$(".step-list li").eq($(".tab-pannel").index(current_ff)).removeClass("active");

//show the previous fieldset
previous.show();

//hide the current fieldset with style
current_ff.animate({opacity: 0}, {
step: function(now) {
// for making fielset appear animation
opacity = 1 - now;

current_ff.css({
'display': 'none',
'position': 'relative'
});
previous.css({'opacity': opacity});
},
duration: 500
});
setProgressBar(--current);
});

// function setProgressBar(curStep){
// var percent = parseFloat(100 / steps) * curStep;
// percent = percent.toFixed();
// $(".progress-bar")
// .css("width",percent+"%")
// }

$(".submit2").click(function(){
return false;
})


// file upload

var readURL = function(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('.shop-photo img').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
  }
}


$(".fileupload").on('change', function(){
  readURL(this);
});

$(".overlap-upload").on('click', function() {
 $(".fileupload").click();
});


// first part select all

$('.top-form-part .all-check').click(function () {
  $('.top-form-part .a-check').prop('checked', this.checked);
});

$('.top-form-part .a-check').change(function () {
  var check = ($('.top-form-part .a-check').filter(":checked").length == $('.top-form-part .a-check').length);
  $('.top-form-part .all-check').prop("checked", check);
});

// second part select all
$('.bottom-form-part .all-check-company').click(function () {
  $('.bottom-form-part .a-check').prop('checked', this.checked);
});

$('.bottom-form-part .a-check').change(function () {
  var check = ($('.bottom-form-part .a-check').filter(":checked").length == $('.bottom-form-part .a-check').length);
  $('.bottom-form-part .all-check-company').prop("checked", check);
});

// third part select all
$('.header-form-part .all-check-candidate').click(function () {
  $('.header-form-part .a-check').prop('checked', this.checked);
});

$('.header-form-part .a-check').change(function () {
  var check = ($('.header-form-part .a-check').filter(":checked").length == $('.header-form-part .a-check').length);
  $('.header-form-part .all-check-candidate').prop("checked", check);
});


// dash board menu

$('.ham').on('click', function(){
  $('.menu-bar').toggleClass('slide');
});

$('.cross').on('click', function(){
  $('.menu-bar').removeClass('slide');
});


// filter
$('.toogle-btm').on('click', function(){
  $('.left-panel').toggleClass('slide-left');
});



$('.sidebar-close').on('click', function(){
  $('.left-panel').removeClass('slide-left');
});


if ( $(window).width() < 618 ) {
    $('.pro-image').on('click', function(){
        $('.profile-details').toggleClass('drop');
    });
}

// right-sidebar
$('.review a').on('click', function(){
  $('.candidate-menu').toggleClass('slideright');
  $('.overlay').toggleClass('slideleft');
});

$('.opup-close').on('click', function(){
  $('.candidate-menu').removeClass('slideright');
  $('.overlay').removeClass('slideleft');
});




const bars = document.querySelector('.bars')
const times = document.querySelector('.times')
const header = document.querySelector('header')

// bars.addEventListener('click', (e) => {
//   header.classList.add('show-sidebar')
// })
// times.addEventListener('click', (e) => {
//   header.classList.remove('show-sidebar')
// })
// document.addEventListener('click', (e) => {
//   if(!e.target.classList.contains('show-sidebar')) {
//     console.log('fff')
//     header.classList.remove('show-sidebar')
//   }
//   else {
//     console.log('ddd')
//   }
// })

let scrollToTopBtn = document.querySelector(".scrollToTopBtn");
let rootElement = document.documentElement;

// window.onscroll = function () {
//   if (window.pageYOffset > 10) {
//     header.classList.add("fixed");
//   } else {
//     header.classList.remove("fixed");
//   }
// };

function handleScroll() {
  let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  if (rootElement.scrollTop / scrollTotal > 0.05) {
    scrollToTopBtn.classList.add("showBtn");
  } else {
    scrollToTopBtn.classList.remove("showBtn");
  }
}

function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
scrollToTopBtn.addEventListener("click", scrollToTop);
document.addEventListener("scroll", handleScroll);





$('.tab-nav a:first-child').addClass('active');
$('.tab-content').hide();
$('.tab-content:first').show();

// Click function
$('.tab-nav a').click(function(){
  $('.tab-nav a').removeClass('active');
  $(this).addClass('active');
  $('.tab-content').hide();
  
  var activeTab = $(this).attr('href');
  $(activeTab).fadeIn();
  return false;
});




AOS.init();