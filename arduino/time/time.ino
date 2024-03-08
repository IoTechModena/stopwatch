#include <ESP8266WiFi.h>

const char* ssid = "<ssid>";
const char* password = "<password>";

void setup() {
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

  configTime(1 * 3600, 0, "pool.ntp.org");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    struct tm timeinfo;
    char* startDateTime = getStartDateTime(timeinfo);
    delay(5000);
    char* endDateTime = getEndDateTime(timeinfo);
    Serial.print(startDateTime);
    Serial.println(endDateTime);

    delay(5000);
  } else {
    Serial.println("WiFi not connected");
  }
}

char* getStartDateTime(tm timeinfo) {
  getLocalTime(&timeinfo);
  static char dateTime[50];
  strftime(dateTime, sizeof(dateTime), "?startDate=%F&startTime=%T", &timeinfo);

  return dateTime;
}

char* getEndDateTime(tm timeinfo) {
  getLocalTime(&timeinfo);
  static char dateTime[50];

  strftime(dateTime, sizeof(dateTime), "&endDate=%F&endTime=%T", &timeinfo);
  return dateTime;
}
