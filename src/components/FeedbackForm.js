import { useState } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'

const FeedbackForm = () => {
  const [text, setText] = useState('')

  return (
    <Card>
      <form>
        <h2>How would you rate your service with us?</h2>
        {/* @todo - Rating select component */}

        <div className='input-group'>
          <input
            type='text'
            placeholder='Write a review'
            onChange={e => setText(e.target.value)}
          />
          <Button type='submit'>Send</Button>
        </div>
      </form>
    </Card>
  )
}

export default FeedbackForm
