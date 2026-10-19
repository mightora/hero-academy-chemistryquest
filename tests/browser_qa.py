"""Self-contained UI smoke test for sandbox environments that deny local URL navigation.
Run: python tests/browser_qa.py (requires Playwright and Chromium)."""
from playwright.sync_api import sync_playwright
from pathlib import Path
import re,base64
root=Path(__file__).resolve().parents[1]/'dist'
html=(root/'index.html').read_text()
css=(root/'style.css').read_text()
js='\n'.join((root/f).read_text().replace('export const ','const ').replace('export function ','function ') for f in ('content.js','chemistry.js'))
js+='\n'+re.sub(r'^import .*?;\s*$', '', (root/'app.js').read_text(), flags=re.M)
html=re.sub(r'<link rel="stylesheet" href="\./style.css">','<style>'+css+'</style>',html)
html=html.replace('<script type="module" src="./app.js"></script>','<script>'+js+'</script>')
html=html.replace('src="./icon.svg"','src="data:image/svg+xml;base64,'+base64.b64encode((root/'icon.svg').read_bytes()).decode()+'"')
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 for viewport,name in [({'width':1280,'height':880},'desktop'),({'width':390,'height':844},'mobile')]:
  page=browser.new_page(viewport=viewport,device_scale_factor=1)
  js_errors=[]
  page.on('pageerror',lambda err:js_errors.append(str(err)))
  page.set_content(html,wait_until='load')
  page.get_by_role('heading',name='CHEMISTRYQUEST').wait_for()
  page.screenshot(path=f'/mnt/data/chemistryquest-{name}.png',full_page=True)
  page.get_by_role('button',name='🗺️ Play adventure').click()
  page.get_by_role('heading',name='💧 Matter Meadows').wait_for()
  page.get_by_role('button',name='🏡 Solid, liquid or gas? Stop 1').click()
  page.get_by_role('heading',name='Solid, liquid or gas?').wait_for()
  page.get_by_role('button',name='▶️ Try it').click()
  page.get_by_role('button',name='A. Ice cube').click()
  page.get_by_role('button',name='Next challenge →').click()
  page.get_by_role('button',name='B. Air').click()
  page.get_by_role('button',name='Restore this place ⭐').click()
  assert '30' in page.locator('#stars').inner_text(), page.locator('#stars').inner_text()
  page.get_by_role('button',name='🗺️ Back to map').click()
  assert '1 of 10' in page.locator('main').inner_text()
  page.get_by_role('button',name=re.compile(r'Lab')).first.click()
  page.get_by_role('button',name='💧 Dissolves').click()
  page.get_by_role('button',name='🔎 Reveal result').click()
  assert 'Great prediction' in page.locator('main').inner_text()
  page.locator('#temperature').fill('100')
  assert '100' in page.locator('#temperature-label').inner_text()
  page.get_by_role('button',name=re.compile(r'Elements')).first.click()
  assert page.locator('.elem').count()==118,page.locator('.elem').count()
  page.locator('#search-elements').fill('oxygen')
  assert 'O — Oxygen' in page.locator('main').inner_text()
  page.get_by_role('button',name=re.compile(r'Equations')).first.click()
  page.locator('#coeff-0').select_option('2')
  page.locator('#coeff-2').select_option('2')
  page.get_by_role('button',name='✅ Check balance').click()
  assert 'Balanced!' in page.locator('main').inner_text()
  page.get_by_role('button',name=re.compile(r'Grown-ups')).first.click()
  assert 'Learning and settings' in page.locator('main').inner_text()
  # Hands-on quest finales: state change, actual virtual mixture, element selection, balancing and Rf maths.
  def start_special(year, mission):
   page.locator('.tabs button[data-nav="home"]').click()
   page.locator(f'[data-action="world:{year}"]').first.click()
   page.locator(f'[data-action="lesson:Y{year}-{mission:02d}"]').click()
   page.get_by_role('button',name='▶️ Try it').click()
  start_special(4,2)
  page.locator('[data-action="answer:1"]').click() # Melting
  page.get_by_role('button',name='Next challenge →').click()
  page.locator('#special-heat').fill('10')
  page.get_by_role('button',name='✨ Check experiment').click()
  assert 'You did it' in page.locator('main').inner_text()
  page.get_by_role('button',name='Restore this place ⭐').click()
  start_special(5,3)
  page.locator('[data-action="answer:0"]').click() # Solution
  page.get_by_role('button',name='Next challenge →').click()
  page.get_by_role('button',name='✨ Check experiment').click() # water+salt solution
  assert 'You did it' in page.locator('main').inner_text()
  page.get_by_role('button',name='Restore this place ⭐').click()
  start_special(7,2)
  page.locator('[data-action="answer:0"]').click() # O
  page.get_by_role('button',name='Next challenge →').click()
  page.locator('[data-action="special-element:Fe"]').click()
  page.get_by_role('button',name='✨ Check experiment').click()
  assert 'You did it' in page.locator('main').inner_text()
  page.get_by_role('button',name='Restore this place ⭐').click()
  start_special(10,7)
  page.locator('[data-action="answer:0"]').click() # 2
  page.get_by_role('button',name='Next challenge →').click()
  page.locator('#special-coeff-0').select_option('4')
  page.locator('#special-coeff-1').select_option('3')
  page.locator('#special-coeff-2').select_option('2')
  page.get_by_role('button',name='✨ Check experiment').click()
  assert 'You did it' in page.locator('main').inner_text()
  page.get_by_role('button',name='Restore this place ⭐').click()
  start_special(11,7)
  page.locator('[data-action="answer:0"]').click() # 0.5
  page.get_by_role('button',name='Next challenge →').click()
  page.locator('#special-rf').fill('0.5')
  page.get_by_role('button',name='✨ Check experiment').click()
  assert 'You did it' in page.locator('main').inner_text()
  page.get_by_role('button',name='Restore this place ⭐').click()
  assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth + 1'),'horizontal page overflow'
  assert not js_errors, f'js errors: {js_errors}'
  print(name,'quests, navigation, mixing, particles, elements, equations, settings and width OK')
  page.close()
 browser.close()