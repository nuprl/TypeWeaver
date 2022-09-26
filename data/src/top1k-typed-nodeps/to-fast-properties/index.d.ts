/**
Force V8 to use fast properties for an object.

@param object - Object to be made fast.
@returns A shallow copy of the original object, but uncallable.
*/
export default function toFastProperties<T extends object>(object?: T): T;
