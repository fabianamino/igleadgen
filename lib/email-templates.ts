export const createEmailTemplate = (
  title: string,
  message: string,
  buttonText: string,
  buttonLink: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body { 
            font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #09090b;
        }
        .container {
            background-color: #18181b;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 12px rgba(240, 89, 218, 0.1);
        }
        .logo-container {
            text-align: center;
            margin-bottom: 32px;
        }
        h1 {
            text-align: center;
            margin-bottom: 24px;
            font-size: 32px;
            font-weight: 700;
            line-height: 1.2;
            color: #ffffff;
        }
        .igleadgen-text {
            color: #f059da;
            font-weight: bold;
        }
        p {
            margin-bottom: 24px;
            font-size: 16px;
            color: #a1a1aa;
            line-height: 1.8;
        }
        .button-container {
            text-align: center;
            margin: 32px 0;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #f059da;
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            transition: background-color 0.2s;
        }
        .button:hover {
            background-color: #d940c0;
        }
        .footer {
            text-align: center;
            margin-top: 32px;
            font-size: 14px;
            color: #71717a;
        }
        .social-links {
            margin-top: 20px;
            text-align: center;
        }
        .social-link {
            color: #f059da;
            text-decoration: none;
            margin: 0 8px;
        }
        .social-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo-container">
            <span class="igleadgen-text" style="font-size: 24px;">IGLeadGen</span>
        </div>
        <h1>${title}</h1>
        <p>${message}</p>
        <div class="button-container">
            <a href="${buttonLink}" class="button">${buttonText}</a>
        </div>
        <div class="footer">
            <p>  ${new Date().getFullYear()} IGLeadGen. All rights reserved.</p>
            <div class="social-links">
                <a href="#" class="social-link">Twitter</a>
                <a href="#" class="social-link">Instagram</a>
                <a href="#" class="social-link">LinkedIn</a>
            </div>
        </div>
    </div>
</body>
</html>
`;
