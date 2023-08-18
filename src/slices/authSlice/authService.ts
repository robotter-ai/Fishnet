import axios from 'axios';

const challenge = async (address: string, chain: string) => {
    const { data } = await axios.post(`authorization/challenge?address=${address}&chain=${chain}`);
    return data;
};

const solve = async (address: string, signature: string, chain: string) => {
    const { data } = await axios.post(`authorization/solve?address=${address}&chain=${chain}&signature=${signature}`);
    return data;
};

const refresh = async (token: string) => {
    const { data } = await axios.post(`authorization/refresh?token=${token}`);
    return data;
};

const logout = async (token: string) => {
    const { data } = await axios.post(`authorization/logout?token=${token}`);
    return data;
};


const auth = {
    challenge,
    solve,
    refresh,
    logout
};

export default auth;
