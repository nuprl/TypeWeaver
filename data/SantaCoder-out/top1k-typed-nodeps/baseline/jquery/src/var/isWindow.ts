export default function isWindow( obj : any) {
	return obj != null && obj === obj.window;
}