var renderer, scene, camera, ambientLight, pointLight, controls;
var container = document.getElementById('container')

var cubes = [];

function init(){
	renderer = new THREE.WebGLRenderer({
		antialias: true
	})
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setSize(window.innerWidth, window.innerHeight)
	container.appendChild(renderer.domElement)

	scene = new THREE.Scene()
	scene.background = new THREE.Color(0xcccccc)


	camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 10000)
	camera.position.set(400, 200, 0)
	scene.add(camera)

	ambientLight = new THREE.AmbientLight(0x404040, 3)
	ambientLight.position.set(0, -10, 0)
	scene.add(ambientLight)

	//pointLight = new THREE.PointLight(0xFFFFFF, 2)
	//pointLight.position.set(0, 50, 0)
	//scene.add(pointLight)

	controls = new THREE.OrbitControls(camera)

	for(var i = 0; i < 20; i++){
		let red = Math.round(Math.sin(.3 * i) * 127 + 128)
		let blue =Math.round(Math.sin(.3 * i + 2) * 127 + 128)
		let green = Math.round(Math.sin(.3 * i + 4) * 127 + 128)
		var hexColor = toHexColor(red, green, blue)
		//var hexColor = 0x000000;
		let mat = new THREE.MeshPhongMaterial({
			color: hexColor, 
			flatShading: true
		})

		let geo = new THREE.BoxGeometry(30, 30, 30)
		geo.translate( 0, 30 / 2, 0 )

		var cube = new THREE.Mesh(geo, mat)

		cube.position.set((i - 10) * 30, 0, 0)
		cubes.push(cube)
		scene.add(cube)
	}

	camera.lookAt(scene.position)
}

function animate(){
	requestAnimationFrame(animate)
	
	var sec = Date.now() % 6000;
	var nom = sec / 6000;

	var offset = 0;

	cubes.forEach(function(c){
		//c.scale.y = 15; //* Math.abs(Math.sin(offset * nom * 2 * Math.PI))
		offset += .05;
	})

	render()
}

function render(){
	renderer.render(scene, camera)
}

function toHexColor(r, g, b){
	var rHex = r.toString(16)
	var gHex = g.toString(16)
	var bHex = b.toString(16)

	if(rHex.length == 1){rHex = '0' + rHex}
	if(gHex.length == 1){gHex = '0' + gHex}
	if(bHex.length == 1){bHex = '0' + bHex}

	return parseInt('0x' + rHex + gHex + bHex);
}

function handleSuccess(stream){
	const audioTracks = stream.getAudioTracks()
	console.log(stream)
}

function handleError(error){
	console.log(error)
}


navigator.mediaDevices.getUserMedia({audio: true, video: false}).then(handleSuccess).catch(handleError)
init()
animate()
