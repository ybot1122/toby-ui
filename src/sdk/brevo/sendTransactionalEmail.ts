interface EmailProps {
  senderName: string;
  senderEmail: string;
  recipientEmail: string;
  recipientName: string;
  subject?: string;
  htmlContent?: string;
  brevoApiKey: string;
  replyTo?: Contact;
  cc?: [Contact];
  templateId?: number;
  params?: Record<string, string>;
}

interface Contact { name: string; email: string }

const url = "https://api.brevo.com/v3/smtp/email";

export const sendTransactionalEmail = async ({
  senderName,
  senderEmail,
  recipientEmail,
  recipientName,
  subject,
  htmlContent,
  brevoApiKey,
  replyTo,
  cc,
  templateId,
  params,
}: EmailProps) => {
  const data: {
    sender: Contact;
    to: Contact[];
    subject?: string;
    htmlContent?: string;
    replyTo?: Contact;
    cc?: Contact[];
    templateId?: number;
    params?: Record<string, string>;
  } = {
    sender: {
      name: senderName,
      email: senderEmail,
    },
    to: [{ email: recipientEmail, name: recipientName }],
  };

  if (subject) {
    data.subject = subject;
  }

  if (replyTo) {
    data.replyTo = replyTo;
  }

  if (cc) {
    data.cc = cc;
  }

  if (htmlContent) {
    data.htmlContent = htmlContent;
  }

  if (templateId) {
    data.templateId = templateId;
  }

  if (params) {
    data.params = params;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": brevoApiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.status === 201) {
    return true;
  }

  return false;
};
