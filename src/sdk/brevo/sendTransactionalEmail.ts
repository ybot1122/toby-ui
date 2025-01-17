interface EmailProps {
  senderName: string;
  senderEmail: string;
  recipientEmail: string;
  recipientName: string;
  subject: string;
  htmlContent: string;
  brevoApiKey: string;
}

const url = "https://api.brevo.com/v3/smtp/email";

export const sendTransactionalEmail = async ({
  senderName,
  senderEmail,
  recipientEmail,
  recipientName,
  subject,
  htmlContent,
  brevoApiKey,
}: EmailProps) => {
  const data = {
    sender: {
      name: senderName,
      email: senderEmail,
    },
    to: [{ email: recipientEmail, name: recipientName }],
    subject: subject,
    htmlContent: htmlContent,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": brevoApiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log(response.status);

  if (response.status === 201) {
    return true;
  }

  return false;
};
