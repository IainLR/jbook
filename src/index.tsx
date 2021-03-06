import * as esbuild from 'esbuild-wasm'
import { useState, useEffect, useRef } from 'react'
import ReactDom from 'react-dom'

const App = () => {
  const ref = useRef<any>()
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const startService = async () => {
    // esbuild initialization, going into public dir for URL
    // const service replaced with ref.current
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm',
    })
  }

  useEffect(() => {
    startService()
  }, [])

  const handleClick = async () => {
    if (!ref.current) {
      return
    }
    //transform() handles transpiling, not bundling
    const result = await ref.current.transform(input, {
      loader: 'jsx',
      target: 'es2015',
    })

    setCode(result.code)
  }

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  )
}

ReactDom.render(<App />, document.querySelector('#root'))
