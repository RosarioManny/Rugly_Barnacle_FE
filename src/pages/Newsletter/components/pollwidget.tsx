// components/ui/Poll.tsx
import { useState } from "react"
import { type Poll, type PollChoice, getPoll, castPollVote } from "../../../lib/api/Newsletter/pollServices"


interface PollProps {
  poll: Poll
}

export const PollWidget = ({ poll }: PollProps) => {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [choices, setChoices] = useState(poll.choices)

  const totalVotes = choices.reduce((sum, c) => sum + c.vote_count, 0)

  const handleVote = async () => {
    if (!selectedChoice) return
    try {
      setStatus('loading')
      await castPollVote(poll.id, selectedChoice)
      // Optimistically update the vote count
      setChoices(prev =>
        prev.map(c =>
          c.id === selectedChoice ? { ...c, vote_count: c.vote_count + 1 } : c
        )
      )
      setHasVoted(true)
      setStatus('success')
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.non_field_errors?.[0] || 'Something went wrong.')
      setStatus('error')
    }
  }

  // Poll is expired
  if (!poll.is_active) {
    return (
      <div className="mt-8 p-6 bg-space_cadet/5 border border-space_cadet/20 rounded-lg">
        <h3 className="text-lg font-semibold text-space_cadet mb-4">{poll.question}</h3>
        <p className="text-sm text-space_cadet/50 mb-4 italic">This poll has closed.</p>
        <Results choices={choices} totalVotes={totalVotes} />
      </div>
    )
  }

  // After voting show results
  if (hasVoted) {
    return (
      <div className="mt-8 p-6 bg-white border border-majorelle rounded-lg">
        <h3 className="text-lg font-semibold text-majorelle mb-2">{poll.question}</h3>
        <p className="text-sm text-space_cadet/60 mb-4">Thanks for voting!</p>
        <Results choices={choices} totalVotes={totalVotes} />
      </div>
    )
  }

  // Voting UI
  return (
    <div className="mt-8 p-6 bg-white border border-majorelle rounded-lg">
      <h3 className="text-lg font-semibold text-majorelle mb-4">{poll.question}</h3>
      <ul className="space-y-3 mb-6">
        {choices.map(choice => (
          <li key={choice.id}>
            <label className={`
              flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors
              ${selectedChoice === choice.id
                ? 'border-majorelle bg-majorelle/10'
                : 'border-space_cadet/20 hover:border-majorelle/50'}
            `}>
              <input
                type="radio"
                name="poll"
                value={choice.id}
                checked={selectedChoice === choice.id}
                onChange={() => setSelectedChoice(choice.id)}
                className="accent-majorelle"
              />
              {choice.image && (
                <img
                  src={choice.image}
                  alt={choice.choice_name}
                  className="w-12 h-12 object-cover rounded"
                />
              )}
              <span className="text-space_cadet">{choice.choice_name}</span>
            </label>
          </li>
        ))}
      </ul>

      {status === 'error' && (
        <p className="text-bittersweet text-sm mb-3">{errorMessage}</p>
      )}

      <button
        onClick={handleVote}
        disabled={!selectedChoice || status === 'loading'}
        className="
          w-full py-2 px-4 rounded-lg font-medium transition-colors
          bg-majorelle text-fleece
          hover:bg-majorelle/90
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {status === 'loading' ? 'Submitting...' : 'Submit Vote'}
      </button>
    </div>
  )
}

// Results bar breakdown
const Results = ({ choices, totalVotes }: { choices: PollChoice[], totalVotes: number }) => (
  <ul className="space-y-3">
    {choices.map(choice => {
      const percentage = totalVotes > 0 ? Math.round((choice.vote_count / totalVotes) * 100) : 0
      return (
        <li key={choice.id}>
          <div className="flex justify-between text-sm text-space_cadet mb-1">
            <span>{choice.choice_name}</span>
            <span>{percentage}% ({choice.vote_count})</span>
          </div>
          <div className="w-full bg-space_cadet/10 rounded-full h-2">
            <div
              className="bg-majorelle h-2 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </li>
      )
    })}
    <p className="text-xs text-space_cadet/50 mt-2">{totalVotes} total vote{totalVotes !== 1 ? 's' : ''}</p>
  </ul>
)