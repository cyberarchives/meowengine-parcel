export class ThreeDViewport {
    static init3DViewport() {
        const existingContainer = document.getElementById('meow-engine-container');
        if (existingContainer) existingContainer.remove();

        // Create container with improved styling
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '20px';
        container.style.left = '20px'; // Moved to right side for better visibility
        container.style.width = '240px';
        container.style.height = '240px';
        container.style.zIndex = '9999';
        container.style.borderRadius = '12px';
        container.style.overflow = 'hidden';
        container.style.boxShadow = '0 0 20px rgba(0, 255, 170, 0.4), 0 0 40px rgba(0, 0, 0, 0.5)';
        container.style.backgroundColor = 'rgba(8, 10, 20, 0.85)';
        container.style.backdropFilter = 'blur(10px)';
        container.style.border = '1px solid rgba(0, 255, 170, 0.5)';
        container.style.transition = 'all 0.3s ease';
        container.id = 'meow-engine-container';

        // Add header bar
        const header = document.createElement('div');
        header.style.position = 'absolute';
        header.style.top = '0';
        header.style.left = '0';
        header.style.width = '100%';
        header.style.height = '30px';
        header.style.backgroundColor = 'rgba(0, 25, 40, 0.8)';
        header.style.borderBottom = '1px solid rgba(0, 255, 170, 0.5)';
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        header.style.padding = '0 12px';
        header.style.boxSizing = 'border-box';
        header.style.userSelect = 'none';
        header.style.cursor = 'move'; // Indicate draggable
        container.appendChild(header);

        // Create logo/title with icon
        const title = document.createElement('div');
        title.innerHTML = '<span style="color: #00e5ff; margin-right: 5px;">◆</span>MeowEngine';
        title.style.color = '#00ffaa';
        title.style.fontFamily = '"JetBrains Mono", "Fira Code", monospace';
        title.style.fontSize = '14px';
        title.style.fontWeight = 'bold';
        title.style.textShadow = '0 0 5px rgba(0, 255, 170, 0.7)';
        header.appendChild(title);

        // Create toggle button
        const toggleBtn = document.createElement('div');
        toggleBtn.innerHTML = '−'; // Minus sign (will toggle to + when minimized)
        toggleBtn.style.color = '#00ffaa';
        toggleBtn.style.fontSize = '16px';
        toggleBtn.style.fontWeight = 'bold';
        toggleBtn.style.cursor = 'pointer';
        toggleBtn.style.width = '20px';
        toggleBtn.style.height = '20px';
        toggleBtn.style.display = 'flex';
        toggleBtn.style.justifyContent = 'center';
        toggleBtn.style.alignItems = 'center';
        toggleBtn.style.borderRadius = '4px';
        toggleBtn.style.transition = 'all 0.2s ease';
        toggleBtn.style.textShadow = '0 0 5px rgba(0, 255, 170, 0.7)';
        header.appendChild(toggleBtn);

        // Hover effect for toggle button
        toggleBtn.addEventListener('mouseover', () => {
            toggleBtn.style.backgroundColor = 'rgba(0, 255, 170, 0.2)';
        });
        toggleBtn.addEventListener('mouseout', () => {
            toggleBtn.style.backgroundColor = 'transparent';
        });

        // Create canvas container
        const canvasContainer = document.createElement('div');
        canvasContainer.style.position = 'relative';
        canvasContainer.style.width = '100%';
        canvasContainer.style.height = 'calc(100% - 30px)';
        canvasContainer.style.top = '30px';
        canvasContainer.style.overflow = 'hidden';
        container.appendChild(canvasContainer);

        // Create canvas with high-resolution support
        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvasContainer.appendChild(canvas);

        // Add shape indicator with improved styling
        const shapeIndicator = document.createElement('div');
        shapeIndicator.textContent = 'Sphere';
        shapeIndicator.style.position = 'absolute';
        shapeIndicator.style.bottom = '10px';
        shapeIndicator.style.left = '0';
        shapeIndicator.style.width = '100%';
        shapeIndicator.style.color = '#ffffff';
        shapeIndicator.style.fontFamily = '"JetBrains Mono", "Fira Code", monospace';
        shapeIndicator.style.fontSize = '13px';
        shapeIndicator.style.textAlign = 'center';
        shapeIndicator.style.textShadow = '0 0 5px rgba(0, 255, 170, 0.7)';
        shapeIndicator.style.padding = '5px';
        shapeIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        shapeIndicator.style.borderRadius = '4px';
        shapeIndicator.style.opacity = '0.9';
        canvasContainer.appendChild(shapeIndicator);

        // Add shape change button
        const changeShapeBtn = document.createElement('div');
        changeShapeBtn.innerHTML = '⟳'; // Refresh icon
        changeShapeBtn.style.position = 'absolute';
        changeShapeBtn.style.bottom = '10px';
        changeShapeBtn.style.right = '10px';
        changeShapeBtn.style.width = '30px';
        changeShapeBtn.style.height = '30px';
        changeShapeBtn.style.backgroundColor = 'rgba(0, 255, 170, 0.2)';
        changeShapeBtn.style.color = '#00ffaa';
        changeShapeBtn.style.display = 'flex';
        changeShapeBtn.style.justifyContent = 'center';
        changeShapeBtn.style.alignItems = 'center';
        changeShapeBtn.style.borderRadius = '50%';
        changeShapeBtn.style.cursor = 'pointer';
        changeShapeBtn.style.fontSize = '16px';
        changeShapeBtn.style.boxShadow = '0 0 10px rgba(0, 255, 170, 0.3)';
        changeShapeBtn.style.transition = 'all 0.2s ease';
        changeShapeBtn.style.zIndex = '2';
        canvasContainer.appendChild(changeShapeBtn);

        // Hover effect for change button
        changeShapeBtn.addEventListener('mouseover', () => {
            changeShapeBtn.style.backgroundColor = 'rgba(0, 255, 170, 0.4)';
            changeShapeBtn.style.transform = 'rotate(30deg)';
        });
        changeShapeBtn.addEventListener('mouseout', () => {
            changeShapeBtn.style.backgroundColor = 'rgba(0, 255, 170, 0.2)';
            changeShapeBtn.style.transform = 'rotate(0deg)';
        });

        // Add to document
        document.body.appendChild(container);

        // Add loading indicator
        const loadingOverlay = document.createElement('div');
        loadingOverlay.style.position = 'absolute';
        loadingOverlay.style.top = '30px';
        loadingOverlay.style.left = '0';
        loadingOverlay.style.width = '100%';
        loadingOverlay.style.height = 'calc(100% - 30px)';
        loadingOverlay.style.backgroundColor = 'rgba(8, 10, 20, 0.9)';
        loadingOverlay.style.display = 'flex';
        loadingOverlay.style.flexDirection = 'column';
        loadingOverlay.style.justifyContent = 'center';
        loadingOverlay.style.alignItems = 'center';
        loadingOverlay.style.zIndex = '10';
        loadingOverlay.style.transition = 'opacity 0.5s ease';
        container.appendChild(loadingOverlay);

        // Add spinner animation
        const spinner = document.createElement('div');
        spinner.style.width = '40px';
        spinner.style.height = '40px';
        spinner.style.borderRadius = '50%';
        spinner.style.border = '3px solid rgba(0, 255, 170, 0.1)';
        spinner.style.borderTop = '3px solid rgba(0, 255, 170, 0.8)';
        spinner.style.animation = 'meow-spin 1s linear infinite';
        loadingOverlay.appendChild(spinner);

        // Add spinner animation style
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes meow-spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes meow-pulse {
                0% { opacity: 0.7; }
                50% { opacity: 1; }
                100% { opacity: 0.7; }
            }
        `;
        document.head.appendChild(style);

        // Add loading text
        const loadingText = document.createElement('div');
        loadingText.textContent = 'Initializing Engine...';
        loadingText.style.color = '#00ffaa';
        loadingText.style.fontFamily = '"JetBrains Mono", "Fira Code", monospace';
        loadingText.style.fontSize = '12px';
        loadingText.style.marginTop = '15px';
        loadingText.style.animation = 'meow-pulse 1.2s infinite';
        loadingOverlay.appendChild(loadingText);

        // Load Three.js
        function loadScript(url) {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = url;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }

        // Use Promise to ensure scripts are loaded in sequence
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js')
            .then(() => {
                // Remove loading overlay with fade
                setTimeout(() => {
                    loadingOverlay.style.opacity = '0';
                    setTimeout(() => {
                        loadingOverlay.remove();
                    }, 500);
                }, 1000);

                initViewer();

                // Log to meowLog if available
                if (window.meowLog) {
                    window.meowLog("<color=#00ffaa>✓</color> <bold>MeowEngine</bold> initialized with <glow>WebGL</glow>");
                }
            })
            .catch(error => {
                console.error("Failed to load required libraries:", error);
                loadingText.textContent = 'Failed to initialize engine';
                loadingText.style.color = '#ff3d71';
                spinner.style.borderTop = '3px solid #ff3d71';
                spinner.style.animation = 'none';
                spinner.style.transform = 'rotate(45deg)';
            });

        // Adding toggle minimize/maximize functionality
        let isMinimized = false;
        toggleBtn.addEventListener('click', () => {
            if (isMinimized) {
                container.style.height = '240px';
                toggleBtn.innerHTML = '−';
                canvasContainer.style.display = 'block';
                isMinimized = false;
            } else {
                container.style.height = '30px';
                toggleBtn.innerHTML = '+';
                canvasContainer.style.display = 'none';
                isMinimized = true;
            }
        });

        function initViewer() {
            // Get container dimensions
            const width = container.offsetWidth;
            const height = container.offsetHeight - 30; // Account for header

            // Create renderer with better quality
            const renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true,
                alpha: true,
                precision: 'highp'
            });
            renderer.setSize(width, height);
            renderer.setPixelRatio(window.devicePixelRatio);

            // Create scene with better environment
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0x080a14);
            window.meowEngineScene = scene; // Store scene globally for external access

            // Create camera with better positioning
            const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
            camera.position.set(0, 0, 5);

            // Add improved lighting
            const ambientLight = new THREE.AmbientLight(0x404040, 2);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0x00ffaa, 1);
            directionalLight.position.set(1, 1, 1);
            scene.add(directionalLight);

            const backLight = new THREE.DirectionalLight(0x00e5ff, 0.5);
            backLight.position.set(-1, -1, -1);
            scene.add(backLight);

            // Create background grid
            const gridHelper = new THREE.GridHelper(20, 20, 0x00ffaa, 0x001a14);
            gridHelper.position.y = -2;
            scene.add(gridHelper);

            // Improved material for all shapes with glow effect
            const material = new THREE.MeshPhongMaterial({
                color: 0x00ffaa,
                wireframe: true,
                transparent: true,
                opacity: 0.9,
                emissive: 0x00ffaa,
                emissiveIntensity: 0.3,
                shininess: 90,
                specular: 0xffffff
            });

            // Available shapes with more complex geometries
            const shapes = [
                { name: 'Sphere', geometry: new THREE.SphereGeometry(1.2, 24, 24) },
                { name: 'Disk', geometry: new THREE.CylinderGeometry(1.2, 1.2, 0.1, 36) },
                { name: 'Cube', geometry: new THREE.BoxGeometry(1.7, 1.7, 1.7, 2, 2, 2) },
                { name: 'Torus', geometry: new THREE.TorusGeometry(1, 0.4, 20, 36) },
                { name: 'Cone', geometry: new THREE.ConeGeometry(1, 2, 32) },
                { name: 'Octahedron', geometry: new THREE.OctahedronGeometry(1.3, 1) },
                { name: 'Tetrahedron', geometry: new THREE.TetrahedronGeometry(1.4, 1) },
                { name: 'Dodecahedron', geometry: new THREE.DodecahedronGeometry(1.3, 0) },
                { name: 'Icosahedron', geometry: new THREE.IcosahedronGeometry(1.3, 0) },
                { name: 'Knot', geometry: new THREE.TorusKnotGeometry(0.9, 0.3, 100, 16) }
            ];

            // Create mesh with first shape
            let currentShapeIndex = 0;
            let mesh = new THREE.Mesh(shapes[currentShapeIndex].geometry, material);
            scene.add(mesh);
            shapeIndicator.textContent = shapes[currentShapeIndex].name;

            // Shape transition variables
            let isTransitioning = false;
            let transitionStartTime = 0;
            let transitionDuration = 1500; // 1.5 seconds
            let targetShape = null;
            let currentVertices = null;
            let targetVertices = null;

            // Function to change shape with improved transition
            function changeShape() {
                if (isTransitioning) return;

                const previousIndex = currentShapeIndex;
                currentShapeIndex = (currentShapeIndex + 1) % shapes.length;

                // Show shape change visually
                shapeIndicator.style.transform = 'scale(1.1)';
                shapeIndicator.style.opacity = '1';
                setTimeout(() => {
                    shapeIndicator.style.transform = 'scale(1)';
                }, 200);

                // Setup transition
                isTransitioning = true;
                transitionStartTime = Date.now();

                // Get current geometry's vertices
                const currentGeometry = shapes[previousIndex].geometry;
                const targetGeometry = shapes[currentShapeIndex].geometry;

                // Create morphing geometry by using the one with more vertices
                let morphGeometry;
                if (currentGeometry.attributes.position.count >= targetGeometry.attributes.position.count) {
                    morphGeometry = currentGeometry.clone();
                    targetVertices = padVertices(targetGeometry.attributes.position.array, currentGeometry.attributes.position.count * 3);
                    currentVertices = [...currentGeometry.attributes.position.array];
                } else {
                    morphGeometry = targetGeometry.clone();
                    currentVertices = padVertices(currentGeometry.attributes.position.array, targetGeometry.attributes.position.count * 3);
                    targetVertices = [...targetGeometry.attributes.position.array];
                }

                // Replace the mesh
                scene.remove(mesh);
                mesh = new THREE.Mesh(morphGeometry, material);
                scene.add(mesh);

                // Update shape name with animation
                shapeIndicator.style.opacity = '0';
                setTimeout(() => {
                    shapeIndicator.textContent = shapes[currentShapeIndex].name;
                    shapeIndicator.style.opacity = '0.9';
                }, 300);
            }

            // Connect shape change button
            changeShapeBtn.addEventListener('click', changeShape);

            // Pad vertices array to match larger geometry
            function padVertices(vertices, targetLength) {
                const result = [...vertices];
                while (result.length < targetLength) {
                    // Add center point coordinates (0,0,0) for missing vertices
                    result.push(0, 0, 0);
                }
                return result;
            }

            // Handle interpolation between shapes with improved easing
            function updateMorphing() {
                if (!isTransitioning) return;

                const elapsed = Date.now() - transitionStartTime;
                const progress = Math.min(elapsed / transitionDuration, 1);

                // Apply smooth easing
                const easedProgress = easeInOutCubic(progress);

                // Interpolate vertices
                for (let i = 0; i < mesh.geometry.attributes.position.array.length; i++) {
                    mesh.geometry.attributes.position.array[i] = currentVertices[i] * (1 - easedProgress) + targetVertices[i] * easedProgress;
                }

                mesh.geometry.attributes.position.needsUpdate = true;

                // End transition
                if (progress >= 1) {
                    isTransitioning = false;
                    // Replace with clean target geometry
                    scene.remove(mesh);
                    mesh = new THREE.Mesh(shapes[currentShapeIndex].geometry.clone(), material);
                    scene.add(mesh);
                }
            }

            // Improved easing function for smoother transitions
            function easeInOutCubic(t) {
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            }

            // Change shape every 8 seconds
            const autoChangeInterval = setInterval(changeShape, 8000);

            // Enhanced drag handling
            let isDragging = false;
            let offsetX, offsetY;

            header.addEventListener('mousedown', function(e) {
                isDragging = true;
                offsetX = e.clientX - container.getBoundingClientRect().left;
                offsetY = e.clientY - container.getBoundingClientRect().top;
                container.style.cursor = 'grabbing';
                e.preventDefault(); // Prevent text selection
            });

            document.addEventListener('mousemove', function(e) {
                if (isDragging) {
                    container.style.left = (e.clientX - offsetX) + 'px';
                    container.style.top = (e.clientY - offsetY) + 'px';

                    // Keep within window bounds
                    const rect = container.getBoundingClientRect();
                    if (rect.left < 0) container.style.left = '0px';
                    if (rect.top < 0) container.style.top = '0px';
                    if (rect.right > window.innerWidth) container.style.left = (window.innerWidth - rect.width) + 'px';
                    if (rect.bottom > window.innerHeight) container.style.top = (window.innerHeight - rect.height) + 'px';
                }
            });

            document.addEventListener('mouseup', function() {
                if (isDragging) {
                    isDragging = false;
                    container.style.cursor = '';
                }
            });

            // Better handling for clicking
            let clickStartTime = 0;
            let clickStartPosition = { x: 0, y: 0 };

            canvasContainer.addEventListener('mousedown', function(e) {
                clickStartTime = Date.now();
                clickStartPosition = { x: e.clientX, y: e.clientY };
            });

            canvasContainer.addEventListener('mouseup', function(e) {
                // Only consider it a click if it's short and hasn't moved much
                const clickDuration = Date.now() - clickStartTime;
                const moveDistance = Math.sqrt(
                    Math.pow(e.clientX - clickStartPosition.x, 2) +
                    Math.pow(e.clientY - clickStartPosition.y, 2)
                );

                if (clickDuration < 300 && moveDistance < 5) {
                    changeShape();
                }
            });

            // Improved animation loop with variable rotation speeds
            let rotationSpeed = { x: 0.005, y: 0.01 };

            function animate() {
                requestAnimationFrame(animate);

                // Update morphing if in transition
                updateMorphing();

                // Rotate model with dynamic speed
                if (mesh) {
                    mesh.rotation.x += rotationSpeed.x;
                    mesh.rotation.y += rotationSpeed.y;

                    // Create subtle speed variations for more organic movement
                    rotationSpeed.x = 0.005 + Math.sin(Date.now() * 0.001) * 0.002;
                    rotationSpeed.y = 0.01 + Math.cos(Date.now() * 0.0015) * 0.003;
                }

                // Animate grid
                if (gridHelper) {
                    gridHelper.rotation.y += 0.001;
                }

                renderer.render(scene, camera);
            }

            animate();

            // Handle window resize
            window.addEventListener('resize', () => {
                // Only update if not minimized
                if (!isMinimized) {
                    const width = container.offsetWidth;
                    const height = container.offsetHeight - 30;
                    camera.aspect = width / height;
                    camera.updateProjectionMatrix();
                    renderer.setSize(width, height);
                }
            });

            // Clean up function if needed
            container.cleanup = function() {
                clearInterval(autoChangeInterval);
                container.remove();
            };
        }

        // Return API
        return {
            minimize: function() {
                if (!isMinimized) {
                    toggleBtn.click();
                }
            },
            maximize: function() {
                if (isMinimized) {
                    toggleBtn.click();
                }
            },
            destroy: function() {
                if (container.cleanup) container.cleanup();
                container.remove();
            }
        };
    }
}

export default ThreeDViewport;