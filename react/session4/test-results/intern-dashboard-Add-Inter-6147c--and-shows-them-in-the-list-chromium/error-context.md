# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: intern-dashboard.spec.ts >> Add Intern Journey >> adds a new intern and shows them in the list
- Location: tests\intern-dashboard.spec.ts:215:3

# Error details

```
Error: locator.fill: Target page, context or browser has been closed
Call log:
  - waiting for getByPlaceholder('Intern Name')

```

```
Error: browserContext.close: Test ended.
Browser logs:

<launching> C:\Users\Josemafita\AppData\Local\ms-playwright\chromium_headless_shell-1228\chrome-headless-shell-win64\chrome-headless-shell.exe --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-client-side-phishing-detection --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-edgeupdater --disable-extensions --disable-features=AvoidUnnecessaryBeforeUnloadCheckSync,BoundaryEventDispatchTracksNodeRemoval,DestroyProfileOnBrowserClose,DialMediaRouteProvider,GlobalMediaControls,HttpsUpgrades,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,Translate,AutoDeElevate,RenderDocument,OptimizationHints,msForceBrowserSignIn,msEdgeUpdateLaunchServicesPreferredVersion --enable-features=CDPScreenshotNewSurface --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --force-color-profile=srgb --metrics-recording-only --no-first-run --password-store=basic --use-mock-keychain --no-service-autorun --export-tagged-pdf --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --edge-skip-compat-layer-relaunch --disable-infobars --disable-search-engine-choice-screen --disable-sync --enable-unsafe-swiftshader --headless --hide-scrollbars --mute-audio --blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4 --no-sandbox --user-data-dir=C:\Users\JOSEMA~1\AppData\Local\Temp\playwright_chromiumdev_profile-BB42dC --remote-debugging-pipe --no-startup-window
<launched> pid=20148
[pid=20148][err] [0804/115918.815:INFO:CONSOLE:851] "[vite] connecting...", source: http://localhost:5173/@vite/client (851)
[pid=20148][err] [0804/115918.821:INFO:CONSOLE:955] "[vite] connected.", source: http://localhost:5173/@vite/client (955)
[pid=20148][err] [0804/115918.901:INFO:CONSOLE:14336] "%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools font-weight:bold", source: http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=9c2665eb (14336)
[pid=20148][err] [0804/115919.749:INFO:CONSOLE:52] "Uncaught ReferenceError: ScoreStatsContainer is not defined", source: http://localhost:5173/src/App.tsx (52)
[pid=20148][err] [0804/115919.751:INFO:CONSOLE:5258] "%s
[pid=20148][err] 
[pid=20148][err] %s
[pid=20148][err]  An error occurred in the <App> component. Consider adding an error boundary to your tree to customize error handling behavior.
[pid=20148][err] Visit https://react.dev/link/error-boundaries to learn more about error boundaries.", source: http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=9c2665eb (5258)
```