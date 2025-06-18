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

```js
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
