import { useState } from 'react'
import PropTypes from 'prop-types'
import RatingSelect from './RatingSelect'
import Card from './shared/Card'
import Button from './shared/Button'

const FeedbackForm = ({ handleAdd }) => {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [msg, setMsg] = useState('')

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
      handleAdd({ text, rating })
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

FeedbackForm.propTypes = {
  handleAdd: PropTypes.func.isRequired,
}

export default FeedbackForm
