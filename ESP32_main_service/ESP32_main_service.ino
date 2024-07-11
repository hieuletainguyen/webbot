#include <WiFi.h>
#include <HTTPClient.h>
#include <WireGuard-ESP32.h>

const char* ssid = "Agiat Ikazinat";
const char* password = "whaleclysdeo";
String serverName = "http://34.68.65.7:9897/get-arm-data";

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
    int httpCode = http.GET(); // Make the request

    if (httpCode > 0) { // Check for the returning code
      String payload = http.getString();
      Serial.println("Received data: " + payload);
      // Process the received data here
    } else {
      Serial.println("Error on HTTP request");
    }

    http.end(); // Free the resources
  }
  delay(10000); // Send a request every 10 seconds
}