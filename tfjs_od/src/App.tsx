import React, { useState } from "react"
import { useModels } from "./hooks/useModels"
import Header from "./components/header"
import InputFile from "./components/inputFile"
import DetectedResult from "./components/detectedResult"
import { Box, ChakraProvider, VStack, Text } from "@chakra-ui/react"

function App() {
  const model = useModels()
  const [imgURL, setImgURL] = useState<string>("")

  return (
    <>
      <ChakraProvider>
        <Header title="Object Detection Preview" />
        {model ? (
          <VStack spacing={10}>
            <Box>
              <InputFile setImgURL={setImgURL} />
            </Box>
            <Box>
              <DetectedResult model={model} imgURL={imgURL} />
            </Box>
          </VStack>
        ) : (
          <Text align="center" fontSize="xl">
            model loading
          </Text>
        )}
      </ChakraProvider>
    </>
  )
}

export default App
