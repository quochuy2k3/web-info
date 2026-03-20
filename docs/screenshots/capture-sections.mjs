import captureWebsite from 'capture-website';

const sections = ['modules', 'pricing', 'timeline', 'comparison'];

for (const section of sections) {
  console.log(`Capturing ${section}...`);
  await captureWebsite.file('http://localhost:3000', `/Users/vohuy/Desktop/Private/web-info/docs/screenshots/mobile-${section}.png`, {
    width: 390,
    type: 'png',
    delay: 3,
    overwrite: true,
    deviceScaleFactor: 2,
    element: `#${section}`,
  });
  console.log(`Done: ${section}`);
}
