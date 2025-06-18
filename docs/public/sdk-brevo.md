## Create Contact

Create a contact and add them to a list.

Parameters:

- _updateEnabled_: boolean - update contact if it already exists
- _email_: string
- _listIds_: number[] - lists to add contact to
- _attributes_: Record<string, string> - key-value of attributes for the contact
- _brevoApiKey_: string

Returns: `Promise<"created" | "updated" | "failed">`

Example:

```ts
import { createContact } from "@ybot1122/toby-ui/Sdk/Brevo/createContact";

const response = await createContact({
  updateEnabled: true,
  email: "hello@gmail.com",
  listIds: [1, 3, 11],
  attributes: {
    CUSTOMER_ID: "1234",
    PREFERRED_NAME: "Dave",
  },
  brevoApiKey: "my-api-key",
});

if (response === "updated" || response === "created") {
  console.log("success");
} else {
  console.log("failed");
}
```

## Send Transactional Email

Send a transactional email.

Parameters:

- _senderName_: `string` — The name of the person sending the email.
- _senderEmail_: `string` — The email address of the sender.
- _recipientEmail_: `string` — The email address of the recipient.
- _recipientName_: `string` — The name of the recipient.
- _subject_ (optional): `string` — The subject line of the email.
- _htmlContent_ (optional): `string` — The HTML content of the email body.
- _brevoApiKey_: `string` — The API key used to authenticate with Brevo.
- _replyTo_ (optional): `Contact` — The contact information for the reply-to address.
- _cc_ (optional): `[Contact]` — An array of contacts to be CC'd on the email.
- _templateId_ (optional): `number` — The ID of the email template to use.
- _params_ (optional): `Record<string, string>` — A key-value map of parameters to pass into the email template.

Returns: `Promise<boolean>` true when successful, false if failure

Example:

```ts
const name = "Joe Burger";
const params = {
  name,
  email: "joe@burger.com",
  message: "I am Joe and I eat burgers.",
};

const response = await sendTransactionalEmail({
  brevoApiKey: "BREVO_API_KEY",
  senderName: "Dave David",
  senderEmail: "dave@david.com",
  recipientEmail: "joe@burger.com",
  recipientName: "Joe Burger",
  replyTo: {
    name: name,
    email: customer_email,
  },
  templateId: 12,
  params,
});

if (response) {
  console.log("email sent");
} else {
  console.error("Failed to send Transactional Email");
}
```
