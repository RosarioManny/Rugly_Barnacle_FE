import api from "../apiConfig";

export interface PollChoice {
  id: number
  choice_name: string
  image: string | null
  vote_count: number
}

export interface Poll {
  id: number
  question: string
  start_date: string
  end_date: string
  is_active: boolean
  choices: PollChoice[]
}

// Get a single poll with its choices
export const getPoll = async (pollId: number) => {
    const response = await api.get(`/polls/${pollId}/`);
    return response.data;
};

// Get all votes for a poll
export const getPollVotes = async (pollId: number) => {
    const response = await api.get(`/polls/${pollId}/votes/`);
    return response.data;
};

// Cast a vote on a choice
export const castPollVote = async (pollId: number, choiceId: number) => {
    const response = await api.post(`/polls/${pollId}/vote/`, { choice: choiceId });
    return response.data;
};


export default { getPoll, getPollVotes, castPollVote };