export class RaiseEventOptions {
    constructor() {
        this.CachingOption = EventCaching.DoNotCache;
        this.TargetActors = null;
        this.InterestGroup = 0;
        this.Receivers = ReceiverGroup.Others;
        this.Flags = {
            HttpForward: false,
            WebhookFlags: 0
        };
        this.CacheSliceIndex = 0;
    }
}