#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const int buttonPin = 0;
const char* ssid = "<ssid>";
const char* password = "<password>";
const char* host = "stopwatch.cloudside.it";
const int port = 443;
const char* uri = "/api/saveRecording/1?startDate=2024-03-01&startTime=00:00:00&endDate=2024-03-01&endTime=00:00:20";
const int requestDelay = 20000;

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
  
  if (buttonStatus == LOW) {
    
    delay(300);
    
    if (buttonStatus == LOW) {
      
      if (WiFi.status() == WL_CONNECTED) {

        std::unique_ptr<BearSSL::WiFiClientSecure> wifiClient(new BearSSL::WiFiClientSecure);
        wifiClient->setInsecure();
        
        HTTPClient httpClient;
        
        if (httpClient.begin(*wifiClient, host, port, uri)) {
          
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
    }
  }
}
