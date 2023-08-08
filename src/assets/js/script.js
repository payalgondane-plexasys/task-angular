setTimeout(function() {

    /*     window.addEventListener('DOMContentLoaded', event => { */
    $(document).ready(function() {



        /* -------------------------------------- */

        $('#menuBtn').on("click", function() {
            //alert("hii");
            document.getElementById("mainpage").classList.toggle("sidebar-icon-only");
            document.getElementById("sidebar").classList.toggle("active");

        });
        //Open submenu on hover in compact sidebar mode and horizontal menu mode
        $(document).on('mouseenter mouseleave', '.sidebar .nav-item', function(ev) {
            var mainpage = $('#mainpage');
            var sidebarIconOnly = mainpage.hasClass("sidebar-icon-only");
            var horizontalMenu = mainpage.hasClass("horizontal-menu");
            var sidebarFixed = mainpage.hasClass("sidebar-fixed");
            var $menuItem = $(this);
            if (!('ontouchstart' in document.documentElement)) {
                if (sidebarIconOnly || horizontalMenu) {
                    if (sidebarFixed) {
                        if (ev.type === 'mouseenter') {
                            mainpage.removeClass('sidebar-icon-only');
                        }
                    } else {
                        if (ev.type === 'mouseenter') {
                            $menuItem.addClass('hover-open')
                        } else {
                            $menuItem.removeClass('hover-open')
                        }
                    }
                }
            } else {
                if (sidebarIconOnly || horizontalMenu) {
                    if (ev.type === 'mouseenter') {
                        $menuItem.addClass('hover-open')
                    } else {
                        $menuItem.removeClass('hover-open')
                    }
                }
            }
        });
        // Horizontal menu toggle fuction for mobile
        $(".navbar.horizontal-layout .navbar-menu-wrapper .navbar-toggler").on("click", function() {
            $(".navbar.horizontal-layout").toggleClass("header-toggled");
        });

        (function($) {
            'use strict';
            $(function() {
                //var mainpage = $('#mainpage');
                var contentWrapper = $('.content-wrapper');
                var scroller = $('.container-scroller');
                var footer = $('.footer');
                var sidebar = $('#sidebar');

                //Add active class to nav-link based on url dynamically
                //Active class can be hard coded directly in html file also as required
                if (!$('#sidebar').hasClass("dynamic-active-class-disabled")) {
                    var current = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
                    $('#sidebar >.nav > li:not(.not-navigation-link) a').each(function() {
                        var $this = $(this);
                        if (current === "") {
                            //for root url
                            if ($this.attr('href').indexOf("index.html") !== -1) {
                                $(this).parents('.nav-item').last().addClass('active');
                                if ($(this).parents('.sub-menu').length) {
                                    $(this).addClass('active');
                                }
                            }
                        } else {
                            //for other url
                            if ($this.attr('href').indexOf(current) !== -1) {
                                $(this).parents('.nav-item').last().addClass('active');
                                if ($(this).parents('.sub-menu').length) {
                                    $(this).addClass('active');
                                }
                                if (current !== "index.html") {
                                    $(this).parents('.nav-item').last().find(".nav-link").attr("aria-expanded", "true");
                                    if ($(this).parents('.sub-menu').length) {
                                        $(this).closest('.collapse').addClass('show');
                                    }
                                }
                            }
                        }
                    })
                }
            });


            $('[data-toggle="minimize"]').on("click", function() {
                $('#mainpage').toggleClass('sidebar-icon-only');
            });


            $(".sidebar .sidebar-inner > .nav > .nav-item").not(".brand-logo").attr('toggle-status', 'closed');
            $(".sidebar .sidebar-inner > .nav > .nav-item").on('click', function() {
                $(".sidebar .sidebar-inner > .nav > .nav-item").removeClass("active");
                $(this).addClass("active");
                $(".sidebar .sidebar-inner > .nav > .nav-item").find(".submenu").removeClass("open");
                $(".sidebar .sidebar-inner > .nav > .nav-item").not(this).attr('toggle-status', 'closed');
                var toggleStatus = $(this).attr('toggle-status');
                if (toggleStatus == 'closed') {
                    $(this).find(".submenu").addClass("open");
                    $(this).attr('toggle-status', 'open');
                } else {
                    $(this).find(".submenu").removeClass("open");
                    $(this).not(".brand-logo").attr('toggle-status', 'closed');
                }
            });
        });
    });

}, 2000);