const inputs = [
    'brandName', 'tagline', 'brandColor', 'taglineColor',
    'greeting', 'bodyText', 'bodyBg', 'btnText', 'btnUrl', 'btnBg',
    'logoUrl', 'address', 'businessEmail', 'phone',
    'linkedinUrl', 'facebookUrl', 'instagramUrl', 'youtubeUrl'
];

const iframe = document.getElementById('email-preview');
const copyBtn = document.getElementById('copyBtn');

function generateTemplate() {
    const vals = {};
    inputs.forEach(id => {
        const el = document.getElementById(id);
        vals[id] = el ? el.value : '';
    });

    return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background-color:#e2e6f0;font-family:'Segoe UI', Arial, sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="center" style="padding:40px 0;">

<table width="600" cellpadding="0" cellspacing="0" border="0" 
style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.1);">

    <tr>
    <td align="center" style="padding:40px 20px;background:${vals.bodyBg};">
        <h1 style="margin:0;font-size:28px;color:${vals.brandColor};font-weight:600;">
            ${vals.brandName}
        </h1>
        <p style="margin:8px 0 0 0;font-size:10px;color:${vals.taglineColor};letter-spacing:2px;text-transform:uppercase;">
            ${vals.tagline}
        </p>
    </td>
    </tr>

    <tr>
    <td style="padding:40px 30px;background:${vals.bodyBg};">
        <h2 style="margin:0 0 20px 0;font-size:22px;color:#ffffff;">
            ${vals.greeting}
        </h2>
        <p style="font-size:16px;line-height:1.6;color:#dddddd;margin-bottom:25px;">
            ${vals.bodyText ? vals.bodyText.replace(/\n/g, '<br>') : ''}
        </p>
        <table cellpadding="0" cellspacing="0" border="0" align="center">
            <tr>
                <td bgcolor="${vals.btnBg}" style="border-radius:6px;">
                    <a href="${vals.btnUrl}" style="display:inline-block;padding:12px 24px;color:#ffffff;text-decoration:none;font-weight:bold;font-size:14px;">
                        ${vals.btnText}
                    </a>
                </td>
            </tr>
        </table>
    </td>
    </tr>

    <tr>
    <td style="padding:40px 30px;background:${vals.bodyBg};text-align:center;border-top:1px solid rgba(255,255,255,0.1);">
        
        ${vals.logoUrl ? `<img src="${vals.logoUrl}" width="100" style="display:block;margin:0 auto 20px auto;">` : ''}

        <div style="color:#aaaaaa;font-size:13px;line-height:1.6;margin-bottom:20px;">
            ${vals.address ? `<p style="margin:0;">${vals.address}</p>` : ''}
            <p style="margin:5px 0 0 0;">
                ${vals.businessEmail ? `<a href="mailto:${vals.businessEmail}" style="color:${vals.btnBg};text-decoration:none;">${vals.businessEmail}</a>` : ''}
                ${vals.businessEmail && vals.phone ? ' | ' : ''}
                ${vals.phone ? `<span style="color:#aaaaaa;">${vals.phone}</span>` : ''}
            </p>
        </div>

        <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom:20px;">
        <tr>
            ${vals.facebookUrl ? `<td><a href="${vals.facebookUrl}" style="padding:0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" width="24" style="filter:brightness(0) invert(1);opacity:0.7;"></a></td>` : ''}
            ${vals.instagramUrl ? `<td><a href="${vals.instagramUrl}" style="padding:0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" width="24" style="filter:brightness(0) invert(1);opacity:0.7;"></a></td>` : ''}
            ${vals.linkedinUrl ? `<td><a href="${vals.linkedinUrl}" style="padding:0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="24" style="filter:brightness(0) invert(1);opacity:0.7;"></a></td>` : ''}
            ${vals.youtubeUrl ? `<td><a href="${vals.youtubeUrl}" style="padding:0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" width="24" style="filter:brightness(0) invert(1);opacity:0.7;"></a></td>` : ''}
        </tr>
        </table>

        <p style="color:#666666;font-size:11px;margin:0;text-transform:uppercase;letter-spacing:1px;">
            © 2026 ${vals.brandName}. All rights reserved.
        </p>
    </td>
    </tr>

</table>
</td>
</tr>
</table>
</body>
</html>`;
}

function updatePreview() {
    iframe.srcdoc = generateTemplate();
}

inputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updatePreview);
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(generateTemplate()).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = "✓ Copied!";
        copyBtn.style.background = "#10b981";
        setTimeout(() => {
            copyBtn.innerText = originalText;
            copyBtn.style.background = "#1365fd";
        }, 2000);
    });
});

updatePreview();