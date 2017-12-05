# node-red-contrib-jsforce-platform-event

## Released

|date|version|description|
|:--:|:--:|:--|
|2017-12-05|0.1.3|Released|

## Feature

- Salesforce Platform Event Pub/Sub

## Install

```bash
npm install --save node-red-contrib-jsforce-platform-event
```

## Example Flow

```json
[
    {
        "id": "b1b4bca8.e4436",
        "type": "inject",
        "z": "f1b0324f.3d005",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 156,
        "y": 96,
        "wires": [
            [
                "46e7834f.2dc5dc"
            ]
        ]
    },
    {
        "id": "7640704e.8338",
        "type": "debug",
        "z": "f1b0324f.3d005",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 598,
        "y": 176,
        "wires": []
    },
    {
        "id": "3aabc83.4119638",
        "type": "debug",
        "z": "f1b0324f.3d005",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 598,
        "y": 256,
        "wires": []
    },
    {
        "id": "3a1e0c54.823234",
        "type": "salesforce-platform-event-pub",
        "z": "f1b0324f.3d005",
        "salesforce": "a140012d.ca6cb",
        "eventname": "testPF__e",
        "name": "",
        "x": 394,
        "y": 176,
        "wires": [
            [
                "7640704e.8338"
            ]
        ]
    },
    {
        "id": "5d3ba5b9.75451c",
        "type": "salesforce-platform-event-sub",
        "z": "f1b0324f.3d005",
        "salesforce": "a140012d.ca6cb",
        "eventname": "testPF__e",
        "name": "",
        "x": 394,
        "y": 256,
        "wires": [
            [
                "3aabc83.4119638"
            ]
        ]
    },
    {
        "id": "46e7834f.2dc5dc",
        "type": "template",
        "z": "f1b0324f.3d005",
        "name": "",
        "field": "payload",
        "fieldType": "msg",
        "format": "handlebars",
        "syntax": "plain",
        "template": "{\n  \"deviceId__c\":\"xxxxxx1\",\n  \"body__c\": \"{\\\"ke1\\\":\\\"val1\\\",\\\"key2\\\":\\\"val2\\\"}\",\n  \"timestamp__c\": 1512442614321,\n  \"isDeath__c\" : false\n}",
        "output": "json",
        "x": 306,
        "y": 96,
        "wires": [
            [
                "3a1e0c54.823234"
            ]
        ]
    },
    {
        "id": "a140012d.ca6cb",
        "type": "salesforce-platform-event-config",
        "z": "",
        "name": ""
    }
]
```

- Publish Result

![Publish Result](https://github.com/high-u/node-red-contrib-salesforce-platform-event/raw/master/screenshots/publish-result.png)

- Susbscribe Result

![Susbscribe Result](https://github.com/high-u/node-red-contrib-salesforce-platform-event/raw/master/screenshots/subscribe-result.png)

- Salesforce Platform Event Setting

![Platform Event](https://github.com/high-u/node-red-contrib-salesforce-platform-event/raw/master/screenshots/platform-event.png)


