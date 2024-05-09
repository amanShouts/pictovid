import {
  Card,
  Layout,
  Page,
  Button,
  InlineStack
} from "@shopify/polaris";
import MainPage from "../components/MainPage";
import { useState } from "react";
import MyPlayer from "../remotion/components/MyPlayer";
// import { renderMedia, selectComposition } from "@remotion/renderer";

const BACKEND_URL = 'http://localhost:4000'
export default function Index() {

  const [images, setImages] = useState([]);
  const [imageBlobs, setImageBlobs] = useState([]);
  const [picker, setPicker] = useState(false);

  // const readFileAsDataURL = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       resolve(reader.result);
  //     };
  //     reader.onerror = (error) => {
  //       reject(error);
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // };

  const handleGenerateVideo = async () => {
    console.log(images, " images collected so far");
    console.log("convert to blob url")
    setImageBlobs(prev => []);

    const blobUrlArr = []

    if (picker == true) {
      setImageBlobs(prev => [...images]);
      return;
    }
    //   for (const image of images) {
    //     const base64Url = await readFileAsDataURL(image);
    //     console.log(base64Url);

    //     blobUrlArr.push(base64Url);
    //     // reader.onload = () => {
    //     //   const base64Url = reader.result;
    //     //   blobUrlArr.push(base64Url);
    //     // };
    //   }

    for (const image of images) {
      const url = URL.createObjectURL(image);
      console.log(url, " urllll", image);

      blobUrlArr.push(url);
    }
    setImageBlobs(prev => [...blobUrlArr])

    // const form = new FormData();
    // form.set('images', JSON.stringify(blobUrlArr));

    // console.log(form, " form data", blobUrlArr, form.get('images'));

    // const res = await fetch(`${BACKEND_URL}/upload`, {
    //   method: 'POST',
    //   headers: {
    //     // 'Content-Type': 'application/json'
    //     'Content-Type' : "multipart/form-data"
    //   },
    //   body: form
    // })

    // console.log(res, " after sending data to backend");
  }

  const handleDownload = async () => {
    console.log("in hasndle download", images);

    const res = await fetch(`${BACKEND_URL}/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageArr: images })
    });
    // const data = await res.json();
    // console.log(data, " dattttttttttttttttttttttttttttaaaaaaaaaa")
    const vid = await res.blob()

    console.log("videooooooooooooo ", vid );

    if (vid) {
      const link = document.createElement('a');
      const url = URL.createObjectURL(vid)
      console.log(url, " Objetc url of the BLOB")
      link.href = url; // Create a URL for the blob
      link.download = 'video.mp4'; // Set the download attribute with the desired filename
      link.click(); // Simulate a click on the link to trigger the download
    }

    console.log(res, " res from image upload");
    // collect the images array and send to backend 


    // const { functionName } = await deployFunction({
    //   region: "us-east-1",
    //   timeoutInSeconds: 120,
    //   memorySizeInMb: 2048,
    //   createCloudWatchLogGroup: true,
    // });
    // console.log(functionName, " functionmae ")


    // const { bucketName } = await getOrCreateBucket({
    //   region: "us-east-1",
    // });

    // console.log(bucketName, " bucketname");

    // const { serveUrl } = await deploySite({
    //   bucketName,
    //   entryPoint: path.resolve(process.cwd(), "src/index.ts"),
    //   region: "us-east-1",
    //   siteName: "my-video",
    // });

    // console.log("serve url", serveUrl);

    // const {renderId, bucketName} = await renderMediaOnLambdaOptionalToRequired({
    //   region: "us-east-1",
    //   functionName : 'remotion-render-4-0-148-mem2048mb-disk2048mb-120sec',
    //   serveUrl: 'https://remotionlambda-useast1-b3quqlxdff.s3.us-east-1.amazonaws.com/sites/pic-to-vid/index.html',
    //   composition: "Empty",
    //   inputProps: {imageBlobs : imageBlobs, text : "aman"},
    //   codec: "h264",
    //   maxRetries: 1,
    //   framesPerLambda: 20,
    // });

    // const composition = await selectComposition({
    //   serveUrl: 'https://remotionlambda-useast1-b3quqlxdff.s3.us-east-1.amazonaws.com/sites/pic-to-vid/index.html',
    //   id: 'Empty',
    //   inputProps: { imageBlobs: imageBlobs, text: "aman" },
    // });

    // await await renderMedia({
    //   composition: composition,
    //   serveUrl: 'https://remotionlambda-useast1-b3quqlxdff.s3.us-east-1.amazonaws.com/sites/pic-to-vid/index.html',
    //   codec: "h264",
    //   outputLocation: ".",
    //   inputProps: { imageBlobs: imageBlobs, text: "aman" },
    // });

    // console.log(renderId, bucketName, " last renderId and bucketname")

  }

  console.log(images, " images selected ----------", imageBlobs)

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card>
            <MainPage setImages={setImages} setPicker={setPicker} />
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card >
            <InlineStack align="center" >
              <Button onClick={handleGenerateVideo}>Generate Video</Button>
            </InlineStack>

            {imageBlobs.length > 0 ? < MyPlayer imageBlobs={imageBlobs} text={'amananaman'} /> : ''}

            <div className="mt-8 mx-auto w-full text-center">
              <Button onClick={handleDownload}>Download</Button>
            </div>
          </Card>
        </Layout.Section>
      </Layout>

    </Page>
  );
}

