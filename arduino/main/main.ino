#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// devFingerprint: E3:6F:1F:FF:2F:10:7D:D6:C4:14:40:30:42:61:83:12:97:2F:69:8E

const uint8_t buttonPin = 0;
const char* ssid = "<ssid>";
const char* password = "<password>";
const char* fingerprint = "4E:88:C3:74:00:53:62:98:74:59:98:E1:FF:E5:5B:7C:50:01:8B:AB";
const char* host = "stopwatch.cloudside.it";
const uint16_t port = 443;
const char* uri = "/api/saveRecording/1?startDate=2024-03-04&startTime=12:00:00&endDate=2024-03-04&endTime=12:00:20";
const uint16_t requestTimeout = 65535;
const uint32_t requestDelay = 20000;

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
}

void loop() {
  const int buttonStatus = digitalRead(buttonPin);
  int httpCode;

  //if (buttonStatus == LOW) {

  //delay(300);

  //if (buttonStatus == LOW) {

  if (WiFi.status() == WL_CONNECTED) {

    WiFiClientSecure wifiClient;
    wifiClient.setFingerprint(fingerprint);

    HTTPClient httpClient;
    httpClient.setTimeout(requestTimeout);

    if (httpClient.begin(wifiClient, host, port, uri)) {

      Serial.printf("GET https://%s", host);
      Serial.printf("%s\n", uri);
      httpCode = httpClient.POST("");
      httpClient.end();
      Serial.printf("Response: %d\n", httpCode);
      delay(requestDelay);

      // TODO
      // Response 503 check (try to use Retry-After header for delay)

    } else {
      Serial.println("HTTP Client error");
    }

  } else {
    Serial.println("WiFi not connected");
  }
  //}
  //}
}
