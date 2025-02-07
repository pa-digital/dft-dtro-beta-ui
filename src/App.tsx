import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TextComponent from './components/TypographyComponent'; // Ensure correct path


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TextComponent variant="heading" content="This is a Heading" />
      <TextComponent variant="description" content="This is a paragraph" />
      <TextComponent variant="info" content="This is inline text" />
    </>
  )
}

export default App
