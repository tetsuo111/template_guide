jQuery(function(t){var l=t(window).width();navigator.userAgent;l<768?(t(".hall-list").insertAfter(".funeral-list"),t(".hall-list").css("margin-bottom","30px")):l>=769&&t(".funeral-list").insertAfter(".hall-list"),t(window).on("load resize",function(){var l=t(window).width();l<768?(t(".hall-list").insertAfter(".funeral-list"),t(".hall-list").css("margin-bottom","30px")):l>=769&&t(".funeral-list").insertAfter(".hall-list")})});