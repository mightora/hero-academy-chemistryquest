"""Browser smoke for interactive workshops, run with system Chromium and Playwright."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import re, base64
root=Path(__file__).resolve().parents[1]/'dist'
html=(root/'index.html').read_text()
css=(root/'style.css').read_text()
parts=[]
for name in ['content.js','chemistry.js','discoveries.js']:
 code=(root/name).read_text().replace('export const ','const ').replace('export function ','function ')
 parts.append(code)
parts.append(re.sub(r'^import .*?;\s*$', '', (root/'app.js').read_text(),flags=re.M))
html=html.replace('<link rel="stylesheet" href="./style.css">','<style>'+css+'</style>')
html=html.replace('<script type="module" src="./app.js"></script>','<script>'+'\n'.join(parts)+'</script>')
html=html.replace('src="./icon.svg"','src="data:image/svg+xml;base64,'+base64.b64encode((root/'icon.svg').read_bytes()).decode()+'"')
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 for width,height in [(1280,880),(390,844)]:
  page=browser.new_page(viewport={'width':width,'height':height})
  errors=[]
  page.on('pageerror',lambda e:errors.append(str(e)))
  page.set_content(html,wait_until='load')
  page.locator('[data-nav=workshop]').click()
  page.get_by_role('heading',name='🔬 Discovery Workshop').wait_for()
  page.locator('[data-action="atom-plus:H"]').click()
  page.locator('[data-action="atom-plus:H"]').click()
  page.locator('[data-action="atom-plus:O"]').click()
  page.locator('[data-action="check-discovery"]').click()
  assert 'Correct!' in page.locator('main').inner_text(),page.locator('main').inner_text()
  page.locator('[data-action="discovery:separation"]').click()
  page.locator('[data-action="check-discovery"]').click()
  assert 'Great choice!' in page.locator('main').inner_text()
  page.locator('[data-action="discovery:chromatography"]').click()
  page.locator('[data-action="check-discovery"]').click()
  assert 'Correct!' in page.locator('main').inner_text()
  page.locator('[data-action="discovery:moles"]').click()
  page.locator('[data-action="check-discovery"]').click()
  assert 'Correct!' in page.locator('main').inner_text()
  page.locator('[data-action="discovery:rate"]').click()
  page.locator('#temperature').fill('60')
  page.locator('[data-action="check-discovery"]').click()
  assert 'Predicted collision' in page.locator('main').inner_text()
  assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth + 1'),'overflow'
  assert not errors,errors
  print(f'PASS {width}x{height}: six-workshop navigation, experiments, scores, layout')
  page.close()
 browser.close()