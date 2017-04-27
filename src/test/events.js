module.exports = {
  "GetNewFactIntent": {
    "session": {
      "sessionId": "SessionId.dummy",
      "application": {
        "applicationId": "amzn1.ask.skill.dummy"
      },
      "attributes": {},
      "user": {
        "userId": null
      },
      "new": true
    },
    "request": {
      "type": "IntentRequest",
      "requestId": "DummyId.dummy",
      "locale": "en-US",
      "timestamp": "2017-04-26T19:29:57Z",
      "intent": {
        "name": "GetNewFactIntent",
        "slots": {}
      }
    },
    "version": "1.0"
  },
  "GetNewYearFactIntent": {
    "session": {
      "sessionId": "SessionId.dummy",
      "application": {
        "applicationId": "amzn1.ask.skill.dummy"
      },
      "attributes": {},
      "user": {
        "userId": null
      },
      "new": true
    },
    "request": {
      "type": "IntentRequest",
      "requestId": "DummyId.dummy",
      "locale": "en-US",
      "timestamp": "2017-04-26T19:29:57Z",
      "intent": {
        "name": "GetNewYearFactIntent",
        "slots": {
           "FACT_YEAR": {
                "name": "FACT_YEAR",
                "value": "2002"
          }
        }
      }
    },
    "version": "1.0"
  },
  "HelpIntent": {
    "session": {
      "sessionId": "SessionId.dummy",
      "application": {
        "applicationId": "amzn1.ask.skill.dummy"
      },
      "attributes": {},
      "user": {
        "userId": null
      },
      "new": true
    },
    "request": {
      "type": "IntentRequest",
      "requestId": "DummyId.dummy",
      "locale": "en-US",
      "timestamp": "2017-04-26T19:29:57Z",
      "intent": {
        "name": "AMAZON.HelpIntent",
        "slots": {}
      }
    },
    "version": "1.0"
  },
  "StopIntent": {
    "session": {
      "sessionId": "SessionId.dummy",
      "application": {
        "applicationId": "amzn1.ask.skill.dummy"
      },
      "attributes": {},
      "user": {
        "userId": null
      },
      "new": true
    },
    "request": {
      "type": "IntentRequest",
      "requestId": "DummyId.dummy",
      "locale": "en-US",
      "timestamp": "2017-04-26T19:29:57Z",
      "intent": {
        "name": "AMAZON.StopIntent",
        "slots": {}
      }
    },
    "version": "1.0"
  },
  "CancelIntent": {
    "session": {
      "sessionId": "SessionId.dummy",
      "application": {
        "applicationId": "amzn1.ask.skill.dummy"
      },
      "attributes": {},
      "user": {
        "userId": null
      },
      "new": true
    },
    "request": {
      "type": "IntentRequest",
      "requestId": "DummyId.dummy",
      "locale": "en-US",
      "timestamp": "2017-04-26T19:29:57Z",
      "intent": {
        "name": "AMAZON.CancelIntent",
        "slots": {}
      }
    },
    "version": "1.0"
  }
}