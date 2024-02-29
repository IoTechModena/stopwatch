#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

const int buttonPin = 0;
const char* ssid = "<ssid>";
const char* password = "<password>";
const char* url = "http://<url>";
const int requestDelay = 20000;

WiFiClient client;
HTTPClient http;

void setup() {
  pinMode(buttonPin, INPUT);
  Serial.begin(9600);
  WiFi.mode(WIFI_STA);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    Serial.println("Connecting to WiFi");
    delay(1000);
  }

  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println();
}

void loop() {
  const int buttonStatus = digitalRead(buttonPin);
  if (buttonStatus == LOW) {
    delay(300);
    
    if (buttonStatus == LOW) {
      if (WiFi.status() == WL_CONNECTED) {
        if (http.begin(client, url)) {
          
          Serial.printf("GET %s\n", url);
          const int httpCode = http.GET();
          
          if (httpCode == HTTP_CODE_OK) {
            Serial.println("Response: OK");
          } else {
            Serial.println("HTTP error");
          }

          http.end();
          delay(requestDelay);
          
        } else {
          Serial.println("WiFi not connected");
        }
      }
    }
  }
}
