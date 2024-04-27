import { useState } from "react";
import {
  DropZone,
  Thumbnail,
  Banner,
  List,
  Text,
  BlockStack,
  InlineStack,
  Card
} from '@shopify/polaris';

export function MainPage({setImages}) {

  const [files, setFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const hasError = rejectedFiles.length > 0;

  const handleDrop = (_droppedFiles, acceptedFiles, rejectedFiles) => {
    setFiles((files) => [...files, ...acceptedFiles]);
    setImages((files) => [...files, ...acceptedFiles]);
    setRejectedFiles(rejectedFiles);
  }

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <div className="flex justify-start flex-wrap items-center gap-4 px-2 py-1">
      {files.map((file, index) => (
        <div key={index} className="p-1">
          <Card fullWidth={false} >
            <Thumbnail
              size="small"
              alt={file.name}
              source={window.URL.createObjectURL(file)}
            />
            <div className="text-xs break-words max-w-48">
              {file.name}{' '}
              <Text variant="bodySm" as="p">
                {file.size} bytes
              </Text>
            </div>
          </Card>
        </div>
      ))}
    </div>)

  const errorMessage = hasError && (
    <Banner title="The following images couldn’t be uploaded:" tone="critical">
      <List type="bullet">
        {rejectedFiles.map((file, index) => (
          <List.Item key={index}>
            {`"${file.name}" is not supported. File type must be .gif, .jpg, .png or .svg.`}
          </List.Item>
        ))}
      </List>
    </Banner>
  );

  console.log(files , " files -------")
  return (
    <div style={{ backgroundColor: 'gray' }} className="bg-slate-600">
      <BlockStack vertical>
        {errorMessage}
        <DropZone accept="image/*" type="image" onDrop={handleDrop}>
          {uploadedFiles}
          {fileUpload}
        </DropZone>
      </BlockStack>
    </div>
  )
}