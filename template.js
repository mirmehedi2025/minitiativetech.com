const inputs = ['brandName', 'tagline', 'brandColor', 'taglineColor', 'greeting', 'bodyText', 'bodyBg', 'btnText', 'btnUrl', 'btnBg'];
const iframe = document.getElementById('email-preview');
const copyBtn = document.getElementById('copyBtn');

// Function to generate the HTML String
function generateTemplate() {
    const vals = {};
    inputs.forEach(id => {
        vals[id] = document.getElementById(id).value;
    });

    return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background-color:#e2e6f0;font-family:Segoe UI, Arial, sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
        <td align="center" style="padding:40px 0;">
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.1);">
                <tr>
                    <td align="center" style="padding:40px 20px;background:#ffffff;">
                        <h1 style="margin:0;font-size:30px;color:${vals.brandColor};font-weight:600;">${vals.brandName}</h1>
                        <p style="margin:8px 0 0 0;font-size:11px;color:${vals.taglineColor};letter-spacing:2px;text-transform:uppercase;">${vals.tagline}</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding:40px 30px;background:${vals.bodyBg};">
                        <h2 style="margin:0 0 20px 0;font-size:22px;color:#ffffff;">${vals.greeting}</h2>
                        <p style="font-size:16px;line-height:1.6;color:#dddddd;margin-bottom:25px;">${vals.bodyText.replace(/\n/g, '<br>')}</p>
                        <table cellpadding="0" cellspacing="0" border="0" align="center">
                            <tr>
                                <td bgcolor="${vals.btnBg}" style="border-radius:6px;">
                                    <a href="${vals.btnUrl}" style="display:inline-block;padding:12px 24px;color:#ffffff;text-decoration:none;font-weight:bold;font-size:14px;">${vals.btnText}</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="padding:30px;background:${vals.bodyBg};text-align:center;border-top:1px solid rgba(255,255,255,0.1);">
                        <p style="color:#999999;font-size:12px;margin:0;">© 2024 ${vals.brandName}. All rights reserved.</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>`;
}

// Function to update the iframe
function updatePreview() {
    const html = generateTemplate();
    iframe.srcdoc = html;
}

// Attach listeners to all inputs
inputs.forEach(id => {
    document.getElementById(id).addEventListener('input', updatePreview);
});

// Copy to Clipboard
copyBtn.addEventListener('click', () => {
    const html = generateTemplate();
    navigator.clipboard.writeText(html).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = "✓ Copied!";
        copyBtn.style.background = "#10b981";
        setTimeout(() => {
            copyBtn.innerText = originalText;
            copyBtn.style.background = "#1365fd";
        }, 2000);
    });
});

// Initial Render
updatePreview();