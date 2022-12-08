const arrayUnion: Function = (...arguments_) => [...new Set(arguments_.flat())];

export default arrayUnion;
