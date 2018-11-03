/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			//$body.addClass('is-loading');

			//$window.on('load', function() {
			//	window.setTimeout(function() {
			//		$body.removeClass('is-loading');
			//	}, 0);
			//});

		// Touch mode.
			if (skel.vars.mobile)
				$body.addClass('is-touch');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly links.
			$('.scrolly').scrolly({
				speed: 2000
			});

		// Dropdowns.
			$('#nav > ul').dropotron({
				alignment: 'right',
				hideDelay: 350
			});

		// Off-Canvas Navigation.

			// Title Bar.
				$(
					'<div id="titleBar">' +
						'<a href="#navPanel" class="toggle"></a>' +
						'<span class="title">The Institute for Ethical ML</span>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#titleBar, #navPanel, #page-wrapper')
						.css('transition', 'none');

		// Parallax.
		// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
			if (skel.vars.browser == 'ie'
			||	skel.vars.mobile) {

				$.fn._parallax = function() {

					return $(this);

				};

			}
			else {

				$.fn._parallax = function() {

					$(this).each(function() {

						var $this = $(this),
							on, off;

						on = function() {

							$this
								.css('background-position', 'center 0px');

							$window
								.on('scroll._parallax', function() {

									var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

									$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

								});

						};

						off = function() {

							$this
								.css('background-position', '');

							$window
								.off('scroll._parallax');

						};

						skel.on('change', function() {

							if (skel.breakpoint('medium').active)
								(off)();
							else
								(on)();

						});

					});

					return $(this);

				};

				$window
					.on('load resize', function() {
						$window.trigger('scroll');
					});

			}

		// Spotlights.
			var $spotlights = $('.spotlight');

			$spotlights
				._parallax()
				.each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						// Use main <img>'s src as this spotlight's background.
							$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

						// Enable transitions (if supported).
							if (skel.canUse('transition')) {

								var top, bottom, mode;

								// Side-specific scrollex tweaks.
									if ($this.hasClass('top')) {

										mode = 'top';
										top = '-20%';
										bottom = 0;

									}
									else if ($this.hasClass('bottom')) {

										mode = 'bottom-only';
										top = 0;
										bottom = '20%';

									}
									else {

										mode = 'middle';
										top = 0;
										bottom = 0;

									}

								// Add scrollex.
									$this.scrollex({
										mode:		mode,
										top:		top,
										bottom:		bottom,
                                        // Uncomment below if you want the effects of stuff appearing
										//initialize:	function(t) { $this.addClass('inactive'); },
										//terminate:	function(t) { $this.removeClass('inactive'); },
										//enter:		function(t) { $this.removeClass('inactive'); },

										// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

										//leave:	function(t) { $this.addClass('inactive'); },

									});

							}

					};

					off = function() {

						// Clear spotlight's background.
							$this.css('background-image', '');

						// Disable transitions (if supported).
							if (skel.canUse('transition')) {

								// Remove scrollex.
									$this.unscrollex();

							}

					};

					skel.on('change', function() {

						if (skel.breakpoint('medium').active)
							(off)();
						else
							(on)();

					});

				});

		// Wrappers.
			var $wrappers = $('.wrapper');

			$wrappers
				.each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						if (skel.canUse('transition')) {

							$this.scrollex({
								top:		250,
								bottom:		0,
                                // Uncomment the below if you want to have the transition actions
								//initialize:	function(t) { $this.addClass('inactive'); },
								//terminate:	function(t) { $this.removeClass('inactive'); },
								//enter:		function(t) { $this.removeClass('inactive'); },

								// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

								//leave:	function(t) { $this.addClass('inactive'); },

							});

						}

					};

					off = function() {

						if (skel.canUse('transition'))
							$this.unscrollex();

					};

					skel.on('change', function() {

						if (skel.breakpoint('medium').active)
							(off)();
						else
							(on)();

					});

				});

		// Banner.
			var $banner = $('#banner');

			$banner
				._parallax();


        function initialiseParticles() {

            var lowSpecs = false;
            var runOnce = false;
			var SEPARATION = 50, AMOUNTX = 50, AMOUNTY = 50;
			var stats;
			var camera, scene, renderer;

			var container = document.createElement( 'div' );
            container.style.position = "absolute";
            container.style.top = 0;
            container.style.height = "100%";
            container.style.width = "100%";
            document.getElementById("banner").appendChild( container );
            console.log(container);

            function getWidth() {
                return container.clientWidth;
            }
            function getHeight() {
                return container.clientHeight;
            }

			var particles, particle, count = 0;
			var mouseX = 0, mouseY = 0;
            var windowHalfX = getWidth() / 2;
            var windowHalfY = getHeight() / 0.90;
            console.log(windowHalfX, windowHalfY)


			init();
			animate();

            function init() {
				
				camera = new THREE.PerspectiveCamera( 75, getWidth() / getHeight(), 1, 10000 );
				camera.position.z = 1000;
				scene = new THREE.Scene();
				particles = new Array();
				var PI2 = Math.PI * 2;
				var material = new THREE.SpriteCanvasMaterial( {
					color: 0xffffff,
					program: function ( context ) {
						context.beginPath();
						context.arc( 0, 0, 0.5, 0, PI2, true );
						context.fill();
					}
				} );
				var i = 0;
				for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
					for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
						particle = particles[ i ++ ] = new THREE.Sprite( material );
						particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
						particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
						scene.add( particle );
					}
				}
				renderer = new THREE.CanvasRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( getWidth(), getHeight() );
				container.appendChild( renderer.domElement );
                //remove all stats for stast box
				stats = new Stats();
				//container.appendChild( stats.dom );
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );
				//
				window.addEventListener( 'resize', onWindowResize, false );
			}
			function onWindowResize() {
				windowHalfX = getWidth() / 2;
				windowHalfY = getHeight() / 0.90;
				camera.aspect = getWidth() / getHeight();
				camera.updateProjectionMatrix();
				renderer.setSize( getWidth(), getHeight() );
			}
			//
			function onDocumentMouseMove( event ) {
				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;
			}
			function onDocumentTouchStart( event ) {
				if ( event.touches.length === 1 ) {
					event.preventDefault();
					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;
				}
			}
			function onDocumentTouchMove( event ) {
				if ( event.touches.length === 1 ) {
					event.preventDefault();
					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;
				}
			}
			//
			function animate() {
                
                if (!lowSpecs) {
                    requestAnimationFrame( animate );
                    render();
                    stats.update();
                }

                function turnOff() {
                    console.log("Specs of computer seems too low. Turning off animation...")
                    lowSpecs = true;        

                    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
                    document.removeEventListener( 'touchstart', onDocumentTouchStart, false );
                    document.removeEventListener( 'touchmove', onDocumentTouchMove, false );
                    window.removeEventListener( 'resize', onWindowResize, false );

                    contImage = document.createElement( 'div' );
                    contImage.style.position = "absolute";
                    contImage.style.bottom = 0;
                    contImage.style.left = 0;
                    contImage.style.backgroundImage = "url(images/particles-static.png)"
                    contImage.style.backgroundSize = "cover";
                    contImage.style.width = "100%"
                    contImage.style.height = "100%";
                    document.getElementById("banner").appendChild( contImage );

                    container.remove();
                }

                if (!runOnce) {
                    console.log("starting timeout...")
                    runOnce = true;
                    setTimeout(function() {
                        var fps = stats.getFPS();
                        if(fps < 5) {
                            turnOff();
                        }
                        console.log(lowSpecs)
                        console.log(fps);
                    }, 5000);
                    
                    // Turn off after 60 seconds, as otherwise it will just consume battery
                    setTimeout(function() {
                        turnOff();
                    }, 20000);
                }        
			}
			function render() {
				camera.position.x += ( mouseX - camera.position.x ) * .05;
				camera.position.y += ( - mouseY - camera.position.y ) * .05;
				camera.lookAt( scene.position );
				var i = 0;
				for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
					for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
						particle = particles[ i++ ];
						particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
							( Math.sin( ( iy + count ) * 0.5 ) * 50 );
						particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 4 +
							( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 4;
					}
				}
				renderer.render( scene, camera );
				count += 0.1;
			}

        }

        $(initialiseParticles());

	});

})(jQuery);
