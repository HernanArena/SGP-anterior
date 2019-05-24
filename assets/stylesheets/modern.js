jQuery(document).ready(function($) {


    $(".clickable-row").click(function(event) {
        event.preventDefault();
        window.document.location = $(this).data("href");
    });

    // $("#CloseTicket").click(function(event) {
    //     event.preventDefault();
    //     confirm('¿Está seguro que desea cerrar este Parte?')
    // });

 	// $("#submit-new-ticket").validate();

 	// $("#answer-new-ticket").validate();

 	// $("#license").validate();

    // Toggle Search
    /*$('.show-search').click(function(){
        $('.search-form').css('margin-top', '0');
        $('.search-input').focus();
    });

    $('.close-search').click(function(){
        $('.search-form').css('margin-top', '-60px');
    });*/


    // Fullscreen
    /*function toggleFullScreen() {
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

     $('.toggle-fullscreen').click(function(){
        toggleFullScreen();
    });*/


    // Waves
    Waves.displayEffect();

    // tooltips
    $( '[data-toggle~="tooltip"]' ).tooltip({
        container: 'body'
    });

    // Switchery
    var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

    elems.forEach(function(html) {
        var switchery = new Switchery(html, { color: '#23B7E5' });
    });

    // Element Blocking
    /*function blockUI(item) {
        $(item).block({
            message: '<img src="assets/images/reload.gif" width="20px" alt="">',
            css: {
                border: 'none',
                padding: '0px',
                width: '20px',
                height: '20px',
                backgroundColor: 'transparent'
            },
            overlayCSS: {
                backgroundColor: '#fff',
                opacity: 0.9,
                cursor: 'wait'
            }
        });
    }

    function unblockUI(item) {
        $(item).unblock();
    }  */

    // Panel Control

	$('.panel-collapse').click(function(){
        $(this).closest(".panel").children('.panel-body').slideToggle('fast');
    });


    /*$('.panel-reload').click(function() {
        var el = $(this).closest(".panel").children('.panel-body');
        blockUI(el);
        window.setTimeout(function () {
            unblockUI(el);
        }, 1000);

    }); */

    $('.panel-remove').click(function(){
        $(this).closest(".panel").hide();
    });

    // Push Menu
    $('.push-sidebar').click(function(){
        var hidden = $('.sidebar');

        if (hidden.hasClass('visible')){
            hidden.removeClass('visible');
            $('.page-inner').removeClass('sidebar-visible');
        } else {
            hidden.addClass('visible');
            $('.page-inner').addClass('sidebar-visible');
        }
    });


    // sortable
    $(".sortable").sortable({
        connectWith: '.sortable',
        items: '.panel',
        helper: 'original',
        revert: true,
        placeholder: 'panel-placeholder',
        forcePlaceholderSize: true,
        opacity: 0.95,
        cursor: 'move'
    });

    // Uniform
    var checkBox = $("input[type=checkbox]:not(.switchery), input[type=radio]:not(.no-uniform)");
    if (checkBox.size() > 0) {
        checkBox.each(function() {
            $(this).uniform();
        });
    };

    // .toggleAttr() Function
    $.fn.toggleAttr = function(a, b) {
        var c = (b === undefined);
        return this.each(function() {
            if((c && !$(this).is("["+a+"]")) || (!c && b)) $(this).attr(a,a);
            else $(this).removeAttr(a);
        });
    };

    // Sidebar Menu
    var parent, ink, d, x, y;
    $('.sidebar .accordion-menu li .sub-menu').slideUp(0);
    $('.sidebar .accordion-menu li.open .sub-menu').slideDown(0);
    $('.small-sidebar .sidebar .accordion-menu li.open .sub-menu').hide(0);
    $('.sidebar .accordion-menu > li.droplink > a').click(function(){

        if(!($('body').hasClass('small-sidebar'))&&(!$('body').hasClass('page-horizontal-bar'))&&(!$('body').hasClass('hover-menu'))) {

        var menu = $('.sidebar .menu'),
            sidebar = $('.page-sidebar-inner'),
            page = $('.page-content'),
            sub = $(this).next(),
            el = $(this);

        menu.find('li').removeClass('open');
        $('.sub-menu').slideUp(200, function() {
            sidebarAndContentHeight();
        });
        sidebarAndContentHeight();

        if (!sub.is(':visible')) {
            $(this).parent('li').addClass('open');
            $(this).next('.sub-menu').slideDown(200, function() {
                sidebarAndContentHeight();
            });
        } else {
            sub.slideUp(200, function() {
                sidebarAndContentHeight();
            });
        }
        return false;
        };
    });

    $('.sidebar .accordion-menu .sub-menu li.droplink > a').click(function(){

        var menu = $(this).parent().parent(),
            sidebar = $('.page-sidebar-inner'),
            page = $('.page-content'),
            sub = $(this).next(),
            el = $(this);

        menu.find('li').removeClass('open');
        sidebarAndContentHeight();

        if (!sub.is(':visible')) {
            $(this).parent('li').addClass('open');
            $(this).next('.sub-menu').slideDown(200, function() {
                sidebarAndContentHeight();
            });
        } else {
            sub.slideUp(200, function() {
                sidebarAndContentHeight();
            });
        }
        return false;
    });

    // Makes .page-inner height same as .page-sidebar height
    var sidebarAndContentHeight = function () {
        var content = $('.page-inner'),
            sidebar = $('.page-sidebar'),
            body = $('body'),
            height,
            footerHeight = $('.page-footer').outerHeight(),
            pageContentHeight = $('.page-content').height();

        content.attr('style', 'min-height:' + sidebar.height() + 'px !important');

        if (body.hasClass('page-sidebar-fixed')) {
            height = sidebar.height() + footerHeight;
        } else {
            height = sidebar.height() + footerHeight;
            if (height  < $(window).height()) {
                height = $(window).height();
            }
        }

        if (height >= content.height()) {
            content.attr('style', 'min-height:' + height + 'px !important');
        }
    };

    sidebarAndContentHeight();

    window.onresize = sidebarAndContentHeight;




    $(window).on( 'resize', function () {
    	$('.login-top').height( ($(window).height() / 2) - 50  );
    	if ( $(window).width() < 480 ){
    	 	$('.login-top').css( 'height', 'auto');
    	}
	}).resize();


    // Slimscroll
    $('.slimscroll').slimscroll({
        allowPageScroll: true
    });

    // Layout Settings
    var fixedHeaderCheck = document.querySelector('.fixed-header-check'),
        fixedSidebarCheck = document.querySelector('.fixed-sidebar-check'),
        horizontalBarCheck = document.querySelector('.horizontal-bar-check'),
        toggleSidebarCheck = document.querySelector('.toggle-sidebar-check'),
        boxedLayoutCheck = document.querySelector('.boxed-layout-check'),
        compactMenuCheck = document.querySelector('.compact-menu-check'),
        hoverMenuCheck = document.querySelector('.hover-menu-check'),
        defaultOptions = function() {

            if(($('body').hasClass('small-sidebar'))&&(toggleSidebarCheck.checked == 1)){
                toggleSidebarCheck.click();
            }

            if(!($('body').hasClass('page-header-fixed'))&&(fixedHeaderCheck.checked == 0)){
                fixedHeaderCheck.click();
            }

            if(($('body').hasClass('page-sidebar-fixed'))&&(fixedSidebarCheck.checked == 1)){
                fixedSidebarCheck.click();
            }

            if(($('body').hasClass('page-horizontal-bar'))&&(horizontalBarCheck.checked == 1)){
                horizontalBarCheck.click();
            }

            if(($('body').hasClass('compact-menu'))&&(compactMenuCheck.checked == 1)){
                compactMenuCheck.click();
            }

            if(($('body').hasClass('hover-menu'))&&(hoverMenuCheck.checked == 1)){
                hoverMenuCheck.click();
            }

            if(($('.page-content').hasClass('container'))&&(boxedLayoutCheck.checked == 1)){
                boxedLayoutCheck.click();
            }

            $(".theme-color").attr("href", 'assets/css/themes/green.css');

            sidebarAndContentHeight();
        },
        str = $('.navbar .logo-box a span').text(),
        smTxt = (str.slice(0,1)),
        collapseSidebar = function() {
            $('body').toggleClass("small-sidebar");
            $('.navbar .logo-box a span').html($('.navbar .logo-box a span').text() == smTxt ? str : smTxt);
            sidebarAndContentHeight();
        },
        fixedHeader = function() {
            if(($('body').hasClass('page-horizontal-bar'))&&($('body').hasClass('page-sidebar-fixed'))&&($('body').hasClass('page-header-fixed'))){
                fixedSidebarCheck.click();
                alert("Static header isn't compatible with fixed horizontal nav mode. Modern will set static mode on horizontal nav.");
            };
            $('body').toggleClass('page-header-fixed');
            sidebarAndContentHeight();
        },
        fixedSidebar = function() {
            if(($('body').hasClass('page-horizontal-bar'))&&(!$('body').hasClass('page-sidebar-fixed'))&&(!$('body').hasClass('page-header-fixed'))){
                fixedHeaderCheck.click();
                alert("Fixed horizontal nav isn't compatible with static header mode. Modern will set fixed mode on header.");
            };
            if(($('body').hasClass('hover-menu'))&&(!$('body').hasClass('page-sidebar-fixed'))){
                hoverMenuCheck.click();
                alert("Fixed sidebar isn't compatible with hover menu mode. Modern will set accordion mode on menu.");
            };
            $('body').toggleClass('page-sidebar-fixed');
            if ($('body').hasClass('.page-sidebar-fixed')) {
                $('.page-sidebar-inner').slimScroll({
                    destroy:true
                });
            };
            $('.page-sidebar-inner').slimScroll();
            sidebarAndContentHeight();
        },
        horizontalBar = function() {
            $('.sidebar').toggleClass('horizontal-bar');
            $('.sidebar').toggleClass('page-sidebar');
            $('body').toggleClass('page-horizontal-bar');
            if(($('body').hasClass('page-sidebar-fixed'))&&(!$('body').hasClass('page-header-fixed'))){
                fixedHeaderCheck.click();
                alert("Static header isn't compatible with fixed horizontal nav mode. Modern will set static mode on horizontal nav.");
            };
            sidebarAndContentHeight();
        },
        boxedLayout = function() {
            $('.page-content').toggleClass('container');
            sidebarAndContentHeight();
        },
        compactMenu = function() {
            $('body').toggleClass('compact-menu');
            sidebarAndContentHeight();
        },
        hoverMenu = function() {
            if((!$('body').hasClass('hover-menu'))&&($('body').hasClass('page-sidebar-fixed'))){
                fixedSidebarCheck.click();
                alert("Fixed sidebar isn't compatible with hover menu mode. Modern will set static mode on sidebar.");
            };
            $('body').toggleClass('hover-menu');
            sidebarAndContentHeight();
        };


    // Logo text on Collapsed Sidebar
    $('.small-sidebar .navbar .logo-box a span').html($('.navbar .logo-box a span').text() == smTxt ? str : smTxt);


    if( !$('.theme-settings').length ) {
        $('.sidebar-toggle').click(function() {
            collapseSidebar();
        });
    };

    if( $('.theme-settings').length ) {
    fixedHeaderCheck.onchange = function() {
        fixedHeader();
    };

    fixedSidebarCheck.onchange = function() {
        fixedSidebar();
    };

    horizontalBarCheck.onchange = function() {
        horizontalBar();
    };

    toggleSidebarCheck.onchange = function() {
        collapseSidebar();
    };

    compactMenuCheck.onchange = function() {
        compactMenu();
    };

    hoverMenuCheck.onchange = function() {
        hoverMenu();
    };

    boxedLayoutCheck.onchange = function() {
        boxedLayout();
    };


    // Sidebar Toggle
    $('.sidebar-toggle').click(function() {
        toggleSidebarCheck.click();
    });

    // Reset options
    $('.reset-options').click(function() {
        defaultOptions();
    });

    // Color changer
    /*$(".colorbox").click(function(){
        var color =  $(this).attr('data-css');
        $(".theme-color").attr('href', 'assets/css/themes/' + color + '.css');
        return false;
    });*/

    // Fixed Sidebar Bug
    if(!($('body').hasClass('page-sidebar-fixed'))&&(fixedSidebarCheck.checked == 1)){
        $('body').addClass('page-sidebar-fixed');
    }

    if(($('body').hasClass('page-sidebar-fixed'))&&(fixedSidebarCheck.checked == 0)){
        $('.fixed-sidebar-check').prop('checked', true);
    }

    // Fixed Header Bug
    if(!($('body').hasClass('page-header-fixed'))&&(fixedHeaderCheck.checked == 1)){
        $('body').addClass('page-header-fixed');
    }

    if(($('body').hasClass('page-header-fixed'))&&(fixedHeaderCheck.checked == 0)){
        $('.fixed-header-check').prop('checked', true);
    }

    // horizontal bar Bug
    if(!($('body').hasClass('page-horizontal-bar'))&&(horizontalBarCheck.checked == 1)){
        $('body').addClass('page-horizontal-bar');
        $('.sidebar').addClass('horizontal-bar');
        $('.sidebar').removeClass('page-sidebar');
    }

    if(($('body').hasClass('page-horizontal-bar'))&&(horizontalBarCheck.checked == 0)){
        $('.horizontal-bar-check').prop('checked', true);
    }

    // Toggle Sidebar Bug
    if(!($('body').hasClass('small-sidebar'))&&(toggleSidebarCheck.checked == 1)){
        $('body').addClass('small-sidebar');
    }

    if(($('body').hasClass('small-sidebar'))&&(toggleSidebarCheck.checked == 0)){
        $('.horizontal-bar-check').prop('checked', true);
    }

    // Boxed Layout Bug
    if(!($('.page-content').hasClass('container'))&&(boxedLayoutCheck.checked == 1)){
        $('.toggle-sidebar-check').addClass('container');
    }

    if(($('.page-content').hasClass('container'))&&(boxedLayoutCheck.checked == 0)){
        $('.boxed-layout-check').prop('checked', true);
    }

    // Boxed Layout Bug
    if(!($('.page-content').hasClass('container'))&&(boxedLayoutCheck.checked == 1)){
        $('.toggle-sidebar-check').addClass('container');
    }

    if(($('.page-content').hasClass('container'))&&(boxedLayoutCheck.checked == 0)){
        $('.boxed-layout-check').prop('checked', true);
    }

    // Boxed Layout Bug
    if(!($('.page-content').hasClass('container'))&&(boxedLayoutCheck.checked == 1)){
        $('.toggle-sidebar-check').addClass('container');
    }

    if(($('.page-content').hasClass('container'))&&(boxedLayoutCheck.checked == 0)){
        $('.boxed-layout-check').prop('checked', true);
    }
    }




    /* DATA TABLES */

   // $('#partes').dataTable( {

   //  		// Defino el orden
   //  		"order": [[ 1, "desc" ]],

   //          // Idioma
   //          "language": {
			// 	"sProcessing":     "Procesando...",
			// 	"sLengthMenu":     "Mostrar _MENU_ registros",
			// 	"sZeroRecords":    "No se encontraron resultados",
			// 	"sEmptyTable":     "NingÃºn dato disponible en esta tabla",
			// 	"sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
			// 	"sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
			// 	"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
			// 	"sInfoPostFix":    "",
			// 	"sSearch":         "Buscar:",
			// 	"sUrl":            "",
			// 	"sInfoThousands":  ",",
			// 	"sLoadingRecords": "Cargando...",
			// 	"oPaginate": {
			// 		"sFirst":    "Primero",
			// 		"sLast":     "Ãšltimo",
			// 		"sNext":     "Siguiente",
			// 		"sPrevious": "Anterior"
			// 	},
			// 	"oAria": {
			// 		"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
			// 		"sSortDescending": ": Activar para ordenar la columna de manera descendente"
			// 	}
			// },
			//  "columnDefs": [
   //  			{ "searchable": false, "targets": 6 },
   //  			{ "searchable": false, "targets": 5 },
   //  			{ "searchable": false, "targets": 4 }
   //  		],
   //  		 "columnDefs": [
   //  			{ "orderable": false, "targets": 6 },
   //  			{ "orderable": false, "targets": 5 },
   //  			{ "orderable": false, "targets": 4 }
  	// 		],
   //  		"bSort": true,
   //  		"bPaginate": true,
   //  		"bLengthChange": true,
   //  		"bInfo": true,
   //  		"bAutoWidth": true,

   //  		"aoColumns": [

   //          	{ "sType": "date-eu" },
   //          	null,
   //          	{ "sType": "text-html" },
   //          	null,
   //          	null,
   //          	null,
   //          	null
   //      	]


   //     } );




    //   JS TREE
    // Checkbox
    $('#checkTree').jstree({
		'core' : {
			'themes' : {
				'responsive': false
			}
		},
        'types' : {
            'default' : {
                'icon' : 'fa fa-folder icon-state-info icon-md'
            },
            'file' : {
                'icon' : 'fa fa-file icon-state-default icon-md'
            }
        },
        'plugins' : ['types', 'checkbox']
    });



    // FORM WIZARD
    //
    /*$('#rootwizard').bootstrapWizard({
        'tabClass': 'nav nav-tabs',
        onTabShow: function(tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index+1;
            var $percent = ($current/$total) * 100;
            $('#rootwizard').find('.progress-bar').css({width:$percent+'%'});
        },
        'onNext': function(tab, navigation, index) {
            var $valid = $("#wizardForm").valid();
            if(!$valid) {
                $validator.focusInvalid();
                return false;
            }
        },
        'onTabClick': function(tab, navigation, index) {
            var $valid = $("#wizardForm").valid();
            if(!$valid) {
                $validator.focusInvalid();
                return false;
            }
        },
    });

    var $validator = $("#wizardForm").validate({
        rules: {
            exampleInputName: {
                required: true
            },
            exampleInputName2: {
                required: true
		    },
		    exampleInputEmail: {
                required: true,
                email: true
		    },
		    exampleInputPassword1: {
                required: true
		    },
		    exampleInputPassword2: {
                required: true,
                equalTo: '#exampleInputPassword1'
		    },
		    exampleInputProductName: {
                required: true
		    },
		    exampleInputProductId: {
                required: true
		    },
		    exampleInputQuantity: {
                required: true
            },
		    exampleInputCard: {
                required: true,
                number: true
		    },
		    exampleInputSecurity: {
                required: true,
                number: true
		    },
		    exampleInputHolder: {
                required: true
            },
		    exampleInputExpiration: {
                required: true,
                date: true
            },
		    exampleInputCsv: {
                required: true,
                number: true
            }
        }
    });*/



	// Despliego panel de responder Parte en cambio de estado
	// $('#response').on('shown.bs.collapse', function () {
	//    $("#btn-response .fa").removeClass("fa-reply").addClass("fa-close");
	//    $("#btn-close").addClass("pointer-cursor");

	//    // Deshabilito btn cerrar
	//    $("#btn-close").click(function () {return false;});
	//    $("#btn-close").css( "opacity", ".5");
	//    $("#btn-close").removeClass("pointer-cursor").addClass("not-allowed-cursor");
	// });

	// $('#response').on('hidden.bs.collapse', function () {
	//    	$("#btn-response .fa").removeClass("fa-check").addClass("fa-reply");

	// 	// Habilito btn cerrar
	// 	$("#btn-close").css( "opacity", "1");
	// 	$("#btn-close").unbind('click');
	// 	$("#btn-close").removeClass("not-allowed-cursor").addClass("pointer-cursor");
	// });

	// Despliego panel de cerrar Parte en cambio de estado
	// $('#close').on('shown.bs.collapse', function () {
	//    $("#btn-close .fa").removeClass("fa-close").addClass("fa-check");
	//    $("#btn-response").addClass("pointer-cursor");


	//    // Deshabilito btn responder
	//    $("#btn-response").click(function () {return false;});
	//    $("#btn-response").css( "opacity", ".5");
	//    $("#btn-response").removeClass("pointer-cursor").addClass("not-allowed-cursor");

	// });

	// $('#close').on('hidden.bs.collapse', function () {
	//    	$("#btn-close .fa").removeClass("fa-check").addClass("fa-close");

	// 	// Habilito btn responder
	// 	$("#btn-response").css( "opacity", "1");
	// 	$("#btn-response").unbind('click');
	// 	$("#btn-response").removeClass("not-allowed-cursor").addClass("pointer-cursor");
	// });





	// initialize with defaults
	// $("#valoracion").rating({'size':'xs'});


    // Licencias activo div cuando la opción elegida es Novedades

    $(function () {
	  $("#tipo-habilitacion").change(function() {
	    var val = $(this).val();
	    if(val === "novedades") {
	        $("#novedades-form").show();
	    }
	    else if(val != "novedades") {
	        $("#novedades-form").hide();
	    }
	  });
	});





 	/*$(window).on( 'resize', function () {
    	// detect if mobile browser. regex -> http://detectmobilebrowsers.com
			if( avigator.userAgent.match(/Android/i)
		 		|| navigator.userAgent.match(/webOS/i)
		 		|| navigator.userAgent.match(/iPhone/i)
		 		|| navigator.userAgent.match(/iPad/i)
		 		|| navigator.userAgent.match(/iPod/i)
		 		|| navigator.userAgent.match(/BlackBerry/i)
		 		|| navigator.userAgent.match(/Windows Phone/i)
		 		|| window.innerWidth <= 800 ){
     	 			//$('#responsive').stacktable();
 					$('#responsive').cardtable();
			 }
	}).resize();*/

	$('.responsive').cardtable();

	 var $window = $(window),
     	 $tableResponsive = $('.responsive'),
     	 $tableResponsiveRow = $('.responsive tbody tr'),
     	 $tableResponsiveDesc = $('.table tbody tr .desc'),
     	 $PartDetailsResponsive = $('#detalleParte');

 	$(window).on('resize', function () {

    	if ($window.width() < 800) {
    		$tableResponsive.removeClass('table-striped');
       		$tableResponsiveRow.removeClass('clickable-row');
       	 }else{
    		$tableResponsive.addClass('table-striped');
    		$tableResponsiveRow.addClass('clickable-row');
    	}

    	if ($window.width() < 480) {

    		$tableResponsiveDescTxt = $tableResponsiveDesc.text();

    		$tableResponsiveDesc.each(function(){
	        	if ($(this).text().length > 25) {
	        	    $(this).text($(this).text().substr(0, 25));
	        	    $(this).append('...');
	        	}
	    	});

    	}




 	}).resize();







});


