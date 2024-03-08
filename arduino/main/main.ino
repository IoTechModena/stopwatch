#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include "utils.h"

// devFingerprint: E3:6F:1F:FF:2F:10:7D:D6:C4:14:40:30:42:61:83:12:97:2F:69:8E

const uint8_t buttonPin = 0;
const char* ssid = "<ssid>";
const char* password = "<password>";
const char* fingerprint = "4E:88:C3:74:00:53:62:98:74:59:98:E1:FF:E5:5B:7C:50:01:8B:AB";
const uint16_t requestTimeout = 65535;
const char* host = "stopwatch.cloudside.it";
const uint16_t port = 443;
const char* uri = "/api/saveRecording/0";
const char* headerKeys[] = { "retry-after" };
const size_t headerKeysCount = 1;

void setup() {
  pinMode(buttonPin, INPUT);
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
  const int buttonStatus = digitalRead(buttonPin);

  if (WiFi.status() == WL_CONNECTED) {
    String parameters;
    struct tm timeinfo;

    parameters += uri;
    parameters += getStartDateTime(&timeinfo);
    delay(5000);
    parameters += getEndDateTime(&timeinfo);

    WiFiClientSecure wifiClient;
    wifiClient.setFingerprint(fingerprint);

    HTTPClient httpClient;
    httpClient.setTimeout(requestTimeout);

    if (httpClient.begin(wifiClient, host, port, parameters)) {
      httpClient.collectHeaders(headerKeys, headerKeysCount);

      Serial.printf("POST https://%s", host);
      Serial.println(parameters);

      const int httpCode = httpClient.POST("");
      const String retryAfter = httpClient.header("retry-after");
      httpClient.end();

      Serial.printf("Response: %d\n", httpCode);
    } else {
      Serial.println("HTTP Client error");
    }

  } else {
    Serial.println("WiFi not connected");
  }
}
