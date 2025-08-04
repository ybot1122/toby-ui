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

## Upload Image

Upload an image to a cloudinary cloud, specifying folder and public_id

Parameters:

- **imageFile**: (File)
- **cloudinary_key**: (string)
- **cloudinary_secret**: (string)
- **public_id**: (string) identifier for the image
- **folder**: (string) folder to store image in
- **upload_preset**: (string) set this up in your Cloudinary [settings](https://cloudinary.com/documentation/upload_presets)

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

Below is an example of an image upload form:

```jsx
import { uploadImage } from "@ybot1122/toby-ui/Sdk/Cloudinary/uploadImage";

const UploadImageForm = () => {
  const fileInputRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const imageFile = fileInputRef.current.files[0];

    const result = await uploadImage({
      cloudinary_key: "CLOUDINARY_KEY",
      cloudinary_secret: "CLOUDINARY_SECRET",
      cloudinary_cloud_name: "CLOUDINARY_CLOUD_NAME",
      imageFile,
      public_id: "my_image_public_id",
      folder: "CLOUDINARY_FOLDER_NAME",
      upload_preset: "u4kwvaih",
    });

    if (!result) {
      console.log(`upload success. image is at: ${result.secure_url}`)
    } else {
      console.error('upload failed.')
    }

    return { status: "success", reason: result.secure_url };
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="file" ref={fileInputRef}  />
      <button type="submit">Upload</button>
    </form>
  );
};
```
