declare var util: any;
declare var TrackerBase: (name: String) => void;
declare var Tracker: any;
declare var TrackerStream: any;
declare var TrackerGroup: (name: String) => void;
declare function bubbleChange(trackerGroup: any): (name: string, completed: boolean, tracker: Tracker) => void;
declare var buffer: string;
