char* getStartDateTime(tm* timeinfo) {
  static char dateTime[64];

  getLocalTime(timeinfo);
  strftime(dateTime, sizeof(dateTime), "?startDate=%F&startTime=%T", timeinfo);

  return dateTime;
}

char* getEndDateTime(tm* timeinfo) {
  static char dateTime[64];

  getLocalTime(timeinfo);
  strftime(dateTime, sizeof(dateTime), "&endDate=%F&endTime=%T", timeinfo);

  return dateTime;
}
