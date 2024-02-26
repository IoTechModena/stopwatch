const int pin_button = 0;

void setup() {
  pinMode(pin_button, INPUT_PULLUP);
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  int button = digitalRead(pin_button);

  if (button == LOW) {
    digitalWrite(LED_BUILTIN, LOW);
  }
  else {
    digitalWrite(LED_BUILTIN, HIGH);
  }
}
