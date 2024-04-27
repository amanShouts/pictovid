import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  Button,
  InlineStack
} from "@shopify/polaris";
import { MainPage } from "../components/MainPage";
import { useState } from "react";

const BACKEND_URL='http://127.0.0.1:5000'
export default function Index() {

  const [images, setImages] = useState([]);
  const handleGenerateVideo = async() => {
    console.log(images, " images collected so far");

    const res = await fetch( `${BACKEND_URL}/images`,{
      headers : {
        "Content-Type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify({aman : 'aman'})
    } )

    console.log(res, " response from post")
  }
  
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card>
            <MainPage setImages={setImages} />
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card >
            <InlineStack align="center" >
            <Button onClick={handleGenerateVideo}>Generate Video</Button>
            </InlineStack>
          </Card>
        </Layout.Section>
      </Layout>

    </Page>
  );
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
