var stats;
			var camera, controls, scene, renderer;
			init();
			// render(); // remove when using next line for animation loop (requestAnimationFrame)
			animate();
			function init() {
				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xcccccc );
				// scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
                renderer = new THREE.WebGLRenderer();
                render.antialias = true;
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				var container = document.getElementById( 'container' );
				container.appendChild( renderer.domElement );
				camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 500;
				controls = new THREE.OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render ); // remove when using animation loop
				// enable animation loop when using damping or autorotation
				//controls.enableDamping = true;
				//controls.dampingFactor = 0.25;
				controls.enableZoom = false;
				// world
              var mesh = null;
              initMesh ();

				stats = new Stats();
				container.appendChild( stats.dom );
				//
				window.addEventListener( 'resize', onWindowResize, false );
            }
            function initMesh (){
                var loader = new THREE.JSONLoader();
                loader.load('images/mk2.json', function (geometry) {
                    mesh = new THREE.Mesh(geometry);
                    scene.add(mesh);
                    mesh.material.color.set('black' );
                    // mesh.position.set(50, 0, 1);
                    mesh.scale.set(50,50,50);
                    mesh.rotation.x = Math.PI / 2;
                    renderer.render( scene, camera );
                });
            }
			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}
			function animate() {
				requestAnimationFrame( animate );
				controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
				stats.update();
				render();
			}
			function render() {
				renderer.render( scene, camera );
			}