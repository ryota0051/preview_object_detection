import * as cocoSsd from "@tensorflow-models/coco-ssd"
import * as tf from "@tensorflow/tfjs"
import { useEffect, useState } from "react"

export const useModels = () => {
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null)
  async function loadModel() {
    try {
      const model = await cocoSsd.load()
      setModel(model)
    } catch (error) {
      console.error(error)
      console.error("failed load model")
    }
  }
  useEffect(() => {
    tf.ready().then(() => {
      loadModel()
    })
  }, [])
  return model
}
