#!/bin/bash
npx capture-website-cli@4 http://localhost:3000 --output=/Users/vohuy/Desktop/Private/web-info/docs/screenshots/mobile-modules.png --width=390 --type=png --delay=3 --overwrite --device-scale-factor=2 --element="#modules"
npx capture-website-cli@4 http://localhost:3000 --output=/Users/vohuy/Desktop/Private/web-info/docs/screenshots/mobile-pricing.png --width=390 --type=png --delay=3 --overwrite --device-scale-factor=2 --element="#pricing"
npx capture-website-cli@4 http://localhost:3000 --output=/Users/vohuy/Desktop/Private/web-info/docs/screenshots/mobile-timeline.png --width=390 --type=png --delay=3 --overwrite --device-scale-factor=2 --element="#timeline"
npx capture-website-cli@4 http://localhost:3000 --output=/Users/vohuy/Desktop/Private/web-info/docs/screenshots/mobile-comparison.png --width=390 --type=png --delay=3 --overwrite --device-scale-factor=2 --element="#comparison"
