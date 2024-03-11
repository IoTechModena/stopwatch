#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include "utils.h"

// devFingerprint: E3:6F:1F:FF:2F:10:7D:D6:C4:14:40:30:42:61:83:12:97:2F:69:8E

const uint8_t buttonPin = 0;
const char* ssid = "<ssid>";
const char* password = "<password>";
const uint16_t debounceDelay = 300;
const char* fingerprint = "4E:88:C3:74:00:53:62:98:74:59:98:E1:FF:E5:5B:7C:50:01:8B:AB";
const uint16_t requestTimeout = 65535;
const char* host = "stopwatch.cloudside.it";
const uint16_t port = 443;
const char* uri = "/api/saveRecording/0";
const char* APIKey = "hnGFNkAHFtB2ubQSaz3whHNgXwN2f4fcT3F3rdjMZ2HCLIGl8dcWBpoKDjx2pAb89lKxubJFdMvIrMLKq84zrweP3qjoztbTFJ0nVuTHzmHsMhiY78LvXxYL2ZLRhSnb";
const char* headerKeys[] = { "Retry-After" };
const size_t headerKeysCount = 1;
const uint8_t defaultRetryAfter = 60;

bool wasClicked = false;
String parameters;
struct tm timeinfo;

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  Serial.begin(9600);
  WiFi.mode(WIFI_STA);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.println("Connecting to WiFi");
    delay(1000);
  }

  Serial.print("WiFi connected: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  configTime(1 * 3600, 0, "pool.ntp.org");
}

void loop() {
  const int buttonState = digitalRead(buttonPin);

  if (buttonState == LOW && wasClicked == false) {
    delay(debounceDelay);

    if (buttonState == LOW) {
      parameters = uri;
      parameters += getStartDateTime(&timeinfo);
      wasClicked = true;
    }
  }

  if (buttonState == HIGH && wasClicked == true) {
    delay(debounceDelay);

    if (buttonState == HIGH) {
      int httpCode;

      parameters += getEndDateTime(&timeinfo);

      WiFiClientSecure wifiClient;
      wifiClient.setFingerprint(fingerprint);

      HTTPClient httpClient;
      httpClient.setTimeout(requestTimeout);

      do {
        uint8_t retryAfter;

        httpClient.begin(wifiClient, host, port, parameters);
        httpClient.addHeader("X-API-Key", APIKey);
        httpClient.collectHeaders(headerKeys, headerKeysCount);

        Serial.printf("POST https://%s", host);
        Serial.print(parameters);

        httpCode = httpClient.POST("");
        retryAfter = httpClient.header("Retry-After").toInt();
        Serial.println(httpClient.getString());
        httpClient.end();

        Serial.printf("Response: %d\n", httpCode);

        if (httpCode == HTTP_CODE_SERVICE_UNAVAILABLE) {
          retryAfter = retryAfter ? retryAfter : defaultRetryAfter;
          delay(retryAfter * 1000);
        }

      } while (httpCode == HTTP_CODE_SERVICE_UNAVAILABLE);

      wasClicked = false;
    }
  }
}
