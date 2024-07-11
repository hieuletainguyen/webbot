#include <WiFi.h>
#include <HTTPClient.h>
#include <WireGuard-ESP32.h>

const char* ssid = "Agiat Ikazinat";
const char* password = "whaleclysdeo";
String serverName = "http://104.155.160.33:9897/api/data";

void setup() {
  Serial.begin(115200);
  delay(10);

  // Connecting to WiFi
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverName.c_str());
    http.addHeader("Content-Type", "application/json");

    // Example of sending a JSON payload
    String httpRequestData = "{\"sensor\":\"temperature\",\"value\":25}";
    int httpResponseCode = http.POST(httpRequestData);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(httpResponseCode);
      Serial.println(response);
    } else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  }
  delay(10000); // Send a request every 10 seconds
}