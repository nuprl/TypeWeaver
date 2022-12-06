const arrayUnion: any = (...arguments_) => [...new Set(arguments_.flat())];

export default arrayUnion;
