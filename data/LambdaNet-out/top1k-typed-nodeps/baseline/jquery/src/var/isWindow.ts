export default function isWindow( obj: Object ): Boolean {
	return obj != null && obj === obj.window;
}
