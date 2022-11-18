export default function isWindow( obj: object ): boolean {
	return obj != null && obj === obj.window;
}
