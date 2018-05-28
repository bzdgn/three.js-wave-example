/*
    Written by Levent Divilioglu, June-2018
*/
var example = (function() {
    "use strict";
    
    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer();
    //var renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
    var light = new THREE.AmbientLight(0xffffff);
    var camera;
    var plane, numberOfVerticies;
    var currentWaveHeight = 10;
    var rowSize = 150;
    var maxHeight = 20;
    var t = 0.0;
    
    // https://stackoverflow.com/a/20434960/3128926
    window.addEventListener( 'resize', onWindowResize, false );
    
    function initScene() {
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("webgl-container").appendChild(renderer.domElement);
        
        scene.add(light);
        
        camera = new THREE.PerspectiveCamera(
            35,
            window.innerWidth/window.innerHeight,
            1,
            1000
        );
        camera.position.x = -240;
        camera.position.z = 220;
        camera.position.y = -100;
        
        camera.rotation.x = getRadian(20);
        camera.rotation.z = getRadian(20);
        camera.rotation.y = getRadian(-45);
        
        var material = new THREE.MeshBasicMaterial({
            color: 0x0000FF,
            wireframe: true
        });
        
        plane = new THREE.Mesh(new THREE.PlaneGeometry(150, 150, rowSize, rowSize), material);
        plane.rotation.y = getRadian(-90);
        plane.rotation.z = getRadian(90);
        plane.position.y = -20;
        
        numberOfVerticies = plane.geometry.vertices.length;
        
        initPlane();
        scene.add(plane);
        
        requestAnimationFrame(render);
    }
    
    function initPlane() {
        
        for(var j = 0; j < rowSize+1; j++) {
            for(var i = 0; i < rowSize+1; i++) {
                //plane.geometry.vertices[(rowSize+1)*j + i].z = maxHeight-j%maxHeight;
                plane.geometry.vertices[(rowSize+1)*j + i].z = maxHeight*Math.sin(j/rowSize*3);
            }
        }
        
    }
    
    function render() {
        
        for(var j = 0; j < rowSize+1; j++) {
            for(var i = 0; i < rowSize+1; i++) {
                plane.geometry.vertices[(rowSize+1)*j + i].z = maxHeight*Math.sin(j/rowSize*3 + t*.1);
                plane.geometry.vertices[(rowSize+1)*j + i].z += maxHeight/5*Math.sin(j/rowSize*12 + t*0.08);
                plane.geometry.vertices[(rowSize+1)*j + i].z += maxHeight/13*Math.cos(j/rowSize*18 + t*0.4);
                
                plane.geometry.vertices[(rowSize+1)*j + i].z += maxHeight*Math.cos(i/rowSize*3 + t*.1);
                plane.geometry.vertices[(rowSize+1)*j + i].z += maxHeight/5*Math.cos(i/rowSize*12 + t*0.08);
                plane.geometry.vertices[(rowSize+1)*j + i].z += maxHeight/13*Math.sin(i/rowSize*18 + t*0.4);
            }
        }
        t+=0.55;
        
        plane.geometry.verticesNeedUpdate = true;
        
        renderer.render(scene, camera);
        requestAnimationFrame(render);
        
    }

    window.onload = initScene();
    
    return {
        scene : scene
    }
    
    function getRadian(x) {
        return (Math.PI*x)/180;
    }
    
    // https://stackoverflow.com/a/20434960/3128926
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );
    }
    
})();
