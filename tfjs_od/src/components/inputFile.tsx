import React, { useRef } from "react"
import { Button } from "@chakra-ui/react"

type InputFileProps = {
  setImgURL: React.Dispatch<React.SetStateAction<string>>
}

const InputFile = (props: InputFileProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { setImgURL } = props
  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      setImgURL(URL.createObjectURL(files[0]))
    }
  }
  const onClickButton = () => {
    inputRef.current?.click()
  }
  return (
    <>
      <input ref={inputRef} type="file" onChange={onFileInput} hidden />
      <br />
      <Button colorScheme="teal" onClick={onClickButton} size="lg">
        select image
      </Button>
    </>
  )
}

export default InputFile
