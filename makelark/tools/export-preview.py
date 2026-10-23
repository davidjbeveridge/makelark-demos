#!/usr/bin/env python3
"""Build a portable, offline homepage review file. No third-party packages required."""
import argparse
import base64
import json
import mimetypes
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]

def data_url(path):
    mime = {'.woff': 'font/woff', '.svg': 'image/svg+xml', '.webp': 'image/webp'}.get(path.suffix)
    mime = mime or mimetypes.guess_type(path.name)[0] or 'application/octet-stream'
    return f'data:{mime};base64,' + base64.b64encode(path.read_bytes()).decode('ascii')

def build(output):
    html = (ROOT / 'index.html').read_text()
    license_text = (ROOT / 'assets/manrope-OFL.txt').read_text()
    html = html.replace('<head>', '<head>\n<!-- Embedded Manrope font license:\n' + license_text.replace('--', '\u2014') + '\n-->')
    assets = {p.name: data_url(p) for p in sorted((ROOT / 'assets').iterdir()) if p.suffix in ('.svg', '.webp')}
    html = re.sub(r'\s*<link rel="preload"[^>]+>', '', html)
    for name in ('styles.css', 'demo.css'):
        css = (ROOT / name).read_text()
        css = re.sub(r"url\(['\"]?(assets/[^)'\"]+)['\"]?\)", lambda m: 'url("' + data_url(ROOT / m.group(1)) + '")', css)
        html = html.replace(f'<link rel="stylesheet" href="{name}">', f'<style>\n{css}\n</style>')
    html = re.sub(r'(src|href)="assets/([^"]+)"', lambda m: f'{m.group(1)}="{assets[m.group(2)]}"', html)
    scripts = ['window.MAKELARK_ASSETS = ' + json.dumps(assets, separators=(',', ':')) + ';']
    for name in ('demo.js', 'script.js'):
        html = html.replace(f'<script src="{name}" defer></script>', '')
        scripts.append((ROOT / name).read_text().replace('</script', '<\\/script'))
    html = html.replace('</body>', '<script>\n' + '\n;\n'.join(scripts) + '\n</script>\n</body>')
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(html)
    print(f'{output} ({output.stat().st_size:,} bytes)')

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('output', type=Path, help='Destination HTML file, outside the source directory recommended')
    build(parser.parse_args().output.resolve())
