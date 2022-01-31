import { useState, useContext, useEffect } from 'react'
import RatingSelect from './RatingSelect'
import Card from './shared/Card'
import Button from './shared/Button'
import FeedbackContext from '../context/FeedbackContext'

const FeedbackForm = () => {
  const { addFeedback, feedbackEdit } = useContext(FeedbackContext)

  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  const handleTextChange = e => {
    if (text === '') {
      setMsg(null)
      setBtnDisabled(true)
    } else if (text !== '' && text.trim().length <= 10) {
      setMsg('Text must be at least 10 characters')
      setBtnDisabled(true)
    } else {
      setMsg(null)
      setBtnDisabled(false)
    }

    setText(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (text.trim().length > 10) {
      addFeedback({ text, rating })
      setText('')
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>

        <RatingSelect select={rate => setRating(rate)} />

        <div className='input-group'>
          <input
            type='text'
            placeholder='Write a review'
            value={text}
            onChange={handleTextChange}
          />
          <Button type='submit' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>

        {msg && <div className='message'>{msg}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
