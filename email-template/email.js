export const generateMjmlTemplate = (username, complaint, anonymous) =>
  `      <mjml>
        <mj-head>
          <mj-style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #fafafa;
            }
            .email-container {
              max-width: 650px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .email-header {
              background-color: #f2f2f2;
              padding: 20px;
              text-align: center;
              border-bottom: 1px solid #dddddd;
            }
            .email-header img {
              border-radius: 100px;
            }
            .email-content {
              padding: 30px 40px;
              line-height: 1.6;
              color: #333;
            }
            .email-content blockquote {
              margin: 20px 0;
              padding: 15px;
              background-color: #f9f9f9;
              border-left: 5px solid #e6007e;
              font-style: italic;
            }
            .email-footer {
              padding: 20px;
              text-align: center;
              background-color: #f2f2f2;
              color: #888;
              font-size: 14px;
            }
          </mj-style>
          <mj-font name="Segoe UI" href="https://fonts.googleapis.com/css?family=Segoe+UI"/>
        </mj-head>
        <mj-body background-color="#fafafa">
          <mj-section background-color="#ffffff" padding="20px">
            <mj-column>
              <mj-image src="https://i.imgur.com/adqkBeM.png" width="100px" border-radius="100px" height="100px" alt="Logo" title="Logo" style="display:block"/>
            </mj-column>
          </mj-section>
          <mj-section background-color="#f2f2f2">
            <mj-column>
              <mj-text align="center" padding="20px" border-bottom="1px solid #dddddd" font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif">
                You've Received a New Message
              </mj-text>
            </mj-column>
          </mj-section>
          <mj-section padding="30px 40px">
            <mj-column>
              <mj-text font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif" color="#333">
                Hello <strong>Hamza Anis</strong>,
              </mj-text>
              <mj-text font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif" color="#333">
                ${
                  anonymous
                    ? "You got a new anonymous message"
                    : `You got a new message from <strong>${username}</strong>`
                }:
              </mj-text>
              <mj-text font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif" css-class="email-content blockquote">
                ${complaint}
              </mj-text>
              ${
                anonymous
                  ? `<mj-text font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif" color="darkgrey">
                  Best wishes
                </mj-text>`
                  : `<mj-text font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif" color="darkgrey">
                Best wishes,<br>${username}
              </mj-text>`
              }
            </mj-column>
          </mj-section>
          <mj-section background-color="#f2f2f2">
            <mj-column>
              <mj-text align="center" padding="20px" font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif" color="#888">
                © 2024 Capregsoft Pvt Ltd. All rights reserved.
              </mj-text>
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>
    `;
