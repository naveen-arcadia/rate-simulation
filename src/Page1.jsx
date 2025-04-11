import React, { useState } from "react";

const Page1 = () => {
  const [consumers, setConsumers] = useState(1);
  const [messages, setMessages] = useState(10);
  const [timePerMessage, setTimePerMessage] = useState(5);
  const [rateLimit, setRateLimit] = useState(20);
  const [result, setResult] = useState(null);

  const calculateTime = () => {
    const C = consumers;
    const N = messages;
    const T = timePerMessage;
    const R = rateLimit;

    const processingTimes = [];

    for (let i = 0; i < N; i++) {
      const consumerReadyAt = i < C ? 0 : processingTimes[i - C];
      const rateLimitReadyAt = Math.floor(i / R) * 60;
      const startAt = Math.max(consumerReadyAt, rateLimitReadyAt);
      processingTimes.push(startAt + T);
    }

    setResult(processingTimes[N - 1]);
  };

  const handleInputChange = (setter) => (value) => {
    setter(value);
    calculateTime();
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return [
      h > 0 ? `${h}h` : null,
      m > 0 ? `${m}m` : null,
      `${s}s`,
    ]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4 bg-gray-100 rounded shadow-md">
      <h1 className="text-2xl font-bold text-primary">Message Processing Simulator</h1>

      <div>
        <label className="block text-sm font-medium text-gray-700">Consumers (C):</label>
        <input
          type="number"
          value={consumers}
          onChange={(e) => handleInputChange(setConsumers)(Number(e.target.value))}
          className="border p-1 w-full rounded focus:ring-primary focus:border-primary"
        />
        <input
          type="range"
          min="1"
          max="500"
          value={consumers}
          onChange={(e) => handleInputChange(setConsumers)(Number(e.target.value))}
          className="w-full mt-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Messages (N):</label>
        <input
          type="number"
          value={messages}
          onChange={(e) => handleInputChange(setMessages)(Number(e.target.value))}
          className="border p-1 w-full rounded focus:ring-primary focus:border-primary"
        />
        <input
          type="range"
          min="1"
          max="5000"
          value={messages}
          onChange={(e) => handleInputChange(setMessages)(Number(e.target.value))}
          className="w-full mt-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Time per message (T, seconds):</label>
        <input
          type="number"
          value={timePerMessage}
          onChange={(e) => handleInputChange(setTimePerMessage)(Number(e.target.value))}
          className="border p-1 w-full rounded focus:ring-primary focus:border-primary"
        />
        <input
          type="range"
          min="1"
          max="600"
          value={timePerMessage}
          onChange={(e) => handleInputChange(setTimePerMessage)(Number(e.target.value))}
          className="w-full mt-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Rate limit (R, per minute):</label>
        <input
          type="number"
          value={rateLimit}
          onChange={(e) => handleInputChange(setRateLimit)(Number(e.target.value))}
          className="border p-1 w-full rounded focus:ring-primary focus:border-primary"
        />
        <input
          type="range"
          min="1"
          max="300"
          value={rateLimit}
          onChange={(e) => handleInputChange(setRateLimit)(Number(e.target.value))}
          className="w-full mt-2"
        />
      </div>

      {result !== null && (
        <div className="mt-4 text-secondary">
          <strong>Total time to process last message:</strong> {formatTime(result)}
        </div>
      )}
    </div>
  );
};

export default Page1;
