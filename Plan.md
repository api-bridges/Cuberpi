Create a Three.js 3D cube world with the following requirements:

1. SCENE:
- Fullscreen responsive canvas (fit entire screen)
- Dark futuristic background (space-like or gradient)
- Perspective camera with smooth orbit controls
- Add subtle fog for depth

2. GRID SYSTEM:
- Generate cubes in a 3D coordinate grid (X, Y, Z)
- Each cube represents a coordinate (store x, y, z in userData)
- Use spacing between cubes (like a matrix)
- Cubes should be semi-transparent with glowing edges (neon style)

3. INFINITE WORLD (IMPORTANT):
- Do NOT render infinite cubes at once
- Only render cubes within a certain radius from camera (e.g., 10x10x10 area)
- Dynamically load/unload cubes as camera moves
- Use chunk system or spatial partitioning

4. PERFORMANCE:
- Use InstancedMesh for cubes (important for performance)
- Limit draw calls
- Smooth rendering at 60fps

5. INTERACTION:
- Add raycasting
- When user clicks a cube:
    - Highlight it (change color or glow)
    - Log its coordinates (x, y, z)
- Add hover effect (slight scale or color change)

6. CAMERA CONTROLS:
- Mouse drag to rotate
- Scroll to zoom
- Optional: WASD movement

7. VISUAL STYLE:
- Neon glow colors (blue, purple, cyan)
- Slight emissive material
- Grid floor or axis helpers (X, Y, Z lines)

8. CLEAN STRUCTURE:
- Separate functions:
    initScene()
    createCubeChunk()
    updateVisibleCubes()
    handleClick()
    animate()

9. OPTIMIZATION:
- Frustum culling
- Only update cubes when camera moves significantly

10. OUTPUT:
- Provide complete working code (HTML + JS or module-based)
- No UI panels, no chat system, only 3D cube world
