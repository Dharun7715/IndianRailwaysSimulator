# Indian Railways Real Driving Simulator (Alpha)

Browser-based 3D train-driving prototype using Three.js. Includes a WAP-7-inspired locomotive and coaches, trackside scenery, chase and driver-cab camera modes, traction/brake controls, dashboard, and a Chennai Central → Salem Junction themed route.

## Run locally
1. Clone or download this repository.
2. Open a terminal in the project folder.
3. Run `python -m http.server 8000`.
4. Visit `http://localhost:8000`.

An internet connection is required to load Three.js from jsDelivr.

## Controls
- W / Up Arrow: increase power
- A: reduce power
- S / Down Arrow / X: apply brake
- Z: release brake
- Space: emergency brake
- R: reset emergency brake when stopped
- C: toggle driver-cab / external camera
- H: horn cue
- F: toggle headlights
- Pause button: pause/resume

## Important
This is an early illustrative game prototype, not an official Indian Railways product or a certified simulator. Vehicle physics, signals, route geography, and controls are simplified and are not suitable for real-world railway operation.