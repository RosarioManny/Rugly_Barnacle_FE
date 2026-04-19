import api from "../apiConfig";

// Get a single poll with its choices
const getPoll = async (pollId: number) => {
    const response = await api.get(`/polls/${pollId}/`);
    return response.data;
};

// Get all votes for a poll
const getPollVotes = async (pollId: number) => {
    const response = await api.get(`/polls/${pollId}/votes/`);
    return response.data;
};

// Cast a vote on a choice
const castPollVote = async (pollId: number, choiceId: number) => {
    const response = await api.post(`/polls/${pollId}/vote/`, { choice: choiceId });
    return response.data;
};

export default { getPoll, getPollVotes, castPollVote };