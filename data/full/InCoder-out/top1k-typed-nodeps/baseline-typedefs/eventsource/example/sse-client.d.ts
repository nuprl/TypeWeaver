declare var EventSource: {
    new (url: string | URL, eventSourceInitDict?: EventSourceInit): EventSource;
    prototype: EventSource;
    readonly CLOSED: number;
    readonly CONNECTING: number;
    readonly OPEN: number;
};
declare var es: EventSource;
