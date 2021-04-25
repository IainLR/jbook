import * as esbuild from 'esbuild-wasm'
import { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import { isTupleTypeNode } from 'typescript'

const App = () => {
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const startService = async () => {
    // esbuild initialization, going into public dir for URL
    const service = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm',
    })
    console.log(service)
  }

  useEffect(() => {
    startService()
  }, [])

  const handleClick = () => {
    console.log(input)
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
