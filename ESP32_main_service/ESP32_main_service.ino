#include <WiFi.h>
#include <HTTPClient.h>
#include <WireGuard-ESP32.h>
#include <ArduinoJson.h>
#include <config.h>
#include <ESP32Servo.h>
#include <ArduinoJson.h>


const char* ssid = WIFI_SSID;
const char* password = WIFI_PASSWORD;
String serverName = "http://" + SERVER_IP + ":9897/get-arm-data";

Servo baseservo; 
Servo arm1servo;
Servo arm2servo;
Servo clawyservo;
Servo clawzservo;
Servo end_effector;
// Servo GPIO pin
int base = 14;
int arm1 = 17;
int arm2 = 19;
int clawy = 16;
int clawz = 13;
int ee = 15;

void setup() {
  Serial.begin(115200);
  delay(10);

  baseservo.setPeriodHertz(60);// Standard 50hz servo
  arm1servo.setPeriodHertz(60);
  arm2servo.setPeriodHertz(60);
  clawyservo.setPeriodHertz(60);
  clawzservo.setPeriodHertz(60);
  end_effector.setPeriodHertz(60);

  baseservo.attach(base);
  arm1servo.attach(arm1);
  arm2servo.attach(arm2);
  clawyservo.attach(clawy);
  clawzservo.attach(clawz);
  end_effector.attach(ee);

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

      DynamicJsonDocument doc(1024); // Adjust the size as needed
      DeserializationError error = deserializeJson(doc, payload);

      if (error) {
        Serial.print("JSON parsing failed: ");
        Serial.println(error.f_str());
        return;
      }

      baseservo.write(doc["base"]);
      arm1servo.write(doc["arm1"]);
      arm2servo.write(doc["arm2"]);
      clawyservo.write(doc["clawy"]);
      clawzservo.write(doc["clawz"]);
      end_effector.write(doc["ee"]);

    } else {
      Serial.println("Error on HTTP request");
    }

    http.end(); // Free the resources
  }
  delay(10000); // Send a request every 10 seconds
}