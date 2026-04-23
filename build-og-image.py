"""Generate og-image.png for Clarys Systems site — 1200x630 dark mode with coral accent."""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

OUT = Path(__file__).parent / "og-image.png"
W, H = 1200, 630
BG = (10, 10, 10)
FG = (245, 245, 245)
ACCENT = (255, 107, 74)
MUTED = (160, 160, 160)


def load_font(size, bold=False):
    candidates = [
        r"C:\Windows\Fonts\segoeuib.ttf" if bold else r"C:\Windows\Fonts\segoeui.ttf",
        r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf",
    ]
    for p in candidates:
        try:
            return ImageFont.truetype(p, size)
        except OSError:
            continue
    return ImageFont.load_default()


img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)

d.rectangle([(0, 0), (12, H)], fill=ACCENT)

title_font = load_font(88, bold=True)
tagline_font = load_font(36, bold=False)
brand_font = load_font(28, bold=True)
dot_font = load_font(28, bold=True)

pad_x = 80
pad_y = 110

d.text((pad_x, pad_y), "CLARYS SYSTEMS", fill=ACCENT, font=brand_font)

title = "Smart automation\nfor your business."
d.multiline_text((pad_x, pad_y + 70), title, fill=FG, font=title_font, spacing=10)

tagline = "We build systems that take the busywork out of your workday."
d.text((pad_x, H - 180), tagline, fill=MUTED, font=tagline_font)

d.text((pad_x, H - 90), "claryssystems.com", fill=FG, font=brand_font)

img.save(OUT, "PNG", optimize=True)
print(f"Wrote {OUT} ({OUT.stat().st_size} bytes, {W}x{H})")
