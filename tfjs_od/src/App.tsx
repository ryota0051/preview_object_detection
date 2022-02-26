import React, { useState } from "react"
import { useModels } from "./hooks/useModels"
import Header from "./components/header"
import { ChakraProvider } from "@chakra-ui/react"

function App() {
  const model = useModels()
  const [imgURL, setImgURL] = useState<string>("")
  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      setImgURL(URL.createObjectURL(files[0]))
    }
  }
  const onImageChange = (e: any) => {
    const img = e.target as HTMLImageElement
    const c = document.getElementById("canvas") as HTMLCanvasElement
    const ctx = c.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    const font = "16px sans-serif"
    c.width = img.offsetWidth
    c.height = img.offsetHeight
    ctx.beginPath()
    ctx.font = font
    ctx.textBaseline = "top"
    model?.detect(img).then((predictions) => {
      predictions.forEach((prediction) => {
        if (prediction.score < 0.8) return
        // BBOX描画
        const [x, y, width, height] = prediction.bbox
        ctx.strokeStyle = "#00FFFF"
        ctx.lineWidth = 4
        ctx.strokeRect(x, y, width, height)
        // クラス名描画
        ctx.fillStyle = "#00FFFF"
        const textWidth = ctx.measureText(prediction.class).width
        const textHeight = parseInt(font, 10)
        ctx.fillRect(x, y, textWidth + 50, textHeight + 4)
        ctx.fillStyle = "#000000"
        ctx.fillText(
          `${prediction.class}(${Math.round(prediction.score * 100)}%)`,
          x,
          y
        )
      })
    })
  }

  return (
    <>
      <ChakraProvider>
        <Header title="Objedt Detection Preview" />
        {model ? (
          <div>
            <input type="file" onChange={onFileInput} />
            {imgURL ? (
              <div>
                <img
                  id="img"
                  alt="upload preview"
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    width: "448px",
                  }}
                  src={imgURL}
                  onLoad={onImageChange}
                />
                <canvas
                  id="canvas"
                  style={{
                    position: "absolute",
                    zIndex: 2,
                    width: "448px",
                  }}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          "model loading"
        )}
      </ChakraProvider>
    </>
  )
}

export default App
