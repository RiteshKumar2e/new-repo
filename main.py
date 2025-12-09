import qrcode
from PIL import Image, ImageDraw, ImageFont

URL = "https://riteshkumar2e.github.io/new-repo/"
OUTPUT_FILE = "unique_hidden_message_qr.png"
WATERMARK_TEXT = "Hidden\nMessage"
QR_COLOR = "#764ba2"
BG_COLOR = "#ffffff"

qr = qrcode.QRCode(
    version=None,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=12,
    border=2,
)

qr.add_data(URL)
qr.make(fit=True)

qr_img = qr.make_image(
    fill_color=QR_COLOR,
    back_color=BG_COLOR
).convert("RGBA")

width, height = qr_img.size

gradient = Image.new("RGBA", (width, height))
g = ImageDraw.Draw(gradient)
for y in range(height):
    r1, g1, b1 = 102, 126, 234
    r2, g2, b2 = 118, 75, 162
    t = y / height
    r = int(r1 + (r2 - r1) * t)
    gg = int(g1 + (g2 - g1) * t)
    b = int(b1 + (b2 - b1) * t)
    g.line([(0, y), (width, y)], fill=(r, gg, b, 30))

qr_img = Image.alpha_composite(qr_img, gradient)

logo_size = min(width, height) // 4
logo = Image.new("RGBA", (logo_size, logo_size), (255, 255, 255, 0))
ld = ImageDraw.Draw(logo)

ld.ellipse([0, 0, logo_size, logo_size], fill="white", outline=QR_COLOR, width=4)

try:
    font = ImageFont.truetype("arial.ttf", logo_size // 5)
except:
    font = ImageFont.load_default()

bbox = ld.multiline_textbbox((0, 0), WATERMARK_TEXT, font=font)
tw = bbox[2] - bbox[0]
th = bbox[3] - bbox[1]

ld.multiline_text(
    ((logo_size - tw) // 2, (logo_size - th) // 2),
    WATERMARK_TEXT,
    fill=QR_COLOR,
    font=font,
    align="center",
    spacing=4
)

qx = (width - logo_size) // 2
qy = (height - logo_size) // 2
qr_img.paste(logo, (qx, qy), logo)

frame = 20
canvas = Image.new("RGBA", (width + frame * 2, height + frame * 2), "white")
cd = ImageDraw.Draw(canvas)

for i in range(frame):
    t = i / frame
    r = int(102 + (118 - 102) * t)
    g = int(126 + (75 - 126) * t)
    b = int(234 + (162 - 234) * t)
    cd.rectangle(
        [i, i, canvas.width - i, canvas.height - i],
        outline=(r, g, b),
        width=1
    )

canvas.paste(qr_img, (frame, frame), qr_img)

final = canvas.convert("RGB")
final.save(OUTPUT_FILE, quality=95, optimize=True)

print(OUTPUT_FILE)
