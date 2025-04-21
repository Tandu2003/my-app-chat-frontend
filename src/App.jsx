import { Button } from 'antd'
import { SmileOutlined } from '@ant-design/icons'

const App = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold underline">
        Hello world! <SmileOutlined />
      </h1>
      <Button type="primary">Ant Design Button</Button>
    </div>
  )
}

export default App
