import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js'
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js'

const camera = new THREE.PerspectiveCamera(
  10,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 43
const scene = new THREE.Scene()
let char
let mixer
const loader = new GLTFLoader()
loader.load(
  '/assets/images/3d/fairy__the_legend_of_zelda_botw.glb',
  function (gltf) {
    char = gltf.scene
    char.position.y = 1
    char.position.x = 5
    scene.add(char)

    mixer = new THREE.AnimationMixer(char)
    mixer.clipAction(gltf.animations[0]).play()
    console.log(gltf.animations)
  },
  function (xhr) {
    console.log(xhr)
  },
  function (error) {
    console.log(error)
  }
)
const renderer = new THREE.WebGLRenderer({ alpha: true })

renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById('container3D').appendChild(renderer.domElement)

const ambientLight = new THREE.AmbientLight(0xffffff, 1.3)
scene.add(ambientLight)

const topLight = new THREE.DirectionalLight(0xffffff, 1)
topLight.position.set(500, 500, 500)
scene.add(topLight)

const reRender3D = () => {
  requestAnimationFrame(reRender3D)
  renderer.render(scene, camera)
  if (mixer) mixer.update(0.02)
}
reRender3D()

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})
