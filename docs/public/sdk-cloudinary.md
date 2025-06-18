## Get Images

Return all images in a cloudinary cloud. This method will automatically fetch multiple pages and return all the images in one call.

Parameters:

- **cloudinary_cloud_name**: (string)
- **cloudinary_key**: (string)
- **cloudinary_secret**: (string)

Returns: `Promise<CloudinaryResource[]>`

```ts
export interface CloudinaryResource {
  asset_id: string;
  public_id: string;
  resource_type: string;
  format: string;
  folder: string;
  url: string;
  secure_url: string;
}
```

Example:

```js
import { getImages } from "@ybot1122/toby-ui/Sdk/Cloudinary/getImages";

const response = await getImages({
  cloudinary_key: CLOUDINARY_KEY,
  cloudinary_secret: CLOUDINARY_SECRET,
  cloudinary_cloud_name: CLOUDINARY_CLOUD_NAME,
});

// Only include images in specific folder
const filteredResources = response.filter((resource) =>
  resource.folder.includes(CLOUDINARY_FOLDER_NAME)
);

return filteredResources;
```
