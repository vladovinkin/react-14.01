import {handleActions} from 'redux-actions';
import {loadChats, addChat, addMessage, fire, unfire, deleteMessage} from './chatAction';

const defaultState = {
    chats: {}
};

export default handleActions ({
    [loadChats]: (state) => {
        return { 
            ...state,
            chats : {
                1: {
                    name: 'Anna',
                    unread: 0,
                    messages: [
                        {name: 'chatBot', content: 'Hello!'},
                        {name: 'Anna', content: 'Hi! How are you?'},
                        {name: 'chatBot', content: 'I am well!'},
                    ],
                },
                2: {
                    name: 'Elena',
                    unread: 0,
                    messages: [
                        {name: 'chatBot', content: 'Hello!'},
                        {name: 'Elena', content: 'Hi! It\'s interesting to talking with robot for me)'},
                    ],
                },
                3: {
                    name: 'Olga',
                    unread: 0,
                    messages: [],
                },
            },
            nextChatId: 4,
        };
    },
    [addMessage]: (state, {payload: {id, name, content}}) => {
        return {
            ...state,
            chats: {...state.chats, 
                [id]: {
                    name: state.chats[id].name,
                    unread: state.chats[id].unread,
                    messages: [...state.chats[id].messages, {name, content}],
                },
            }
        };
    },
    [addChat]: (state, {payload: {name}}) => {
        return {
            ...state,
            chats: {...state.chats, 
                [state.nextChatId]: { 
                    name: name,
                    unread: 0,
                    messages: [],
                },
            },
            nextChatId: state.nextChatId + 1,
        };
    },
    [fire]: (state, {payload: {id}}) => {
        return {
            ...state,
            chats: {...state.chats, 
                [id]: { 
                    name: state.chats[id].name,
                    messages: [...state.chats[id].messages],
                    unread: state.chats[id].unread + 1,
                },
            }
        };
    },
    [unfire]: (state, {payload: {id}}) => {
        if (!state.chats[id]) return state;
        return {
            ...state,
            chats: {...state.chats, 
                [id]: { 
                    name: state.chats[id].name,
                    messages: [...state.chats[id].messages],
                    unread: 0,
                },
            }
        };
    },
    [deleteMessage]: (state, {payload: {id, index}}) => {
        console.log('CHAT REDUCER - DELETE MESSAGE!');
        return {
            ...state,
            chats: {...state.chats, 
                [id]: {
                    name: state.chats[id].name,
                    unread: state.chats[id].unread,
                    messages: state.chats[id].messages.slice (0,index).concat (state.chats[id].messages.slice (index + 1)),
                },
            }   
        };
    },
}, defaultState);