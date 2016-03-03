jQuery(document).ready(function ($) {
  var current_time = Math.round((new Date()).getTime() / 1000);
  if(typeof $.cookie("top_line_time_flat") == "undefined") {
      $.cookie("top_line_time_flat", current_time, { path: '/', expires: 7 });
  }

  if (current_time < $.cookie("top_line_time_flat")) {
  } else {
      jQuery('#switcher').fadeIn();
      jQuery('body').css({'margin-top': 44 + 'px'});
      jQuery('#top header').css({'top': 44 + 'px'});
      jQuery('.fixed-menu').css({'margin-top': 44 + 'px'});
  }
});

jQuery(".remove_frame a").click(function () {
  var current_time = Math.round((new Date()).getTime() / 1000);
  jQuery('#switcher').fadeOut();
  jQuery('body').css({'margin-top': 0});
  jQuery('#top header').css({'top': 0});
  jQuery('.fixed-menu').css({'margin-top': 0});
  $.cookie("top_line_time_flat", new_time = current_time + 86400, { path: '/', expires: 7 });                             
});