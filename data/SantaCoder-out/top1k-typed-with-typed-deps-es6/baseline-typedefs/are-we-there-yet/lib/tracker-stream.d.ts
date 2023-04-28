import stream from 'readable-stream';
declare var TrackerStream: (name: string, size: number, options: stream.TransformOptions) => void;
export default TrackerStream;
