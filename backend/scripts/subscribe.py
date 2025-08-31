import requests

HUB_URL = "https://pubsubhubbub.appspot.com/subscribe"
CALLBACK_URL = "https://ewuyf-45-44-165-41.a.free.pinggy.link/youtube"
CHANNEL_ID = "UCEf0-WZoqYFzLZtx43KPvag" 


feed_url = f"https://www.youtube.com/xml/feeds/videos.xml?channel_id={CHANNEL_ID}"

data = {
    "hub.mode": "subscribe",
    "hub.topic": feed_url,
    "hub.callback": CALLBACK_URL,
    "hub.verify": "async"
}

r = requests.post(HUB_URL, data=data)
print("Subscription status:", r.status_code, r.text)
